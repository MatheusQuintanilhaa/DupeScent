import { useState } from "react";
import SEO from "../components/SEO";
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
import CardSkeleton from "../components/CardSkeleton";
import PageTransition from "../components/PageTransition";

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
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
        <SEO
          title="Início"
          description="Encontre o dupe ideal para mais de 100 perfumes importados — com score de similaridade, pirâmide olfativa e preços médios de mercado."
          path="/"
        />
        <Navbar />
        <Hero />
        <Stats />

        <div className="px-4 sm:px-6 lg:px-8 pt-10">
          <SearchBar value={search} onChange={setSearch} />
          <Filters onFilterChange={setActiveFilter} />

          {loading && (
            <>
              <div className="flex items-baseline justify-between mb-6">
                <div className="h-7 w-56 bg-gray-100 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </>
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
              search={search}
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
    </PageTransition>
  );
}
