import LegalPage from "../components/LegalPage";

export default function TermosPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Termos de"
      titleEm="uso"
      updatedAt="17 de junho de 2026"
    >
      <p>
        Ao acessar e usar o DupeScent, você concorda com os termos descritos
        abaixo. Caso não esteja de acordo, recomendamos não utilizar o site.
      </p>

      <p className="font-medium text-gray-800">1. Natureza do conteúdo</p>
      <p>
        O DupeScent é um guia informativo independente sobre alternativas de
        perfumes ("dupes"). Não vendemos, fabricamos ou distribuímos nenhum dos
        produtos mencionados — apenas catalogamos informações públicas e
        curadoria própria sobre similaridade olfativa.
      </p>

      <p className="font-medium text-gray-800">2. Marcas e nomes comerciais</p>
      <p>
        Todos os nomes de marcas e perfumes originais citados pertencem aos seus
        respectivos detentores e são usados exclusivamente para fins de
        referência, comparação e identificação — sem qualquer afiliação,
        patrocínio ou endosso.
      </p>

      <p className="font-medium text-gray-800">3. Precisão das informações</p>
      <p>
        Scores de similaridade, preços médios e descrições olfativas são
        baseados em curadoria própria e fontes públicas, podendo conter
        imprecisões. Não garantimos que a experiência olfativa será idêntica
        entre original e dupe — percepção de cheiro é subjetiva e varia por
        pessoa.
      </p>

      <p className="font-medium text-gray-800">4. Preços</p>
      <p>
        Os valores exibidos são médias de mercado e meramente referenciais. Não
        processamos pagamentos nem vendemos produtos diretamente.
      </p>

      <p className="font-medium text-gray-800">5. Alterações</p>
      <p>
        Estes termos podem ser atualizados periodicamente. O uso continuado do
        site após alterações implica aceitação dos novos termos.
      </p>
    </LegalPage>
  );
}
