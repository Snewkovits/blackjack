let dealerDeck = [];
let dealerPoints = 0;
let dealerPointsEach = [];
let dealerIndex = 0;

const dealerPlays = () => {
    let time = 2000;
    let timeStep = time;
    dealerPointsEach = [];
    index = 0;

    dealerTurn = true;
    flipCard(dealerDeck[0]);
    reAlignDealerCards();
    reCalculateDealerPoints(0);
    
    while (dealerPoints < 17 && dealerPoints < playerPoints) {
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
}

const reCalculateDealerPoints = timeout => {
    let time = 50;
    let timeStep = time;

    dealerPoints = calculateDeck(dealerDeck);
    
    dealerPointsEach.push(dealerPoints);

    let dealerPointsDisplay = document.getElementById('dealerPoints');
    let difference = 0;
    if (index > 0) {
        difference = dealerPoints - dealerPointsEach[index - 1];
    }
    else {
        difference = dealerPoints;
    }
    index++;

    if (0 <= difference) {
        while (difference > 0) {
            setTimeout(() => {
                dealerPointsDisplay.textContent = parseInt(dealerPointsDisplay.innerText) + 1;
            }, time + timeout);
            time += timeStep;
            difference--;
        }
    }
    else {
        while (difference > 0) {
            setTimeout(() => {
                dealerPointsDisplay.textContent = parseInt(dealerPointsDisplay.innerText) - 1;
            }, time + timeout);
            time += timeStep;
            difference--;
        }
    }
}

const reAlignDealerCards = () => {
    let dealerPos = window.innerWidth / 2 - dealerDeck.length * 160 / 2 - dealerDeck.length * 20 / 2;
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].style.left = dealerPos + 'px';
        dealerPos += 180;
    }
}