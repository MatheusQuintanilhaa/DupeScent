export default function Card({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-gray-50 border border-gray-100 p-6 cursor-pointer transition-all duration-300 min-h-[220px] flex flex-col justify-between hover:-translate-y-1"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-300 group-hover:shadow-[0_6px_25px_rgba(184,145,42,0.15)]" />

      {/* Linha dourada */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-transparent group-hover:bg-[#b8912a] transition-all duration-300" />

      {/* Marca */}
      <p className="text-[9px] tracking-[0.28em] uppercase text-gray-400 mb-1.5">
        {item.brand}
      </p>

      {/* Nome */}
      <p className="text-[16px] sm:text-[18px] lg:text-[19px] font-light mb-2.5 leading-tight transition-colors duration-300 group-hover:text-[#b8912a] font-serif">
        {item.name}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {item.tags.map((t) => (
          <span
            key={t}
            className="text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-gray-200 text-gray-400 rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Notas */}
      <p className="text-[11px] italic text-gray-400 mb-3.5 leading-snug">
        {item.notes}
      </p>

      {/* Footer */}
      <div className="flex items-baseline gap-2 pt-3 border-t border-gray-100">
        <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-light tracking-wide text-[#b8912a] font-serif">
          {item.score}
        </span>

        <span className="text-[11px] text-gray-400 ml-auto text-right leading-snug">
          {item.dupe}
        </span>
      </div>
    </div>
  );
}
