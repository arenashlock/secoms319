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

app.get("/cards", async (req, res) => {
    await client.connect();
    console.log("Request: /cards");
    
    const query = {};
    const results = await db.collection("cards").find(query).toArray();
    console.log("ALL Cards: ", results);
    
    res.status(200);
    res.send(results);
});

/* ----------------------------------------
        GET BY CARDNAME REQUEST
   ---------------------------------------- */

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

/* ----------------------------------------
        POST REQUEST
   ---------------------------------------- */

app.post("/addCard", async (req, res) => {
    await client.connect();
    console.log("Request: /addCard");
        
    const newCard = req.body; // Data sent in the body of the POST request
    const result = await db.collection("cards").insertOne(newCard);
        
    if(!result) {
        res.send("Card was not added").status(404);
    }
            
    else {
        res.status(201).send(result);
    }
});

/* ----------------------------------------
        PUT REQUEST
   ---------------------------------------- */

app.put("/updateCard/:id", async (req, res) => {
    try {
        await client.connect();
        console.log("Request: /updateCard/:id");
        
        const cardId = Number(req.params.id); // or use req.params.id directly if IDs are stored as strings
        const updatedData = req.body; // Data sent in the body of the PUT request
        
        const result = await db.collection("cards").updateOne(
            { id: cardId },
            { $set: updatedData }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).send("No card with the specified ID found");
        }
        
        res.status(200).send(result);
    } catch (error) {
        console.error("Error occurred in PUT: ", error);
        res.status(500).send("Error occurred while updating a card");
    }
});

/* ----------------------------------------
        DELETE REQUEST
   ---------------------------------------- */

app.delete("/deleteCard", async (req, res) => {
    await client.connect();

    const values = Object.values(req.body);
    const deleteCardID = values[0]; // cardID
    console.log("Card to delete: ", deleteCardID);

    const query = {cardID: deleteCardID};
    const results = await db.collection("cards").deleteOne(query);

    res.status(200);
    res.send(results);
});