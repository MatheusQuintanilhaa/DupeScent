export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
      <div>
        <span className="font-serif text-xl tracking-[0.12em] uppercase">
          DupeScent
        </span>
        <span className="block text-[10px] tracking-[0.2em] uppercase text-gray-400">
          Guia de fragrâncias
        </span>
      </div>

      <div className="hidden sm:flex gap-6">
        {["Masculinos", "Femininos", "Ranking", "Guia"].map((l) => (
          <span
            key={l}
            className="text-[11px] tracking-[0.12em] uppercase text-gray-400 cursor-pointer hover:text-gray-900"
          >
            {l}
          </span>
        ))}
      </div>
    </nav>
  );
}
