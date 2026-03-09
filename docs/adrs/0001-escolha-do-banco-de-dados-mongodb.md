# ADR 0001: Escolha do Banco de Dados MongoDB

**Data:** 2021-09

## Contexto

No início do projeto, sabíamos que lidaríamos com sugestões, dicas de mapas, configurações de agentes e tags que poderiam mudar em estrutura constantemente com as atualizações do jogo. Precisávamos de um banco de dados flexível logo de início.

## Decisão

Adotar o MongoDB (via Mongoose) como banco de dados NoSQL principal da aplicação desde os primeiros commits, priorizando dados em documentos JSON ágeis.

## Consequências

Ganhamos extrema agilidade no desenvolvimento iterativo inicial com schemas flexíveis. No entanto, passou a exigir mais controle no design e relacionamentos diretamente na camada de aplicação.
