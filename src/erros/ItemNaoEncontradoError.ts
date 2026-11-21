import { AcervoError } from "./AcervoError";

export class ItemNaoEncontradoError extends AcervoError {
    constructor(id: number) {
        super(`Nenhum item encontrado com o id ${id}.`);
    }
}
