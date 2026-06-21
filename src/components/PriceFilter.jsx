import { useTheme } from "../context/ThemeContext";

const GOLD = "#b8912a";

export const precoFilters = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "Até R$ 150", min: 0, max: 150 },
  { label: "R$ 150–220", min: 150, max: 220 },
  { label: "R$ 220+", min: 220, max: Infinity },
];

export const precoMedioDupe = {
  Armaf: 320,
  "Al Haramain": 250,
  Lattafa: 260,
  "Maison Alhambra": 200,
  "Fragrance World": 180,
  "Paris Corner": 170,
  Afnan: 190,
  Zimaya: 200,
  Rasasi: 260,
  Ajmal: 230,
  "Ard Al Zaafaran": 180,
  Dossier: 130,
  Zara: 100,
  "Franck Olivier": 160,
};

export function getPreco(brand) {
  if (!brand) return 160;
  for (const [key, value] of Object.entries(precoMedioDupe)) {
    if (brand?.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return 160;
}

export default function PriceFilter({ active, onChange }) {
  const { dark } = useTheme();
  const borderInactive = dark ? "#2a2a2a" : "#e5e7eb";
  const colorInactive = dark ? "#6b7280" : "#6b7280";

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide items-center">
      {precoFilters.map((f, i) => (
        <button
          key={f.label}
          onClick={() => onChange(i)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border whitespace-nowrap transition-colors"
          style={{
            borderColor: active === i ? GOLD : borderInactive,
            color: active === i ? GOLD : colorInactive,
            background: active === i ? "rgba(184,145,42,0.05)" : "transparent",
          }}
          onMouseEnter={(e) => {
            if (active !== i) {
              e.currentTarget.style.borderColor = "#b8912a55";
              e.currentTarget.style.color = dark ? "#d1d5db" : "#374151";
            }
          }}
          onMouseLeave={(e) => {
            if (active !== i) {
              e.currentTarget.style.borderColor = borderInactive;
              e.currentTarget.style.color = colorInactive;
            }
          }}
        >
          {f.label}
        </button>
      ))}
      <span className="text-[9px] tracking-[0.1em] uppercase text-gray-400 shrink-0 ml-2">
        Preço do dupe
      </span>
    </div>
  );
}
