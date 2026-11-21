import { ItemAcervo } from "./model/ItemAcervo";
import { JogoEletronico } from "./model/JogoEletronico";
import { Livro } from "./model/Livro";

const domCasmurro = new Livro("Dom Casmurro", 1899, "Machado de Assis");
const vidasSecas = new Livro("Vidas Secas", 1938, "Graciliano Ramos");
const cortico = new Livro("O Cortiço", 1890, "Aluísio Azevedo");
const minecraft = new JogoEletronico("Minecraft", 2011, "PC");
const stardewValley = new JogoEletronico("Stardew Valley", 2016, "Nintendo Switch");

const acervo: ItemAcervo[] = [domCasmurro, vidasSecas, cortico, minecraft, stardewValley];

function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function exibirAcervo(): void {
    console.log("\n=== Itens do acervo ===");
    acervo.forEach((item) => console.log(item.descrever()));

    const disponiveis = acervo.filter((item) => item.disponivel);
    console.log(`Disponíveis: ${disponiveis.length} de ${acervo.length}`);
}

function realizarOperacao(descricao: string, operacao: () => void): void {
    try {
        operacao();
        console.log(`${descricao}: sucesso`);
    } catch (erro) {
        if (erro instanceof Error) {
            console.log(`${descricao}: falhou - ${erro.message}`);
        }
    }
}

console.log(`Total de itens cadastrados: ${ItemAcervo.totalCadastrado}`);

exibirAcervo();

console.log("\n=== Operações ===");
realizarOperacao("Emprestar Dom Casmurro", () => domCasmurro.emprestar());
realizarOperacao("Emprestar Dom Casmurro de novo", () => domCasmurro.emprestar());
realizarOperacao("Emprestar Minecraft", () => minecraft.emprestar());
realizarOperacao("Devolver Vidas Secas", () => vidasSecas.devolver());

exibirAcervo();

const diasAtraso = 3;
console.log(`\n=== Multa por ${diasAtraso} dias de atraso ===`);
acervo.forEach((item) => {
    console.log(`${item.titulo}: ${formatarMoeda(item.calcularMulta(diasAtraso))}`);
});

// Não compilam:
// new ItemAcervo("Teste", 2000);  -> classe abstrata não pode ser instanciada
// domCasmurro.id = 99;            -> id só tem get (somente leitura)
// domCasmurro._disponivel = true; -> atributo privado
