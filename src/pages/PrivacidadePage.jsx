import LegalPage from "../components/LegalPage";

export default function PrivacidadePage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Política de"
      titleEm="privacidade"
      updatedAt="17 de junho de 2026"
    >
      <p>
        Esta política explica quais dados coletamos e como eles são usados ao
        navegar no DupeScent.
      </p>

      <p className="font-medium text-gray-800">1. Dados que coletamos</p>
      <p>
        Não exigimos cadastro para usar o site. Coletamos apenas dados técnicos
        básicos de navegação (como páginas visitadas) para fins de análise de
        uso e melhoria do produto.
      </p>

      <p className="font-medium text-gray-800">2. Cookies</p>
      <p>
        Podemos usar cookies essenciais para o funcionamento do site. Nenhum
        cookie de rastreamento publicitário é utilizado atualmente.
      </p>

      <p className="font-medium text-gray-800">3. Compartilhamento de dados</p>
      <p>
        Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros
        para fins comerciais.
      </p>

      <p className="font-medium text-gray-800">4. Contato sobre privacidade</p>
      <p>
        Dúvidas sobre esta política podem ser enviadas para{" "}
        <a href="mailto:contato@dupescent.com" className="text-yellow-700">
          contato@dupescent.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
