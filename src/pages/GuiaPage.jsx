import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const GOLD = "#b8912a";

const familias = [
  {
    nome: "Amadeirado",
    query: "Amadeirado",
    image: "/familias/familia-amadeirado.jpg",
    desc: "Cedro, sândalo, vetiver — notas secas e quentes que evocam florestas antigas e madeiras nobres. Clássico, sofisticado e duradouro.",
    exemplos: [
      "Aventus — Creed",
      "Ombre Leather — Tom Ford",
      "Tuscan Leather — Tom Ford",
    ],
    clima: "Frio",
    ocasiao: "Noite / Trabalho",
  },
  {
    nome: "Floral",
    query: "Floral",
    image: "/familias/familia-floral.jpg",
    desc: "Jasmim, rosa, íris, peônia — o coração da perfumaria clássica. Feminino por tradição, mas cada vez mais presente em fragrâncias unissex.",
    exemplos: [
      "Good Girl — Carolina Herrera",
      "Miss Dior EDP — Dior",
      "Libre EDP — YSL",
    ],
    clima: "Versátil",
    ocasiao: "Dia / Encontro",
  },
  {
    nome: "Cítrico",
    query: "Cítrico",
    image: "/familias/familia-citrico.jpg",
    desc: "Bergamota, limão, laranja, toranja — frescor e energia imediata. A primeira impressão mais popular da perfumaria moderna.",
    exemplos: [
      "Bleu de Chanel EDP — Chanel",
      "Acqua di Giò — Armani",
      "Invictus — Paco Rabanne",
    ],
    clima: "Quente / Versátil",
    ocasiao: "Dia / Trabalho",
  },
  {
    nome: "Oriental / Âmbar",
    query: "Âmbar",
    image: "/familias/familia-oriental.jpg",
    desc: "Resinas quentes, incenso, baunilha e âmbar — envolvente e misterioso. A assinatura da perfumaria do Oriente Médio.",
    exemplos: [
      "Baccarat Rouge 540 — MFK",
      "Tobacco Vanille — Tom Ford",
      "Angels Share — Kilian",
    ],
    clima: "Frio",
    ocasiao: "Noite / Encontro",
  },
  {
    nome: "Especiado",
    query: "Especiado",
    image: "/familias/familia-especiado.jpg",
    desc: "Canela, cardamomo, pimenta, cravo — calor e caráter intenso. Perfumes que deixam rastro e são difíceis de ignorar.",
    exemplos: [
      "Sauvage Elixir — Dior",
      "Y EDP — YSL",
      "Stronger With You — Armani",
    ],
    clima: "Frio",
    ocasiao: "Noite / Encontro",
  },
  {
    nome: "Oud",
    query: "Oud",
    image: "/familias/familia-oud.jpg",
    desc: "Madeira de agar, fumada e intensa — a assinatura mais icônica da perfumaria árabe. Profundo, complexo e memorável.",
    exemplos: [
      "Oud for Greatness — Initio",
      "Ombre Nomade — Louis Vuitton",
      "Oud Satin Mood — MFK",
    ],
    clima: "Frio",
    ocasiao: "Noite",
  },
  {
    nome: "Doce / Gourmand",
    query: "Doce",
    image: "/familias/familia-doce.jpg",
    desc: "Baunilha, cacau, mel, pralinê — notas que remetem à confeitaria. Sedutores e envolventes, perfeitos para o inverno.",
    exemplos: [
      "La Vie Est Belle — Lancôme",
      "Black Opium — YSL",
      "Ultra Male — JPG",
    ],
    clima: "Frio",
    ocasiao: "Noite / Encontro",
  },
  {
    nome: "Aquático",
    query: "Aquático",
    image: "/familias/familia-aquatico.jpg",
    desc: "Notas marinhas, ozônicas e aquosas — sensação de frescor limpo e ar livre. Leves e não intrusivos.",
    exemplos: [
      "Acqua di Giò Profumo — Armani",
      "Cool Water — Davidoff",
      "Voyage — Hermès",
    ],
    clima: "Quente",
    ocasiao: "Dia",
  },
  {
    nome: "Couro / Tabaco",
    query: "Couro",
    image: "/familias/familia-couro.jpg",
    desc: "Couro, tabaco, madeira de bétula — notas escuras e secas de caráter forte e masculino. Para quem quer deixar marca.",
    exemplos: [
      "Tuscan Leather — Tom Ford",
      "Herod — Parfums de Marly",
      "Black Phantom — Kilian",
    ],
    clima: "Frio",
    ocasiao: "Noite",
  },
  {
    nome: "Almiscarado / Fresco",
    query: "Fresco",
    image: "/familias/familia-almiscarado.jpg",
    desc: "Almíscar, musgo, lavanda e menta — suave, clean e próximo da pele. A escolha para quem prefere fragrâncias discretas.",
    exemplos: [
      "Silver Mountain Water — Creed",
      "Green Irish Tweed — Creed",
      "Reflection Man — Amouage",
    ],
    clima: "Versátil",
    ocasiao: "Dia / Trabalho",
  },
];

