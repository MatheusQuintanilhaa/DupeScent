import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useFavorites } from "../context/FavoritesContext";

const GOLD = "#b8912a";

export default function Card({ item, onClick, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(item);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(item);
    if (favorited) {
      toast(`${item.name} removido dos favoritos`);
    } else {
      toast(`♡  ${item.name} adicionado aos favoritos`, {
        style: {
          background: "#1a1a1a",
          color: "#b8912a",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "0",
          padding: "12px 16px",
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      onClick={onClick}
      className="group relative bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2a2a2a] cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 flex flex-col min-h-[220px]"
    >
      {/* Linha dourada hover — sempre visível */}
      <div className="absolute left-0 top-0 h-full w-[2px] z-10 bg-transparent group-hover:bg-[#b8912a] transition-colors duration-200" />

      {/* Botão favorito */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 transition-all duration-200 hover:scale-110 z-20"
        aria-label={
          favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
      >
        {favorited ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={GOLD}
            stroke={GOLD}
            strokeWidth="1.2"
          >
            <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.5 3 2 5 2C6.2 2 7.2 2.6 8 3.5C8.8 2.6 9.8 2 11 2C13 2 14.5 3.5 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.2"
            className="group-hover:stroke-[#b8912a] transition-colors"
          >
            <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.5 3 2 5 2C6.2 2 7.2 2.6 8 3.5C8.8 2.6 9.8 2 11 2C13 2 14.5 3.5 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" />
          </svg>
        )}
      </button>

      {/* Imagem do frasco */}
      {item.imagem && (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-white p-5 dark:bg-[#111]">
          <img
            src={item.imagem}
            alt={`${item.brand} ${item.name}`}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[9px] tracking-[0.28em] uppercase text-gray-400 mb-1.5">
            {item.brand}
          </p>
          <p
            className="text-[17px] font-light mb-2.5 leading-tight transition-colors duration-200 group-hover:text-[#b8912a] pr-6 text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {item.name}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 border border-gray-200 dark:border-[#2a2a2a] text-gray-400"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[11px] italic text-gray-400 leading-snug">
            {item.notes}
          </p>
        </div>

        <div className="flex items-baseline gap-2 pt-3 mt-3 border-t border-gray-100 dark:border-[#2a2a2a]">
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
    </motion.div>
  );
}
