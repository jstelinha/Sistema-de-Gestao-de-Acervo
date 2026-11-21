export class ItemAcervo {
    // Parameter Properties: os modificadores no construtor declaram
    // e inicializam os atributos da classe automaticamente.
    constructor(
        public id: number,
        public titulo: string,
        public anoPublicacao: number,
        public disponivel: boolean = true
    ) {}

    descrever(): string {
        const status = this.disponivel ? "Disponível" : "Emprestado";
        return `[${this.id}] ${this.titulo} (${this.anoPublicacao}) - ${status}`;
    }
}