const scoreExamples = [
  {
    score: "9.0–9.5",
    label: "Excepcional",
    desc: "Quase indistinguível do original. Mesmas notas, mesma evolução, mesma fixação.",
    color: GOLD,
    exemplos: [
      "Club de Nuit → Aventus (9.2)",
      "Amber Oud Rouge → Baccarat Rouge 540 (9.2)",
      "Asad → Sauvage Elixir (9.0)",
    ],
  },
  {
    score: "8.5–8.9",
    label: "Muito próximo",
    desc: "DNA olfativo idêntico com pequenas diferenças na projeção ou longevidade.",
    color: "#a07c22",
    exemplos: [
      "Iconic → Bleu de Chanel (8.8)",
      "Hawas → Invictus (8.8)",
      "Detour Noir → Layton (9.1)",
    ],
  },
  {
    score: "8.0–8.4",
    label: "Inspirado",
    desc: "Claramente da mesma família olfativa, com identidade própria. Ótima relação custo-benefício.",
    color: "#8a7a5f",
    exemplos: [
      "9PM → Ultra Male (8.2)",
      "Fakhar Black → Y EDP (8.6)",
      "Sugraat → Acqua di Giò (8.8)",
    ],
  },
  {
    score: "7.0–7.9",
    label: "Referenciado",
    desc: "Bebe da mesma fonte, mas tem personalidade distinta. Ideal para quem quer algo diferente do original.",
    color: "#7a6a4f",
    exemplos: [],
  },
];

