import { OperacaoInvalidaError } from "../erros/OperacaoInvalidaError";
import { Reservavel } from "../interfaces/Reservavel";
import { ItemAcervo } from "./ItemAcervo";

export class Livro extends ItemAcervo implements Reservavel {
    private static readonly MULTA_POR_DIA = 1.5;

    private _reservadoPor: string | null = null;

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

    get reservadoPor(): string | null {
        return this._reservadoPor;
    }

    reservar(nomeUsuario: string): void {
        if (nomeUsuario.trim() === "") {
            throw new OperacaoInvalidaError("O nome do usuário é obrigatório para reservar.");
        }
        if (this._reservadoPor !== null) {
            throw new OperacaoInvalidaError(`O livro "${this.titulo}" já está reservado para ${this._reservadoPor}.`);
        }
        this._reservadoPor = nomeUsuario;
    }

    cancelarReserva(): void {
        if (this._reservadoPor === null) {
            throw new OperacaoInvalidaError(`O livro "${this.titulo}" não possui reserva.`);
        }
        this._reservadoPor = null;
    }

    estaReservado(): boolean {
        return this._reservadoPor !== null;
    }

    override calcularMulta(diasAtraso: number): number {
        if (diasAtraso <= 0) {
            return 0;
        }
        return diasAtraso * Livro.MULTA_POR_DIA;
    }

    override descrever(): string {
        const reserva = this.estaReservado() ? ` | Reservado para ${this._reservadoPor}` : "";
        return `${super.descrever()} | Livro de ${this.autor}${reserva}`;
    }
}
