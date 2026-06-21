import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconHeart, IconSun, IconMoon } from "@tabler/icons-react";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#b8912a";

const links = [
  { label: "Masculinos", to: "/masculinos" },
  { label: "Femininos", to: "/femininos" },
  { label: "Ranking", to: "/ranking" },
  { label: "Similares", to: "/similares" },
  { label: "Guia", to: "/guia" },
];

function NavLink({ to, label, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative inline-block text-[11px] tracking-[0.12em] uppercase no-underline pb-2"
    >
      <span
        className="transition-colors duration-150"
        style={{ color: isActive ? GOLD : undefined }}
        data-active={isActive}
      >
        <span
          className={
            isActive
              ? ""
              : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors"
          }
        >
          {label}
        </span>
      </span>
      <span
        className="absolute left-0 bottom-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-200"
        style={{ background: GOLD, display: isActive ? "none" : "block" }}
      />
      {isActive && (
        <span
          className="absolute left-0 bottom-0 h-[1.5px] w-full"
          style={{ background: GOLD }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const isFavActive = location.pathname === "/favoritos";

  return (
    <nav className="border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 dark:border-gray-800 dark:border-gray-800 bg-white dark:bg-[#0f0f0f] transition-colors">
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">
        <Link
          to="/"
          className="no-underline hover:opacity-70 transition-opacity"
        >
          <span
            className="text-xl font-normal tracking-[0.12em] uppercase text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            DupeScent
          </span>
          <span className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 -mt-0.5">
            Guia de fragrâncias
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <NavLink key={link.label} to={link.to} label={link.label} />
          ))}

          <Link
            to="/favoritos"
            className="relative group inline-flex items-center pb-2"
            aria-label="Favoritos"
          >
            <IconHeart
              size={18}
              strokeWidth={1.5}
              style={{ color: isFavActive ? GOLD : undefined }}
              className={
                isFavActive
                  ? ""
                  : "text-gray-400 dark:text-gray-500 group-hover:text-yellow-700 transition-colors"
              }
            />
            {favorites.length > 0 && (
              <span
                className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] flex items-center justify-center font-medium"
                style={{ background: GOLD }}
              >
                {favorites.length > 9 ? "9+" : favorites.length}
              </span>
            )}
          </Link>

          {/* Toggle dark/light */}
          <button
            onClick={toggleTheme}
            className="text-gray-400 dark:text-gray-500 hover:text-yellow-700 dark:hover:text-yellow-600 transition-colors pb-2"
            aria-label={dark ? "Modo claro" : "Modo escuro"}
          >
            {dark ? (
              <IconSun size={18} strokeWidth={1.5} />
            ) : (
              <IconMoon size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>

        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <span
            className="block w-5 h-px bg-gray-400 dark:bg-gray-600 transition-all duration-200"
            style={{
              transform: open ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px bg-gray-400 dark:bg-gray-600 transition-all duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-gray-400 dark:bg-gray-600 transition-all duration-200"
            style={{
              transform: open ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4 bg-white dark:bg-[#0f0f0f]">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              label={link.label}
              onClick={() => setOpen(false)}
            />
          ))}
          <Link
            to="/favoritos"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase no-underline transition-colors text-gray-400 dark:text-gray-500"
            style={{ color: isFavActive ? GOLD : undefined }}
            onClick={() => setOpen(false)}
          >
            <IconHeart size={14} strokeWidth={1.5} />
            Favoritos
            {favorites.length > 0 && (
              <span className="text-[10px]" style={{ color: GOLD }}>
                ({favorites.length})
              </span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 hover:text-yellow-700 transition-colors"
          >
            {dark ? (
              <IconSun size={14} strokeWidth={1.5} />
            ) : (
              <IconMoon size={14} strokeWidth={1.5} />
            )}
            {dark ? "Modo claro" : "Modo escuro"}
          </button>
        </div>
      )}
    </nav>
  );
}
