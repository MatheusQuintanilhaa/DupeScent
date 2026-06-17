const GOLD = "#b8912a";

export default function Card({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-gray-50 border border-gray-100 p-6 cursor-pointer transition-all duration-200 min-h-[220px] flex flex-col justify-between hover:-translate-y-0.5"
    >
      {/* Linha dourada */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-transparent group-hover:bg-[#b8912a] transition-colors duration-200" />

      <div>
        {/* Marca */}
        <p className="text-[9px] tracking-[0.28em] uppercase text-gray-400 mb-1.5">
          {item.brand}
        </p>

        {/* Nome */}
        <p
          className="text-[17px] font-light mb-2.5 leading-tight transition-colors duration-200 group-hover:text-[#b8912a]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {item.name}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 border border-gray-200 text-gray-400"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Notas */}
        <p className="text-[11px] italic text-gray-400 leading-snug">
          {item.notes}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-baseline gap-2 pt-3 mt-3 border-t border-gray-100">
        <span
          className="text-[22px] font-light leading-none"
          style={{
            color: GOLD,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {item.score}
        </span>
        <span className="text-[11px] text-gray-400 ml-auto text-right leading-snug">
          {item.dupe}
        </span>
      </div>
    </div>
  );
}
