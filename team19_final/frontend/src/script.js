import React, { useState, useEffect } from "react";
import "./script_style.css";

const FinalProject = () => {
    // --------------------------------- SCREEN USESTATES ---------------------------------

    const [viewCollection, setViewCollection] = useState(true);
    const [viewDecklists, setViewDecklists] = useState(false);
    const [editDecklist, setEditDecklist] = useState(false);
    const [viewAbout, setViewAbout] = useState(false);

    // ------------------------------------------------------------------------------------

    // --------------------------------- SEARCH USESTATES ---------------------------------

    const [query, setQuery] = useState('');

    // ------------------------------------------------------------------------------------

    // ----------------------------------- NAVBAR HTML ------------------------------------
    
    const navBar = (
        <div>
            <input class="topCollectionScreen" id="cardSearch" type="search" placeholder="Search for a card..." value={query} />
            <button class="topCollectionScreen" id="filterButton">Filter</button>
            <button class="topCollectionScreen" id="switchToDecklists" onClick={() => {setViewCollection(false); setViewDecklists(true);}}>View Decklists</button>
            <button class="topCollectionScreen" id="increaseCollectionCount">Card +</button>
        </div>
    );

    // ------------------------------------------------------------------------------------

    // ----------------------------------- SCREEN HTML ------------------------------------
    
    const collectionView = (
        <div>
            <p>Collection View</p>
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
                    {navBar}
                    {collectionView}
                </div>
             ) :
             viewDecklists ? (
                decklistsView
             ) :
             editDecklist ? ( 
                decklistEdit
             ) : (
             aboutView
             )}
            {bottomBar}
        </div>
    );
};

export default FinalProject;