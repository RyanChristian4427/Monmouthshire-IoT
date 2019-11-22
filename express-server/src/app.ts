import express from 'express';
import bodyParser from 'body-parser';
import neo4j from 'neo4j-driver';
import path from 'path';
import apiV1 from './api/v1';

import {NEO4JDB_URI, NEO4JDB_USER, NEO4JDB_PASS} from './util/secrets';


// Create Express server
const app = express();

// Allows driver to be used throughout express
app.locals.driver = neo4j.driver(
    NEO4JDB_URI,
    neo4j.auth.basic(NEO4JDB_USER, NEO4JDB_PASS)
);

// Express configuration
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.use('/api/v1', apiV1);

export default app;
