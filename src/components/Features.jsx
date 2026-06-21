const GOLD = "#b8912a";

const features = [
  {
    n: "01",
    title: "Score de similaridade",
    desc: "Nota de 1 a 10 em quanto o dupe se aproxima do original.",
  },
  {
    n: "02",
    title: "Pirâmide olfativa",
    desc: "Notas de topo, coração e fundo detalhadas para cada fragrância.",
  },
  {
    n: "03",
    title: "Radar olfativo",
    desc: "Perfil visual em doce, cítrico, amadeirado, especiado e fresco.",
  },
  {
    n: "04",
    title: "Filtro por ocasião",
    desc: "Noite, dia, trabalho ou encontro — o dupe certo para cada momento.",
  },
];

export default function Features() {
  return (
    <div id="features">
      <div className="flex items-center gap-3.5 mb-10">
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400">
          Por que usar
        </span>
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {features.map((feat) => (
          <div
            key={feat.n}
            className="p-5 border border-gray-100 dark:border-[#2a2a2a]"
          >
            <div
              className="text-[28px] font-light mb-1.5 leading-none"
              style={{
                color: "rgba(184, 145, 42, 0.4)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {feat.n}
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-gray-800 dark:text-gray-200 mb-1.5">
              {feat.title}
            </p>
            <p className="text-xs leading-relaxed text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
