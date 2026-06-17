import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Masculinos", to: "/masculinos" },
  { label: "Femininos", to: "/femininos" },
  { label: "Ranking", to: "/ranking" },
  { label: "Guia", to: "/guia" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100">
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">
        <Link to="/" className="no-underline">
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
            <Link
              key={link.label}
              to={link.to}
              className="text-[11px] tracking-[0.12em] uppercase text-gray-400 hover:text-gray-900 transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
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
            <Link
              key={link.label}
              to={link.to}
              className="text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-900 transition-colors no-underline"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
