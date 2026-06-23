// services/sheets.js
const SHEET_ID = "1Q_ZN57C2bDOwnx6djD7KIi61_wvvbZETAzHEtqHxKwU";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

async function fetchSheet(sheetName) {
  const range = `${sheetName}!A1:Z1000`;
  const url = `${BASE_URL}/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Erro ao buscar aba ${sheetName}: ${res.status}`);
  const data = await res.json();
  return data.values || [];
}

// Nova estrutura:
// A=Marca | B=Perfume | C=Dupe1 | D=Marca1 | E=Score1 | F=Tipo1 |
// G=Dupe2 | H=Marca2 | I=Score2 | J=Tipo2 |
// K=Dupe3 | L=Marca3 | M=Score3 | N=Tipo3 |
// O=Ocasião | P=Clima | Q=Notas | R=Imagem
function parseRow(row, genero) {
  const [
    brand,
    name,
    dupe1,
    marca1,
    score1,
    tipo1,
    dupe2,
    marca2,
    score2,
    tipo2,
    dupe3,
    marca3,
    score3,
    tipo3,
    ocasiao,
    clima,
    notas,
    imagem,
  ] = row;

  if (!name || name === "Perfume" || name === "◀ VOLTAR AO DASHBOARD")
    return null;
  if (!brand || brand.startsWith("♂") || brand.startsWith("♀")) return null;

  const parseScore = (s) => {
    if (!s) return 0;
    return parseFloat(String(s).replace(",", ".")) || 0;
  };

  const dupes = [
    dupe1
      ? {
          name: dupe1,
          brand: marca1 || "",
          score: parseScore(score1),
          tipo: tipo1 || "Árabe",
        }
      : null,
    dupe2
      ? {
          name: dupe2,
          brand: marca2 || "",
          score: parseScore(score2),
          tipo: tipo2 || "Árabe",
        }
      : null,
    dupe3
      ? {
          name: dupe3,
          brand: marca3 || "",
          score: parseScore(score3),
          tipo: tipo3 || "Árabe",
        }
      : null,
  ].filter(Boolean);

  return {
    brand: brand || "",
    name: name || "",
    genero,
    ocasiao: ocasiao || "",
    clima: clima || "",
    notas: notas || "",
    imagem: imagem || "",
    dupes,
  };
}

function parsePiramideRow(row) {
  const [name, topo, coracao, fundo] = row;
  if (
    !name ||
    name.startsWith("◀") ||
    name.startsWith("♂") ||
    name.startsWith("♀")
  )
    return null;
  return {
    name,
    piramide: { topo: topo || "", coracao: coracao || "", fundo: fundo || "" },
  };
}

function parseRadarRow(row) {
  const [name, doce, amadeirado, citrico, especiado, fresco] = row;
  if (
    !name ||
    name.startsWith("◀") ||
    name === "Nota" ||
    name.startsWith("♂") ||
    name.startsWith("♀")
  )
    return null;
  return {
    name,
    radar: {
      doce: parseInt(doce) || 0,
      amadeirado: parseInt(amadeirado) || 0,
      citrico: parseInt(citrico) || 0,
      especiado: parseInt(especiado) || 0,
      fresco: parseInt(fresco) || 0,
    },
  };
}

export async function fetchAllPerfumes() {
  const [rowsMasc, rowsFem, rowsPiramide, rowsRadar] = await Promise.all([
    fetchSheet("Masculinos"),
    fetchSheet("Femininos"),
    fetchSheet("Piramide"),
    fetchSheet("Base_Notas"),
  ]);

  const piramideMap = {};
  rowsPiramide.slice(1).forEach((row) => {
    const parsed = parsePiramideRow(row);
    if (parsed) piramideMap[parsed.name] = parsed.piramide;
  });

  const radarMap = {};
  rowsRadar.slice(1).forEach((row) => {
    const parsed = parseRadarRow(row);
    if (parsed) radarMap[parsed.name] = parsed.radar;
  });

  const masculinos = rowsMasc
    .slice(1)
    .map((row) => parseRow(row, "Masculino"))
    .filter(Boolean)
    .map((p) => ({
      ...p,
      piramide: piramideMap[p.name] || null,
      radar: radarMap[p.name] || null,
    }));

  const femininos = rowsFem
    .slice(1)
    .map((row) => parseRow(row, "Feminino"))
    .filter(Boolean)
    .map((p) => ({
      ...p,
      piramide: piramideMap[p.name] || null,
      radar: radarMap[p.name] || null,
    }));

  return { masculinos, femininos };
}

export function toCardFormat(perfume) {
  return {
    brand: perfume.brand,
    name: perfume.name,
    tags: [perfume.ocasiao, perfume.clima].filter(Boolean),
    notes: perfume.notas,
    imagem: perfume.imagem || "",
    score: perfume.dupes[0]?.score?.toFixed(1) || "—",
    dupe: perfume.dupes[0]
      ? `${perfume.dupes[0].name} — ${perfume.dupes[0].brand}`
      : "—",
    allDupes: perfume.dupes,
    piramide: perfume.piramide,
    radar: perfume.radar,
    genero: perfume.genero,
  };
}
