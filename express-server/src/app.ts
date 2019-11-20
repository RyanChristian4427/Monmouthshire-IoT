import express from "express";
import path from "path";
import homeRouter from './views/home';

const port = 8080;
const app = express();

app.set( "views", path.join( __dirname, "views" ));

app.use('/', homeRouter);

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

