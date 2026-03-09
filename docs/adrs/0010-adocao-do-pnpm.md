# ADR 0009: Adoções Históricas de Gerenciadores de Pacote (Yarn e PNPM)

**Data:** Yarn (2021) -> PNPM (2026-02)

## Contexto

O gerenciamento de dependências do projeto historicamente utilizava o `yarn` (como evidenciado pelo antigo `yarn.lock` desde 2021). O Yarn foi escolhido frente ao NPM da época pela maior velocidade e travamento consistente da árvore de dependências.

No entanto, no início de 2026, com a evolução do projeto e a necessidade de rodar pipelines de CI/CD mais rápidas, além de isolar o modelo de pacotes de forma robusta e limpa no ambiente Docker integrado, o node_modules plano começava a apresentar gargalos de performance e uso excessivo de disco.

## Decisão

Migrar o gerenciador de pacotes padrão do projeto do `yarn` legaddo para o `pnpm`, impondo restrições rígidas de uso baseadas no campo `"engines": {"pnpm": ">=10.x"}` do `package.json` para garantir o uso da ferramenta correta em todo o time.

## Consequências

**Positivas (do PNPM):**

- O `pnpm` introduziu uma forma racional de armazenamento usando _hardlinks_, o que diminuiu drasticamente o tempo de instalação nas Actions do Github e evita reinstalações das mesmas bibliotecas.
- O workspace consome menos espaço em disco no desenvolvimento local.
- Menos dependências fantasmas (_phantom dependencies_), já que a estrutura agora é um _symlink_ estrito.

**Negativas:**

- Exigiu a atualização e quebra de alguns scripts e de ferramentas que esperavam que as dependências indiretas fossem "hoisted" (elevadas) acidentalmente pelo Yarn.
- Obriga todos do time e processos de CI a adotarem o PNPM (`npm install -g pnpm`) para rodar e contribuir, além de limpar os caches velhos do Yarn.
