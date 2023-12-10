import React, { useState, useEffect } from "react";
import "./script_style.css";

const FinalProject = () => {
    // --------------------------------- SCREEN USESTATES ---------------------------------

    const [viewCollection, setViewCollection] = useState(true);
    const [addCard, setAddCard] = useState(false);

    // ------------------------------------------------------------------------------------

    // --------------------------------- OTHER USESTATES ----------------------------------

    const [cardSearch, setCardSearch] = useState('');
    const [cardInformation, setcardInformation] = useState({
        cardName: '',
        set: '',
        collectionNumber: '',
        cardImage: '',
    });

    // ------------------------------------------------------------------------------------

    // ---------------------------- COLLECTION VIEW FUNCTIONS -----------------------------

    useEffect(() => {
        if(cardSearch === "") {
            getAllCards();
        }

        else {
            fetch('http://localhost:8081/' + cardSearch)
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
                                let cardImage = document.createElement("img");
                                    cardImage.className = "cardImage";
                                    cardImage.src = cards[i].cardImage;
                                eachCard.appendChild(cardImage);

                                let cardName = document.createElement("h1");
                                    cardName.className = "cardName";
                                    cardName.innerText = cards[i].cardName;
                                eachCard.appendChild(cardName);

                                let quantityOfCard = document.createElement("div");
                                    quantityOfCard.className = "quantityOfCard";

                                    let decreaseCard = document.createElement("button");
                                        decreaseCard.className = "changeQuantity";
                                        decreaseCard.addEventListener('click', () => {decreaseCardFunction(cards[i])});
                                        decreaseCard.innerText = "-";
                                    quantityOfCard.appendChild(decreaseCard);

                                    let quantity = document.createElement("output");
                                        quantity.innerText = ` ${cards[i].quantity} `;
                                    quantityOfCard.appendChild(quantity);

                                    let increaseCard = document.createElement("button");
                                        increaseCard.className = "changeQuantity";
                                        increaseCard.addEventListener('click', () => {increaseCardFunction(cards[i])});
                                        increaseCard.innerText = "+";
                                    quantityOfCard.appendChild(increaseCard);

                                eachCard.appendChild(quantityOfCard);

                                let set = document.createElement("h2");
                                    set.className = "cardInfo";
                                    set.innerText = `Set: ${cards[i].set}`;
                                eachCard.appendChild(set);

                                let collectionNumber = document.createElement("h2");
                                    collectionNumber.className = "cardInfo";
                                    collectionNumber.innerText = `Collection Number: ${cards[i].collectionNumber}`;
                                eachCard.appendChild(collectionNumber);

                                let udCard = document.createElement("div");
                                    udCard.className = "udCard";

                                    let deleteCard = document.createElement("button");
                                        deleteCard.id = "deleteCard";
                                        deleteCard.addEventListener('click', () => {cardDelete(cards[i])});
                                        deleteCard.innerText = "DELETE";
                                    udCard.appendChild(deleteCard);

                                eachCard.appendChild(udCard);
                                
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
    }, [cardSearch]);

    const reloadWithSearch = () => {
        if(cardSearch === "") {
            getAllCards();
        }

        else {
            console.log("Search: " + cardSearch);

            fetch('http://localhost:8081/' + cardSearch)
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
                                let cardImage = document.createElement("img");
                                    cardImage.className = "cardImage";
                                    cardImage.src = cards[i].cardImage;
                                eachCard.appendChild(cardImage);

                                let cardName = document.createElement("h1");
                                    cardName.className = "cardName";
                                    cardName.innerText = cards[i].cardName;
                                eachCard.appendChild(cardName);

                                let quantityOfCard = document.createElement("div");
                                    quantityOfCard.className = "quantityOfCard";

                                    let decreaseCard = document.createElement("button");
                                        decreaseCard.className = "changeQuantity";
                                        decreaseCard.addEventListener('click', () => {decreaseCardFunction(cards[i])});
                                        decreaseCard.innerText = "-";
                                    quantityOfCard.appendChild(decreaseCard);

                                    let quantity = document.createElement("output");
                                        quantity.innerText = ` ${cards[i].quantity} `;
                                    quantityOfCard.appendChild(quantity);

                                    let increaseCard = document.createElement("button");
                                        increaseCard.className = "changeQuantity";
                                        increaseCard.addEventListener('click', () => {increaseCardFunction(cards[i])});
                                        increaseCard.innerText = "+";
                                    quantityOfCard.appendChild(increaseCard);

                                eachCard.appendChild(quantityOfCard);

                                let set = document.createElement("h2");
                                    set.className = "cardInfo";
                                    set.innerText = `Set: ${cards[i].set}`;
                                eachCard.appendChild(set);

                                let collectionNumber = document.createElement("h2");
                                    collectionNumber.className = "cardInfo";
                                    collectionNumber.innerText = `Collection Number: ${cards[i].collectionNumber}`;
                                eachCard.appendChild(collectionNumber);

                                let udCard = document.createElement("div");
                                    udCard.className = "udCard";

                                    let deleteCard = document.createElement("button");
                                        deleteCard.id = "deleteCard";
                                        deleteCard.addEventListener('click', () => {cardDelete(cards[i])});
                                        deleteCard.innerText = "DELETE";
                                    udCard.appendChild(deleteCard);

                                eachCard.appendChild(udCard);
                                
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
                        let cardImage = document.createElement("img");
                            cardImage.className = "cardImage";
                            cardImage.src = cards[i].cardImage;
                        eachCard.appendChild(cardImage);

                        let cardName = document.createElement("h1");
                            cardName.className = "cardName";
                            cardName.innerText = cards[i].cardName;
                        eachCard.appendChild(cardName);

                        let quantityOfCard = document.createElement("div");
                            quantityOfCard.className = "quantityOfCard";

                            let decreaseCard = document.createElement("button");
                                decreaseCard.className = "changeQuantity";
                                decreaseCard.addEventListener('click', () => {decreaseCardFunction(cards[i])});
                                decreaseCard.innerText = "-";
                            quantityOfCard.appendChild(decreaseCard);

                            let quantity = document.createElement("output");
                                quantity.innerText = ` ${cards[i].quantity} `;
                            quantityOfCard.appendChild(quantity);

                            let increaseCard = document.createElement("button");
                                increaseCard.className = "changeQuantity";
                                increaseCard.addEventListener('click', () => {increaseCardFunction(cards[i])});
                                increaseCard.innerText = "+";
                            quantityOfCard.appendChild(increaseCard);

                        eachCard.appendChild(quantityOfCard);

                        let set = document.createElement("h2");
                            set.className = "cardInfo";
                            set.innerText = `Set: ${cards[i].set}`;
                        eachCard.appendChild(set);

                        let collectionNumber = document.createElement("h2");
                            collectionNumber.className = "cardInfo";
                            collectionNumber.innerText = `Collection Number: ${cards[i].collectionNumber}`;
                        eachCard.appendChild(collectionNumber);

                        let udCard = document.createElement("div");
                            udCard.className = "udCard";

                            let deleteCard = document.createElement("button");
                                deleteCard.id = "deleteCard"
                                deleteCard.addEventListener('click', () => {cardDelete(cards[i])});
                                deleteCard.innerText = "DELETE";
                            udCard.appendChild(deleteCard);

                        eachCard.appendChild(udCard);
                        
                    container.appendChild(eachCard);
                }
            })
    }

    const increaseCardFunction = async (card) => {
        const updateData = {
            "cardID": card.cardID,
            "quantity": card.quantity
        };

        console.log(cardSearch)

        console.log(updateData)

        await fetch('http://localhost:8081/increaseCard', {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateData)
        })
            .then(response => {response.json()})
            .then(increasedCard => {console.log(increasedCard)})
            .catch((err) => console.log("Error: " + err));

            console.log(cardSearch)
            
        reloadWithSearch();
    }

    const decreaseCardFunction = async (card) => {
        const updateData = {
            "cardID": card.cardID,
            "quantity": card.quantity
        };

        console.log(updateData)

        await fetch('http://localhost:8081/decreaseCard', {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateData)
        })
            .then(response => {response.json()})
            .then(increasedCard => {console.log(increasedCard)})
            .catch((err) => console.log("Error: " + err));
            
        reloadWithSearch();
    }

    const cardDelete = async (card) => {
        let deleteConfirmation = "You are about to delete the following card from your collection:\n\n" + card.cardName + " (" + card.cardID + ")";
        
        if(window.confirm(deleteConfirmation) == true) {
            await fetch('http://localhost:8081/deleteCard', {
                method: "DELETE",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({"cardID": card.cardID})
            })
                .then(response => {response.json()})
                .then(deletedCard => {console.log(deletedCard)})
                .catch((err) => console.log("Error: " + err));
            
            reloadWithSearch();
        }
    }

    // ------------------------------------------------------------------------------------

    // ------------------------------ ADD CARD FORM FIELDS --------------------------------

    const resetCardInformation = () => {
        setcardInformation({
            ...cardInformation,
            cardName: '',
            set: '',
            collectionNumber: '',
            cardImage: ''
        });
    }
    
    const handleFieldChangeAdd = (field, value) => {
        setcardInformation({
            ...cardInformation,
            [field]: value
        });
    };

    // ------------------------------------------------------------------------------------

    // ----------------------------- ADD CARD VIEW FUNCTIONS ------------------------------
    
    const cardAdd = () => {
        const newCardJSON = JSON.stringify({
            "cardID": cardInformation.set + "-" + cardInformation.collectionNumber,
            "cardName": cardInformation.cardName,
            "set": cardInformation.set,
            "collectionNumber": cardInformation.collectionNumber,
            "quantity": 1,
            "cardImage": cardInformation.cardImage
        })

        console.log(newCardJSON);

        fetch('http://localhost:8081/addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newCardJSON
        })
            .then(response => response.json)
            .then(card => {
                console.log(card);
                resetCardInformation();
                setViewCollection(true);
                setAddCard(false);
                getAllCards();
            })
    }

    const previewCard = () => {
        if(cardInformation.cardImage !== '') {
            let cardImage = document.getElementById("previewCardImage");
            cardImage.src = cardInformation.cardImage;
        }

        if(cardInformation.cardName !== '') {
            let cardName = document.getElementById("previewCardName");
            cardName.innerText = cardInformation.cardName;
        }

        if(cardInformation.set !== '') {
            let set = document.getElementById("previewSet");
            set.innerText = `Set: ${cardInformation.set}`;
        }

        if(cardInformation.collectionNumber !== '') {
            let collectionNumber = document.getElementById("previewCollectionNumber");
            collectionNumber.innerText = `Collection Number: ${cardInformation.collectionNumber}`;
        }

        if( cardInformation.cardImage !== '' &&
            cardInformation.cardName !== '' &&
            cardInformation.set !== '' &&
            cardInformation.collectionNumber !== '') {
            let addButton = document.getElementById("addCardButton");
            addButton.addEventListener('click', () => {cardAdd()});
        }
    }

    // ------------------------------------------------------------------------------------

    // ----------------------------------- TOP BAR HTML -----------------------------------

    const topBar = (
        <div id="header">
            <button id="switchToAbout" onClick={() => {setViewCollection(false); setAddCard(false); resetCardInformation(); setCardSearch('');}}>About the Team</button>
            <h1 id="publicationNote">Developed by Aren Ashlock and Eli Newland (Fall 2023)</h1>
        </div>
    );

    // ------------------------------------------------------------------------------------

    // ----------------------------------- NAVBAR HTML ------------------------------------
    
    const collectionViewBar = (
        <div>
            <input class="topScreenClass" id="cardSearch" type="search" placeholder="Search for a card..." value={cardSearch} onChange={e => setCardSearch(e.target.value)} />
            <button class="topScreenClass" id="increaseCollectionCount" onClick={() => {setViewCollection(false); setAddCard(true);}}>Card +</button>
        </div>
    );

    const addCardViewBar = (
        <button class="topScreenClass" id="cancelAddCard" onClick={() => {setViewCollection(true); setAddCard(false); resetCardInformation();  setCardSearch(''); getAllCards();}}>Cancel</button>
    );

    // ------------------------------------------------------------------------------------

    // ----------------------------------- SCREEN HTML ------------------------------------
    
    const collectionView = (
        <div id="collectionViewMainContainer">
            <div id="collectionViewCards">
            </div>
        </div>
    );

    const addCardView = (
        <div>
            <div id="formInfo">
                <></>
                <div class="formInfoIndividual">
                    <label htmlFor="cardName">Card Name </label>
                    <input
                        id="newCardNameInput"
                        type="text"
                        size="20"
                        style={{marginTop: '10px', marginLeft: '5px', fontSize: '18px'}}
                        value={cardInformation.cardName}
                        onChange={(e) => handleFieldChangeAdd('cardName', e.target.value)}
                        required
                    />
                </div>
                <div class="formInfoIndividual">
                    <label htmlFor="set">Set </label>
                    <input
                        id="newSetInput"
                        type="text"
                        size="10"
                        style={{marginLeft: '5px', fontSize: '18px'}}
                        value={cardInformation.set}
                        onChange={(e) => handleFieldChangeAdd('set', e.target.value)}
                        required
                    />
                </div>
                <div class="formInfoIndividual">
                    <label htmlFor="collectionNumber">Collection Number </label>
                    <input
                        id="newCollectionNumberInput"
                        type="text"
                        size="10"
                        style={{marginLeft: '5px', fontSize: '18px'}}
                        value={cardInformation.collectionNumber}
                        onChange={(e) => handleFieldChangeAdd('collectionNumber', e.target.value)}
                        required
                    />
                </div>
                <div class="formInfoIndividual">
                    <label htmlFor="cardImage">Image URL </label>
                    <input
                        id="newImageInput"
                        type="text"
                        size="40"
                        style={{marginLeft: '5px', fontSize: '18px'}}
                        value={cardInformation.cardImage}
                        onChange={(e) => handleFieldChangeAdd('cardImage', e.target.value)}
                        required
                    />
                </div>
                <button id="previewCardButton" onClick={() => {previewCard();}}>Preview Card</button>
            </div>
            <div id="previewContainer">
                <div class="individualCard">
                    <img id="previewCardImage" class="cardImage" src="https://images.pokemoncard.io/images/assets/CardBack.jpg"></img>
                    <h1 id="previewCardName" class="cardName">Card Name</h1>
                    <h2 id="previewSet" class="cardInfo">Set: N/A</h2>
                    <h2 id="previewCollectionNumber" class="cardInfo">Collection Number: N/A</h2>
                </div>
                <button id="addCardButton">Add Card to Collection</button>
            </div>
        </div>
    );

    const aboutView = (
        <div>
            <button id="backToCollection" onClick={() => {setViewCollection(true); getAllCards();}}>Back to Collection</button>
            <div id="aboutGeneral">
                <h1 id="aboutTitle">SE/Com S 319 Construction of User Interfaces<br></br>Fall 2023</h1>
                <h2 id="aboutDate">December 3rd, 2023</h2>
            </div>
            <span id="allPeople">
                <div class="aboutInfo" id="ArenInfo">
                    <p class="personName">Aren Ashlock</p>
                    <p>Email: aashlock@iastate.edu</p>
                </div>
                <div class="aboutInfo" id="EliInfo">
                    <p class="personName">Eli Newland</p>
                    <p>Email: newland2@iastate.edu</p>
                </div>
                <div class="aboutInfo" id="AldacoInfo">
                    <p class="personName">Dr. Abraham N. Aldaco Gastelum</p>
                    <p>Email: aaldaco@iastate.edu</p>
                </div>
            </span>
        </div>
    );

    // ------------------------------------------------------------------------------------

    return (
        <div>
            {
                viewCollection ? (
                    window.onload = function () {
                        getAllCards();
                        
                    },
                    <div>
                        {topBar}
                        {collectionViewBar}
                        <div>
                            {collectionView}
                        </div>
                    </div>
                ) : addCard ? (
                    <div>
                        {topBar}
                        {addCardViewBar}
                        {addCardView}
                    </div>
                ) : (
                    aboutView
                )
            }
        </div>
    );
};

export default FinalProject;