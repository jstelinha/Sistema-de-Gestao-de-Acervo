import { ItemAcervo } from "./model/ItemAcervo";

const domCasmurro = new ItemAcervo("Dom Casmurro", 1899);
const vidasSecas = new ItemAcervo("Vidas Secas", 1938);
const cortico = new ItemAcervo("O Cortiço", 1890);
const minecraft = new ItemAcervo("Minecraft", 2011);

const acervo: ItemAcervo[] = [domCasmurro, vidasSecas, cortico, minecraft];

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
console.log(`Títulos: ${acervo.map((item) => item.titulo).join(", ")}`);

exibirAcervo();

console.log("\n=== Operações ===");
realizarOperacao("Emprestar Dom Casmurro", () => domCasmurro.emprestar());
realizarOperacao("Emprestar Dom Casmurro de novo", () => domCasmurro.emprestar());
realizarOperacao("Emprestar O Cortiço", () => cortico.emprestar());
realizarOperacao("Devolver Vidas Secas", () => vidasSecas.devolver());

exibirAcervo();

console.log(`\nStatus de "${domCasmurro.titulo}": ${domCasmurro.statusDisponibilidade}`);

// Não compilam, pois o estado está protegido:
// domCasmurro.id = 99;            -> id só tem get (somente leitura)
// domCasmurro._disponivel = true; -> atributo privado
