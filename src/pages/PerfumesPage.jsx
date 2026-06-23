import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PerfumeModal from "../components/PerfumeModal";
import CardSkeleton from "../components/CardSkeleton";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import PriceFilter, { precoFilters, getPreco } from "../components/PriceFilter";
import SortSelect from "../components/SortSelect";
import { usePerfumes } from "../hooks/usePerfumes";
import { useSorted } from "../hooks/useSort";

const GOLD = "#b8912a";
const ocasiaoFilters = ["Todos", "Noite", "Dia", "Trabalho", "Encontro"];

export default function PerfumesPage({ genero }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeClima, setActiveClima] = useState(null);
  const [activePreco, setActivePreco] = useState(0);
  const [sortKey, setSortKey] = useState("score");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const { masculinos, femininos, loading, error } = usePerfumes();

  const allItems = genero === "Masculinos" ? masculinos : femininos;

  const filtered = allItems.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      search.trim() === "" ||
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.notes?.toLowerCase().includes(q);
    const matchFilter =
      activeFilter === "Todos" || item.tags.includes(activeFilter);
    const matchClima = !activeClima || item.tags.includes(activeClima);
    const { min, max } = precoFilters[activePreco];
    const bestDupeBrand =
      item.allDupes?.[0]?.brand || item.dupe?.split(" — ")[1] || "";
    const matchPreco =
      getPreco(bestDupeBrand) >= min && getPreco(bestDupeBrand) <= max;
    return matchSearch && matchFilter && matchClima && matchPreco;
  });

  const sorted = useSorted(filtered, sortKey);

  const path = genero === "Masculinos" ? "/masculinos" : "/femininos";
  const desc =
    genero === "Masculinos"
      ? "Explore dupes de perfumes masculinos com score de similaridade, pirâmide olfativa e preços médios de mercado."
      : "Explore dupes de perfumes femininos com score de similaridade, pirâmide olfativa e preços médios de mercado.";

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
        <SEO title={genero} description={desc} path={path} />
        <Navbar />

        <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: GOLD }}
            >
              Coleção completa
            </span>
          </div>
          <h1
            className="text-[36px] sm:text-[46px] font-light leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Perfumes <em style={{ color: GOLD }}>{genero.toLowerCase()}</em>
          </h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm font-light text-gray-400">
              {loading
                ? "Carregando..."
                : `${sorted.length} fragrâncias encontradas`}
            </p>
            {!loading && <SortSelect value={sortKey} onChange={setSortKey} />}
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pt-8">
          <SearchBar value={search} onChange={setSearch} />
          <Filters
            filters={ocasiaoFilters}
            onFilterChange={setActiveFilter}
            onClimaChange={setActiveClima}
          />
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

          {!loading && !error && sorted.length === 0 && (
            <div className="py-20 text-center">
              <p
                className="text-[28px] font-light text-gray-200 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Nenhum resultado
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gray-300">
                Tente outro nome, marca ou ajuste os filtros
              </p>
            </div>
          )}

          {!loading && !error && sorted.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {sorted.map((item, idx) => (
                <Card
                  key={`${item.brand}-${item.name}-${idx}`}
                  item={item}
                  index={idx}
                  onClick={() => setSelectedPerfume(item)}
                />
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
