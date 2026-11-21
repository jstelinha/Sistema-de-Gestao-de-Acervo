# Sistema de Gestão de Acervo

Sistema simples para gerenciar um acervo de livros e jogos eletrônicos (empréstimo, devolução, reserva e cálculo de multa), desenvolvido em TypeScript com Programação Orientada a Objetos.

## Como executar

É necessário ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install      # instala as dependências
npm run dev      # executa direto com ts-node
npm run build    # compila com tsc para a pasta dist/
npm start        # executa o código compilado
```

## Estrutura

```
src/
├── erros/          exceções personalizadas
├── interfaces/     Reservavel e Identificavel
├── model/          ItemAcervo, Livro e JogoEletronico
├── repositorio/    RepositorioMemoria<T>
└── index.ts        demonstração do sistema
```

## Conceitos aplicados

1. **Configuração:** `tsconfig.json` com `"strict": true` e pastas `src/` e `dist/`.
2. **Classes e construtores:** Parameter Properties e arrays de objetos.
3. **Encapsulamento:** atributos `private`, `id` `readonly` e os métodos `emprestar()` e `devolver()` com validação.
4. **Acessores e membros estáticos:** `get statusDisponibilidade` e o contador `private static _contadorId`.
5. **Herança:** classe abstrata `ItemAcervo` com as subclasses `Livro` e `JogoEletronico`, que usam `override` em `calcularMulta()`.
6. **Interfaces:** `Reservavel`, implementada em `Livro`.
7. **Generics, Utility Types e Exceções:** `RepositorioMemoria<T>`, `Partial`, `Pick`, `Record`, `ReadonlyArray` e as exceções `AcervoError`, `ItemNaoEncontradoError` e `OperacaoInvalidaError`.
