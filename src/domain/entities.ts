export class Client {
  constructor(
    readonly id: number,
    readonly nome: string,
    readonly cpf: string
  ) {}
}

export class Item {
  readonly id: string;

  constructor(
    readonly produto: string,
    readonly variedade: string,
    readonly pais: string,
    readonly categoria: string,
    readonly safra: number,
    readonly preco: number,
    readonly codigo?: string
  ) {
    this.id = codigo || `${produto}-${variedade}-${safra}-${categoria}-${pais}`;
  }
}

export class Purchase {
  codigo: string;
  data: Date;
  cliente: number;
  items: Item[];
  valorTotal: number;
}
