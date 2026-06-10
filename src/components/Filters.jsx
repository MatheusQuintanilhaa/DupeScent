import { useState } from "react";

const GOLD = "#b8912a";

export default function Filters({ onFilterChange }) {
  const filters = [
    "Todos",
    "Masculinos",
    "Femininos",
    "Noite",
    "Dia",
    "Trabalho",
    "Encontro",
  ];

  const [active, setActive] = useState("Todos");

  const handleSelect = (f) => {
    setActive(f);
    onFilterChange?.(f);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => handleSelect(f)}
          className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border rounded-sm whitespace-nowrap transition-all duration-200"
          style={{
            borderColor: active === f ? GOLD : "#e5e7eb",
            color: active === f ? GOLD : "#9ca3af",
            background: active === f ? "rgba(184,145,42,0.05)" : "transparent",
          }}
          onMouseEnter={(e) => {
            if (active !== f) {
              e.currentTarget.style.borderColor = "#b8912a55";
              e.currentTarget.style.color = "#555";
            }
          }}
          onMouseLeave={(e) => {
            if (active !== f) {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#9ca3af";
            }
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
