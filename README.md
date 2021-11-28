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
Backend do projeto dicas de Valorant.

### Preparando o ambiente de desenvolvimento
Se o seu objetivo é focar no front-end, só se preocupe com esse tópico.

1. Instale o [mongodb community server](https://www.mongodb.com/try/download/community?tck=docs_server)
2. Inicie o mondodb
> No windows, abra o Prompt de Comando como administrador, execute o comando "net start mongodb", isso deverá iniciar o mongodb. Depois execute o comando "mongo" para acessar o banco de dados, se você conseguir acessar, pode continuar os passos.
> No Linux o processo é similar, mas não vou deixar documentado aqui.
3. Com tudo funcionando, faça um fork deste projeto
4. Clone o fork na sua máquina
5. Acesse a branch de desenvolvimento
```shell
git checkout -b develop origin/develop
```
6. Instale os pacotes necessários
```shell
npm install
```
7. Faça uma cópia do arquivo ".env.develop.example" para ".env".
> Note que dentro do arquivo .env, o único parâmetro que você talvez precise de ajustar é o "MONGO_URI".
8. Acesse o app.js, e descomente a importação e a chamada no controller do "DevEnvironment"

![Descomente as duas linhas](./docs/img1.png)

9. Execute a aplicação
```shell
npm run dev
```
10. Acesse o endereço abaixo para que o ambiente de desenvolvimento seja criado.
```shell
http://127.0.0.1:3333/prepare_dev_environment
```
11. Comente novamente as duas linhas que você descomentou, isso é extremamente importante, pois não queremos que esse recurso esteja disponível no ambiente de produção.
> Pull request com essas linhas descomentadas serão rejeitados

![Comente as duas linhas](./docs/img2.png)

12. Pronto, backend de desenvolvimento configurado, agora teremos vários posts para testes e um usuário de acesso
```text
username: developer
password: developer
```

### Ambiente de Produção
Para fazer deploy você precisa ter conhecimento em NodeJs, Google Cloud Buckets, Multer, Heroku, ExpressJs, Jest, MongoDb Local e MongoDb Atlas.

É preciso criar um arquivo chamado 'google-credentials.json' com as credenciais do Google Cloud Bucket. Na prática deixe esse arquivo apenas para testar o backend local com o Google Buckets e em produção, pois, durante o ambiente de desenvolvimento o Google Cloud Bucket, assim como o mongodb Atlas não são utilizados.

### Testes
Para executar os testes automatizados é preciso ter o jest instalado de forma global.

```shell
npm run test
```

### Executar o projeto
Para executar a aplicação, rode o comando abaixo
```shell
node src/server.js
```
