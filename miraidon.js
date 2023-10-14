fetch('./data.json')
    .then(response=>response.json())
    .then(allCards=>loadCards(allCards));

function loadCards(allCards){
    let cardsContainer = document.getElementById("cards-in-deck");
    console.log(allCards.miraidonCards);
    for(var i = 0; i < allCards.miraidonCards.length; i++){
        let cardName = allCards.miraidonCards[i].cardName;
        let set = allCards.miraidonCards[i].set;
        let collectionNumber = allCards.miraidonCards[i].collectionNumber;
        let purpose = allCards.miraidonCards[i].purpose;
        let cardImage = allCards.miraidonCards[i].cardImage;

        let card = document.createElement("div");
        card.innerHTML = `
        <div class="col" id="${set}-${collectionNumber}">
            <div class="card shadow-sm">
                <img src="${cardImage}" alt="${cardName}" class="Pokemon-card-picture">
                <div class="card-body">
                    <h1>${cardName}</h1>
                    <h2>${set} - ${collectionNumber}</h2>
                    <div class="d-flex justify-content-between align-items-center"></div>
                </div>
            </div>
        </div>
        `;
        cardsContainer.appendChild(card);

        let cardContainer = document.getElementById("selected-card");
        let card_chosen = document.getElementById(`${set}-${collectionNumber}`);

        card_chosen.addEventListener("click", function(){
            cardContainer.innerHTML = `
            <img src="${cardImage}" alt="${cardName}" id="selected-card-picture">
            <p>${purpose}</p>
            `;
        });
    }

    /*let cardContainer = document.getElementById("selected-card");
    let card_chosen = document.getElementById("SV01-081");

    card_chosen.addEventListener("click", function(){
        let cardName = allCards.miraidonCards[0].cardName;
        let cardImage = allCards.miraidonCards[0].cardImage;
        cardContainer.innerHTML = `<img style="width: 100%; margin: 10px;" src="${cardImage}" alt="${cardName}" class="Pokemon-card-picture">`;
    });*/
}