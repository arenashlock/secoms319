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
        let cardImage = allCards.miraidonCards[i].cardImage;

        let card = document.createElement("div");
        card.innerHTML = `
        <div class="col">
            <div class="card shadow-sm">
                <img src="${cardImage}" alt="--------- ADD THIS -----------" class="Pokemon-card-picture">
                <div class="card-body">
                    <h1>${cardName}</h1>
                    <h2>${set} - ${collectionNumber}</h2>
                    <div class="d-flex justify-content-between align-items-center"></div>
                </div>
            </div>
        </div>
        `;

        cardsContainer.appendChild(card);
    }
}