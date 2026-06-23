import { useState } from "react";
import SEO from "../components/SEO";
import { usePerfumes, useFilteredPerfumes } from "../hooks/usePerfumes";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PerfumeGrid from "../components/PerfumeGrid";
import Footer from "../components/Footer";
import PerfumeModal from "../components/PerfumeModal";
import Features from "../components/Features";
import TagCloud from "../components/TagCloud";
import CardSkeleton from "../components/CardSkeleton";
import PageTransition from "../components/PageTransition";
import WeeklyFeature from "../components/WeeklyFeature";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [featuredPerfume, setFeaturedPerfume] = useState(null);
  const [search, setSearch] = useState("");

  const { masculinos, femininos, loading, error } = usePerfumes();

  const sections = useFilteredPerfumes(masculinos, femininos, {
    search,
    filter: activeFilter,
    limit: 4,
  });

  // Destaque inicial: primeiro masculino carregado
  const weeklyItem = featuredPerfume || masculinos[0] || null;

  // Desktop: atualiza WeeklyFeature | Mobile: abre modal
  const handleCardClick = (item) => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setSelectedPerfume(item);
    } else {
      setFeaturedPerfume(item);
      setTimeout(() => {
        const el = document.getElementById("weekly-feature");
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: "smooth" });
      }, 400);
    }
  };

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

        <div>
          {/* Barra de busca + filtros */}
          <div className="grid border-b border-gray-100 dark:border-gray-800 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-r border-gray-100 px-4 py-6 dark:border-gray-800 sm:px-6 lg:px-8">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <Filters onFilterChange={setActiveFilter} />
            </div>
          </div>

          {/* Skeleton loading */}
          {loading && (
            <div className="grid lg:grid-cols-2 border-b border-gray-100 dark:border-gray-800">
              {[0, 1].map((col) => (
                <div
                  key={col}
                  className={`px-4 py-8 sm:px-6 lg:px-8 ${col > 0 ? "border-t border-gray-100 dark:border-gray-800 lg:border-t-0 lg:border-l" : ""}`}
                >
                  <div className="h-7 w-56 bg-gray-100 rounded mb-6" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <CardSkeleton key={i} />
                    ))}
                  </div>
                </div>
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
            <>
              {/* Cards de destaque */}
              <PerfumeGrid
                sections={sections}
                onCardClick={handleCardClick}
                search={search}
              />

              {/* Destaque da semana — atualiza ao clicar no card (desktop) */}
              {weeklyItem && (
                <div id="weekly-feature">
                  <WeeklyFeature
                    item={weeklyItem}
                    onDetails={(item) => setSelectedPerfume(item)}
                  />
                </div>
              )}
            </>
          )}

          <div className="px-4 pt-8 sm:px-6 lg:px-8">
            <TagCloud />
            <Features />
          </div>
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
