const GOLD = "#b8912a";

export default function Stats() {
  const stats = [
    { n: "100+", l: "Originais" },
    { n: "300+", l: "Dupes avaliados" },
    { n: "9.3", l: "Score máximo" },
    { n: "15+", l: "Marcas dupe" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`px-8 py-6 ${i < 3 ? "border-r border-gray-100" : ""}`}
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
