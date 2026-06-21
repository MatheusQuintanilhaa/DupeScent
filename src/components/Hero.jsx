import { useNavigate } from "react-router-dom";
import { IconSparkles } from "@tabler/icons-react";

const GOLD = "#b8912a";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12 border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 dark:border-gray-800 dark:border-gray-800">
      <div className="max-w-full sm:max-w-xl">
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GOLD }}
          >
            Guia definitivo de dupes
          </span>
        </div>

        <h1
          className="text-[30px] sm:text-[40px] lg:text-[46px] font-light leading-[1.1] mb-4 tracking-tight text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          O luxo tem um
          <br />
          <em style={{ color: GOLD }}>substituto perfeito.</em>
        </h1>

        <p className="text-[13px] sm:text-sm font-light leading-[1.8] text-gray-500 mb-6 sm:mb-8 max-w-md">
          Encontre o dupe ideal para mais de 100 perfumes importados — com score
          de similaridade, pirâmide olfativa e filtros por ocasião.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] tracking-[0.18em] uppercase font-medium text-white transition-colors"
            style={{ background: GOLD }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a07c22")}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            onClick={() => navigate("/masculinos")}
          >
            <IconSparkles size={15} strokeWidth={1.6} aria-hidden="true" />
            Explorar dupes
          </button>

          <button
            className="px-7 py-3 text-[11px] tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Como funciona
          </button>
        </div>
      </div>
    </div>
  );
}
