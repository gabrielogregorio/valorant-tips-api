# ADR 0008: Adoção e Aplicação de Conventional Commits

**Data:** 2022-12 e reforçado 2025-03

## Contexto

Nos relatórios retrospectivos e ao iterar nas migrations (subida de `v2` pra `v3`), o histórico do git estava inconsistente. Commits puramente semânticos misturados como fixes de build atrapalhavam o traqueio contínuo e a inteligibilidade do Git.

## Decisão

Introduzir obrigatoriedade por Commitlint + Husky nos fluxos do repo em Dez/22 e posteriormente embutir o plugin de CLI "Commitizen" (Mar/25) para padronizar obrigatoriamente logs estruturados ("feat", "refactor", "chore", etc).

## Consequências

O projeto obteve excelência máxima de rastreabilidade de logs por meio de fluxos contínuos nas Github Actions para controle de versão (`release` automáticas no CI). Obriga todavia novos participantes do repositório a entender as flags obrigatórias de push e não burlarem as regras locais.
