export interface LegalSeoViewModel {
  title: string;
  description: string;
}

export interface LegalSectionViewModel {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalDocumentViewModel {
  title: string;
  lastUpdatedLabel: string;
  seo: LegalSeoViewModel;
  sections: LegalSectionViewModel[];
}

const lastUpdatedLabel = "9 de junho de 2026";

export const getPrivacyPageViewModel = (): LegalDocumentViewModel => ({
  title: "Política de Privacidade",
  lastUpdatedLabel,
  seo: {
    title: "Política de Privacidade | Nobu",
    description: "Conheça as diretrizes de privacidade do Nobu."
  },
  sections: [
    {
      id: "introducao",
      heading: "1. Introdução",
      paragraphs: [
        "Esta política descreve como o Nobu trata informações em suas experiências digitais.",
        "O produto prioriza minimização de dados, segurança e transparência para famílias."
      ]
    },
    {
      id: "dados",
      heading: "2. Dados e segurança",
      paragraphs: [
        "Coletamos apenas informações necessárias para entregar a experiência contratada.",
        "Dados sensíveis não devem ser compartilhados com terceiros sem base apropriada."
      ]
    }
  ]
});

export const getTermsPageViewModel = (): LegalDocumentViewModel => ({
  title: "Termos de Uso",
  lastUpdatedLabel,
  seo: {
    title: "Termos de Uso | Nobu",
    description: "Leia os termos de uso do Nobu."
  },
  sections: [
    {
      id: "aceitacao",
      heading: "1. Aceitação",
      paragraphs: [
        "Ao acessar o Nobu, você concorda com estes termos e com as políticas aplicáveis.",
        "Se não concordar com os termos, não utilize os serviços."
      ]
    },
    {
      id: "uso",
      heading: "2. Uso adequado",
      paragraphs: [
        "A experiência deve ser usada de forma responsável e compatível com sua finalidade.",
        "Podemos atualizar estes termos para refletir mudanças de produto ou requisitos legais."
      ]
    }
  ]
});
