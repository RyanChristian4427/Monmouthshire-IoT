# Monmouthshire Elderly IoT
[![Build Status](https://travis-ci.org/RyanChristian4427/Monmouthshire-IoT.svg?branch=improved)](https://travis-ci.org/RyanChristian4427/Monmouthshire-IoT) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

This was a group project we were given in the first semester of third year of university. The goal of this project was to integrate Internet of Things technology into a system that could provide higher levels of care for the elderly who want to live alone, while also combating social isolation. While we were provided the sensors to use for the IoT portion, how we chose to tackle social isolation was up to us.

This was a proof-of-concept prototype that we were to create, and based on how well the clients liked what we built, the university would go on to have a full application developed. The requirements that we gathered from speaking to the client can be found [here](https://github.com/RyanChristian4427/Monmouthshire-IoT/blob/as-submitted/requirements.md), while the requirements that the university set for the full application can be found [here](requirements.md). Some of the ideas that we presented found their way into the full application requirements, like the SMS system, but other ideas did not.

The `improved` branch of this project contains the updates I applied after the project had concluded, while the `as-submitted` branch contains the code as it was at submission.

As with any ambitious project, we took some risks and tried some solutions that turned out to cause pain points or were simply sub-optimal. The `improved` branch is my way of acknowledging those short comings and redesigning the project using the experience I've gained.

## Built With

* [Preact](https://reactjs.org/) - Web Library used to Build the Clients
  * [TypeScript](https://www.typescriptlang.org/) - Language used
  * [Bulma](https://bulma.io/) - SCSS Styling Framework
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
* [Express](https://expressjs.com/) - Web Framework used to Build the API
  * [TypeScript](https://www.typescriptlang.org/) - Language used
  * [PostgreSQL](https://www.postgresql.org/) - Database System used for Persistence
  * [Knex.js](http://knexjs.org/) - SQL Query Builder used to Interface with Postgres 
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool

## Authors

* **Ryan Christian** - *React and Express* - [Ryan Christian](https://github.com/RyanChristian4427)
* **Lauren Heymer** - *IoT Service, with some React and Express* - [Lauren Heymer](https://github.com/renHeymer)
* **James Buckland** - *Very minor Express work*
* **Owen Lever** - *No contributions made*

## Acknowledgments

* Thanks to the Monmouthshire Council for giving us this project to work on, and allowing us to use this as part of our portfolios.
