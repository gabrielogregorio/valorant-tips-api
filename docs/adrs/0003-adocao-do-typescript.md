# ADR 0003: Adoção do TypeScript

**Data:** 2022-04

## Contexto

A API foi iniciada primariamente em JavaScript. Ao ganharmos novos requisitos, regras de negócio complexas, interfaces e integrações mais verbosas (como dados estruturados dos mapas e upload multipartes), percebemos alto volume de bugs de tipagem resolvidos em execução (runtime).

## Decisão

Migrar massivamente e assumir o TypeScript como núcleo padronizado do projeto JS/Node no backend (iniciado progressivamente na branch de Abril de 2022).

## Consequências

Envolveu um custo inicial severo de reescrita/renomeação e refatoração de setups como ts-node, porém assegurou uma camada autocompletável para desenvolvedores e segurança muito maior nas entidades principais sem quebrar serviços de produção.
