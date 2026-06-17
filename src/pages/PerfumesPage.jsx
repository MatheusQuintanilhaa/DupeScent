// pages/PerfumesPage.jsx
// Página reutilizável para Masculinos e Femininos

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PerfumeModal from "../components/PerfumeModal";
import { usePerfumes } from "../hooks/usePerfumes";

const GOLD = "#b8912a";

const ocasiaoFilters = ["Todos", "Noite", "Dia", "Trabalho", "Encontro"];

export default function PerfumesPage({ genero }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const { masculinos, femininos, loading, error } = usePerfumes();

  const allItems = genero === "Masculinos" ? masculinos : femininos;

  const filtered = allItems.filter((item) => {
    const matchSearch =
      search.trim() === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "Todos" || item.tags.includes(activeFilter);

    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Header da página */}
      <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100">
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
        <p className="text-sm font-light text-gray-400 mt-2">
          {filtered.length} fragrâncias encontradas
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <SearchBar value={search} onChange={setSearch} onSearch={() => {}} />

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

        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-300">
              Nenhum perfume encontrado
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {filtered.map((item) => (
              <Card
                key={item.name}
                item={item}
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
  );
}
