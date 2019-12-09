# IoT Team 3 Express Server

This is the backend server for our IoT data gathering application. This project aims to increase the safety of the elderly along with combating social isolation. As of now, this backend is used to handle interactions with our database and to act as a RESTful API in which our multiple clients can access and send data to. 

The back end for this project is written using Express, a fast, unopinionated, minimalist web framework for Node.js. The server is written entirely in TypeScript, it uses Neo4J for data persistence, and it utilizes Neo4J-Driver for the database connections. 

This Express server will be updated in conjunction with the React clients.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
NodeJs
NPM
```

### Running

To run the web server on localhost, you will need to run from the root directory: 

```
npm install
```

Then, if you want to use the dev build and you have Docker-Componse installed locally, run:

```
docker-compose up --build -d
```

#### Compiles and uses a local Neo4J Docker Container for a Database

```
npm run serve:dev
```

#### Compiles and uses an OpenStack Instance for a Database

```
npm run serve:prod
```

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js). The linting rules are all quite standard.

### Lints files

```
npm run lint
```
