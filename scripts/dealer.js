let dealerDeck = []; // Dealer's deck
let dealerPoints = 0; // Dealer's total points
let dealerPointsEach = []; // Dealer's points after each step
let dealerIndex = 0; // Dealer index (unused variable)

const dealerPlays = () => {
    let time = 2000; // Initial timing
    let timeStep = time; // Time increment for each draw
    dealerPointsEach = []; // Clear points array
    index = 0; // Reset index

    dealerTurn = true; // Dealer's turn
    flipCard(dealerDeck[0]); // Flip the dealer's first card
    reAlignDealerCards(); // Align dealer's cards
    reCalculateDealerPoints(0); // Recalculate dealer's points
    
    // Dealer draws a new card while points are less than 17 and less than player's points
    while (dealerPoints < 17 && dealerPoints < playerPoints) {
        dealerGetCard(time);
        time += timeStep;
    }

    // Handle end of game with a delay
    setTimeout(() => {
        started = false;
        if (dealerPoints > 21) {
            endGame('Dealer bust!', 2); // Dealer exceeded 21
        }
        else if (playerPoints > 21) {
            endGame('Bust!', 0);
        }
        else if (playerPoints > dealerPoints && playerPoints == 21) {
            endGame('Blackjack!', 2); // Player got blackjack
        }
        else if (playerPoints > dealerPoints) {
            endGame('You won!', 2); // Player won
        }
        else if (playerPoints < dealerPoints) {
            endGame('You lost!', 0); // Dealer won
        }
        else {
            endGame('Push!', 1); // Draw
        }
    }, time);
}

const dealerGetCard = time => {
    let dealer = document.getElementsByClassName('dealer')[0]; // Dealer DOM element
    let newCard = getRandomCard(); // Draw a new card
    dealerDeck.push(newCard); // Add card to dealer's deck
    newCard.style.top = '-200%'; // Initial card position
    dealer.append(newCard); // Add card to DOM
    setTimeout(() => {
        newCard.style.top = '30%'; // Card animation
        reAlignDealerCards(); // Realign cards
    }, time);
    
    reCalculateDealerPoints(time); // Recalculate dealer's points
}

const reCalculateDealerPoints = timeout => {
    let time = 50; // Animation initial timing
    let timeStep = time; // Animation step

    dealerPoints = calculateDeck(dealerDeck); // Calculate dealer's points
    
    dealerPointsEach.push(dealerPoints); // Add points to array

    let dealerPointsDisplay = document.getElementById('dealerPoints'); // Points display element
    let difference = 0;
    if (index > 0) {
        difference = dealerPoints - dealerPointsEach[index - 1]; // Calculate point difference
    }
    else {
        difference = dealerPoints;
    }
    index++;

    // Animate points display increment or decrement
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
    // Horizontally align dealer's cards to the center of the screen
    let dealerPos = window.innerWidth / 2 - dealerDeck.length * 160 / 2 - dealerDeck.length * 20 / 2;
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].style.left = dealerPos + 'px';
        dealerPos += 180;
    }
}