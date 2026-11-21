import { AcervoError } from "./erros/AcervoError";
import { Reservavel } from "./interfaces/Reservavel";
import { ItemAcervo, StatusDisponibilidade } from "./model/ItemAcervo";
import { JogoEletronico } from "./model/JogoEletronico";
import { Livro } from "./model/Livro";
import { RepositorioMemoria } from "./repositorio/RepositorioMemoria";

const livros = new RepositorioMemoria<Livro>();
const jogos = new RepositorioMemoria<JogoEletronico>();

livros.adicionar(new Livro("Dom Casmurro", 1899, "Machado de Assis"));
livros.adicionar(new Livro("Vidas Secas", 1938, "Graciliano Ramos"));
livros.adicionar(new Livro("O Cortiço", 1890, "Aluísio Azevedo"));
jogos.adicionar(new JogoEletronico("Minecraft", 2011, "PC"));
jogos.adicionar(new JogoEletronico("Stardew Valley", 2016, "Nintendo Switch"));

function listarAcervo(): ItemAcervo[] {
    return [...livros.listar(), ...jogos.listar()];
}

function contarPorStatus(itens: ReadonlyArray<ItemAcervo>): Record<StatusDisponibilidade, number> {
    const contagem: Record<StatusDisponibilidade, number> = { "Disponível": 0, "Emprestado": 0 };
    itens.forEach((item) => contagem[item.statusDisponibilidade]++);
    return contagem;
}

function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function exibirAcervo(): void {
    const itens = listarAcervo();
    console.log("\n=== Itens do acervo ===");
    itens.forEach((item) => console.log(item.descrever()));

    const contagem = contarPorStatus(itens);
    console.log(`Disponíveis: ${contagem["Disponível"]} | Emprestados: ${contagem["Emprestado"]}`);
}

function realizarOperacao(descricao: string, operacao: () => void): void {
    try {
        operacao();
        console.log(`${descricao}: sucesso`);
    } catch (erro) {
        if (erro instanceof AcervoError) {
            console.log(`${descricao}: falhou [${erro.name}] - ${erro.message}`);
        } else {
            throw erro;
        }
    }
}

console.log(`Total de itens cadastrados: ${ItemAcervo.totalCadastrado}`);

exibirAcervo();

console.log("\n=== Empréstimos ===");
realizarOperacao("Emprestar livro 1", () => livros.buscarPorId(1).emprestar());
realizarOperacao("Emprestar livro 1 de novo", () => livros.buscarPorId(1).emprestar());
realizarOperacao("Emprestar jogo 4", () => jogos.buscarPorId(4).emprestar());
realizarOperacao("Devolver livro 2", () => livros.buscarPorId(2).devolver());
realizarOperacao("Emprestar jogo 99", () => jogos.buscarPorId(99).emprestar());

console.log("\n=== Reservas ===");
realizarOperacao("Reservar livro 1 para Ana", () => livros.buscarPorId(1).reservar("Ana"));
realizarOperacao("Reservar livro 1 para Bruno", () => livros.buscarPorId(1).reservar("Bruno"));
realizarOperacao("Cancelar reserva do livro 3", () => livros.buscarPorId(3).cancelarReserva());

const reservados: Reservavel[] = livros.filtrar((livro) => livro.estaReservado());
console.log(`Livros com reserva: ${reservados.length}`);

console.log("\n=== Atualização e remoção ===");
realizarOperacao("Atualizar ano do livro 2", () => livros.buscarPorId(2).atualizar({ anoPublicacao: 1947 }));
realizarOperacao("Atualizar título do livro 3 para vazio", () => livros.buscarPorId(3).atualizar({ titulo: "" }));
realizarOperacao("Remover jogo 5", () => jogos.remover(5));
realizarOperacao("Remover jogo 5 de novo", () => jogos.remover(5));

exibirAcervo();

const diasAtraso = 3;
console.log(`\n=== Multa por ${diasAtraso} dias de atraso ===`);
listarAcervo().forEach((item) => {
    console.log(`${item.titulo}: ${formatarMoeda(item.calcularMulta(diasAtraso))}`);
});

// Não compilam:
// new ItemAcervo("Teste", 2000);                         -> classe abstrata não pode ser instanciada
// livros.buscarPorId(1).id = 99;                         -> id só tem get (somente leitura)
// jogos.buscarPorId(4).reservar("Ana");                  -> JogoEletronico não implementa Reservavel
// livros.adicionar(new JogoEletronico("X", 2020, "PC")); -> RepositorioMemoria<Livro> só aceita Livro
