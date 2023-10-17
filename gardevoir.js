fetch('./data.json')
    .then(response=>response.json())
    .then(allCards=>loadCards(allCards));

    
function loadCards(allCards){
    let cardsContainer = document.getElementById("cards-in-deck");
    console.log(allCards.gardevoirCards);
    for(var i = 0; i < allCards.gardevoirCards.length; i++){
        let cardName = allCards.gardevoirCards[i].cardName;
        let set = allCards.gardevoirCards[i].set;
        let collectionNumber = allCards.gardevoirCards[i].collectionNumber;
        let purpose = allCards.gardevoirCards[i].purpose;
        let cardImage = allCards.gardevoirCards[i].cardImage;

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

}