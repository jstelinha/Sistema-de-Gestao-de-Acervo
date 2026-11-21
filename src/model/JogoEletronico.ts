import { ItemAcervo } from "./ItemAcervo";

export class JogoEletronico extends ItemAcervo {
    private static readonly TAXA_FIXA = 5;
    private static readonly MULTA_POR_DIA = 3;

    constructor(
        titulo: string,
        anoPublicacao: number,
        private _plataforma: string
    ) {
        super(titulo, anoPublicacao);
    }

    get plataforma(): string {
        return this._plataforma;
    }

    override calcularMulta(diasAtraso: number): number {
        if (diasAtraso <= 0) {
            return 0;
        }
        return JogoEletronico.TAXA_FIXA + diasAtraso * JogoEletronico.MULTA_POR_DIA;
    }

    override descrever(): string {
        return `${super.descrever()} | Jogo para ${this.plataforma}`;
    }
}
