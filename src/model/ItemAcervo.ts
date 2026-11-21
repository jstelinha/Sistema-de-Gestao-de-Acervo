import { OperacaoInvalidaError } from "../erros/OperacaoInvalidaError";

export type StatusDisponibilidade = "Disponível" | "Emprestado";

export type DadosAtualizacao = Partial<Pick<ItemAcervo, "titulo" | "anoPublicacao">>;

export abstract class ItemAcervo {
    private static _contadorId: number = 0;

    private readonly _id: number;
    private _disponivel: boolean = true;

    constructor(
        private _titulo: string,
        private _anoPublicacao: number
    ) {
        this._id = ++ItemAcervo._contadorId;
    }

    static get totalCadastrado(): number {
        return ItemAcervo._contadorId;
    }

    get id(): number {
        return this._id;
    }

    get titulo(): string {
        return this._titulo;
    }

    get anoPublicacao(): number {
        return this._anoPublicacao;
    }

    get disponivel(): boolean {
        return this._disponivel;
    }

    get statusDisponibilidade(): StatusDisponibilidade {
        return this._disponivel ? "Disponível" : "Emprestado";
    }

    abstract calcularMulta(diasAtraso: number): number;

    emprestar(): void {
        if (!this._disponivel) {
            throw new OperacaoInvalidaError(`O item "${this._titulo}" já está emprestado.`);
        }
        this._disponivel = false;
    }

    devolver(): void {
        if (this._disponivel) {
            throw new OperacaoInvalidaError(`O item "${this._titulo}" não está emprestado.`);
        }
        this._disponivel = true;
    }

    atualizar(dados: DadosAtualizacao): void {
        if (dados.titulo !== undefined && dados.titulo.trim() === "") {
            throw new OperacaoInvalidaError("O título não pode ficar vazio.");
        }
        this._titulo = dados.titulo ?? this._titulo;
        this._anoPublicacao = dados.anoPublicacao ?? this._anoPublicacao;
    }

    descrever(): string {
        return `[${this.id}] ${this.titulo} (${this.anoPublicacao}) - ${this.statusDisponibilidade}`;
    }
}
