# Monmouthshire IoT API Server

This is the API server that works to provide data and data storage to the various client applications of the Mounmouthshire IoT project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
NodeJs
NPM
Docker (optional)
PostgreSQL (optional)
```

### Running

A Docker-Compose file is included in the project for easily setting up the database, should you choose to use it. If you do, run from the project directory: 

```
docker-compose up --build -d
```

If you choose to use some other database source, you will need to edit the .env file and provide a database URL.

Once you have the database prepared, next you will need to install the project dependencies. Again from the root directory, run:

```
npm install
```

Following this, you will need to run the migrations in your database. Make sure the database URL in [.env](.env) is accurate and run:

```
npm run migration up
```

This will run all of the migrations, and this also populates the database with seeding data, ensuring you can start to use the system immediately.

From there, the server can be ran using `npm run serve:dev` or `npm run serve:prod`. The development server uses NoDemon for hot-reloading, while the production server is a more optimized build. 

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js). The linting rules are all quite standard.

### Lints files

```
npm run lint
```

## Built With

* [Express](https://expressjs.com/) - Web Framework Used to Build the API
  * [TypeScript](https://www.typescriptlang.org/) - Language Used
  * [PostgreSQL](https://www.postgresql.org/) - Database System Used for Persistence
  * [PG-Promise](https://github.com/vitaly-t/pg-promise) - PostgreSQL Interface for Node.js
  * [Node-PG-Migrate](https://github.com/salsita/node-pg-migrate) - Node Migration System for PostgreSQL
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
