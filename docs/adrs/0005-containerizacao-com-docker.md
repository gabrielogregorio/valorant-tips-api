# ADR 0004: Containerização com Docker

**Data:** 2024-02

## Contexto

A manutenção da base de dados e ambiente local era muito sensível às versões variadas do Node em cada máquina. Testes integrados e de E2E sofriam porque necessitavam da injeção de conexões ativas idênticas àquelas de produção e o on-boarding ficava difícil ("funciona na minha máquina").

## Decisão

Incorporar o uso oficial do Docker via `Dockerfile` e gerência de mocks em scripts para orquestrar os serviços rodando o ambiente NodeJS limpo por contêiner.

## Consequências

Isolamento profundo da API aprimorando muito o setup. Como lado negativo, passou a consumir mais capacidade da máquina dos programadores rodando virtualizações e adicionou uma camada extra a ser diagnosticada em caso de erros no ambiente.
