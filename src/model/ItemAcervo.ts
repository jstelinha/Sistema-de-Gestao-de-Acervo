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

    get statusDisponibilidade(): string {
        return this._disponivel ? "Disponível" : "Emprestado";
    }

    abstract calcularMulta(diasAtraso: number): number;

    emprestar(): void {
        if (!this._disponivel) {
            throw new Error(`O item "${this._titulo}" já está emprestado.`);
        }
        this._disponivel = false;
    }

    devolver(): void {
        if (this._disponivel) {
            throw new Error(`O item "${this._titulo}" não está emprestado.`);
        }
        this._disponivel = true;
    }

    descrever(): string {
        return `[${this.id}] ${this.titulo} (${this.anoPublicacao}) - ${this.statusDisponibilidade}`;
    }
}
