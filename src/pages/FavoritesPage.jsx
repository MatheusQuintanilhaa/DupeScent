import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import PerfumeModal from "../components/PerfumeModal";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import { useFavorites } from "../context/FavoritesContext";

const GOLD = "#b8912a";

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
        <SEO
          title="Favoritos"
          description="Seus perfumes favoritos salvos no DupeScent."
          path="/favoritos"
        />
        <Navbar />

        <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 dark:border-gray-800">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: GOLD }}
            >
              Minha coleção
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h1
                className="text-[32px] sm:text-[42px] font-light leading-[1.1] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Perfumes <em style={{ color: GOLD }}>favoritos</em>
              </h1>
              <p className="text-sm font-light text-gray-400">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "fragrância salva"
                  : "fragrâncias salvas"}
              </p>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="text-[10px] tracking-[0.15em] uppercase text-gray-300 hover:text-red-400 transition-colors pb-1 border-b border-gray-200 hover:border-red-300"
              >
                Limpar tudo
              </button>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          {favorites.length === 0 ? (
            <div className="py-20 text-center">
              <p
                className="text-[80px] font-light leading-none mb-4"
                style={{
                  color: "rgba(184,145,42,0.1)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                ♡
              </p>
              <p
                className="text-[28px] font-light text-gray-200 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Nenhum favorito ainda
              </p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-gray-300 mb-8">
                Salve perfumes clicando no coração em cada card
              </p>
              <button
                onClick={() => navigate("/masculinos")}
                className="px-7 py-3 text-[11px] tracking-[0.18em] uppercase font-medium text-white transition-colors"
                style={{ background: GOLD }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#a07c22")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
              >
                Explorar dupes ↗
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {favorites.map((item, idx) => (
                <Card
                  key={`${item.brand}-${item.name}-${idx}`}
                  item={item}
                  index={idx}
                  onClick={() => setSelectedPerfume(item)}
                />
              ))}
            </div>
          )}
        </div>

        {selectedPerfume && (
          <PerfumeModal
            item={selectedPerfume}
            onClose={() => setSelectedPerfume(null)}
          />
        )}
        <Footer />
      </div>
    </PageTransition>
  );
}
