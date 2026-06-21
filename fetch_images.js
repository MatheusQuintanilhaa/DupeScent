// fetch_images.js — Busca URLs de imagem na Fragella para todos os perfumes
// Uso: node fetch_images.js SUA_FRAGELLA_KEY SUA_GOOGLE_API_KEY
// Gera: perfume_images.json com { "Marca - Nome": "url_da_imagem" }

const SHEET_ID = "1Q_ZN57C2bDOwnx6djD7KIi61_wvvbZETAzHEtqHxKwU";
const FRAGELLA_KEY = process.argv[2];
const GOOGLE_KEY = process.argv[3];

if (!FRAGELLA_KEY || !GOOGLE_KEY) {
  console.error("Uso: node fetch_images.js FRAGELLA_KEY GOOGLE_API_KEY");
  process.exit(1);
}

// Espera N ms entre requisições para não rate-limitar
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchSheet(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${GOOGLE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.values || [];
}

async function fetchFragellaImage(brand, name) {
  const query = `${name} ${brand}`;
  const url = `https://api.fragella.com/api/v1/fragrances?search=${encodeURIComponent(query)}&limit=1`;
  try {
    const res = await fetch(url, { headers: { "x-api-key": FRAGELLA_KEY } });
    const data = await res.json();
    const result = Array.isArray(data) ? data[0] : null;
    return result?.["Image URL Transparent"] || result?.["Image URL"] || null;
  } catch {
    return null;
  }
}

async function run() {
  const results = {};
  let total = 0;
  let found = 0;

  for (const sheet of ["Masculinos", "Femininos"]) {
    console.log(`\n=== Processando ${sheet} ===`);
    const rows = await fetchSheet(sheet);

    for (const row of rows) {
      const [brand, name] = row;
      if (!name || name === "Perfume" || !brand) continue;

      const key = `${brand} - ${name}`;
      total++;

      process.stdout.write(`[${total}] ${key}... `);
      const imageUrl = await fetchFragellaImage(brand, name);

      if (imageUrl) {
        results[key] = imageUrl;
        found++;
        console.log("✓");
      } else {
        results[key] = null;
        console.log("✗ não encontrado");
      }

      // Espera 500ms entre requests para não estourar rate limit
      await sleep(500);
    }
  }

  const fs = await import("fs");
  fs.writeFileSync("perfume_images.json", JSON.stringify(results, null, 2));

  console.log(`\n========= RESULTADO =========`);
  console.log(
    `Total: ${total} | Encontrados: ${found} | Não encontrados: ${total - found}`,
  );
  console.log(`Arquivo salvo: perfume_images.json`);
}

run();
