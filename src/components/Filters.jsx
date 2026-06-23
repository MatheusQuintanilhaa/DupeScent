import { useState } from "react";
import {
  IconBriefcase,
  IconChevronDown,
  IconFlame,
  IconGenderFemale,
  IconGenderMale,
  IconGridDots,
  IconHeart,
  IconMoon,
  IconSnowflake,
  IconSun,
  IconWind,
} from "@tabler/icons-react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#b8912a";

const filters = [
  ["Todos", IconGridDots],
  ["Masculinos", IconGenderMale],
  ["Femininos", IconGenderFemale],
  ["Noite", IconMoon],
  ["Dia", IconSun],
  ["Trabalho", IconBriefcase],
  ["Encontro", IconHeart],
];

const climateFilters = [
  ["Frio", IconSnowflake],
  ["Quente", IconFlame],
  ["Versátil", IconWind],
];

export default function Filters({ onFilterChange, onClimaChange }) {
  const [active, setActive] = useState("Todos");
  const [activeClimate, setActiveClimate] = useState(null);
  const { dark } = useTheme();

  const inactiveBorder = dark ? "#2a2a2a" : "#e5e7eb";
  const inactiveColor = dark ? "#9ca3af" : "#6b7280";

  const selectFilter = (filter) => {
    setActive(filter);
    onFilterChange?.(filter);
  };

  const selectClimate = (filter) => {
    const next = activeClimate === filter ? null : filter;
    setActiveClimate(next);
    onClimaChange?.(next);
  };

  const buttonStyle = (isActive) => ({
    borderColor: isActive ? GOLD : inactiveBorder,
    color: isActive ? GOLD : inactiveColor,
    background: isActive ? "rgba(184,145,42,0.05)" : "transparent",
  });

  return (
    <div>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(([label, Icon]) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => selectFilter(label)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap border px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-colors"
              style={buttonStyle(isActive)}
            >
              <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {climateFilters.map(([label, Icon]) => {
          const isActive = activeClimate === label;
          return (
            <button
              key={label}
              onClick={() => selectClimate(label)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap border px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-colors"
              style={buttonStyle(isActive)}
            >
              <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
              {label}
            </button>
          );
        })}
        <button
          className="inline-flex items-center gap-1.5 whitespace-nowrap border px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-gray-500"
          style={{ borderColor: inactiveBorder }}
        >
          Mais filtros
          <IconChevronDown size={13} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
