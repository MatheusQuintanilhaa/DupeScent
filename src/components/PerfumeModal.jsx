import { useEffect } from "react";

const GOLD = "#b8912a";

// Preços médios por marca — referência: thekingofparfums.com.br e mercado BR (jun/2026)
const precoMedio = {
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
  "Ard Al Zaafaran": 180,
  Dossier: 130,
  Zara: 100,
  "Franck Olivier": 160,
};

function getPreco(brand) {
  if (!brand) return null;
  for (const [key, value] of Object.entries(precoMedio)) {
    if (brand.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return 160; // fallback
}

function ScoreBar({ score }) {
  const pct = ((parseFloat(score) - 7) / 3) * 100;
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[22px] font-light leading-none w-10"
        style={{
          color: GOLD,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {parseFloat(score).toFixed(1)}
      </span>
      <div className="flex-1 h-px bg-gray-100 relative">
        <div
          className="absolute top-0 left-0 h-px transition-all duration-500"
          style={{ width: `${pct}%`, background: GOLD }}
        />
      </div>
    </div>
  );
}

function RadarChart({ radar }) {
  if (!radar) return null;
  const labels = [
    { key: "doce", label: "Doce" },
    { key: "amadeirado", label: "Amadeirado" },
    { key: "citrico", label: "Cítrico" },
    { key: "especiado", label: "Especiado" },
    { key: "fresco", label: "Fresco" },
  ];
  return (
    <div className="space-y-2">
      {labels.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.1em] uppercase text-gray-500 w-20 shrink-0">
            {label}
          </span>
          <div className="flex-1 h-px bg-gray-100 relative">
            <div
              className="absolute top-0 left-0 h-px"
              style={{
                width: `${(radar[key] / 5) * 100}%`,
                background: `${GOLD}99`,
              }}
            />
          </div>
          <span className="text-[10px] text-gray-500 w-3">{radar[key]}</span>
        </div>
      ))}
    </div>
  );
}

export default function PerfumeModal({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!item) return null;

  const dupes = item.allDupes || [
    {
      name: item.dupe?.split(" — ")[0],
      brand: item.dupe?.split(" — ")[1],
      score: item.score,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-t sm:border border-gray-100 sm:mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between z-10">
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-gray-500 mb-1">
              {item.brand}
            </p>
            <h2
              className="text-[22px] sm:text-[26px] font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {item.name}
            </h2>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors mt-1 text-lg leading-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Tags + Notas */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-gray-200 text-gray-500"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[12px] italic text-gray-500">{item.notes}</p>
          </div>

          {/* Pirâmide olfativa */}
          {item.piramide && (
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-gray-400 mb-3">
                Pirâmide olfativa
              </p>
              <div className="space-y-2">
                {[
                  { label: "Topo", value: item.piramide.topo },
                  { label: "Coração", value: item.piramide.coracao },
                  { label: "Fundo", value: item.piramide.fundo },
                ].map(
                  ({ label, value }) =>
                    value && (
                      <div key={label} className="flex gap-3">
                        <span className="text-[9px] tracking-[0.1em] uppercase text-gray-400 w-14 shrink-0 pt-0.5">
                          {label}
                        </span>
                        <span className="text-[12px] text-gray-600">
                          {value}
                        </span>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Radar olfativo */}
          {item.radar && (
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-gray-400 mb-3">
                Perfil olfativo
              </p>
              <RadarChart radar={item.radar} />
            </div>
          )}

          {/* Separador */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400">
              Melhores dupes
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Dupes */}
          <div className="space-y-4">
            {dupes.map((dupe, i) => {
              const preco = getPreco(dupe.brand);
              return (
                <div key={i} className="border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-0.5">
                        {dupe.brand}
                      </p>
                      <p
                        className="text-[17px] font-light"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {dupe.name}
                      </p>
                    </div>
                    {preco && (
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-0.5">
                          Média
                        </p>
                        <p
                          className="text-[16px] font-light"
                          style={{
                            color: GOLD,
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                          }}
                        >
                          R$ {preco}
                        </p>
                      </div>
                    )}
                  </div>
                  <ScoreBar score={dupe.score} />
                </div>
              );
            })}
          </div>

          {/* Aviso preço */}
          <p className="text-[10px] text-gray-400 leading-relaxed border-t border-gray-50 pt-4">
            * Os preços são médias baseadas no mercado brasileiro e podem variar
            conforme o vendedor, promoções e região. Consulte sempre o valor
            atual antes de comprar.
          </p>
        </div>
      </div>
    </div>
  );
}
