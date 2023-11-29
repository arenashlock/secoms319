import React, { useState, useEffect } from "react";
import "./script_style.css";

const FinalProject = () => {
    // --------------------------------- SCREEN USESTATES ---------------------------------

    const [viewCollection, setViewCollection] = useState(true);
    const [viewDecklists, setViewDecklists] = useState(false);
    const [editDecklist, setEditDecklist] = useState(false);
    const [viewAbout, setViewAbout] = useState(false);

    // ------------------------------------------------------------------------------------

    // --------------------------------- OTHER USESTATES ----------------------------------

    const [cardSearch, setCardSearch] = useState('');

    // ------------------------------------------------------------------------------------

    // ---------------------------- COLLECTION VIEW FUNCTIONS -----------------------------
    
    const searchCard = (name) => {
        setCardSearch(name.target.value);

        if(name.target.value === "") {
            getAllCards();
        }

        else {
            console.log("Search: " + name.target.value);

            fetch('http://localhost:8081/' + name.target.value)
                .then(response => response.json())
                .then(cards => {
                    if(cards.length !== 0){
                        console.log(cards);

                        // Get the container that will hold all the cards
                        var container = document.getElementById("collectionViewCards");
                        container.innerHTML = `<div class="row">`;
                        
                        // Populate each card
                        for(let i = 0; i < cards.length; i++) {
                            let eachCard = document.createElement("div");
                            eachCard.className = "individualCard";
                            eachCard.innerHTML = `
                                <img class="cardImage" src=${cards[i].cardImage}>
                                <h1 class="cardName">${cards[i].cardName}</h1>
                                <div class="quantityOfCard">
                                    <button class="changeQuantity">-</button>
                                    ${cards[i].quantity}
                                    <button class="changeQuantity">+</button>
                                </div>
                                <h2 class="cardInfo">Set: ${cards[i].set}</h2>
                                <h2 class="cardInfo">Collection Number: ${cards[i].collectionNumber}</h2>
                                <div class="udCard">
                                    <button id="editCard">EDIT</button>
                                    <button id="deleteCard">DELETE</button>
                                </div>
                            `;
                            container.appendChild(eachCard);
                        }
                    }

                    else {
                        // Set the container to be empty
                        var container = document.getElementById("collectionViewCards");
                        container.innerHTML = "";
                    }
                })
        }
    }

    const getAllCards = () => {
        fetch('http://localhost:8081/cards')
            .then(response => response.json())
            .then(cards => {
                console.log(cards);

                // Get the container that will hold all the cards
                var container = document.getElementById("collectionViewCards");
                container.innerHTML = `<div class="row">`;
                
                // Populate each card
                for(let i = 0; i < cards.length; i++) {
                    let eachCard = document.createElement("div");
                    eachCard.className = "individualCard";
                    eachCard.innerHTML = `
                        <img class="cardImage" src=${cards[i].cardImage}>
                        <h1 class="cardName">${cards[i].cardName}</h1>
                        <div class="quantityOfCard">
                            <button class="changeQuantity">-</button>
                            ${cards[i].quantity}
                            <button class="changeQuantity" onClick={increaseQuantity(${cards[i].id}, ${cards[i].quantity})}>+</button>
                        </div>
                        <h2 class="cardInfo">Set: ${cards[i].set}</h2>
                        <h2 class="cardInfo">Collection Number: ${cards[i].collectionNumber}</h2>
                        <div class="udCard">
                            <button id="editCard">EDIT</button>
                            <button id="deleteCard">DELETE</button>
                        </div>
                    `;
                    container.appendChild(eachCard);
                }
            })
    }

    const filterCards = () => {
        
    }

    const increaseQuantity = (id, num) => {
        // FINSH WITH PUT!!!
    }

    // ------------------------------------------------------------------------------------

    // ----------------------------------- NAVBAR HTML ------------------------------------
    
    const collectionViewBar = (
        <div>
            <input class="topCollectionScreen" id="cardSearch" type="search" placeholder="Search for a card..." value={cardSearch} onChange={searchCard} />
            <button class="topCollectionScreen" id="filterButton" onClick={filterCards}>Filter</button>
            <button class="topCollectionScreen" id="switchToDecklists" onClick={() => {setViewCollection(false); setViewDecklists(true);}}>View Decklists</button>
            <button class="topCollectionScreen" id="increaseCollectionCount">Card +</button>
        </div>
    );

    // ------------------------------------------------------------------------------------

    // ----------------------------------- SCREEN HTML ------------------------------------
    
    const collectionView = (
        <div id="collectionViewMainContainer">
            <div id="filterChoices">
            </div>
            <div id="collectionViewCards">
            </div>
        </div>
    );

    const decklistsView = (
        <div>
            <p>Decklists View</p>
        </div>
    );

    const decklistEdit = (
        <div>
            <p>Decklist Edit</p>
        </div>
    );

    const aboutView = (
        <div>
            <p>About View</p>
        </div>
    );

    // ------------------------------------------------------------------------------------

    // --------------------------------- BOTTOM BAR HTML ----------------------------------

    const topBar = (
        <div id="footer">
            <button id="switchToAbout" onClick={() => {setViewCollection(false); setViewDecklists(false); setEditDecklist(false); setViewAbout(true);}}>About the Team</button>
            <h1 id="publicationNote">Developed by Aren Ashlock and Eli Newland (Fall 2023)</h1>
        </div>
    );

    // ------------------------------------------------------------------------------------

    return (
        <div>
            {viewCollection ? (
                window.onload = function () {
                    getAllCards();
                    
                },
                <div>
                    {topBar}
                    {collectionViewBar}
                    {collectionView}
                </div>
             ) :
             viewDecklists ? (
                <div>
                    {topBar}
                    {decklistsView}
                </div>
             ) :
             editDecklist ? ( 
                <div>
                    {topBar}
                    {decklistEdit}
                </div>
             ) :
             (
                aboutView
             )}
        </div>
    );
};

export default FinalProject;