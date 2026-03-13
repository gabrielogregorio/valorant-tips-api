<div align="center">
  <img height="30" alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img height="30" alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img height="30" alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  <img height="30" alt="Express.js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
</div>

<div align="center">
  <img src="https://img.shields.io/github/stars/gabrielogregorio/vavatips-api" alt="GitHub stars">
  <img src="https://img.shields.io/github/last-commit/gabrielogregorio/vavatips-api?style=flat-square" alt="GitHub last commit">
  <img src="https://img.shields.io/github/contributors/gabrielogregorio/vavatips-api" alt="GitHub contributors"> 
  <img src="https://img.shields.io/github/languages/count/gabrielogregorio/vavatips-api" alt="GitHub language count">
  <img src="https://img.shields.io/github/repo-size/gabrielogregorio/vavatips-api" alt="GitHub repo size">
  <br>
  <a href="https://www.codacy.com/gh/gabrielogregorio/valorant-tips-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gabrielogregorio/valorant-tips-api&utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/7b87ad678dc34a92b1f1a7dea10d1f9e" alt="Codacy Badge">
  </a>
  <a href="https://www.codacy.com/gh/gabrielogregorio/valorant-tips-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gabrielogregorio/valorant-tips-api&utm_campaign=Badge_Coverage">
    <img src="https://app.codacy.com/project/badge/Coverage/7b87ad678dc34a92b1f1a7dea10d1f9e" alt="Codacy Coverage">
  </a>
</div>

# Valorant Tips API

Essa é a API back-end para o projeto [Valorant Tips](https://github.com/gabrielogregorio/valorant-tips). Ela fornece uma base robusta para gerenciar e distribuir conteúdo focado na comunidade.

[Link do Kanban do Projeto](https://github.com/users/gabrielogregorio/projects/15)

## Documentação da API

A documentação interativa segue os padrões do OpenAPI (Swagger/Scalar) e pode ser acessada visualmente através da nossa interface gerada:

👉 **[Acesse a Documentação da API](https://valorant-tips-api.onrender.com/docs/)**

## Tech Stack

- **Linguagem**: TypeScript & Node.js 22+
- **Framework Web**: Express.js
- **Banco de Dados**: MongoDB (via Mongoose)
- **Gerenciador de Pacotes**: pnpm
- **Infra e Deploy**: Docker & Docker Compose
- **Documentação Automática**: Zod + OpenAPI.

## Preparando o ambiente localmente

Recomendamos as seguintes configurações a nível de host de desenvolvimento:

- **Sistema Operacional**: Ubuntu/Linux
- **Make**: 4.3+
- **Docker**: 29.2.1+
- **Docker Compose**: v5.1.0+

### Como Rodar (Getting Started)

Não se preocupe com arquivos `.env` manuais ou scripts complexos para o setup inicial. Tudo o que você precisa saber está neste README, e o **Make** cuidará da orquestração do ambiente.

1. **Subir os serviços principais:**
   Execute o container da API e do MongoDB automaticamente:
   ```bash
   make dev
   ```

2. **Acompanhar os logs:**
   Para acompanhar os logs do backend rodando no docker:
   ```bash
   make log
   ```

A API ficará disponível em: **`http://localhost:3333`**

*(Você pode explorar o `package.json` e o `Makefile` para encontrar mais comandos úteis).*

## Testes

Para executar toda a suíte de testes automatizados da aplicação de forma padronizada, basta rodar o comando abaixo:

```bash
make test
```

## Arquitetura

Nós alinhamos os princípios do **Domain Driven Design (DDD)** com os da **Clean Architecture** para manter o código testável, isolado e fácil de manter.

```text
src/
├── domain/          # Entidades (objetos focados no core business sem expor detalhes pro banco)
├── application/     # Casos de uso (Orquestradores de ações de forma desacoplada)
├── infrastructure/  # Configuração de rotas de API, mapeamento Rest e framework
└── shared/          # Classes úteis compartilhadas (erros, construtores http)
```

**Conceitos Principais:**
- **Entidades:** São objetos de domínio (ex: Usuário, Post, Agente). Elas não sabem onde estão armazenadas nem qual framework usamos, vivem completamente isoladas do mundo exterior.
- **Repositórios:** Assinaturas e implementações da persistência da nossa camada de Domain. Eles possuem métodos centralizados e puros de interação com a Base de Dados (ex: `save`, `findAll`, `delete`).
- **UseCases:** Atuam como orquestradores das ações. Eles implementam a lógica e regras de negócio da aplicação entrelaçando requisições dos Controllers ao Domínio.

## Extras & Desenvolvimento

### Formas de Testar a API Manualmente
Você tem duas opções preferenciais para interagir e testar recursos da API localmente:

1. **Visual/Oficial (Swagger/Scalar API Reference)**:
   Acesse a rota **`/docs`** localmente [http://localhost:3333/docs](http://localhost:3333/docs) após rodar o projeto. Essa é a forma oficial de ver contratos, schemas esperados de request/response e as validações.

2. **Extensão VSCode (REST Client)**:
   Se preferir testar as rotas nativamente no seu editor de código (sem precisar de Postman/Insomnia), utilize a extensão **REST Client** do VSCode.  
   Nós mantemos arquivos mapeados (como `src/infrastructure/api/routes/mapsRouter.http`), para que você possa enviar chamadas testáveis diretas aos endpoints do projeto nativamente.

