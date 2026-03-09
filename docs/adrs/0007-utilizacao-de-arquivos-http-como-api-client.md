# ADR 0005: Utilização de Arquivos .http para os Mocks e Clients de API

**Data:** 2024-02

## Contexto

Como em qualquer API moderna, precisávamos de coleções de recursos eficientes para simular Requisições/Rotas de forma ágil que não dependessem de importações problemáticas em clientes e aplicativos externos como as coleções do Postman e Insomnia.

## Decisão

Adotar e versionar arquivos diretos `.http` (ex: `userRouter.http`, `agentsRouter.http`) dentro da árvore de `src/infrastructure/api/routes`.

## Consequências

O controle das collections fica em conjunto na branch exata em que ocorre a atualização de endpoint, validável nativamente (Rest Client/IntelliJ). Facilita o consumo imediato com muito menos fricção para realizar mocks no desenvolvimento ágil de novas rotas.
