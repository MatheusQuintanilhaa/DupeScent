import { useTheme } from "../context/ThemeContext";

const GOLD = "#b8912a";

const options = [
  { value: "score", label: "Maior score" },
  { value: "score_asc", label: "Menor score" },
  { value: "preco_asc", label: "Menor preço" },
  { value: "preco_desc", label: "Maior preço" },
  { value: "nome", label: "Nome A–Z" },
  { value: "marca", label: "Marca A–Z" },
];

export default function SortSelect({ value, onChange }) {
  const { dark } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] tracking-[0.15em] uppercase text-gray-400 shrink-0">
        Ordenar
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-[10px] tracking-[0.1em] uppercase bg-transparent border-b outline-none cursor-pointer transition-colors"
        style={{
          borderColor: dark ? "#2a2a2a" : "#e5e7eb",
          color: dark ? "#9ca3af" : "#6b7280",
        }}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{
              background: dark ? "#1a1a1a" : "#ffffff",
              color: dark ? "#f5f5f5" : "#1a1a1a",
            }}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
