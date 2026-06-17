import { useState } from "react";
import {
  IconGridDots,
  IconGenderMale,
  IconGenderFemale,
  IconMoon,
  IconSun,
  IconBriefcase,
  IconHeart,
} from "@tabler/icons-react";

const GOLD = "#b8912a";

const iconMap = {
  Todos: IconGridDots,
  Masculinos: IconGenderMale,
  Femininos: IconGenderFemale,
  Noite: IconMoon,
  Dia: IconSun,
  Trabalho: IconBriefcase,
  Encontro: IconHeart,
};

const defaultFilters = [
  "Todos",
  "Masculinos",
  "Femininos",
  "Noite",
  "Dia",
  "Trabalho",
  "Encontro",
];

export default function Filters({ onFilterChange, filters = defaultFilters }) {
  const [active, setActive] = useState("Todos");

  const handleSelect = (f) => {
    setActive(f);
    onFilterChange?.(f);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
      {filters.map((f) => {
        const Icon = iconMap[f];
        return (
          <button
            key={f}
            onClick={() => handleSelect(f)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border whitespace-nowrap transition-colors"
            style={{
              borderColor: active === f ? GOLD : "#e5e7eb",
              color: active === f ? GOLD : "#6b7280",
              background:
                active === f ? "rgba(184,145,42,0.05)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (active !== f) {
                e.currentTarget.style.borderColor = "#b8912a55";
                e.currentTarget.style.color = "#374151";
              }
            }}
            onMouseLeave={(e) => {
              if (active !== f) {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.color = "##6b7280";
              }
            }}
          >
            {Icon && <Icon size={13} strokeWidth={1.5} aria-hidden="true" />}
            {f}
          </button>
        );
      })}
    </div>
  );
}
