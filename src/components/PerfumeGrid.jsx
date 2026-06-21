import Card from "./Card";
import { useNavigate } from "react-router-dom";

const GOLD = "#b8912a";

function Separator({ label }) {
  return (
    <div className="flex items-center gap-3.5 mb-10">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

export default function PerfumeGrid({
  sections = [],
  onCardClick,
  search = "",
}) {
  const navigate = useNavigate();
  const hasResults = sections.some((s) => s.items.length > 0);

  return (
    <div>
      {!hasResults && (
        <div className="py-16 text-center">
          <p
            className="text-[28px] font-light text-gray-200 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Nenhum resultado
          </p>
          {search.trim() ? (
            <p className="text-[11px] tracking-[0.15em] uppercase text-gray-300 mb-4">
              Nenhum perfume encontrado para "{search}"
            </p>
          ) : (
            <p className="text-[11px] tracking-[0.15em] uppercase text-gray-300 mb-4">
              Tente outro filtro ou termo de busca
            </p>
          )}
          <button
            onClick={() => navigate("/masculinos")}
            className="text-[10px] tracking-[0.2em] uppercase border-b pb-px transition-colors"
            style={{ color: GOLD, borderColor: GOLD }}
          >
            Ver todos os masculinos ↗
          </button>
        </div>
      )}
      {sections.map((section, i) => (
        <div key={section.label}>
          {i > 0 && <Separator label={section.label} />}
          <div className="flex items-baseline justify-between mb-6">
            <h2
              className="text-[26px] font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Em destaque —{" "}
              <em style={{ color: GOLD }}>{section.label.toLowerCase()}</em>
            </h2>
            <button
              className="text-[10px] tracking-[0.2em] uppercase text-gray-500 border-b border-gray-300 pb-px hover:text-yellow-700 hover:border-yellow-700 transition-colors"
              onClick={() => navigate(`/${section.label.toLowerCase()}`)}
            >
              Ver todos ↗
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {section.items.map((item, idx) => (
              <Card
                key={item.name}
                item={item}
                index={idx}
                onClick={() => onCardClick?.(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
