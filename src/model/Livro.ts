import { ItemAcervo } from "./ItemAcervo";

export class Livro extends ItemAcervo {
    private static readonly MULTA_POR_DIA = 1.5;

    constructor(
        titulo: string,
        anoPublicacao: number,
        private _autor: string
    ) {
        super(titulo, anoPublicacao);
    }

    get autor(): string {
        return this._autor;
    }

    override calcularMulta(diasAtraso: number): number {
        if (diasAtraso <= 0) {
            return 0;
        }
        return diasAtraso * Livro.MULTA_POR_DIA;
    }

    override descrever(): string {
        return `${super.descrever()} | Livro de ${this.autor}`;
    }
}
