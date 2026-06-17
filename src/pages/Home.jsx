import { useState } from "react";
import { usePerfumes, useFilteredPerfumes } from "../hooks/usePerfumes";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PerfumeGrid from "../components/PerfumeGrid";
import Footer from "../components/Footer";
import PerfumeModal from "../components/PerfumeModal";
import Features from "../components/Features";
import TagCloud from "../components/TagCloud";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [search, setSearch] = useState("");

  const { masculinos, femininos, loading, error } = usePerfumes();

  const sections = useFilteredPerfumes(masculinos, femininos, {
    search,
    filter: activeFilter,
    limit: 6,
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Stats />

      <div className="px-4 sm:px-6 lg:px-8 pt-10">
        <SearchBar value={search} onChange={setSearch} />

        <Filters onFilterChange={setActiveFilter} />

        {loading && (
          <div className="flex items-center gap-3 py-20 justify-center">
            <div className="w-4 h-4 border border-gray-200 border-t-yellow-600 rounded-full animate-spin" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
              Carregando fragrâncias...
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
          <PerfumeGrid
            sections={sections}
            onCardClick={(item) => setSelectedPerfume(item)}
          />
        )}

        <Features />

        <TagCloud />
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
