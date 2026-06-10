export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
        Buscar perfume original
      </p>

      <div className="flex flex-col sm:flex-row border border-gray-200 rounded-md overflow-hidden">
        <input
          className="flex-1 px-4 py-3 text-sm outline-none"
          placeholder="Ex: Aventus, Baccarat Rouge..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button className="px-5 py-3 text-xs uppercase text-white bg-[#b8912a]">
          Buscar ↗
        </button>
      </div>
    </div>
  );
}
