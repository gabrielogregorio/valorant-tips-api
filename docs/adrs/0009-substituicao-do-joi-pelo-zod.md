# ADR 0007: Substituição Absoluta do Joi pelo Zod

**Data:** 2024-11

## Contexto

Usávamos a biblioteca `Joi` tradicional em JS para construir validators, o que requeria constantes alinhamentos assíncronos manuais. Ao migrar a plataforma e a base da API para tipagens de segurança estáticas exigentes pela Clean Architecture, manter as types JS do Joi se tornou obsoleto.

## Decisão

Substituir universalmente o `Joi` pelo esquema em `Zod` nas camadas de validator Types, Factories de validação em entidades de domínio, requisições de controllers e responses (em ValueObjects e Middlewares).

## Consequências

Pudemos derivar a própria inferência de tipos do esquema usando `z.infer`, o que significa evitar tipagens redundantes e promover single-source-of-truth entre a interface TypeScript da entidade, e seu validador em tempo de execução sem dependências verbosas extras.
