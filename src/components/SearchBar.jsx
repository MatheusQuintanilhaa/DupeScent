import { useState, useEffect, useRef } from "react";

const GOLD = "#b8912a";

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      onChange(local);
    }, 300);
    return () => clearTimeout(timer);
  }, [local]);

  return (
    <div className="mb-10">
      <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-2.5">
        Buscar perfume original
      </p>
      <div className="flex border border-gray-200 focus-within:border-yellow-600 transition-colors">
        <input
          className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-[13px] text-gray-900 placeholder-gray-300 tracking-wide"
          placeholder="Ex: Aventus, Baccarat Rouge 540, Good Girl…"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />
        <button
          className="px-5 py-3.5 text-[10px] tracking-[0.18em] uppercase font-medium text-white transition-colors"
          style={{ background: GOLD }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#a07c22")}
          onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          onClick={() => onChange(local)}
        >
          Buscar ↗
        </button>
      </div>
    </div>
  );
}
