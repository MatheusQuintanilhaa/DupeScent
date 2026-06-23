import { useEffect, useRef, useState } from "react";

const GOLD = "#b8912a";

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    const timer = setTimeout(() => onChange(local), 300);
    return () => clearTimeout(timer);
  }, [local, onChange]);

  return (
    <div>
      <p className="mb-2.5 text-[10px] uppercase tracking-[0.25em] text-gray-500">
        Buscar perfume original
      </p>
      <div className="flex border border-gray-200 transition-colors focus-within:border-yellow-600 dark:border-gray-700 dark:bg-[#1a1a1a]">
        <input
          className="flex-1 border-none bg-transparent px-4 py-3.5 text-[13px] tracking-wide text-gray-900 outline-none placeholder:text-gray-300 dark:text-gray-100 dark:placeholder:text-gray-600"
          placeholder="Ex: Aventus, Baccarat Rouge 540, Sauvage Elixir..."
          value={local}
          onChange={(event) => setLocal(event.target.value)}
        />
        <button
          className="px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors"
          style={{ background: GOLD }}
          onMouseEnter={(event) =>
            (event.currentTarget.style.background = "#a07c22")
          }
          onMouseLeave={(event) =>
            (event.currentTarget.style.background = GOLD)
          }
          onClick={() => onChange(local)}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
