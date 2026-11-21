import { ItemAcervo } from "./model/ItemAcervo";

// Coleção do acervo: um array de objetos ItemAcervo
const acervo: ItemAcervo[] = [];

acervo.push(new ItemAcervo(1, "Dom Casmurro", 1899));
acervo.push(new ItemAcervo(2, "Vidas Secas", 1938));
acervo.push(new ItemAcervo(3, "O Cortiço", 1890, false));
acervo.push(new ItemAcervo(4, "Minecraft", 2011));

console.log("=== Itens do acervo ===");
acervo.forEach((item) => console.log(item.descrever()));

// filter: retorna um novo array só com os itens que passam no teste
const disponiveis: ItemAcervo[] = acervo.filter((item) => item.disponivel);
console.log(`\nItens disponíveis: ${disponiveis.length} de ${acervo.length}`);

// map: transforma cada objeto em outro valor (aqui, só o título)
const titulos: string[] = acervo.map((item) => item.titulo);
console.log(`Títulos cadastrados: ${titulos.join(", ")}`);

// find: retorna o primeiro item encontrado ou undefined
const itemBuscado: ItemAcervo | undefined = acervo.find((item) => item.id === 2);

if (itemBuscado) {
    console.log(`\nItem encontrado pelo id 2: ${itemBuscado.descrever()}`);
} else {
    console.log("\nNenhum item encontrado com o id 2.");
}
