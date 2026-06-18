import LegalPage from "../components/LegalPage";

export default function ContatoPage() {
  return (
    <LegalPage eyebrow="Fale com a gente" title="Contato">
      <p>
        Encontrou um dado incorreto, tem uma sugestão de perfume para
        catalogarmos ou só quer trocar uma ideia sobre perfumaria? Adoraríamos
        ouvir você.
      </p>
      <div className="border border-gray-100 p-5 not-prose">
        <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 mb-1">
          E-mail
        </p>
        <a
          href="mailto:contato@dupescent.com"
          className="text-sm text-gray-800 hover:text-yellow-700 transition-colors"
        >
          contato@dupescent.com
        </a>
      </div>
      <p className="text-[12px] text-gray-400">
        Respondemos em até 2 dias úteis.
      </p>
    </LegalPage>
  );
}
