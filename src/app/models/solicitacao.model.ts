
import { Software } from './software.model';

import { Professor } from './professor.model';


export interface Solicitacao {
    id?: number;
    softwaresSolicitados: Software[];
    professor: Professor;
    lab: Lab;
    aprovada: boolean;
    statusInstalacao: 'INICIADA' | 'EM_ANDAMENTO' | 'FINALIZADA';
  }
  
  export interface SolicitacaoDTO {
    softwaresIds: number[];
    professorId: number;
    labId: number;
  }
  // interfaces/lab.ts
export interface Lab {
    id: number;
    nome: string;
    status: boolean;
    softwares: { id: number, nome: string }[];  // Softwares relacionados
  }
  
  