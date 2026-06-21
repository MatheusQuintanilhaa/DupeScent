import Navbar from "./Navbar";
import Footer from "./Footer";

const GOLD = "#b8912a";

export default function LegalPage({
  eyebrow,
  title,
  titleEm,
  updatedAt,
  children,
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
      <Navbar />

      <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GOLD }}
          >
            {eyebrow}
          </span>
        </div>
        <h1
          className="text-[32px] sm:text-[42px] font-light leading-[1.1] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {title} {titleEm && <em style={{ color: GOLD }}>{titleEm}</em>}
        </h1>
        {updatedAt && (
          <p className="text-[11px] text-gray-400">
            Última atualização: {updatedAt}
          </p>
        )}
      </div>

      <div className="px-6 sm:px-8 max-w-2xl py-10">
        <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
