var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

/* ----------------------------------------
        CONNECTING TO SERVER
   ---------------------------------------- */

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listenting at http://%s%s\n", host, port);
});

/* ----------------------------------------
        CONNECTING TO DATABASE
   ---------------------------------------- */

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

/* ----------------------------------------
        GET ALL REQUEST
   ---------------------------------------- */

app.get("/fakestore_catalog", async (req, res) => {
    await client.connect();
    console.log("Request: /fakestore_catalog");
    
    const query = {};
    const results = await db.collection("fakestore_catalog").find(query).toArray();
    console.log("ALL Items: ", results);
    
    res.status(200);
    res.send(results);
});