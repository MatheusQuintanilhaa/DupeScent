import { useTheme } from "../context/ThemeContext";

const GOLD = "#b8912a";

export default function Stats() {
  const { dark } = useTheme();
  const borderColor = dark ? "#1f2937" : "#f3f4f6";

  const stats = [
    { n: "100+", l: "Originais" },
    { n: "300+", l: "Dupes avaliados" },
    { n: "9.3", l: "Score máximo" },
    { n: "15+", l: "Marcas dupe" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100 dark:border-gray-800">
      {stats.map((s, i) => (
        <div
          key={i}
          className="px-8 py-6"
          style={{
            borderRight: i === 3 ? "none" : `1px solid ${borderColor}`,
          }}
        >
          <div
            className="text-[32px] font-light leading-none"
            style={{
              color: GOLD,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {s.n}
          </div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mt-1">
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
