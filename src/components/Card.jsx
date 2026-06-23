import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useFavorites } from "../context/FavoritesContext";

const GOLD = "#b8912a";

export default function Card({ item, onClick, index = 0, rank = null }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(item);

  const handleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite(item);
    toast(
      favorited
        ? `${item.name} removido dos favoritos`
        : `${item.name} adicionado aos favoritos`,
      {
        style: {
          background: "#1a1a1a",
          color: GOLD,
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "0",
          padding: "12px 16px",
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      onClick={onClick}
      className="group relative flex h-full cursor-pointer flex-col border border-gray-100 bg-white transition-transform duration-200 hover:-translate-y-0.5 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
    >
      {/* Barra dourada esquerda no hover */}
      <div className="absolute left-0 top-0 z-10 h-full w-[2px] bg-transparent transition-colors duration-200 group-hover:bg-[#b8912a]" />

      {/* Badge de ranking */}
      {rank && (
        <div
          className="absolute left-0 top-0 z-20 flex h-7 w-7 items-center justify-center text-[10px] text-white"
          style={{ background: GOLD }}
        >
          {rank}
        </div>
      )}

      {/* Botão favorito */}
      <button
        onClick={handleFavorite}
        className="absolute right-3 top-3 z-20 transition-all duration-200 hover:scale-110"
        aria-label={
          favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={favorited ? GOLD : "none"}
          stroke={favorited ? GOLD : "#9ca3af"}
          strokeWidth="1.2"
          className="transition-colors group-hover:stroke-[#b8912a]"
        >
          <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.5 3 2 5 2C6.2 2 7.2 2.6 8 3.5C8.8 2.6 9.8 2 11 2C13 2 14.5 3.5 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" />
        </svg>
      </button>

      {/* Área da imagem — altura fixa, sempre presente */}
      <div className="h-52 w-full overflow-hidden bg-gray-50 dark:bg-[#111]">
        {item.imagem ? (
          <img
            src={item.imagem}
            alt={`${item.brand} ${item.name}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gray-50 dark:bg-[#111]" />
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col justify-between p-4">
        {/* Topo: marca, nome, tags, notas */}
        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.28em] text-gray-400">
            {item.brand}
          </p>
          <p
            className="mb-2 pr-5 text-[17px] font-light leading-snug text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {item.name}
          </p>
          <div className="mb-2 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-gray-200 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-gray-400 dark:border-[#2a2a2a]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[11px] italic leading-snug text-gray-400">
            {item.notes}
          </p>
        </div>

        {/* Rodapé: score + preço */}
        <div className="mt-4 flex items-end justify-between gap-2 border-t border-gray-100 pt-3 dark:border-[#2a2a2a]">
          <div className="min-w-0">
            <span
              className="text-[22px] font-light leading-none"
              style={{
                color: GOLD,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {item.score}
            </span>
            <p className="mt-0.5 truncate text-[10px] text-gray-400">
              {item.dupe}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[9px] text-gray-400">A partir de</p>
            <p
              className="whitespace-nowrap text-[17px] font-light"
              style={{
                color: GOLD,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              R$ 199
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
