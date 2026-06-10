import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PerfumeGrid from "../components/PerfumeGrid";
import Footer from "../components/Footer";
import PerfumeModal from "../components/PerfumeModal";

const sections = [
  {
    label: "Masculinos",
    items: [
      {
        brand: "Creed",
        name: "Aventus",
        tags: ["Noite", "Versátil"],
        notes: "Abacaxi · Amadeirado · Almíscar",
        score: "9.2",
        dupe: "Club de Nuit — Armaf",
      },
      {
        brand: "Dior",
        name: "Sauvage Elixir",
        tags: ["Noite", "Frio"],
        notes: "Ambroxan · Especiado · Âmbar",
        score: "9.0",
        dupe: "Asad — Lattafa",
      },
      {
        brand: "MFK",
        name: "Baccarat Rouge 540",
        tags: ["Noite", "Versátil"],
        notes: "Âmbar · Jasmim · Cedro",
        score: "9.2",
        dupe: "Amber Oud Rouge — Al Haramain",
      },
      {
        brand: "Parfums de Marly",
        name: "Layton",
        tags: ["Noite", "Frio"],
        notes: "Baunilha · Maçã · Patchouli",
        score: "9.1",
        dupe: "Detour Noir — Al Haramain",
      },
    ],
  },
  {
    label: "Femininos",
    items: [
      {
        brand: "Maison Francis Kurkdjian",
        name: "Baccarat Rouge 540 Extrait",
        tags: ["Noite", "Versátil"],
        notes: "Âmbar · Safran · Jasmim",
        score: "9.3",
        dupe: "Amber Oud Rouge — Al Haramain",
      },
      {
        brand: "Yves Saint Laurent",
        name: "Libre EDP",
        tags: ["Noite", "Versátil"],
        notes: "Baunilha · Lavanda · Floral",
        score: "9.0",
        dupe: "Tharwah Gold — Lattafa",
      },
      {
        brand: "Kilian",
        name: "Angels Share",
        tags: ["Noite", "Frio"],
        notes: "Conhaque · Baunilha · Canela",
        score: "9.2",
        dupe: "Sharaf Blend — Zimaya",
      },
      {
        brand: "Carolina Herrera",
        name: "Good Girl",
        tags: ["Noite", "Frio"],
        notes: "Doce · Tuberosa · Tonka",
        score: "9.0",
        dupe: "Very Velvet Rouge — Maison Alhambra",
      },
    ],
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [search, setSearch] = useState("");

  // 🔥 FILTRO FUNCIONANDO
  const filteredSections = sections.map((section) => {
    let filteredItems = section.items;

    // filtro por tipo
    if (activeFilter === "Masculinos") {
      if (section.label !== "Masculinos") return { ...section, items: [] };
    }

    if (activeFilter === "Femininos") {
      if (section.label !== "Femininos") return { ...section, items: [] };
    }

    // filtro por tags
    if (!["Todos", "Masculinos", "Femininos"].includes(activeFilter)) {
      filteredItems = filteredItems.filter((item) =>
        item.tags.includes(activeFilter),
      );
    }

    // 🔥 BUSCA POR NOME
    if (search.trim() !== "") {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return {
      ...section,
      items: filteredItems,
    };
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Stats />

      {/* 🔥 CONTAINER PROFISSIONAL */}
      <div className="px-4 sm:px-6 lg:px-8 pt-10">
        <SearchBar value={search} onChange={setSearch} />

        {/* 🔥 FILTROS FUNCIONANDO */}
        <Filters onFilterChange={setActiveFilter} />

        {/* 🔥 GRID DINÂMICO */}
        <PerfumeGrid
          sections={filteredSections}
          onCardClick={(item) => setSelectedPerfume(item)}
        />
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
