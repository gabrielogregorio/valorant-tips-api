<div align="center">
  <img height="30" alt="Node" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img height="30" alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img height="30" alt="Mongodb" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  <img height="30" alt="Heroku" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">
  <img height="30" alt="Google Cloud Bucket" src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white">
  <img height="30" alt="Express" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
</div>

<div align="center">

  ![GitHub estrelas](https://img.shields.io/github/stars/gabrielogregorio/Backend-Valorant-Tips)
  ![GitHub last commit](https://img.shields.io/github/last-commit/gabrielogregorio/Backend-Valorant-Tips?style=flat-square)
  ![GitHub contributors](https://img.shields.io/github/contributors/gabrielogregorio/Backend-Valorant-Tips)
  ![GitHub language count](https://img.shields.io/github/languages/count/gabrielogregorio/Backend-Valorant-Tips)
  ![GitHub repo size](https://img.shields.io/github/repo-size/gabrielogregorio/Backend-Valorant-Tips)
</div>


## Backend Dicas de Valorant

### Descrição
Backend do projeto dicas de valorant.

### Requisitos

É preciso ter conhecimento em NodeJs, Google Cloud Buckets, Multer, Heroku, ExpressJs, Jest, MongoDb Local e MongoDb Atlas para explorar ao máximo esse projeto.

### Ambiente de desenvolvimento vs Produção

O ambiente de desenvolvimento deve ser configurado nestas condições

| ITEM | DESCRIÇÃO |
|------|-----------|
| MODE_RUN | DEVELOP ou PRODUCTION |
| MONGO_URI | URI do mongodb, local para ambiente de desenvolvimento, e a URI de produção para na hospedage |
| JWT_SECRET | Um código qualquer |
| GENERATOR_CODE | Um código qualquer que permite a geração de convites para outros usuários |
| GCLOUD_PROJECT_ID | Project Id, obtido da configuração do Google Cloud Buckets
| GCLOUD_STORAGE_BUCKET |

Além disso, é preciso criar um arquivo chamado 'google-credentials.json' com as credencias do Google Cloud Bucket. Na pratica deixe esse arquivo apenas para testar o backend local com o Google Buckets e em produção, pois, durante o ambiente de desenvolvimento o Google Cloud Bucket, assim como o mongodb Atlas não são utilizados.

### Testes
Para executar os testes automatizados é preciso ter o jest instalado de forma global.

### Executar o projeto
Para executar a aplicação, rode o comando abaixo nodemon src/server.js

### Documentação
Por enquanto estou usando os testes como documentação, portanto, basta acessar os arquivos de testes e você conseguirá entender a função de cada endpoint
