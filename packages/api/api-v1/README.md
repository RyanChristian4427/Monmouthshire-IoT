# Express-TypeScript-MongoDB-Template

This is a boilerplate/template project used to bootstrap a new Express server. 

This template includes TypeScript and MongoDB, as well as boilerplate showing off authentication and a simple post/get request system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
NodeJs
NPM
Docker (optional)
```

### Running

A Docker-Compose file is included in the project should you choose to use it. If you do, run from the root directory: 

```
docker-compose up --build -d
```

If you choose to use some other database source, you will need to edit the .env file and provide a database URL.

Once you have the database prepared, next you will need to install the project dependencies. Again from the root directory, run:

```
npm install
```

Depending on your database method, you can then run `npm run serve:dev` for a development environment, or `npm run serve:prod` for a production. By default, the production environment is not hooked up to a database, though MongoDB Atlas would be a recommended way to have a production ready database. The Docker container is automatically set to work with the development profile, should you choose to use it.

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js). The linting rules are all quite standard.

### Lints files

```
npm run lint
```

## Built With

* [Express](https://expressjs.com/) - Web Framework Used to Build the API
  * [TypeScript](https://www.typescriptlang.org/) - Language Used
  * [MongoDB](https://www.mongodb.com/) - Database System Used for Persistence
  * [Mongoose](https://mongoosejs.com/) - ODM Tool Used Interface with Mongo
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
