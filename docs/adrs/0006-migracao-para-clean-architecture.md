# ADR 0006: Migração Fundamental para Clean Architecture

**Data:** 2024-10

## Contexto

Originalmente estruturado no modelo clássico (fortemente atrelado à implementação de APIs Express em controllers maciços ou services inchados), o código do domínio (negócios e regras específicas de Valorant e validação de Posts) acumulou altíssimo acoplamento.

## Decisão

Iniciar a refatoração drástica e progressiva da API para a "Clean Architecture", subdividindo o projeto categoricamente em pastas como `domain`, `application/contexts/useCases`, e `infrastructure`.

## Consequências

Separamos ativamente os frameworks do banco do modelo real, o que tornou testes e mapeamentos extremamente simples e independentes. A penalidade foi a explosão do número de arquivos, complexidade das injeções de repositórios, de uso de presenters, e uso de interfaces em todas as fronteiras (overhead arquitetural).
