import { useState } from "react";
import {
  IconGridDots,
  IconGenderMale,
  IconGenderFemale,
  IconMoon,
  IconSun,
  IconBriefcase,
  IconHeart,
  IconSnowflake,
  IconFlame,
  IconWind,
} from "@tabler/icons-react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#b8912a";

const iconMap = {
  Todos: IconGridDots,
  Masculinos: IconGenderMale,
  Femininos: IconGenderFemale,
  Noite: IconMoon,
  Dia: IconSun,
  Trabalho: IconBriefcase,
  Encontro: IconHeart,
  Frio: IconSnowflake,
  Quente: IconFlame,
  Versátil: IconWind,
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

const climaFilters = ["Frio", "Quente", "Versátil"];

export default function Filters({
  onFilterChange,
  onClimaChange,
  filters = defaultFilters,
  showClima = false,
}) {
  const [active, setActive] = useState("Todos");
  const [activeClima, setActiveClima] = useState(null);
  const { dark } = useTheme();

  const borderInactive = dark ? "#2a2a2a" : "#e5e7eb";
  const colorInactive = dark ? "#6b7280" : "#6b7280";
  const colorHover = dark ? "#d1d5db" : "#374151";

  const handleSelect = (f) => {
    setActive(f);
    onFilterChange?.(f);
  };

  const handleClima = (f) => {
    const next = activeClima === f ? null : f;
    setActiveClima(next);
    onClimaChange?.(next);
  };

  return (
    <div>
      {/* Filtro de ocasião */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {filters.map((f) => {
          const Icon = iconMap[f];
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => handleSelect(f)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border whitespace-nowrap transition-colors"
              style={{
                borderColor: isActive ? GOLD : borderInactive,
                color: isActive ? GOLD : colorInactive,
                background: isActive ? "rgba(184,145,42,0.05)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "#b8912a55";
                  e.currentTarget.style.color = colorHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = borderInactive;
                  e.currentTarget.style.color = colorInactive;
                }
              }}
            >
              {Icon && <Icon size={13} strokeWidth={1.5} aria-hidden="true" />}
              {f}
            </button>
          );
        })}
      </div>

      {/* Filtro de clima */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
        {climaFilters.map((f) => {
          const Icon = iconMap[f];
          const isActive = activeClima === f;
          return (
            <button
              key={f}
              onClick={() => handleClima(f)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border whitespace-nowrap transition-colors"
              style={{
                borderColor: isActive ? GOLD : borderInactive,
                color: isActive ? GOLD : colorInactive,
                background: isActive ? "rgba(184,145,42,0.05)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "#b8912a55";
                  e.currentTarget.style.color = colorHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = borderInactive;
                  e.currentTarget.style.color = colorInactive;
                }
              }}
            >
              {Icon && <Icon size={13} strokeWidth={1.5} aria-hidden="true" />}
              {f}
            </button>
          );
        })}
        <span className="text-[9px] tracking-[0.1em] uppercase text-gray-400 self-center ml-2">
          Clima
        </span>
      </div>
    </div>
  );
}
