import LegalPage from "../components/LegalPage";
import SEO from "../components/SEO";

export default function SobrePage() {
  return (
    <>
      <SEO
        title="Sobre"
        description="Conheça o DupeScent — o guia definitivo de dupes de perfume com curadoria e score de similaridade."
        path="/sobre"
      />
      <LegalPage eyebrow="Quem somos" title="Sobre o" titleEm="DupeScent">
        <p>
          O DupeScent nasceu de uma frustração simples: perfumes de nicho e de
          luxo custam caro, mas a alquimia que existe dentro de cada frasco — a
          combinação exata de notas que cria aquela fragrância única — não é
          segredo. Existe um mercado inteiro dedicado a recriar essas
          combinações com fidelidade impressionante, por uma fração do preço.
        </p>
        <p>
          Nosso trabalho é catalogar, testar e comparar essas alternativas com
          rigor. Cada dupe listado aqui passa por uma curadoria que considera a
          pirâmide olfativa, a família olfativa e o consenso da comunidade de
          entusiastas de perfumaria antes de receber um score de similaridade.
        </p>
        <p>
          Não somos afiliados a nenhuma das marcas mencionadas neste site. Todos
          os nomes de perfumes originais são usados apenas para fins de
          referência e comparação.
        </p>
      </LegalPage>
    </>
  );
}
