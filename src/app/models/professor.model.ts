export interface Type {
  id: number;
  nome: string;
}

export class Professor {
  id?: number;
  nome!: string;
  escola!: string;
  tipo!: { id: number };
  senha!: string;  // Adicionado campo de senha
}
