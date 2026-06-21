import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#b8912a";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
        <p
          className="text-[120px] sm:text-[160px] font-light leading-none mb-4"
          style={{
            color: "rgba(184,145,42,0.12)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          404
        </p>

        <div className="flex items-center gap-3 mb-6 -mt-6">
          <div className="w-8 h-px" style={{ background: GOLD }} />
          <span
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GOLD }}
          >
            Página não encontrada
          </span>
          <div className="w-8 h-px" style={{ background: GOLD }} />
        </div>

        <h1
          className="text-[28px] sm:text-[36px] font-light mb-4 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Esta fragrância
          <br />
          <em style={{ color: GOLD }}>não existe no catálogo.</em>
        </h1>

        <p className="text-sm font-light text-gray-400 max-w-xs mb-10 leading-relaxed">
          A página que você procura não foi encontrada. Explore nosso catálogo
          de dupes e encontre o perfume certo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-7 py-3 text-[11px] tracking-[0.18em] uppercase font-medium text-white transition-colors"
            style={{ background: GOLD }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a07c22")}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Ir para a home
          </button>
          <button
            onClick={() => navigate("/masculinos")}
            className="px-7 py-3 text-[11px] tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Explorar dupes
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
