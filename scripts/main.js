// Global debug flag
window.debug = false;
let started = false;      // Tracks if the game has started
let dealerTurn = false;   // Tracks if it's the dealer's turn

// Add event listener to start button
document.getElementById('start').addEventListener('click', start);

// Initialize UI on window load
window.onload = () => {
    defaultButtonLayout();
    document.getElementById('playerPoints').textContent = '0';
    document.getElementById('dealerPoints').textContent = '0';
    document.getElementById('minus').addEventListener('click', decreaseBet);
    document.getElementById('plus').addEventListener('click', increaseBet);
}

// Starts a new game
async function start() {
    started = true;

    disableStartButton();
    disableBets();

    let dealer = document.getElementsByClassName('dealer')[0];
    let player = document.getElementsByClassName('player')[0];

    // Deal two cards to dealer
    dealerDeck.push(getRandomCard());
    dealerDeck.push(getRandomCard());
    flipCard(dealerDeck[0]); // Show first dealer card

    // Deal two cards to player
    playerDeck.push(getRandomCard());
    playerDeck.push(getRandomCard());
    
    // Animate dealer cards
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].style.top = '-100%';
        dealer.appendChild(dealerDeck[i]);
        setTimeout(() => {
            dealerDeck[i].style.top = '30%';
        }, 1000);
        await delay(200);
    }

    // Position dealer cards horizontally
    dealerDeck[0].style.left = window.innerWidth / 2 - 50 + 'px';
    dealerDeck[1].style.left = window.innerWidth / 2 + 'px';
    
    // Animate player cards
    for (let i = 0; i < playerDeck.length; i++) {
        playerDeck[i].style.top = '-200%';
        player.appendChild(playerDeck[i]);
        setTimeout(() => {
            playerDeck[i].style.top = '30%';
        }, 1000);
        await delay(200);
    }

    // Position player cards horizontally
    playerDeck[0].style.left = window.innerWidth / 2 - 90 + 'px';
    playerDeck[1].style.left = window.innerWidth / 2 + 90 + 'px';

    reCalculatePlayerPoints();
    reAlignPlayerCards();
}

// Ends the game and displays a message
// 0: lost, 1: draw, 2: won
const endGame = (message, outcome) => {
    let display = document.getElementById('message-display');
    let text = document.getElementById('text');
    text.textContent = message;
    display.style.display = 'flex';

    // Animate cards off the screen
    for (let i = 0; i < playerDeck.length + dealerDeck.length; i++) {
        if (i < playerDeck.length) {
            playerDeck[i].style.top = '-200%';
        }
        else {
            dealerDeck[i - playerDeck.length].style.top = '-100%';
        }
    }

    // Fade in message display, then reset
    setTimeout(() => {
        display.style.opacity = '1';
        setTimeout(() => resetDisplay, 1000);
        setTimeout(() => {
            switch (outcome) {
                case 0:
                    resetBet();
                    break;
                case 1:
                    addBalance(getBet());
                    resetBet();
                    break;
                case 2:
                    addBalance(getBet() * 2);
                    resetBet();
                    break;
            }
            enableBets();
        }, 1000);
    }, 1000);

    // Set up restart button
    document.getElementById('restart-button').onclick = () => resetDisplay();
}

// Resets the game state and UI
const resetDisplay = () => {
    playerPoints = 0;
    dealerPoints = 0;
    dealerTurn = false;
    
    document.getElementById('playerPoints').textContent = '0';
    document.getElementById('dealerPoints').textContent = '0';
    
    // Remove all cards from the table
    for (let i = 0; i < playerDeck.length; i++) {
        playerDeck[i].remove();
    }
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].remove();
    }

    dealerDeck = [];
    playerDeck = [];

    // Hide message display
    let messageDisplay = document.getElementById('message-display');
    setTimeout(() => {
        messageDisplay.style.opacity = '0';
        setTimeout(() => {
            messageDisplay.style.display = 'none';
        }, 1000);
    }, 500);
    enableStartButton();
}

// Disables all play buttons
const disablePlayButtons = () => {
    let startButton = document.getElementById('start');
    let getCardButton = document.getElementById('getcard');
    let standButton = document.getElementById('stand');
    startButton.removeEventListener('click', start);
    getCardButton.removeEventListener('click', getNewCard);
    standButton.removeEventListener('click', standHand);

    startButton.style.left = '-100%';
    getCardButton.style.left = '-100%';
    standButton.style.left = '-100%';
}