function FamiliaCard({ familia, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border border-gray-100 dark:border-[#2a2a2a] overflow-hidden hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={familia.image}
          alt={familia.nome}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <p
            className="text-white text-[18px] font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {familia.nome}
          </p>
          <div className="flex gap-2 mt-1">
            <span className="text-[9px] tracking-[0.1em] uppercase text-white/60">
              {familia.clima}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-[9px] tracking-[0.1em] uppercase text-white/60">
              {familia.ocasiao}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FamiliaModal({ familia, onClose }) {
  const navigate = useNavigate();
  if (!familia) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-[#1a1a1a] w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-t sm:border border-gray-100 dark:border-[#2a2a2a] sm:mx-4">
        <div className="relative h-56 overflow-hidden">
          <img
            src={familia.image}
            alt={familia.nome}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-lg"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 p-5">
            <p
              className="text-white text-[28px] font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {familia.nome}
            </p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {familia.desc}
          </p>
          <div className="flex gap-4">
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
                Clima ideal
              </p>
              <p className="text-[12px] text-gray-700 dark:text-gray-300">
                {familia.clima}
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">
                Ocasião
              </p>
              <p className="text-[12px] text-gray-700 dark:text-gray-300">
                {familia.ocasiao}
              </p>
            </div>
          </div>
          {familia.exemplos.length > 0 && (
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">
                Exemplos de originais
              </p>
              <div className="space-y-1">
                {familia.exemplos.map((ex) => (
                  <p
                    key={ex}
                    className="text-[12px] text-gray-600 dark:text-gray-400"
                  >
                    {ex}
                  </p>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              navigate(`/busca?familia=${encodeURIComponent(familia.query)}`);
              onClose();
            }}
            className="w-full py-3 text-[10px] tracking-[0.2em] uppercase text-white transition-colors"
            style={{ background: GOLD }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a07c22")}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Ver dupes {familia.nome.toLowerCase()} ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuiaPage() {
  const [selectedFamilia, setSelectedFamilia] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100">
      <SEO
        title="Guia de perfumaria"
        description="Entenda o score de similaridade, pirâmide olfativa, famílias olfativas e como escolher um dupe com confiança."
        path="/guia"
      />
      <Navbar />

      <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GOLD }}
          >
            Entenda o universo dos dupes
          </span>
        </div>
        <h1
          className="text-[32px] sm:text-[42px] font-light leading-[1.1] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Guia de <em style={{ color: GOLD }}>perfumaria</em>
        </h1>
        <p className="text-sm font-light text-gray-400 max-w-md">
          Tudo que você precisa saber para escolher um dupe com confiança.
        </p>
      </div>

      <div className="px-6 sm:px-8 py-10 space-y-16 max-w-5xl">
        <section id="score">
          <h2
            className="text-[24px] font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            O que é o <em style={{ color: GOLD }}>score de similaridade</em>?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-2xl">
            Cada dupe recebe uma nota de 1 a 10 que indica o quão próximo ele é
            do perfume original — considerando pirâmide de notas, família
            olfativa e percepção da comunidade.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scoreExamples.map((s) => (
              <div
                key={s.score}
                className="border border-gray-100 dark:border-[#2a2a2a] p-5"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-[28px] font-light"
                    style={{
                      color: s.color,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {s.score}
                  </span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400">
                    {s.label}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  {s.desc}
                </p>
                {s.exemplos.length > 0 && (
                  <div className="space-y-1 pt-3 border-t border-gray-100 dark:border-[#2a2a2a]">
                    {s.exemplos.map((ex) => (
                      <p key={ex} className="text-[11px] text-gray-400">
                        {ex}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="familias">
          <h2
            className="text-[24px] font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Famílias <em style={{ color: GOLD }}>olfativas</em>
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-2xl">
            Clique em cada família para entender seu perfil, clima ideal e ver
            exemplos de originais catalogados no DupeScent.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {familias.slice(0, 9).map((f) => (
              <FamiliaCard
                key={f.nome}
                familia={f}
                onClick={() => setSelectedFamilia(f)}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-start-2">
              <FamiliaCard
                familia={familias[9]}
                onClick={() => setSelectedFamilia(familias[9])}
              />
            </div>
          </div>
        </section>

        <section id="piramide">
          <h2
            className="text-[24px] font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            A <em style={{ color: GOLD }}>pirâmide olfativa</em>
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-2xl">
            Todo perfume evolui em três camadas. As notas não aparecem todas de
            uma vez — elas se revelam em sequência à medida que evaporam na
            pele.
          </p>
          <div className="space-y-4 max-w-2xl">
            {[
              {
                label: "Topo",
                sub: "5–20 minutos",
                color: "#b8912a",
                desc: "A primeira impressão — geralmente cítrica, leve e volátil. É o que você sente nos primeiros minutos após aplicar.",
              },
              {
                label: "Coração",
                sub: "1–4 horas",
                color: "#8a6d8f",
                desc: "A alma do perfume. Floral, especiado ou frutado — define o caráter principal da fragrância pelo resto do dia.",
              },
              {
                label: "Fundo",
                sub: "6 horas ou mais",
                color: "#5f5e5a",
                desc: "A base que fixa o perfume na pele. Amadeirado, âmbar ou almiscarado — o que resta ao final do dia.",
              },
            ].map((tier) => (
              <div
                key={tier.label}
                className="pl-4 py-1"
                style={{ borderLeft: `2px solid ${tier.color}` }}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="text-[13px] tracking-[0.1em] uppercase font-medium"
                    style={{ color: tier.color }}
                  >
                    {tier.label}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    · {tier.sub}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-6 leading-relaxed max-w-2xl">
            * As durações são médias da indústria e variam conforme a
            concentração (EDT, EDP ou Extrait) e a química da pele de cada
            pessoa.
          </p>
        </section>

        <section id="radar">
          <h2
            className="text-[24px] font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Perfil <em style={{ color: GOLD }}>radar</em>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            No modal de cada perfume você encontra 5 eixos — doce, amadeirado,
            cítrico, especiado e fresco — numa escala de 0 a 5. Ele resume a
            intensidade de cada característica, permitindo comparar dois
            perfumes rapidamente.
          </p>
        </section>

        <section id="precos">
          <h2
            className="text-[24px] font-light mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Sobre os <em style={{ color: GOLD }}>preços</em>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            Os valores exibidos em cada dupe são médias de mercado brasileiro,
            baseadas em referências como o The King of Parfums e outros
            varejistas especializados. Sempre confirme o valor atual antes de
            comprar.
          </p>
        </section>
      </div>

      {selectedFamilia && (
        <FamiliaModal
          familia={selectedFamilia}
          onClose={() => setSelectedFamilia(null)}
        />
      )}
      <Footer />
    </div>
  );
}
