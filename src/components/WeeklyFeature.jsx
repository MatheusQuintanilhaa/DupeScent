import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  Ajmal: 230,
  Nuancielo: 180,
  "Thera Cosméticos": 110,
  "O Boticário": 160,
  Natura: 150,
  Parfun: 150,
  Dossier: 130,
  Zara: 100,
  "Franck Olivier": 160,
  "Antonio Banderas": 100,
};

function getPrice(brand, fallback = 200) {
  if (!brand) return fallback;
  const found = Object.entries(averageDupePrice).find(([key]) =>
    brand.toLowerCase().includes(key.toLowerCase()),
  );
  return found?.[1] ?? fallback;
}

function RadarBars({ radar }) {
  if (!radar) return null;
  const rows = [
    ["doce", "Doce"],
    ["amadeirado", "Amadeirado"],
    ["citrico", "Cítrico"],
    ["especiado", "Especiado"],
    ["fresco", "Fresco"],
  ];
  return (
    <div className="space-y-2">
      {rows.map(([key, label]) => (
        <div key={key} className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-[9px] uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">
            {label}
          </span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-px transition-all duration-500"
              style={{
                width: `${Math.min(((radar[key] || 0) / 5) * 100, 100)}%`,
                background: GOLD,
              }}
            />
          </div>
          <span className="w-3 text-right text-[10px] text-gray-400">
            {radar[key] || 0}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function WeeklyFeature({ item, onDetails }) {
  const navigate = useNavigate();
  if (!item) return null;

  const dupes = item.allDupes || [];

  return (
    <div className="mx-4 my-8 overflow-hidden border border-gray-100 bg-[#faf9f7] dark:border-[#2a2a2a] dark:bg-[#141414] sm:mx-6 lg:mx-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-[300px_1fr_300px]"
        >
          {/* COLUNA ESQUERDA */}
          <div className="flex flex-col justify-between p-8">
            <div>
              <p
                className="mb-4 text-[9px] uppercase tracking-[0.3em]"
                style={{ color: GOLD }}
              >
                Destaque da semana
              </p>
              <h2
                className="mb-1 text-[36px] font-light leading-tight text-gray-900 dark:text-gray-100"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {item.name}
              </h2>
              <p className="mb-4 text-[13px] font-light text-gray-500 dark:text-gray-400">
                {item.brand}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="border border-gray-300 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-gray-500 dark:border-[#3a3a3a] dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mb-6 text-[12px] italic text-gray-400">
                {item.notes}
              </p>

              <div className="flex items-end gap-3">
                <div>
                  <span
                    className="text-[48px] font-light leading-none"
                    style={{
                      color: GOLD,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {item.score}
                  </span>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Excelente
                  </p>
                </div>
                {dupes[0] && (
                  <p className="mb-1 text-[11px] leading-snug text-gray-400">
                    {dupes[0].name} — {dupes[0].brand}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onDetails?.(item)}
              className="mt-8 flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
              style={{ background: GOLD, width: "fit-content" }}
            >
              Ver detalhes completos →
            </button>
          </div>

          {/* COLUNA CENTRAL — imagem */}
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#f5f0e8] dark:bg-[#1a1610]">
            {item.imagem ? (
              <img
                src={item.imagem}
                alt={`${item.brand} ${item.name}`}
                className="h-full max-h-[420px] w-full object-contain p-8 drop-shadow-2xl"
              />
            ) : (
              <div className="text-[11px] uppercase tracking-widest text-gray-300">
                Sem imagem
              </div>
            )}
          </div>

          {/* COLUNA DIREITA */}
          <div className="flex flex-col gap-6 border-l border-gray-100 p-8 dark:border-[#2a2a2a]">
            {item.piramide && (
              <div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400">
                  Pirâmide olfativa
                </p>
                <div className="space-y-3">
                  {[
                    ["Topo", item.piramide.topo],
                    ["Coração", item.piramide.coracao],
                    ["Fundo", item.piramide.fundo],
                  ].map(([label, value]) =>
                    value ? (
                      <div
                        key={label}
                        className="border-l-2 pl-3"
                        style={{ borderColor: GOLD }}
                      >
                        <p className="text-[8px] uppercase tracking-[0.14em] text-gray-400">
                          {label}
                        </p>
                        <p className="text-[11px] text-gray-600 dark:text-gray-300">
                          {value}
                        </p>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            )}

            {item.radar && (
              <div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400">
                  Perfil olfativo
                </p>
                <RadarBars radar={item.radar} />
              </div>
            )}

            {dupes.length > 0 && (
              <div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400">
                  Melhores dupes
                </p>
                <div className="space-y-3">
                  {dupes.slice(0, 3).map((dupe, i) => (
                    <div
                      key={`${dupe.brand}-${dupe.name}`}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center text-[9px] text-white"
                        style={{ background: GOLD }}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] uppercase tracking-[0.1em] text-gray-400">
                          {dupe.brand}
                        </p>
                        <p className="truncate text-[12px] text-gray-700 dark:text-gray-200">
                          {dupe.name}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-[16px] font-light"
                        style={{
                          color: GOLD,
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {Number(dupe.score).toFixed(1)}
                      </span>
                      <span className="shrink-0 text-[11px] font-medium text-gray-800 dark:text-gray-200">
                        R$ {getPrice(dupe.brand)}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/similares")}
                  className="mt-5 w-full border py-2.5 text-[9px] uppercase tracking-[0.2em] transition-colors hover:bg-gray-50 dark:hover:bg-[#1f1f1f]"
                  style={{ borderColor: GOLD, color: GOLD }}
                >
                  Ver todos os dupes
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