// Disables start button and enables play buttons
const disableStartButton = () => {
    let startButton = document.getElementById('start');
    let getCardButton = document.getElementById('getcard');
    let standButton = document.getElementById('stand');

    startButton.removeEventListener('click', start);
    startButton.style.left = '-100%';
    getCardButton.style.left = window.innerWidth / 2 - 50 + 'px';
    standButton.style.left = window.innerWidth / 2 + 80 + 'px';

    getCardButton.addEventListener('click', getNewCard);
    standButton.addEventListener('click', standHand);
}

// Enables start button and disables play buttons
const enableStartButton = () => {
    let startButton = document.getElementById('start');
    let getCardButton = document.getElementById('getcard');
    let standButton = document.getElementById('stand');
    startButton.addEventListener('click', start);
    getCardButton.removeEventListener('click', getNewCard);
    standButton.removeEventListener('click', standHand);
    defaultButtonLayout();
}

// Utility: returns a promise that resolves after ms milliseconds
const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sets the default layout for the control buttons
const defaultButtonLayout = () => {
    let buttons = document.getElementsByClassName('button');
    buttons[0].style.left = `10px`;
    buttons[1].style.left = `-20%`;
    buttons[2].style.left = `-20%`;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.bottom = `10px`;
    }
}

// Handles window resize to realign cards and buttons
window.onresize = () => {
    if (started) {
        if (dealerTurn) {
            reAlignDealerCards();
        }
        else {
            let getButton = document.getElementById('getcard');
            getButton.style.left = window.innerWidth / 2 - 120 + 'px';
            document.getElementById('stand').style.left = window.innerWidth / 2 + 120 + 'px';

            dealerDeck[0].style.left = window.innerWidth / 2 - (160 + 50) / 2 + 'px';
            dealerDeck[1].style.left = window.innerWidth / 2 - 160 / 2 + 'px';
        }
        reAlignPlayerCards();
    }
}

// Increases bet and decreases balance when plus button is clicked


const increaseBet = () => {
    let bet = document.getElementById('bet');
    let balance = document.getElementById('balance');
    let betValue = parseInt(bet.innerText.replace('$',''));
    let balanceValue = parseInt(balance.innerText.replace('$',''));

    if (balanceValue > 10) {
        betValue += 10;
        balanceValue -= 10;
    }
    else {
        betValue += balanceValue;
        balanceValue = 0;
    }
    bet.innerText = `$${betValue}`;
    balance.innerText = `$${balanceValue}`;
}

const addBalance = (value) => {
    let bet = document.getElementById('bet');
    let balance = document.getElementById('balance');
    let balanceValue = parseInt(balance.innerText.replace('$',''));
    balanceValue += value;
    balance.innerText = `$${balanceValue}`;
}

const resetBet = () => {
    let bet = document.getElementById('bet');
    bet.innerText = `$${0}`;
}

const getBet = () => {
    let bet = document.getElementById('bet');
    let betValue = parseInt(bet.innerText.replace('$',''));
    return betValue;
}

// Decreases bet and increases balance when minus button is clicked

const decreaseBet = () => {
    let bet = document.getElementById('bet');
    let balance = document.getElementById('balance');
    let betValue = parseInt(bet.innerText.replace('$',''));
    let balanceValue = parseInt(balance.innerText.replace('$',''));

    if (betValue > 10) {
        betValue -= 10;
        balanceValue += 10;
    }
    else {
        balanceValue += betValue;
        betValue = 0;
    }
    bet.innerText = `$${betValue}`;
    balance.innerText = `$${balanceValue}`;
}

const disableBets = () => {
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    const balance = document.getElementById('balance');
    const balanceText = document.getElementById('balance-text');

    plus.style.opacity = 0;
    minus.style.opacity = 0;
    balance.style.opacity = 0;
    balanceText.style.opacity = 0;

    plus.removeEventListener('click', increaseBet);
    minus.removeEventListener('click', decreaseBet);
}

const enableBets = () => {
    document.getElementById('plus').addEventListener('click', increaseBet);
    document.getElementById('minus').addEventListener('click', decreaseBet);
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    const balance = document.getElementById('balance');
    const balanceText = document.getElementById('balance-text');

    plus.style.opacity = 1;
    minus.style.opacity = 1;
    balance.style.opacity = 1;
    balanceText.style.opacity = 1;
}