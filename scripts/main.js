window.debug = false;
let started = false;
let dealerTurn = false;

document.getElementById('start').addEventListener('click', start);

window.onload = () => {
    defaultButtonLayout();
    document.getElementById('playerPoints').textContent = '0';
    document.getElementById('dealerPoints').textContent = '0';
}

async function start() {
    started = true;

    disableStartButton();

    let dealer = document.getElementsByClassName('dealer')[0];
    let player = document.getElementsByClassName('player')[0];

    dealerDeck.push(getRandomCard());
    dealerDeck.push(getRandomCard());
    flipCard(dealerDeck[0]);

    playerDeck.push(getRandomCard());
    playerDeck.push(getRandomCard());
    
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].style.top = '-100%';
        dealer.appendChild(dealerDeck[i]);
        setTimeout(() => {
            dealerDeck[i].style.top = '30%';
        }, 1000);
        await delay(200);
    }

    dealerDeck[0].style.left = window.innerWidth / 2 - 50 + 'px';
    dealerDeck[1].style.left = window.innerWidth / 2 + 'px';
    
    for (let i = 0; i < playerDeck.length; i++) {
        playerDeck[i].style.top = '-200%';
        player.appendChild(playerDeck[i]);
        setTimeout(() => {
            playerDeck[i].style.top = '30%';
        }, 1000);
        await delay(200);
    }

    playerDeck[0].style.left = window.innerWidth / 2 - 90 + 'px';
    playerDeck[1].style.left = window.innerWidth / 2 + 90 + 'px';

    reCalculatePlayerPoints();
    reAlignPlayerCards();
}

const endGame = message => {
    let display = document.getElementById('message-display');
    let text = document.getElementById('text');
    text.textContent = message;
    display.style.display = 'flex';

    for (let i = 0; i < playerDeck.length + dealerDeck.length; i++) {
        if (i < playerDeck.length) {
            playerDeck[i].style.top = '-200%';
        }
        else {
            dealerDeck[i - playerDeck.length].style.top = '-100%';
        }
    }

    setTimeout(() => {
        display.style.opacity = '1';
        setTimeout(() => resetDisplay, 1000);
    }, 1000);

    document.getElementById('restart-button').onclick = () => resetDisplay();
}

const resetDisplay = () => {
    playerPoints = 0;
    dealerPoints = 0;
    dealerTurn = false;
    
    document.getElementById('playerPoints').textContent = '0';
    document.getElementById('dealerPoints').textContent = '0';
    
    for (let i = 0; i < playerDeck.length; i++) {
        playerDeck[i].remove();
    }
    for (let i = 0; i < dealerDeck.length; i++) {
        dealerDeck[i].remove();
    }

    dealerDeck = [];
    playerDeck = [];

    let messageDisplay = document.getElementById('message-display');
    setTimeout(() => {
        messageDisplay.style.opacity = '0';
        setTimeout(() => {
            messageDisplay.style.display = 'none';
        }, 1000);
    }, 500);
    enableStartButton();
}

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

const enableStartButton = () => {
    let startButton = document.getElementById('start');
    let getCardButton = document.getElementById('getcard');
    let standButton = document.getElementById('stand');
    startButton.addEventListener('click', start);
    getCardButton.removeEventListener('click', getNewCard);
    standButton.removeEventListener('click', standHand);
    defaultButtonLayout();
}

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const defaultButtonLayout = () => {
    let buttons = document.getElementsByClassName('button');
    buttons[0].style.left = `10px`;
    buttons[1].style.left = `-20%`;
    buttons[2].style.left = `-20%`;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.bottom = `10px`;
    }
}

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