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

    const getAllCards = () => {
        fetch('http://localhost:8081/cards')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var container = document.getElementById("collectionViewCards");
                container.innerHTML = `<div class="row">`;
                for(let i = 0; i < data.length; i++) {
                    let eachCard = document.createElement("div");
                    eachCard.className = "column";
                    eachCard.innerHTML = `
                        <img src=${data[i].cardImage}>
                    `;
                    container.appendChild(eachCard);
                }
            })
    }
    
    const searchCard = (name) => {
        setCardSearch(name.target.value);

        fetch('http://localhost:8081/' + name.target.value)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var container = document.getElementById("collectionViewCards");
                container.innerHTML = `
                    <img src=${data.cardImage}>
                `;
            })
    }

    const filterCards = () => {
        getAllCards();
    }

    // ------------------------------------------------------------------------------------

    // ----------------------------------- NAVBAR HTML ------------------------------------
    
    const collectionViewBar = (
        <div>
            <input class="topCollectionScreen" id="cardSearch" type="search" placeholder="Search for a card..." value={cardSearch} onChange={searchCard} />
            <button class="topCollectionScreen" id="filterButton" onClick={() => {filterCards();}}>Filter</button>
            <button class="topCollectionScreen" id="switchToDecklists" onClick={() => {setViewCollection(false); setViewDecklists(true);}}>View Decklists</button>
            <button class="topCollectionScreen" id="increaseCollectionCount">Card +</button>
        </div>
    );

    // ------------------------------------------------------------------------------------

    // ----------------------------------- SCREEN HTML ------------------------------------
    
    const collectionView = (
        <div id="collectionViewMainContainer">
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

    const bottomBar = (
        <div id="footer">
            <button id="switchToAbout" onClick={() => {setViewCollection(false); setViewDecklists(false); setEditDecklist(false); setViewAbout(true);}}>About the Team</button>
            <h1 id="publicationNote">Developed by Aren Ashlock and Eli Newland (Fall 2023)</h1>
        </div>
    );

    // ------------------------------------------------------------------------------------

    return (
        <div>
            {viewCollection ? (
                <div>
                    {collectionViewBar}
                    {collectionView}
                    {bottomBar}
                </div>
             ) :
             viewDecklists ? (
                <div>
                    {decklistsView}
                    {bottomBar}
                </div>
             ) :
             editDecklist ? ( 
                <div>
                    {decklistEdit}
                    {bottomBar}
                </div>
             ) : (
             aboutView
             )}
        </div>
    );
};

export default FinalProject;