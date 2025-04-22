export interface Software {
    id: number;
    nome: string;
    link: string;
    versao: string;
    softwareLivre: boolean;
    dataSolicitacao: string;
    solicitadoPor: {
      username: string;
      name: string;
    };
  }
  