import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import PerfumeModal from "../components/PerfumeModal";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import { usePerfumes } from "../hooks/usePerfumes";

const GOLD = "#b8912a";

const familyMap = [
  { familia: "Oud", keywords: ["oud", "madeira de oud"] },
  { familia: "Couro", keywords: ["couro", "tabaco", "leather"] },
  {
    familia: "Especiado",
    keywords: ["especiado", "canela", "pimenta", "cardamomo", "ambroxan"],
  },
  {
    familia: "Oriental",
    keywords: ["âmbar", "amber", "ambar", "resina", "incenso"],
  },
  {
    familia: "Amadeirado",
    keywords: [
      "amadeirado",
      "cedro",
      "sândalo",
      "vetiver",
      "patchouli",
      "madeira",
    ],
  },
  {
    familia: "Floral",
    keywords: ["floral", "rosa", "jasmim", "íris", "violeta", "peônia"],
  },
  {
    familia: "Doce",
    keywords: ["doce", "baunilha", "mel", "cacau", "pralinê", "gourmand"],
  },
  {
    familia: "Cítrico",
    keywords: ["cítrico", "bergamota", "limão", "laranja", "toranja"],
  },
  {
    familia: "Aquático",
    keywords: ["aquático", "aquatico", "ozônico", "marinho"],
  },
  {
    familia: "Fresco",
    keywords: ["fresco", "almíscar", "musgo", "lavanda", "menta"],
  },
];

function getFamilia(notes) {
  if (!notes) return null;
  const lower = notes.toLowerCase();
  for (const { familia, keywords } of familyMap) {
    if (keywords.some((k) => lower.includes(k))) return familia;
  }
  return null;
}

const popularNames = [
  "Aventus",
  "Sauvage Elixir",
  "Bleu de Chanel EDP",
  "Layton",
  "Baccarat Rouge 540",
  "Libre EDP",
  "Good Girl",
  "Miss Dior EDP",
  "La Vie Est Belle",
  "Black Opium",
  "Y EDP",
  "Invictus",
  "Ultra Male",
  "Oud for Greatness",
  "Tobacco Vanille",
  "Lost Cherry",
  "Angels Share",
  "Delina",
  "Reflection Man",
];

export default function SimilaresPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const { masculinos, femininos, loading } = usePerfumes();

  const allItems = useMemo(
    () => [...masculinos, ...femininos],
    [masculinos, femininos],
  );

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.allDupes?.some(
            (d) =>
              d.name?.toLowerCase().includes(q) ||
              d.brand?.toLowerCase().includes(q),
          ),
      )
      .slice(0, 6);
  }, [query, allItems]);

  const popularItems = useMemo(() => {
    return popularNames
      .map((name) =>
        allItems.find((item) =>
          item.name.toLowerCase().includes(name.toLowerCase()),
        ),
      )
      .filter(Boolean)
      .slice(0, 12);
  }, [allItems]);

  const similares = useMemo(() => {
    if (!selected) return [];
    const familia = getFamilia(selected.notes);
    if (!familia) return [];
    return allItems
      .filter((item) => {
        if (item.name === selected.name && item.brand === selected.brand)
          return false;
        return getFamilia(item.notes) === familia;
      })
      .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
      .slice(0, 12);
  }, [selected, allItems]);

  const handleSelect = (item) => {
    setSelected(item);
    setQuery("");
  };

  const familiaDoSelecionado = selected ? getFamilia(selected.notes) : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
        <SEO
          title="Perfumes similares"
          description="Encontre perfumes similares ao que você já tem — original ou dupe."
          path="/similares"
        />
        <Navbar />

        <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: GOLD }}
            >
              Descubra novos dupes
            </span>
          </div>
          <h1
            className="text-[32px] sm:text-[42px] font-light leading-[1.1] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Perfumes <em style={{ color: GOLD }}>similares</em>
          </h1>
          <p className="text-sm font-light text-gray-400 max-w-md">
            Digite ou selecione um perfume que você já tem — original ou dupe —
            e encontre fragrâncias da mesma família olfativa.
          </p>
        </div>

        <div className="px-6 sm:px-8 pt-8 max-w-4xl">
          {/* Busca */}
          <div className="relative mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-2.5">
              Digite um perfume que você tem
            </p>
            <div className="flex border border-gray-200 dark:border-gray-700 focus-within:border-yellow-600 dark:bg-[#1a1a1a] transition-colors">
              <input
                className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-[13px] text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 tracking-wide"
                placeholder="Ex: Club de Nuit, Aventus, Good Girl..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(null);
                }}
              />
              {query && (
                <button
                  className="px-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  onClick={() => {
                    setQuery("");
                    setSelected(null);
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow-lg mt-1">
                {searchResults.map((item, idx) => (
                  <button
                    key={`${item.brand}-${item.name}-${idx}`}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-0.5">
                      {item.brand}
                    </p>
                    <p
                      className="text-[14px] font-light text-gray-900 dark:text-gray-100"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[11px] italic text-gray-400">
                      {item.notes}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Seleção rápida */}
          {!selected && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400">
                  Ou selecione um popular
                </span>
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-100 dark:bg-[#1a1a1a] animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {popularItems.map((item, idx) => (
                    <button
                      key={`${item.brand}-${item.name}-${idx}`}
                      onClick={() => handleSelect(item)}
                      className="text-left p-3 border border-gray-100 dark:border-[#2a2a2a] hover:border-yellow-700 transition-colors group"
                    >
                      <p className="text-[8px] tracking-[0.15em] uppercase text-gray-400 mb-0.5">
                        {item.brand}
                      </p>
                      <p
                        className="text-[13px] font-light text-gray-900 dark:text-gray-100 group-hover:text-yellow-700 transition-colors leading-tight"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Resultados */}
          {selected && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">
                    Similares a
                  </p>
                  <h2
                    className="text-[22px] font-light"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {selected.brand} —{" "}
                    <em style={{ color: GOLD }}>{selected.name}</em>
                  </h2>
                  {familiaDoSelecionado && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      Família olfativa:{" "}
                      <span style={{ color: GOLD }}>
                        {familiaDoSelecionado}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors border-b border-gray-200 pb-px"
                >
                  Mudar
                </button>
              </div>

              {similares.length === 0 ? (
                <div className="py-16 text-center">
                  <p
                    className="text-[24px] font-light text-gray-200 mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    Sem similares encontrados
                  </p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-gray-300">
                    Tente outro perfume
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-light text-gray-400 mb-6">
                    {similares.length} fragrâncias da família{" "}
                    <span style={{ color: GOLD }}>{familiaDoSelecionado}</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                    {similares.map((item, idx) => (
                      <Card
                        key={`${item.brand}-${item.name}-${idx}`}
                        item={item}
                        index={idx}
                        onClick={() => setSelectedPerfume(item)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {selectedPerfume && (
          <PerfumeModal
            item={selectedPerfume}
            onClose={() => setSelectedPerfume(null)}
          />
        )}
        <Footer />
      </div>
    </PageTransition>
  );
}
