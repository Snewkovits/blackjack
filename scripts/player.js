let playerDeck = [];
let playerPoints = 0;

/* Amikor a játékos megnyomja a "HIT" gombot akkor egy új kártyát hoz létre a program, majd leosztja a játékosnak */
/* Ha a játékos kártyáinak a száma meghaladja a 21-et akkor a játékos veszít */
const getNewCard = () => {
    let player = document.getElementsByClassName('player')[0];
    let newCard = getRandomCard();
    playerDeck.push(newCard);
    newCard.style.top = '-200%';
    player.append(newCard);
    setTimeout(() => {
        newCard.style.top = '30%';
    }, 1);
    
    reAlignPlayerCards();
    reCalculatePlayerPoints();
    
    if (playerPoints > 21) {
        disablePlayButtons();
        setTimeout(() => {
            endGame('Bust!');
        }, 1000);
    }
}

/* A játékos megáll */
/* A gombokat letiltja és a dealerPlays függvény folytatódik */
const standHand = () => {
    disablePlayButtons();
    dealerPlays();
}

/* Újra számolja a játékos kártyáinak a helyzetét */
const reAlignPlayerCards = () => {
    let playerPos = window.innerWidth / 2 - playerDeck.length * 160 / 2 - playerDeck.length * 20 / 2;
    for (let i = 0; i < playerDeck.length; i++) {
        playerDeck[i].style.left = playerPos + 'px';
        playerPos += 180;
    }
}

const reCalculatePlayerPoints = () => {
    let playerPointsDisplay = document.getElementById('playerPoints');
    let time = 50;
    let timeStep = time;

    playerPoints = calculateDeck(playerDeck);

    for (let i = 0; i < playerPoints - playerPointsDisplay.innerText; i++) {
        setTimeout(() => {
            if (parseInt(playerPointsDisplay.innerText) < playerPoints) {
                playerPointsDisplay.textContent = parseInt(playerPointsDisplay.innerText) + 1;
            }
        }, time);
        time += timeStep;
    }
}