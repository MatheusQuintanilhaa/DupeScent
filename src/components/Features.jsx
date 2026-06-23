import {
  IconChartRadar,
  IconFilter,
  IconFlask,
  IconSparkles,
} from "@tabler/icons-react";

const GOLD = "#b8912a";

const features = [
  {
    Icon: IconSparkles,
    title: "Score de similaridade",
    desc: "Notas de 1 a 10 em quanto o dupe se aproxima do original.",
  },
  {
    Icon: IconFlask,
    title: "Piramide olfativa",
    desc: "Notas de topo, coracao e fundo detalhadas para cada fragrancia.",
  },
  {
    Icon: IconChartRadar,
    title: "Radar olfativo",
    desc: "Perfil visual em doce, citrico, amadeirado, especiado e fresco.",
  },
  {
    Icon: IconFilter,
    title: "Filtro por ocasiao",
    desc: "Noite, dia, trabalho ou encontro: o dupe certo para cada momento.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-gray-100 py-10 dark:border-gray-800">
      <h2
        className="mb-9 text-[26px] font-light text-gray-900 dark:text-gray-100"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Por que usar o DupeScent?
      </h2>

      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, desc }) => (
          <div key={title} className="mx-auto max-w-[210px]">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
              style={{ borderColor: `${GOLD}55`, color: GOLD }}
            >
              <Icon size={24} strokeWidth={1.3} />
            </div>
            <p className="mb-2 text-[13px] font-medium text-gray-700 dark:text-gray-200">
              {title}
            </p>
            <p className="text-[12px] leading-relaxed text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
