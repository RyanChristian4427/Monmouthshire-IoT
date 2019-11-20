import path from "path";
import dotenv from "dotenv";
import express from "express";
import homeRouter from './views/home';

// Init dotenv
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.set( "views", path.join( __dirname, "views" ));

app.use('/', homeRouter);

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

