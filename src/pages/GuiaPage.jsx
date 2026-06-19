import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const GOLD = "#b8912a";

const familias = [
  {
    nome: "Amadeirado",
    desc: "Cedro, sândalo, vetiver — notas secas e quentes de madeira.",
  },
  {
    nome: "Floral",
    desc: "Jasmim, rosa, íris — o coração da perfumaria clássica.",
  },
  {
    nome: "Cítrico",
    desc: "Bergamota, limão, laranja — frescor e energia imediata.",
  },
  {
    nome: "Doce / Gourmand",
    desc: "Baunilha, cacau, mel — notas que remetem à confeitaria.",
  },
  {
    nome: "Âmbar",
    desc: "Resinas quentes e envolventes, clássicas do oriental.",
  },
  { nome: "Especiado", desc: "Canela, cardamomo, pimenta — calor e caráter." },
  {
    nome: "Oud",
    desc: "Madeira de agar, intensa e fumada — assinatura árabe.",
  },
  { nome: "Couro / Tabaco", desc: "Notas escuras, secas, de caráter forte." },
  {
    nome: "Aquático",
    desc: "Notas marinhas e ozônicas, sensação de frescor limpo.",
  },
  {
    nome: "Almiscarado",
    desc: "Almíscar — toque sensual e envolvente, quase pele.",
  },
];

export default function GuiaPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO
        title="Guia de perfumaria"
        description="Entenda o score de similaridade, pirâmide olfativa, famílias olfativas e como escolher um dupe com confiança."
        path="/guia"
      />
      <Navbar />

      <div className="px-6 sm:px-8 pt-12 pb-8 border-b border-gray-100">
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

      <div className="px-6 sm:px-8 max-w-3xl py-10 space-y-16">
        <section id="score">
          <h2
            className="text-[24px] font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            O que é o <em style={{ color: GOLD }}>score de similaridade</em>?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Cada dupe recebe uma nota de 1 a 10 que indica o quão próximo ele é
            do perfume original em termos olfativos — considerando a pirâmide de
            notas, a família olfativa e a percepção geral do público que já
            testou ambos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                score: "9.0+",
                desc: "Semelhança excepcional — quase indistinguível",
                color: GOLD,
              },
              {
                score: "8.0–8.9",
                desc: "Muito próximo, pequenas diferenças sutis",
                color: "#9ca3af",
              },
              {
                score: "7.0–7.9",
                desc: "Inspirado no original, com identidade própria",
                color: "#9ca3af",
              },
            ].map((s) => (
              <div key={s.score} className="border border-gray-100 p-4">
                <p
                  className="text-[22px] font-light"
                  style={{
                    color: s.color,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {s.score}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="piramide">
          <h2
            className="text-[24px] font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            A <em style={{ color: GOLD }}>pirâmide olfativa</em>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Todo perfume evolui em três camadas com o tempo. As notas não
            aparecem todas de uma vez — elas se revelam em sequência, à medida
            que evaporam na sua pele.
          </p>
          <div className="space-y-4">
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
                desc: "A base que fixa o perfume na pele. Amadeirado, amber ou almiscarado — o que resta ao final do dia.",
              },
            ].map((tier) => (
              <div
                key={tier.label}
                className="pl-4"
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
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-6 leading-relaxed">
            * As durações são médias da indústria e podem variar conforme a
            concentração do perfume (EDT, EDP ou Extrait) e a química da pele de
            cada pessoa.
          </p>
        </section>

        <section id="familias">
          <h2
            className="text-[24px] font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Famílias <em style={{ color: GOLD }}>olfativas</em>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Cada perfume pertence a uma ou mais famílias — categorias amplas que
            ajudam a entender o estilo geral da fragrância antes mesmo de sentir
            o cheiro.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {familias.map((f) => (
              <div key={f.nome} className="border border-gray-100 p-4">
                <p className="text-[13px] font-medium text-gray-800 mb-1">
                  {f.nome}
                </p>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="radar">
          <h2
            className="text-[24px] font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Perfil <em style={{ color: GOLD }}>radar</em>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            No modal de cada perfume você encontra um gráfico de 5 eixos — doce,
            amadeirado, cítrico, especiado e fresco — numa escala de 0 a 5. Ele
            resume a intensidade de cada característica, permitindo comparar
            dois perfumes rapidamente sem precisar ler a pirâmide completa.
          </p>
        </section>

        <section id="precos">
          <h2
            className="text-[24px] font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Sobre os <em style={{ color: GOLD }}>preços</em>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Os valores exibidos em cada dupe são médias de mercado brasileiro,
            baseadas em referências como o The King of Parfums e outros
            varejistas especializados. Eles servem como guia geral — o preço
            real pode variar por promoções, região e vendedor. Sempre confirme o
            valor atual antes de comprar.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
