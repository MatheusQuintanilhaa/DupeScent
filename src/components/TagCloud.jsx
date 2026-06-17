import { useNavigate } from "react-router-dom";

const families = [
  {
    label: "Amadeirado",
    query: "Amadeirado",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 14 C3 14 2 10 5 8 C6.5 7 8 6 8 4 C8 4 9.5 6 9 8 C10.5 7 11 5 11 5 C11 5 13 7 12 10 C11.5 12 10 14 10 14" />
        <path d="M3 14 L13 14" />
        <path d="M6 14 C6 14 6 11 8 10 C10 11 10 14 10 14" />
      </svg>
    ),
  },
  {
    label: "Doce",
    query: "Doce",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2 C8 2 5 4 5 6.5 C5 8.5 6.5 9.5 8 9.5 C9.5 9.5 11 8.5 11 6.5 C11 4 8 2 8 2Z" />
        <path d="M5.5 10 C5.5 10 4 10.5 4 12 C4 13 5 14 8 14 C11 14 12 13 12 12 C12 10.5 10.5 10 10.5 10" />
        <path d="M8 9.5 L8 10.5" />
      </svg>
    ),
  },
  {
    label: "Cítrico",
    query: "Cítrico",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="9" r="5" />
        <path d="M8 4 L8 2" />
        <path d="M8 2 C8 2 9.5 2.5 10 4" />
        <path d="M5 7 Q8 5 11 7" />
        <line x1="5" y1="9" x2="11" y2="9" />
      </svg>
    ),
  },
  {
    label: "Aquático",
    query: "Aquático",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 10 Q4 8 6 10 Q8 12 10 10 Q12 8 14 10" />
        <path d="M2 7 Q4 5 6 7 Q8 9 10 7 Q12 5 14 7" />
        <path d="M8 4 C8 4 6 6 6 7.5" />
      </svg>
    ),
  },
  {
    label: "Oud",
    query: "Oud",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2 L8 13" />
        <path d="M5 5 C5 5 3 6 3 8 C3 10 5 11 8 11" />
        <path d="M11 5 C11 5 13 6 13 8 C13 10 11 11 8 11" />
        <path d="M6 2.5 Q8 1 10 2.5" />
        <path d="M6 13 Q8 14.5 10 13" />
      </svg>
    ),
  },
  {
    label: "Floral",
    query: "Floral",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="1.5" />
        <ellipse cx="8" cy="4.5" rx="1.5" ry="2.2" />
        <ellipse cx="8" cy="11.5" rx="1.5" ry="2.2" />
        <ellipse cx="4.5" cy="8" rx="2.2" ry="1.5" />
        <ellipse cx="11.5" cy="8" rx="2.2" ry="1.5" />
        <ellipse
          cx="5.5"
          cy="5.5"
          rx="1.5"
          ry="2.2"
          transform="rotate(45 5.5 5.5)"
        />
        <ellipse
          cx="10.5"
          cy="10.5"
          rx="1.5"
          ry="2.2"
          transform="rotate(45 10.5 10.5)"
        />
        <ellipse
          cx="10.5"
          cy="5.5"
          rx="1.5"
          ry="2.2"
          transform="rotate(-45 10.5 5.5)"
        />
        <ellipse
          cx="5.5"
          cy="10.5"
          rx="1.5"
          ry="2.2"
          transform="rotate(-45 5.5 10.5)"
        />
      </svg>
    ),
  },
  {
    label: "Âmbar",
    query: "Âmbar",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2 L10.5 6 L14 6.5 L11.5 9.5 L12 13 L8 11.5 L4 13 L4.5 9.5 L2 6.5 L5.5 6 Z" />
      </svg>
    ),
  },
  {
    label: "Especiado",
    query: "Especiado",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2 L8 5" />
        <path d="M8 5 C6 5 4.5 6.5 4.5 8.5 C4.5 11 6 13 8 14 C10 13 11.5 11 11.5 8.5 C11.5 6.5 10 5 8 5" />
        <path d="M6 8 C6.5 7.5 7 7.5 8 8 C9 8.5 9.5 8.5 10 8" />
        <path d="M5.5 10 C6 9.5 7 9.5 8 10 C9 10.5 10 10.5 10.5 10" />
        <path d="M7 2 L9 2" />
      </svg>
    ),
  },
  {
    label: "Tabaco",
    query: "Tabaco",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="8" width="10" height="3" rx="1" />
        <path d="M2 8 L12 8 C12 8 13.5 8 13.5 9.5 C13.5 11 12 11 12 11" />
        <path d="M10 5 C10 5 11 4 11 3 C11 2 10 2 10 2 C10 2 11 2 12 3 C12 4 11.5 5 12 6" />
      </svg>
    ),
  },
  {
    label: "Fresco",
    query: "Fresco",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="3" />
        <line x1="8" y1="1" x2="8" y2="3" />
        <line x1="8" y1="13" x2="8" y2="15" />
        <line x1="1" y1="8" x2="3" y2="8" />
        <line x1="13" y1="8" x2="15" y2="8" />
        <line x1="3" y1="3" x2="4.5" y2="4.5" />
        <line x1="11.5" y1="11.5" x2="13" y2="13" />
        <line x1="13" y1="3" x2="11.5" y2="4.5" />
        <line x1="4.5" y1="11.5" x2="3" y2="13" />
      </svg>
    ),
  },
  {
    label: "Couro",
    query: "Couro",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 5 C2 5 2 4 4 4 L12 4 C14 4 14 5 14 5 L14 12 C14 13 13 13 13 13 L3 13 C2 13 2 12 2 12 Z" />
        <path d="M2 7 L14 7" />
        <path d="M5 4 C5 4 5 2 8 2 C11 2 11 4 11 4" />
        <path d="M6 10 C6 10 6.5 11.5 8 11.5 C9.5 11.5 10 10 10 10" />
      </svg>
    ),
  },
  {
    label: "Oriental",
    query: "Oriental",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2 L9.5 6.5 L14 6.5 L10.5 9 L12 13.5 L8 11 L4 13.5 L5.5 9 L2 6.5 L6.5 6.5 Z" />
        <circle cx="8" cy="8" r="2" />
      </svg>
    ),
  },
];

export default function TagCloud() {
  const navigate = useNavigate();

  const handleClick = (query) => {
    navigate(`/busca?familia=${encodeURIComponent(query)}`);
  };

  return (
    <div className="mb-10">
      <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">
        Explorar por família olfativa
      </p>
      <div className="flex flex-wrap gap-2">
        {families.map((fam) => (
          <button
            key={fam.label}
            onClick={() => handleClick(fam.query)}
            className="group inline-flex items-center gap-2 px-3.5 py-2 border border-gray-100 text-[10px] tracking-[0.18em] uppercase text-gray-400 hover:border-yellow-700 hover:text-yellow-700 transition-colors bg-transparent"
          >
            <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              {fam.icon}
            </span>
            {fam.label}
          </button>
        ))}
      </div>
    </div>
  );
}
