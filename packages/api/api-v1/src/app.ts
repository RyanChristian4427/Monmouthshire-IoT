import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

import apiV1 from 'src/api/v1';

// Create Express server
export const app = express();
export const server = http.createServer(app);


// Express configuration
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1', apiV1);
