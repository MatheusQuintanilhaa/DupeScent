import Card from "./Card";

const GOLD = "#b8912a";

function Separator({ label }) {
  return (
    <div className="flex items-center gap-3.5 mb-10">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[9px] tracking-[0.3em] uppercase text-gray-300">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

export default function PerfumeGrid({ sections = [], onCardClick }) {
  const hasResults = sections.some((s) => s.items.length > 0);
  return (
    <div>
      {!hasResults && (
        <p className="text-gray-400 text-sm">Nenhum perfume encontrado.</p>
      )}
      {sections.map((section, i) => (
        <div key={section.label}>
          {/* Separador */}
          {i > 0 && <Separator label={section.label} />}

          {/* Header */}
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[26px] font-light tracking-wide font-serif">
              Em destaque —{" "}
              <em style={{ color: GOLD }}>{section.label.toLowerCase()}</em>
            </h2>

            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 cursor-pointer border-b border-gray-200 pb-px hover:text-yellow-700 hover:border-yellow-700 transition-colors">
              Ver todos ↗
            </span>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {/* GARANTE 6 CARDS */}
            {[...section.items, ...section.items]
              .slice(0, 6)
              .map((item, index) => (
                <Card
                  key={index}
                  item={item}
                  onClick={() => onCardClick?.(item)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
