import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import PerfumeModal from "../components/PerfumeModal";
import SEO from "../components/SEO";
import { usePerfumes } from "../hooks/usePerfumes";

const GOLD = "#b8912a";
const genderFilters = ["Todos", "Masculinos", "Femininos"];

export default function RankingPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const { masculinos, femininos, loading, error } = usePerfumes();

  let pool = [];
  if (activeFilter === "Masculinos") pool = masculinos;
  else if (activeFilter === "Femininos") pool = femininos;
  else pool = [...masculinos, ...femininos];

  const ranked = [...pool]
    .filter((item) => item.score && item.score !== "—")
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO
        title="Ranking"
        description="Os melhores dupes de perfume ordenados por score de similaridade — descubra as combinações mais fiéis ao original."
        path="/ranking"
      />
      <Navbar />

      <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100">
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
          As combinações original → dupe com maior score de fidelidade olfativa.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-2 mb-10">
          {genderFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors"
              style={{
                borderColor: activeFilter === f ? GOLD : "#e5e7eb",
                color: activeFilter === f ? GOLD : "#6b7280",
                background:
                  activeFilter === f ? "rgba(184,145,42,0.05)" : "transparent",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center gap-3 py-20 justify-center">
            <div className="w-4 h-4 border border-gray-200 border-t-yellow-600 rounded-full animate-spin" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
              Carregando ranking...
            </span>
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
            {ranked.map((item, index) => (
              <div key={`${item.brand}-${item.name}`} className="relative">
                <div
                  className="absolute -left-2 -top-2 z-10 w-7 h-7 flex items-center justify-center text-[11px] font-medium"
                  style={{
                    background: index < 3 ? GOLD : "#f3f4f6",
                    color: index < 3 ? "#fff" : "#9ca3af",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {index + 1}
                </div>
                <Card item={item} onClick={() => setSelectedPerfume(item)} />
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
  );
}
