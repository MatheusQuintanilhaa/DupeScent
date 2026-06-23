import { useNavigate } from "react-router-dom";

const GOLD = "#b8912a";

const averageDupePrice = {
  Armaf: 320,
  "Al Haramain": 250,
  Lattafa: 260,
  "Maison Alhambra": 200,
  "Fragrance World": 180,
  "Paris Corner": 170,
  Afnan: 190,
  Zimaya: 200,
  Rasasi: 260,
  Dossier: 130,
  Zara: 100,
  Natura: 150,
  Eudora: 120,
};

const averageOriginalPrice = {
  Dior: 700,
  Chanel: 1000,
  Creed: 2000,
  "Parfums de Marly": 1500,
  MFK: 1800,
  "Maison Francis Kurkdjian": 1800,
  "Tom Ford": 1100,
  YSL: 600,
  Armani: 550,
};

function getPrice(brand, map, fallback = null) {
  if (!brand) return fallback;
  const found = Object.entries(map).find(([key]) =>
    brand.toLowerCase().includes(key.toLowerCase()),
  );
  return found?.[1] ?? fallback;
}

function RadarBars({ radar }) {
  if (!radar) return null;
  const rows = [
    ["doce", "Doce"],
    ["amadeirado", "Amadeirado"],
    ["citrico", "Citrico"],
    ["especiado", "Especiado"],
    ["fresco", "Fresco"],
  ];

  return (
    <div className="space-y-2.5">
      {rows.map(([key, label]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-[9px] uppercase tracking-[0.1em] text-gray-400">
            {label}
          </span>
          <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800">
            <div
              className="h-px"
              style={{
                width: `${Math.min(((radar[key] || 0) / 5) * 100, 100)}%`,
                background: GOLD,
              }}
            />
          </div>
          <span className="w-3 text-[10px] text-gray-400">
            {radar[key] || 0}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function FeaturedPerfumePanel({ item, onDetails }) {
  const navigate = useNavigate();

  if (!item) return null;

  const dupes = item.allDupes || [];
  const bestDupe = dupes[0];
  const originalPrice = getPrice(item.brand, averageOriginalPrice, 700);
  const dupePrice = getPrice(bestDupe?.brand, averageDupePrice, 260);
  const savings = Math.max(originalPrice - dupePrice, 0);
  const savingsPct = Math.round((savings / originalPrice) * 100);

  return (
    <aside className="border-l border-gray-100 bg-white px-6 py-7 dark:border-gray-800 dark:bg-[#0f0f0f] lg:sticky lg:top-0 lg:min-h-full">
      <div className="grid grid-cols-[120px_1fr] items-center gap-6 border-b border-gray-100 pb-6 dark:border-gray-800">
        <div className="flex h-36 items-center justify-center bg-white">
          {item.imagem && (
            <img
              src={item.imagem}
              alt={`${item.brand} ${item.name}`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          )}
        </div>

        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.28em] text-gray-400">
            {item.brand}
          </p>
          <h3
            className="mb-2 text-[25px] font-light leading-tight text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {item.name}
          </h3>
          <div className="mb-2 flex flex-wrap gap-1">
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="border border-gray-200 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-gray-400 dark:border-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mb-3 text-[11px] italic text-gray-400">
            {item.notes}
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div
                className="text-[26px] font-light leading-none"
                style={{
                  color: GOLD,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {item.score}
              </div>
              <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-gray-400">
                Excelente
              </p>
            </div>
            <button
              className="px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white"
              style={{ background: GOLD }}
              onClick={() => onDetails?.(item)}
            >
              Ver detalhes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 border-b border-gray-100 py-6 dark:border-gray-800 sm:grid-cols-2">
        {item.piramide && (
          <div>
            <h4
              className="mb-4 text-[18px] font-light text-gray-900 dark:text-gray-100"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Piramide olfativa
            </h4>
            <div className="space-y-4">
              {[
                ["Topo", item.piramide.topo],
                ["Coracao", item.piramide.coracao],
                ["Fundo", item.piramide.fundo],
              ].map(
                ([label, value]) =>
                  value && (
                    <div key={label} className="border-l-2 pl-3" style={{ borderColor: GOLD }}>
                      <p className="text-[9px] uppercase tracking-[0.14em] text-gray-400">
                        {label}
                      </p>
                      <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                        {value}
                      </p>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {item.radar && (
          <div>
            <h4
              className="mb-4 text-[18px] font-light text-gray-900 dark:text-gray-100"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Perfil olfativo
            </h4>
            <RadarBars radar={item.radar} />
          </div>
        )}
      </div>

      <div className="border-b border-gray-100 py-6 dark:border-gray-800">
        <h4
          className="mb-4 text-[18px] font-light text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Melhores dupes
        </h4>
        <div className="space-y-3">
          {dupes.slice(0, 3).map((dupe, index) => (
            <div key={`${dupe.brand}-${dupe.name}`} className="grid grid-cols-[22px_1fr_auto_auto] items-center gap-3">
              <span
                className="flex h-5 w-5 items-center justify-center text-[10px] text-white"
                style={{ background: GOLD }}
              >
                {index + 1}
              </span>
              <div>
                <p className="text-[9px] uppercase tracking-[0.1em] text-gray-400">
                  {dupe.brand}
                </p>
                <p className="text-[12px] text-gray-700 dark:text-gray-300">
                  {dupe.name}
                </p>
              </div>
              <span
                className="text-[18px] font-light"
                style={{
                  color: GOLD,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {Number(dupe.score).toFixed(1)}
              </span>
              <span className="text-[11px] font-medium text-gray-900 dark:text-gray-200">
                R$ {getPrice(dupe.brand, averageDupePrice, 200)}
              </span>
            </div>
          ))}
        </div>
        <button
          className="mt-5 w-full border px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-gray-50 dark:hover:bg-[#151515]"
          style={{ borderColor: GOLD, color: GOLD }}
          onClick={() => navigate("/similares")}
        >
          Ver todos os dupes
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between border border-gray-100 px-5 py-4 dark:border-gray-800">
        <div>
          <p className="text-[13px] text-gray-600 dark:text-gray-300">
            Voce economiza
          </p>
          <p className="text-[11px] text-gray-400">
            Comparado ao original de R$ {originalPrice}
          </p>
        </div>
        <div
          className="text-[24px] font-light"
          style={{ color: GOLD, fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          R$ {savings}{" "}
          <span className="text-[12px] text-gray-400">({savingsPct}%)</span>
        </div>
      </div>
    </aside>
  );
}
