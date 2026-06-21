import { Link } from "react-router-dom";

const GOLD = "#b8912a";

const linkColumns = [
  {
    title: "Explorar",
    links: [
      { label: "Masculinos", to: "/masculinos" },
      { label: "Femininos", to: "/femininos" },
      { label: "Ranking", to: "/ranking" },
      { label: "Guia de dupes", to: "/guia" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre", to: "/sobre" },
      { label: "Termos de uso", to: "/termos" },
      { label: "Privacidade", to: "/privacidade" },
      { label: "Contato", to: "/contato" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f0f0f] transition-colors">
      <div className="px-6 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <span
            className="text-[18px] font-light tracking-[0.18em] uppercase text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            DupeScent
          </span>
          <p className="text-[12px] text-gray-400 leading-relaxed mt-3 max-w-xs">
            O guia definitivo de dupes de perfume — encontre a alternativa certa
            para sua fragrância favorita, com score de similaridade e curadoria
            olfativa.
          </p>
          <div className="flex gap-4 mt-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-yellow-700 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {linkColumns.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4">
              {col.title}
            </p>
            <div className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[12px] text-gray-500 dark:text-gray-400 hover:text-yellow-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-[10px] tracking-wide text-gray-400">
          © {new Date().getFullYear()} DupeScent — Guia de fragrâncias
          alternativas
        </span>
        <span className="text-[10px] tracking-wide text-gray-400">
          Os preços exibidos são médias de mercado e podem variar
        </span>
      </div>
    </footer>
  );
}
