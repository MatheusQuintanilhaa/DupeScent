import { useEffect } from "react";

const GOLD = "#b8912a";

export default function PerfumeModal({ item, onClose }) {
  // ESC + travar scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay com fade */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg p-6 sm:p-8 shadow-xl border border-gray-100 animate-modal rounded-md">
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-sm transition-colors"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Brand */}
        <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
          {item.brand}
        </p>

        {/* Nome */}
        <h2
          className="text-[24px] sm:text-[28px] font-light mb-4 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {item.name}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase px-2 py-1 border border-gray-200 text-gray-400 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Notas */}
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          {item.notes}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <span
            className="text-[24px] sm:text-[26px] font-light"
            style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.score}
          </span>

          <span className="text-sm text-gray-400 text-right">{item.dupe}</span>
        </div>
      </div>
    </div>
  );
}
