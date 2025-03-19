let playerDeck = [];
let playerPoints = 0;

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

const standHand = () => {
    disablePlayButtons();
    dealerPlays();
}

const reAlignPlayerCards = () => {
    console.log(playerDeck.length);
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

    let cards = playerDeck;

    playerPoints = 0;
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardValue = card.getAttribute('number');
        if (cardValue == 'A') {
            if (playerPoints + 11 > 21) {
                playerPoints += 1;
            }
            else {
                playerPoints += 11;
            }
        }
        else if (cardValue == 'K' || cardValue == 'Q' || cardValue == 'J') {
            playerPoints += 10;
        }
        else {
            playerPoints += parseInt(cardValue);
        }
    }

    for (let i = 0; i < playerPoints - playerPointsDisplay.innerText; i++) {
        setTimeout(() => {
            playerPointsDisplay.textContent = parseInt(playerPointsDisplay.innerText) + 1;
        }, time);
        time += timeStep;
    }
}