import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import PerfumeModal from "../components/PerfumeModal";
import CardSkeleton from "../components/CardSkeleton";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import PriceFilter, { precoFilters, getPreco } from "../components/PriceFilter";
import { useTheme } from "../context/ThemeContext";
import { usePerfumes } from "../hooks/usePerfumes";

const GOLD = "#b8912a";
const genderFilters = ["Todos", "Masculinos", "Femininos"];

export default function RankingPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activePreco, setActivePreco] = useState(0);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const { masculinos, femininos, loading, error } = usePerfumes();
  const { dark } = useTheme();

  let pool = [];
  if (activeFilter === "Masculinos") pool = masculinos;
  else if (activeFilter === "Femininos") pool = femininos;
  else pool = [...masculinos, ...femininos];

  const ranked = [...pool]
    .filter((item) => {
      if (!item.score || item.score === "—") return false;
      const { min, max } = precoFilters[activePreco];
      const bestDupeBrand =
        item.allDupes?.[0]?.brand || item.dupe?.split(" — ")[1] || "";
      return getPreco(bestDupeBrand) >= min && getPreco(bestDupeBrand) <= max;
    })
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
        <SEO
          title="Ranking"
          description="Os melhores dupes de perfume ordenados por score de similaridade."
          path="/ranking"
        />
        <Navbar />

        <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: GOLD }}
            >
              Os melhores da casa
            </span>
          </div>
          <h1
            className="text-[32px] sm:text-[42px] font-light leading-[1.1] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Ranking de <em style={{ color: GOLD }}>similaridade</em>
          </h1>
          <p className="text-sm font-light text-gray-400 max-w-md">
            As combinações original → dupe com maior score de fidelidade
            olfativa.
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex gap-2 mb-6">
            {genderFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors"
                style={{
                  borderColor:
                    activeFilter === f ? GOLD : dark ? "#2a2a2a" : "#e5e7eb",
                  color: activeFilter === f ? GOLD : "#6b7280",
                  background:
                    activeFilter === f
                      ? "rgba(184,145,42,0.05)"
                      : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <PriceFilter active={activePreco} onChange={setActivePreco} />

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {Array.from({ length: 9 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="py-10 text-center">
              <p className="text-[11px] tracking-[0.2em] uppercase text-red-400">
                Erro ao carregar dados — {error}
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {ranked.map((item, idx) => (
                <div
                  key={`${item.brand}-${item.name}-${idx}`}
                  className="relative"
                >
                  <div
                    className="absolute -left-2 -top-2 z-10 w-7 h-7 flex items-center justify-center text-[11px] font-medium"
                    style={{
                      background: idx < 3 ? GOLD : dark ? "#2a2a2a" : "#e5e7eb",
                      color: idx < 3 ? "#fff" : "#9ca3af",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <Card
                    item={item}
                    index={idx}
                    onClick={() => setSelectedPerfume(item)}
                  />
                </div>
              ))}
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
