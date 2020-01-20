import express from "express";
import path from "path";
import { Db } from "mongodb";
var bodyParser = require('body-parser')
var passwordHash = require('password-hash');


const app = express();
const port = 8080; // default port to listen

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:example@localhost:27017";

async function serverStart() {
    let db = await MongoClient.connect(url,{ useNewUrlParser: true });

    let pehchanDB = db.db("pehchaan")

    app.use(bodyParser.json());
    var jwt = require('jsonwebtoken');

    app.get("/", (req, res) => {
        res.send({ message: "test" })
    });


    app.post("/login",  async (req, res) => {
        let stat = await auth(req.body.email, req.body.password, pehchanDB);
        console.log(stat)
        if (stat) {
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            res.send({ token: token })
        } else {
            res.send({ error: "error" })
        }
    });


    app.post("/signup", async (req, res) => {
        let status = await signUP(req.body.email,req.body.password,pehchanDB)

        if(status)
            res.send({message:"Signup done"})
        else
            res.send({message:"Signup error"})
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

async function auth(email, password, db) {
    //TODO Connect to db and check

    let user = await db.collection("user").findOne({email:email})

    console.log("user:", user)
    console.log("email:", email)
    console.log("password:", password)

    if (user) {
        if (passwordHash.verify(password,user.password)){
            return true
        }else{
            return false
        }
        return true
    }
    return false

}

async function signUP(email, password,db) {
    //check if email exists in User
    //if yes return exist error
    //if no create new user
    //OTP if possible

    var hashedPassword = passwordHash.generate(password);

    let user = await db.collection("user").findOne({
        email:email,
    })

    if(user) {
        return false
    } 

    await db.collection("user").insertOne({
        email:email,
        password:hashedPassword
    })

    return true

}


serverStart()