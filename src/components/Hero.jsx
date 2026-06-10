const GOLD = "#b8912a";

export default function Hero() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12 border-b border-gray-100">
      <div className="max-w-full sm:max-w-xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GOLD }}
          >
            Guia definitivo de dupes
          </span>
        </div>

        {/* Título */}
        <h1
          className="text-[30px] sm:text-[40px] lg:text-[46px] font-light leading-[1.1] mb-4 tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          O luxo tem um
          <br />
          <em style={{ color: GOLD }}>substituto perfeito.</em>
        </h1>

        {/* Subtítulo */}
        <p className="text-[13px] sm:text-sm font-light leading-[1.8] text-gray-500 mb-6 sm:mb-8 max-w-md">
          Encontre o dupe ideal para mais de 100 perfumes importados — com score
          de similaridade, pirâmide olfativa e filtros por ocasião.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="px-6 py-3 text-[11px] tracking-[0.18em] uppercase font-medium text-white rounded-md transition-all duration-300"
            style={{ background: GOLD }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a07c22")}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Explorar dupes ↗
          </button>

          <button className="px-6 py-3 text-[11px] tracking-[0.18em] uppercase text-gray-500 border border-gray-200 rounded-md hover:border-gray-400 hover:text-gray-900 transition-all duration-300">
            Como funciona
          </button>
        </div>
      </div>
    </div>
  );
}
