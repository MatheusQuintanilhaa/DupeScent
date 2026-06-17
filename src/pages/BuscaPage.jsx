import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PerfumeModal from "../components/PerfumeModal";
import { usePerfumes } from "../hooks/usePerfumes";

const GOLD = "#b8912a";

const ocasiaoFilters = ["Todos", "Noite", "Dia", "Trabalho", "Encontro"];

function Section({ title, items, onCardClick }) {
  if (!items.length) return null;
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400">
          {title}
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <Card
            key={`${item.brand}-${item.name}`}
            item={item}
            onClick={() => onCardClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default function BuscaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const familiaParam = searchParams.get("familia") || "";
  const queryParam = searchParams.get("q") || "";

  const [search, setSearch] = useState(queryParam || familiaParam);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const { masculinos, femininos, loading, error } = usePerfumes();

  // atualiza a URL ao buscar
  useEffect(() => {
    if (search.trim()) {
      setSearchParams({ q: search });
    }
  }, [search]);

  const applyFilters = (items) => {
    return items.filter((item) => {
      const matchSearch =
        search.trim() === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase()) ||
        item.notes?.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        activeFilter === "Todos" || item.tags.includes(activeFilter);

      return matchSearch && matchFilter;
    });
  };

  const mascFiltrados = applyFilters(masculinos);
  const femFiltrados = applyFilters(femininos);
  const total = mascFiltrados.length + femFiltrados.length;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Header */}
      <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GOLD }}
          >
            {familiaParam ? `Família — ${familiaParam}` : "Resultados da busca"}
          </span>
        </div>
        <h1
          className="text-[32px] sm:text-[42px] font-light leading-[1.1] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {familiaParam ? (
            <>
              Fragrâncias{" "}
              <em style={{ color: GOLD }}>{familiaParam.toLowerCase()}</em>
            </>
          ) : (
            <>
              Busca por <em style={{ color: GOLD }}>"{search}"</em>
            </>
          )}
        </h1>
        <p className="text-sm font-light text-gray-400">
          {loading ? "Carregando..." : `${total} fragrâncias encontradas`}
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <SearchBar value={search} onChange={setSearch} />

        <Filters filters={ocasiaoFilters} onFilterChange={setActiveFilter} />

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

        {!loading && !error && total === 0 && (
          <div className="py-20 text-center">
            <p
              className="text-[28px] font-light text-gray-200 mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Nenhum resultado
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-300">
              Tente outro nome ou família olfativa
            </p>
          </div>
        )}

        {!loading && !error && total > 0 && (
          <>
            <Section
              title="Masculinos"
              items={mascFiltrados}
              onCardClick={setSelectedPerfume}
            />
            <Section
              title="Femininos"
              items={femFiltrados}
              onCardClick={setSelectedPerfume}
            />
          </>
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
