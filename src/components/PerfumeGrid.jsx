import { useNavigate } from "react-router-dom";
import Card from "./Card";

const GOLD = "#b8912a";

export default function PerfumeGrid({
  sections = [],
  onCardClick,
  search = "",
}) {
  const navigate = useNavigate();
  const hasResults = sections.some((section) => section.items.length > 0);

  return (
    <div>
      {!hasResults && (
        <div className="py-16 text-center">
          <p
            className="mb-2 text-[28px] font-light text-gray-200"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Nenhum resultado
          </p>
          <p className="mb-4 text-[11px] uppercase tracking-[0.15em] text-gray-300">
            {search.trim()
              ? `Nenhum perfume encontrado para "${search}"`
              : "Tente outro filtro ou termo de busca"}
          </p>
          <button
            onClick={() => navigate("/masculinos")}
            className="border-b pb-px text-[10px] uppercase tracking-[0.2em] transition-colors"
            style={{ color: GOLD, borderColor: GOLD }}
          >
            Ver todos os masculinos
          </button>
        </div>
      )}

      {hasResults && (
        <div className="border-b border-gray-100 dark:border-gray-800">
          {sections.length >= 2 ? (
            /* Layout lado a lado: cada seção ocupa metade, 4 cards em 1 linha */
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-800">
              {sections.map((section) => (
                <div key={section.label} className="px-4 py-8 sm:px-6 lg:px-8">
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2
                      className="text-[26px] font-light"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      Em destaque{" "}
                      <em style={{ color: GOLD }}>
                        {section.label.toLowerCase()}
                      </em>
                    </h2>
                    <button
                      className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-yellow-700"
                      onClick={() =>
                        navigate(`/${section.label.toLowerCase()}`)
                      }
                    >
                      Ver todos →
                    </button>
                  </div>
                  {/* 4 cards em linha única */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch">
                    {section.items.slice(0, 4).map((item, index) => (
                      <Card
                        key={item.name}
                        item={item}
                        index={index}
                        rank={index + 1}
                        onClick={() => onCardClick?.(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Layout full width: 1 seção, 4 cards em linha */
            <div className="px-4 py-8 sm:px-6 lg:px-8">
              {sections.map((section) => (
                <div key={section.label}>
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2
                      className="text-[26px] font-light"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      Em destaque{" "}
                      <em style={{ color: GOLD }}>
                        {section.label.toLowerCase()}
                      </em>
                    </h2>
                    <button
                      className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-yellow-700"
                      onClick={() =>
                        navigate(`/${section.label.toLowerCase()}`)
                      }
                    >
                      Ver todos →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch">
                    {section.items.slice(0, 4).map((item, index) => (
                      <Card
                        key={item.name}
                        item={item}
                        index={index}
                        rank={index + 1}
                        onClick={() => onCardClick?.(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
