import express from "express";
import path from "path";
import { Db } from "mongodb";
var bodyParser = require('body-parser')

const app = express();
const port = 8080; // default port to listen

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:example@localhost:27017/pehchaan";
async function serverStart() {
    let db = await MongoClient.connect(url,{ useNewUrlParser: true });

    app.use(bodyParser.json());
    var jwt = require('jsonwebtoken');

    app.get("/", (req, res) => {
        res.send({ message: "test" })
    });


    app.post("/login", (req, res) => {
        if (auth(req.body.username, req.body.password, db)) {
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            res.send({ token: token })
        } else {
            res.send({ error: "error" })
        }
    });


    app.post("/signup", (req, res) => {
        res.send({ message: "signup" })
    });


    app.post("/signTX", (req, res) => {
        if (req.body.token) {
            try {
                var decoded = jwt.verify(req.body.token, 'shhhhh');
                res.send({ message: decoded })
            } catch (error) {
                res.send({ message: "Invalid token" })

            }
            return
        }
        res.send({ message: "error" })
    });

    // start the express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port}`);
    });

}

function auth(email, password, db) {
    //TODO Connect to db and check
    if (email == "hello") {
        return true
    }
    return false

}

function sgnUP(email, password,db) {
    //check if email exists in User
    //if yes return exist error
    //if no create new user
    //OTP if possible


}


serverStart()