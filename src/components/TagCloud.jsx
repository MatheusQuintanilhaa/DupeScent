import { useNavigate } from "react-router-dom";
import {
  IconBottle,
  IconDroplet,
  IconFlame,
  IconFlower,
  IconLeaf,
  IconMist,
  IconRipple,
  IconSparkles,
} from "@tabler/icons-react";

const GOLD = "#b8912a";

const families = [
  { label: "Amadeirado", query: "Amadeirado", Icon: IconLeaf },
  { label: "Cítrico", query: "Cítrico", Icon: IconSparkles },
  { label: "Doce", query: "Doce", Icon: IconBottle },
  { label: "Aquático", query: "Aquático", Icon: IconRipple },
  { label: "Especiado", query: "Especiado", Icon: IconFlame },
  { label: "Âmbar", query: "Âmbar", Icon: IconDroplet },
  { label: "Floral", query: "Floral", Icon: IconFlower },
  { label: "Fresco", query: "Fresco", Icon: IconMist },
];

export default function TagCloud() {
  const navigate = useNavigate();

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2
          className="text-[26px] font-light text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Explorar por <em style={{ color: GOLD }}>família olfativa</em>
        </h2>
        <button
          className="text-[10px] uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-yellow-700"
          onClick={() => navigate("/busca")}
        >
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {families.map(({ label, query, Icon }) => (
          <button
            key={label}
            onClick={() => navigate(`/busca?familia=${encodeURIComponent(query)}`)}
            className="flex items-center gap-3 border border-gray-100 px-5 py-4 text-left text-[13px] text-gray-600 transition-colors hover:border-yellow-700 hover:text-yellow-700 dark:border-gray-800 dark:text-gray-300"
          >
            <Icon size={16} strokeWidth={1.4} style={{ color: GOLD }} />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
