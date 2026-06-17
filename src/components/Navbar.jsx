import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const GOLD = "#b8912a";

const links = [
  { label: "Masculinos", to: "/masculinos" },
  { label: "Femininos", to: "/femininos" },
  { label: "Ranking", to: "/ranking" },
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
        style={{ color: isActive ? GOLD : "#9ca3af" }}
      >
        {label}
      </span>

      {/* barra inativa: cresce no hover */}
      <span
        className="absolute left-0 bottom-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-200"
        style={{
          background: GOLD,
          display: isActive ? "none" : "block",
        }}
      />

      {/* barra ativa: sempre visível */}
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

  return (
    <nav className="border-b border-gray-100">
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">
        <Link
          to="/"
          className="no-underline hover:opacity-70 transition-opacity"
        >
          <span
            className="text-xl font-normal tracking-[0.12em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            DupeScent
          </span>
          <span className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 -mt-0.5">
            Guia de fragrâncias
          </span>
        </Link>

        <div className="hidden sm:flex gap-6">
          {links.map((link) => (
            <NavLink key={link.label} to={link.to} label={link.label} />
          ))}
        </div>

        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <span
            className="block w-5 h-px bg-gray-400 transition-all duration-200"
            style={{
              transform: open ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px bg-gray-400 transition-all duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-gray-400 transition-all duration-200"
            style={{
              transform: open ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              label={link.label}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
