import { ItemAcervo } from "./model/ItemAcervo";

const domCasmurro = new ItemAcervo(1, "Dom Casmurro", 1899);
const vidasSecas = new ItemAcervo(2, "Vidas Secas", 1938);
const cortico = new ItemAcervo(3, "O Cortiço", 1890);
const minecraft = new ItemAcervo(4, "Minecraft", 2011);

const acervo: ItemAcervo[] = [domCasmurro, vidasSecas, cortico, minecraft];

function exibirAcervo(): void {
    console.log("\n=== Itens do acervo ===");
    acervo.forEach((item) => console.log(item.descrever()));

    const disponiveis = acervo.filter((item) => item.estaDisponivel());
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

exibirAcervo();

console.log("\n=== Operações ===");
realizarOperacao("Emprestar Dom Casmurro", () => domCasmurro.emprestar());
realizarOperacao("Emprestar Dom Casmurro de novo", () => domCasmurro.emprestar());
realizarOperacao("Emprestar O Cortiço", () => cortico.emprestar());
realizarOperacao("Devolver Vidas Secas", () => vidasSecas.devolver());

exibirAcervo();

// Não compilam, pois o estado está protegido:
// domCasmurro.id = 99;            -> id é readonly
// domCasmurro._disponivel = true; -> atributo privado
