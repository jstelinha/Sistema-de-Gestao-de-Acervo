import { ItemNaoEncontradoError } from "../erros/ItemNaoEncontradoError";
import { OperacaoInvalidaError } from "../erros/OperacaoInvalidaError";
import { Identificavel } from "../interfaces/Identificavel";

export class RepositorioMemoria<T extends Identificavel> {
    private _itens: T[] = [];

    adicionar(item: T): void {
        if (this._itens.some((existente) => existente.id === item.id)) {
            throw new OperacaoInvalidaError(`Já existe um item com o id ${item.id}.`);
        }
        this._itens.push(item);
    }

    buscarPorId(id: number): T {
        const item = this._itens.find((existente) => existente.id === id);
        if (!item) {
            throw new ItemNaoEncontradoError(id);
        }
        return item;
    }

    listar(): ReadonlyArray<T> {
        return [...this._itens];
    }

    filtrar(criterio: (item: T) => boolean): T[] {
        return this._itens.filter(criterio);
    }

    remover(id: number): void {
        const indice = this._itens.findIndex((item) => item.id === id);
        if (indice === -1) {
            throw new ItemNaoEncontradoError(id);
        }
        this._itens.splice(indice, 1);
    }
}
