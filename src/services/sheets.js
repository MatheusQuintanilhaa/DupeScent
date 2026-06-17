// services/sheets.js
// ============================================================
// Integração com Google Sheets API
// ============================================================

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

// Converte linha da aba Masculinos/Femininos em objeto
function parseRow(row, genero) {
  // Colunas: brand, name, dupe1, marca1, score1, dupe2, marca2, score2, dupe3, marca3, score3, ocasiao, clima, notas
  const [
    brand,
    name,
    dupe1,
    marca1,
    score1,
    dupe2,
    marca2,
    score2,
    dupe3,
    marca3,
    score3,
    ocasiao,
    clima,
    notas,
  ] = row;

  if (!name || name === "Perfume") return null; // pula cabeçalho

  return {
    brand: brand || "",
    name: name || "",
    genero,
    ocasiao: ocasiao || "",
    clima: clima || "",
    notas: notas || "",
    dupes: [
      dupe1 && { name: dupe1, brand: marca1, score: parseFloat(score1) || 0 },
      dupe2 && { name: dupe2, brand: marca2, score: parseFloat(score2) || 0 },
      dupe3 && { name: dupe3, brand: marca3, score: parseFloat(score3) || 0 },
    ].filter(Boolean),
  };
}

// Converte linha da aba Piramide em objeto
function parsePiramideRow(row) {
  const [name, topo, coracao, fundo] = row;
  if (!name || name.startsWith("◀")) return null;
  return {
    name,
    piramide: { topo: topo || "", coracao: coracao || "", fundo: fundo || "" },
  };
}

// Converte linha da aba Base_Notas (radar) em objeto
function parseRadarRow(row) {
  const [name, doce, amadeirado, citrico, especiado, fresco] = row;
  if (!name || name.startsWith("◀") || name === "Nota") return null;
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

  // Monta mapas de pirâmide e radar para lookup rápido
  const piramideMap = {};
  rowsPiramide.slice(2).forEach((row) => {
    const parsed = parsePiramideRow(row);
    if (parsed) piramideMap[parsed.name] = parsed.piramide;
  });

  const radarMap = {};
  rowsRadar.slice(2).forEach((row) => {
    const parsed = parseRadarRow(row);
    if (parsed) radarMap[parsed.name] = parsed.radar;
  });

  // Processa masculinos (pula as 2 primeiras linhas: cabeçalho e voltar)
  const masculinos = rowsMasc
    .slice(2)
    .map((row) => parseRow(row, "Masculino"))
    .filter(Boolean)
    .map((p) => ({
      ...p,
      piramide: piramideMap[p.name] || null,
      radar: radarMap[p.name] || null,
    }));

  // Processa femininos
  const femininos = rowsFem
    .slice(2)
    .map((row) => parseRow(row, "Feminino"))
    .filter(Boolean)
    .map((p) => ({
      ...p,
      piramide: piramideMap[p.name] || null,
      radar: radarMap[p.name] || null,
    }));

  return { masculinos, femininos };
}

// Converte perfume para o formato que o Card.jsx espera
export function toCardFormat(perfume) {
  return {
    brand: perfume.brand,
    name: perfume.name,
    tags: [perfume.ocasiao, perfume.clima].filter(Boolean),
    notes: perfume.notas,
    score: perfume.dupes[0]?.score.toFixed(1) || "—",
    dupe: perfume.dupes[0]
      ? `${perfume.dupes[0].name} — ${perfume.dupes[0].brand}`
      : "—",
    allDupes: perfume.dupes,
    piramide: perfume.piramide,
    radar: perfume.radar,
    genero: perfume.genero,
  };
}
