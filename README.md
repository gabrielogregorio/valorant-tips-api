<div align="center">
  <img height="30" alt="Node" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img height="30" alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img height="30" alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
   <img height="30" alt="Mongodb" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  <img height="30" alt="Heroku" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">
  <img height="30" alt="Express" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
</div>

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/gabrielogregorio/vavatips-api)
![GitHub last commit](https://img.shields.io/github/last-commit/gabrielogregorio/vavatips-api?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/gabrielogregorio/vavatips-api) ![GitHub language count](https://img.shields.io/github/languages/count/gabrielogregorio/vavatips-api)
![GitHub repo size](https://img.shields.io/github/repo-size/gabrielogregorio/vavatips-api)

</div>

<div align="center">

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/7b87ad678dc34a92b1f1a7dea10d1f9e)](https://www.codacy.com/gh/gabrielogregorio/valorant-tips-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gabrielogregorio/valorant-tips-api&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/7b87ad678dc34a92b1f1a7dea10d1f9e)](https://www.codacy.com/gh/gabrielogregorio/valorant-tips-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gabrielogregorio/valorant-tips-api&utm_campaign=Badge_Coverage)
</div>

### Description

## API Valorant tips



Api of the project Valorant tips. [Documentation here](https://backend-valorant.herokuapp.com/docs)

### Preparing the development environment

If your goal is to be on the front-end, just worry about that topic.

1.   Install the [mongodb community server](https://www.mongodb.com/try/download/community?tck=docs_server)
2.   Start mongodb
> On windows, open the Command Prompt as administrator, run the command "net start mongodb", this should start mongodb. Then run the command "mongo" to access the database, if you can access it, you can continue the steps. On Linux the process is similar, but I won't document it here.
3.   With everything working, fork the project
4.   Clone the fork on your machine
5.   Access to development branch

```shell
git checkout -b develop origin/develop
```

6.   Install the necessary packages

```shell
npm install
```

7.   Copy the ".env.develop.example" file to ".env".
> Note that within the .env file, the only parameter you might need to adjust is the "MONGO_URI".
8.   Go to app.js, and uncomment the import and call in the controller of the "DevEnvironment"

![Uncomment the two lines](./docs/img1.png)

9.   Run the application (consider installing nodemon, or setting package.json to node)

```shell
npm run dev
```

10.   Access the address below for the development environment to be created.

```shell
http://127.0.0.1:3333/prepare_dev_environment
```

11.   Recommend the two lines you uncommented, this is extremely important as we don't want this feature to be available in the production environment.
> Pull request with these uncommented lines will be rejected

![comment to the two lines](./docs/img2.png)

12.   Okay, development api configured, now we will have several posts for testing and an access user

```text
username: developer
password: developer
```

### Production Environment

To deploy you need to have knowledge of NodeJs, cloudinary, Multer, Heroku, ExpressJs, Jest, MongoDb Local and MongoDb Atlas.

### Tests

To run the automated tests you need to have just installed globally.

```shell
npm run test
```

### Run the project

To run the application, run the command below

```shell
node src/server.js
```
