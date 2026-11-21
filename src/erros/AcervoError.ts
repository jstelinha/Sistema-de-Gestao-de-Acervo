export class AcervoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
    }
}
