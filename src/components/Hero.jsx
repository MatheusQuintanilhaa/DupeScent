import { useNavigate } from "react-router-dom";
import { IconSparkles } from "@tabler/icons-react";

const GOLD = "#b8912a";
const HERO_IMAGE = "/hero-dupescent.webp";
const stats = [
  { n: "100+", l: "Originais" },
  { n: "300+", l: "Dupes avaliados" },
  { n: "9.3", l: "Score maximo" },
  { n: "15+", l: "Marcas dupe" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-[#0f0f0f]">
      <div
        className="absolute inset-y-0 right-0 hidden w-[66%] bg-cover bg-center lg:block"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden lg:block dark:hidden"
        style={{
          background:
            "linear-gradient(90deg, #fff 0%, #fff 35%, rgba(255,255,255,0.62) 44%, rgba(255,255,255,0.06) 54%, rgba(255,255,255,0) 62%)",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:lg:block"
        style={{
          background:
            "linear-gradient(90deg, #0f0f0f 0%, #0f0f0f 35%, rgba(15,15,15,0.68) 44%, rgba(15,15,15,0.12) 54%, rgba(15,15,15,0) 62%)",
        }}
      />

      <div className="relative grid min-h-[510px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center px-4 pb-9 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
          <div className="max-w-full sm:max-w-xl">
            <div className="mb-5 flex items-center gap-2.5 sm:mb-6">
              <div className="h-px w-6" style={{ background: GOLD }} />
              <span
                className="text-[9px] uppercase tracking-[0.28em] sm:text-[10px]"
                style={{ color: GOLD }}
              >
                Guia definitivo de dupes
              </span>
            </div>

            <h1
              className="mb-4 text-[30px] font-light leading-[1.1] tracking-tight text-gray-900 dark:text-gray-100 sm:text-[40px] lg:text-[46px]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              O luxo tem um
              <br />
              <em style={{ color: GOLD }}>substituto perfeito.</em>
            </h1>

            <p className="mb-6 max-w-md text-[13px] font-light leading-[1.8] text-gray-500 sm:mb-8 sm:text-sm">
              Encontre o dupe ideal para mais de 100 perfumes importados, com
              score de similaridade, piramide olfativa e filtros por ocasiao.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors"
                style={{ background: GOLD }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#a07c22")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
                onClick={() => navigate("/masculinos")}
              >
                <IconSparkles size={15} strokeWidth={1.6} aria-hidden="true" />
                Explorar dupes
              </button>

              <button
                className="border border-gray-200 px-7 py-3 text-[11px] uppercase tracking-[0.18em] text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-100"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Como funciona
              </button>
            </div>

            <div className="mt-10 grid max-w-[520px] grid-cols-2 border border-gray-100 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-[#0f0f0f]/75 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.l}
                  className="border-gray-100 px-5 py-5 dark:border-gray-800"
                  style={{
                    borderRight:
                      index === stats.length - 1 ? "none" : "1px solid",
                    borderColor: "inherit",
                  }}
                >
                  <div
                    className="text-[28px] font-light leading-none"
                    style={{
                      color: GOLD,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {stat.n}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-gray-400">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[330px] lg:hidden">
          <img
            src={HERO_IMAGE}
            alt="Perfumes em cenario dourado"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#0f0f0f] dark:via-[#0f0f0f]/20" />
        </div>
      </div>
    </section>
  );
}
