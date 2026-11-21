export class ItemAcervo {
    private _disponivel: boolean = true;

    constructor(
        public readonly id: number,
        private _titulo: string,
        private _anoPublicacao: number
    ) {}

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

    estaDisponivel(): boolean {
        return this._disponivel;
    }

    descrever(): string {
        const status = this._disponivel ? "Disponível" : "Emprestado";
        return `[${this.id}] ${this._titulo} (${this._anoPublicacao}) - ${status}`;
    }
}
