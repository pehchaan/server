import express from "express";
import path from "path";
const app = express();
const port = 8080; // default port to listen

// Configure Express to use EJS

// define a route handler for the default home page

app.get( "/", ( req, res ) => {
    res.send({message:"test"})
} );


app.post( "/login", ( req, res ) => {
    res.send({message:"login"})
} );


app.post( "/signup", ( req, res ) => {
    res.send({message:"signup"})
} );


app.post( "/signTX", ( req, res ) => {
    res.send({message:"signTX"})
} );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );