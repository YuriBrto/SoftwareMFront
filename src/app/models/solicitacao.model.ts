
import { Software } from './software.model';

import { Professor } from './professor.model';


export interface Solicitacao {
  id?: number;
  softwaresSolicitados: Software[];
  professor: Professor;
  lab: Lab;
  aprovada: boolean;
  statusInstalacao: 'INICIADA' | 'EM_ANDAMENTO' | 'FINALIZADA' | 'PENDENTE';
}

export interface SolicitacaoDTO {
  labId: number;
  softwaresIds: number[];
  professorId: number | null;
  dataInicioUso: string;
}
  // interfaces/lab.ts
export interface Lab {
    id: number;
    nome: string;
    status: boolean;
    softwares: { id: number, nome: string }[];  // Softwares relacionados
  }


