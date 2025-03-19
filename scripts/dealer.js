let dealerDeck = [];
let dealerPoints = 0;

const dealerPlays = () => {
    let time = 2000;
    let timeStep = time;

    dealerTurn = true;
    flipCard(dealerDeck[0]);
    reAlignDealerCards();
    reCalculateDealerPoints(0);
    
    while (dealerPoints < 17 || dealerPoints < playerPoints) {
        dealerGetCard(time);
        time += timeStep;
    }

    setTimeout(() => {
        started = false;
        if (dealerPoints > 21) {
            endGame('Dealer bust!');
        }
        else if (playerPoints > dealerPoints && playerPoints == 21) {
            endGame('Blackjack!');
        }
        else if (playerPoints > dealerPoints) {
            endGame('You won!');
        }
        else if (playerPoints < dealerPoints) {
            endGame('You lost!');
        }
        else {
            endGame('Push!');
        }
    }, time);
}

const dealerGetCard = time => {
    let dealer = document.getElementsByClassName('dealer')[0];
    let newCard = getRandomCard();
    dealerDeck.push(newCard);
    newCard.style.top = '-200%';
    dealer.append(newCard);
    setTimeout(() => {
        newCard.style.top = '30%';
        reAlignDealerCards();
    }, time);
    
    reCalculateDealerPoints(time);

    console.log(dealerPoints);
}

const reCalculateDealerPoints = timeout => {
    let time = 50;
    let timeStep = time;

    dealerPoints = 0;

    let cards = dealerDeck;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardValue = card.getAttribute('number');
        if (cardValue == 'A') {
            if (dealerPoints + 11 > 21) {
                dealerPoints += 1;
            }
            else {
                dealerPoints += 11;
            }
        }
        else if (cardValue == 'K' || cardValue == 'Q' || cardValue == 'J') {
            dealerPoints += 10;
        }
        else {
            dealerPoints += parseInt(cardValue);
        }
    }

    let dealerPointsDisplay = document.getElementById('dealerPoints');
    let difference = dealerPoints - parseInt(dealerPointsDisplay.innerText);
    console.log(`Difference: ${difference}\nDealer points: ${dealerPoints}\nDealer points display: ${dealerPointsDisplay.innerText}`);
    
    if (0 <= difference) {
        while (difference > 0) {
            setTimeout(() => {
                console.log('asd');
                dealerPointsDisplay.textContent = parseInt(dealerPointsDisplay.innerText) + 1;
            }, time + timeout);
            time += timeStep;
            difference--;
        }
    }
    else {
        while (difference > 0) {
            setTimeout(() => {
                console.log('asd');
                dealerPointsDisplay.textContent = parseInt(dealerPointsDisplay.innerText) - 1;
            }, time + timeout);
            time += timeStep;
            difference--;
        }
    }
    console.log(dealerPoints);
        
}

const reAlignDealerCards = () => {
    let dealerPos = window.innerWidth / 2 - dealerDeck.length * 160 / 2 - dealerDeck.length * 20 / 2;
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].style.left = dealerPos + 'px';
        dealerPos += 180;
    }
}