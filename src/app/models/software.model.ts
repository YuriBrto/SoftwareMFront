export interface Software {
    id: number;
    nome: string;
    link: string;
    versao: string;
    descricao?: string;
    selected?: boolean; // usado temporariamente no formulário
    softwareLivre: boolean;
    dataSolicitacao: string;
    solicitadoPor: {
      username: string;
      name: string;
    };
  }
  