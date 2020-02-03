# Monmouthshire IoT

This project is managed by Lerna, and as such, it is the tool used to setup this project.

The Pi Service and the Web-Private app should be deployed on a Raspberry Pi to the homes, while the API and the Web-Public app should be deployed to a public server

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes, as well as (roughly) describe the production deployment process.

### Prerequisites

```
NodeJs
NPM
Docker (optional)
PostgreSQL (optional)
```

### Running

There are two different 'sets' to run, the public server, and the private apps. I will discuss the public server first.

#### Public Server

A Docker-Compose file is included in the project for easily setting up the database, should you choose to use it. If you do, run from the root repository directory: 

```
docker-compose -f packages/api/docker-compose.yml up --build -d
```

If you choose to use some other Postgres source, you will need to edit the [.env](packages/api/.env) file and provide a database URL.

Once you have the database prepared, next you will need to install the project dependencies. Again from the root repository directory, run:

```
npx lerna bootstrap --hoist
```

Following this, you will need to run the migrations in your database. Make sure the database URL in [.env](.env) is accurate and run:

```
npm run migration:up
```

This will run all of the migrations, and this also populates the database with seeding data, ensuring you can start to use the system immediately.

From there, both the server and the public app can be ran by running `npm run serve:public` from the root repository. This runs dev servers of both the app and API server, as until [Preact #953](https://github.com/preactjs/preact-cli/issues/953) has a better solution, I do not feel comfortable running it in production mode. While the API server can be effectively ran in production mode, it does require the manual installation of `module-alias` into its directory, until I can figure out why Lerna does not correctly sym-link it. That dependency can be installed through the following commands:

```
cd packages/api
npm install --no-package-lock module-alias
npm run serve:prod
```

The public web application will then need to be manually ran through the following commands:

```
cd ../apps/web-public
npm run serve:dev
```

#### Private App

To be determined. This is not near a functional state yet, but the private app can be ran by:

```
cd packages/apps/web-private
npm run serve:dev
```
