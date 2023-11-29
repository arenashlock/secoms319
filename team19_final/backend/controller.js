var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listenting at http://%s%s", host, port);
});


const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/cards", async (req, res) => {
    await client.connect();
    console.log("Request: /cards");
    
    const query = {};
    const results = await db.collection("cards").find(query).toArray();
    console.log("ALL Cards: ", results);
    
    res.status(200);
    res.send(results);
});
    
/*app.get("/:id", async (req, res) => {
    const cardId = Number(req.params.id);
    console.log("Card to find: ", cardId);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");

    const query = {"id": cardId };
    const results = await db.collection("cards").findOne(query);
    console.log("Result: ", results);

    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});*/

app.get("/:cardName", async (req, res) => {
    const cardName = req.params.cardName;
    console.log("Card to find: ", cardName);

    await client.connect();
    console.log("Request: /cardName");

    let partialToMatch = new RegExp(cardName, 'i');
    const query = {"cardName": partialToMatch};

    const results = await db.collection("cards").find(query).toArray();
    console.log("Cards: ", results);

    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/addCard", async (req, res) => {
    try {
        await client.connect();
        console.log("Request: /addCard");
        
        const newCard = req.body; // Data sent in the body of the POST request
        const result = await db.collection("cards").insertOne(newCard);
        
        res.status(201).send(result);
    } catch (error) {
        console.error("Error occurred in POST: ", error);
        res.status(500).send("Error occurred while adding a new card");
    }
});

/*app.delete("/deleteCard/:id", async (req, res) => {
    try {
        await client.connect();
        console.log("Request: /deleteCard/:id");
        
        const cardId = Number(req.params.id); // or use req.params.id directly if IDs are stored as strings
        const result = await db.collection("cards").deleteOne({ id: cardId });
        
        if (result.deletedCount === 0) {
            return res.status(404).send("No card with the specified ID found");
        }
        
        res.status(200).send("Card removed from collection successfully");
    } catch (error) {
        console.error("Error occurred in DELETE: ", error);
        res.status(500).send("Error occurred while removing the card");
    }
});*/

app.delete("/deleteCard", async (req, res) => {
    await client.connect();
    // const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const id = values[0]; // id
    console.log("Card to delete:", id);
    const query = { id: id };
    const results = await db.collection("cards").deleteOne(query);
    res.status(200);
    res.send(results);
    });