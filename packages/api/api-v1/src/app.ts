import express from 'express';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import * as http from 'http';

import apiV1 from 'src/api/v1';
import {POSTGRESDB_URI} from 'src/util/secrets';
import {camelizeColumns} from 'src/util/database';

// Create Express server
export const app = express();
export const server = http.createServer(app);

const pgp = pgPromise({
    receive: (data) => {
        camelizeColumns(data);
    }
});

app.locals.driver = pgp(POSTGRESDB_URI);

// Express configuration
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1', apiV1);
