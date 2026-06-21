import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { IconShare } from "@tabler/icons-react";

const GOLD = "#b8912a";

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

// Preços médios dos perfumes ORIGINAIS no mercado brasileiro
const precoOriginal = {
  Creed: 2000,
  "Tom Ford": 1100,
  "Maison Francis Kurkdjian": 1800,
  MFK: 1800,
  Kilian: 1400,
  "By Kilian": 1400,
  "Parfums de Marly": 1500,
  Amouage: 1600,
  Xerjoff: 1700,
  Initio: 1300,
  Roja: 2000,
  "Louis Vuitton": 1500,
  Byredo: 1200,
  "Le Labo": 1200,
  Chanel: 1000,
  Dior: 700,
  YSL: 600,
  "Yves Saint Laurent": 600,
  Armani: 550,
  "Giorgio Armani": 550,
  Prada: 600,
  Givenchy: 550,
  Versace: 450,
  Lancôme: 500,
  "Carolina Herrera": 450,
  "Dolce & Gabbana": 500,
  Gucci: 550,
  Valentino: 600,
  Burberry: 450,
  Bvlgari: 450,
  "Paco Rabanne": 400,
  "Jean Paul Gaultier": 400,
  Mugler: 450,
  Hermès: 700,
  Montblanc: 300,
  Davidoff: 280,
  "Hugo Boss": 350,
  "Narciso Rodriguez": 500,
  Chloé: 500,
};

function getPrecoOriginal(brand) {
  if (!brand) return null;
  for (const [key, value] of Object.entries(precoOriginal)) {
    if (brand.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return null;
}

function getPreco(brand) {
  if (!brand) return null;
  for (const [key, value] of Object.entries(precoMedio)) {
    if (brand.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return 160;
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
        <motion.div
          className="absolute top-0 left-0 h-px"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{ background: GOLD }}
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
      {labels.map(({ key, label }, i) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.1em] uppercase text-gray-400 w-20 shrink-0">
            {label}
          </span>
          <div className="flex-1 h-px bg-gray-100 relative">
            <motion.div
              className="absolute top-0 left-0 h-px"
              initial={{ width: 0 }}
              animate={{ width: `${(radar[key] / 5) * 100}%` }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1 + i * 0.08,
              }}
              style={{ background: `${GOLD}99` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 w-3">{radar[key]}</span>
        </div>
      ))}
    </div>
  );
}

export default function PerfumeModal({ item, onClose }) {
  const location = useLocation();

  const handleShare = () => {
    const params = new URLSearchParams({
      q: item.name,
    });
    const url = `${window.location.origin}/busca?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      toast("🔗 Link copiado!", {
        style: {
          background: "#1a1a1a",
          color: "#b8912a",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "0",
          padding: "12px 16px",
        },
      });
    });
  };
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        />

        <motion.div
          className="relative bg-white dark:bg-[#1a1a1a] w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-t sm:border border-gray-100 sm:mx-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-start justify-between z-10">
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
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={handleShare}
                className="text-gray-300 hover:text-yellow-700 transition-colors"
                aria-label="Compartilhar perfume"
                title="Copiar link"
              >
                <IconShare size={16} strokeWidth={1.5} />
              </button>
              <button
                className="text-gray-300 hover:text-gray-600 transition-colors text-lg leading-none"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="px-6 py-5 space-y-6">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-gray-100 text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[12px] italic text-gray-500">{item.notes}</p>
            </div>

            {item.piramide && (
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-gray-500">
                    Pirâmide olfativa
                  </p>
                  <Link
                    to="/guia#piramide"
                    className="text-[9px] tracking-[0.1em] uppercase text-gray-300 hover:text-yellow-700 transition-colors"
                    onClick={onClose}
                  >
                    O que é isso? ↗
                  </Link>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      label: "Topo",
                      sub: "5–20 min",
                      color: "#b8912a",
                      value: item.piramide.topo,
                    },
                    {
                      label: "Coração",
                      sub: "1–4 horas",
                      color: "#8a6d8f",
                      value: item.piramide.coracao,
                    },
                    {
                      label: "Fundo",
                      sub: "6h ou mais",
                      color: "#5f5e5a",
                      value: item.piramide.fundo,
                    },
                  ].map(
                    ({ label, sub, color, value }) =>
                      value && (
                        <div
                          key={label}
                          className="pl-3"
                          style={{ borderLeft: `2px solid ${color}` }}
                        >
                          <div className="flex items-baseline gap-1.5 mb-0.5">
                            <span
                              className="text-[9px] tracking-[0.15em] uppercase font-medium"
                              style={{ color }}
                            >
                              {label}
                            </span>
                            <span className="text-[9px] text-gray-400">
                              · {sub}
                            </span>
                          </div>
                          <span className="text-[12px] text-gray-700">
                            {value}
                          </span>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {item.radar && (
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-gray-500 mb-3">
                  Perfil olfativo
                </p>
                <RadarChart radar={item.radar} />
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400">
                Melhores dupes
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="space-y-4">
              {dupes.map((dupe, i) => {
                const preco = getPreco(dupe.brand);
                return (
                  <motion.div
                    key={i}
                    className="border border-gray-100 dark:border-[#2a2a2a] p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-gray-500 mb-0.5">
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
                              fontFamily:
                                "'Cormorant Garamond', Georgia, serif",
                            }}
                          >
                            R$ {preco}
                          </p>
                        </div>
                      )}
                    </div>
                    <ScoreBar score={dupe.score} />
                  </motion.div>
                );
              })}
            </div>

            {/* Calculadora de economia */}
            {(() => {
              const precoOrig = getPrecoOriginal(item.brand);
              const bestDupe = dupes[0];
              const precoDupe = bestDupe ? getPreco(bestDupe.brand) : null;
              if (!precoOrig || !precoDupe) return null;
              const economia = precoOrig - precoDupe;
              const pct = Math.round((economia / precoOrig) * 100);
              return (
                <motion.div
                  className="border border-gray-100 dark:border-[#2a2a2a] p-4 bg-gray-50 dark:bg-[#111]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">
                    Calculadora de economia
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center">
                      <p className="text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-1">
                        Original
                      </p>
                      <p
                        className="text-[18px] font-light text-gray-400 line-through"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        R$ {precoOrig.toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="text-center text-gray-300">→</div>
                    <div className="text-center">
                      <p className="text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-1">
                        Dupe
                      </p>
                      <p
                        className="text-[18px] font-light"
                        style={{
                          color: GOLD,
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        R$ {precoDupe.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 dark:border-[#2a2a2a] pt-3 flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">Você economiza</p>
                    <p
                      className="text-[20px] font-light"
                      style={{
                        color: GOLD,
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      R$ {economia.toLocaleString("pt-BR")}{" "}
                      <span className="text-[12px] text-gray-400">
                        ({pct}%)
                      </span>
                    </p>
                  </div>
                </motion.div>
              );
            })()}

            <p className="text-[10px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
              * Os preços são médias baseadas no mercado brasileiro e podem
              variar conforme o vendedor, promoções e região.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
