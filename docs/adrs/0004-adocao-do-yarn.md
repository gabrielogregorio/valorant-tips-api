# ADR 0009: Adoção do PNPM como Gerenciador de Pacotes

**Data:** 2022-06

## Contexto

O gerenciamento de pacotes contava com grande uso do `yarn`, como comprovado pelo `yarn.lock` histórico. Porém, visando performances massivas e deduplicação de módulos em contêiners da IDE e nos workflows da esteira de CI/CD.

## Decisão

Migrar a base oficial para instâncias nativas do Node gerenciadas primordialmente usando `pnpm`, impondo restrições rígidas baseadas nas tags do objeto `"engines": {"pnpm": ">=10.x"}` do package.json.

## Consequências

Cria um armazenamento mais racional com hardlinks nativos, derrubando o peso oculto da `node_modules`. No entanto, requererá a exclusão contínua para evitar bloqueios ao tentar instalar através do Yarn em workspaces que não estejam configurados devidamente com a nova CLI do pnpm.
