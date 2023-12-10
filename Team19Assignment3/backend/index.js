var express = require("express");
var cors = require("cors");
var mongo = require("mongodb");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

/* ----------------------------------------
        CONNECTING TO SERVER
   ---------------------------------------- */

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listenting at http://%s:%s\n", host, port);
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
        POST NEW REQUEST
   ---------------------------------------- */

app.post("/add_product", async (req, res) => {
    await client.connect();
    console.log("Request: /add_product");
        
    const newProduct = req.body; // Data sent in the body of the POST request
    const query = {
        title: newProduct.title,
        price: Number(newProduct.price),
        description: newProduct.description,
        category: newProduct.category,
        image: newProduct.image,
        rating: {
            rate: Number(newProduct.rating.rate),
            count: Number(newProduct.rating.count)
        }
    }
    const result = await db.collection("fakestore_catalog").insertOne(query);
        
    if(!result) {
        res.send("Product was not added").status(404);
    }
            
    else {
        res.status(201).send(result);
    }
});

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

/* ----------------------------------------
        DELETE ONE REQUEST
   ---------------------------------------- */

   app.delete("/delete_product", async (req, res) => {
    await client.connect();
    console.log("Request: /delete_product");
    
    const values = Object.values(req.body);
    const deleteTitle = values[0]; // Delete title

    console.log(deleteTitle)

    const query = {title: deleteTitle};
    const result = await db.collection("fakestore_catalog").deleteOne(query);
    console.log("DELETE Item: ", result);
    
    res.status(200);
    res.send(result);
});