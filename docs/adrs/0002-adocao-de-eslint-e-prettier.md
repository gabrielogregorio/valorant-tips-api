# ADR 0002: Adoção de ESLint e Prettier

**Data:** 2021-11

## Contexto

Com o crescimento do repositório, observávamos inconsistências de formatação e análise estática manual muito fraca. O projeto no backend carecia de um padrão rígido, gerando divergências não capturadas logo na etapa de pull requests.

## Decisão

Integrar extensivamente o ESLint para garantir a qualidade de regras estáticas e aderência a melhores práticas na organização do código, juntamente e de forma encadeada com o Prettier, automatizando a formatação dos arquivos da API.

## Consequências

O projeto obteve um código estritamente uniforme e visualmente mais limpo, minimizando falsas falhas de CI por conta de estilos diferentes, trocando isso por pequenas imposições (regras de estilo) configuradas a toda a equipe.
