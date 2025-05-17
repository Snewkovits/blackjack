// Creates a card DOM element with the given type (suit) and number (value)
const createCard = (type, num) => {
    let shape = window.shape(type); // Get shape info (image, color, filter) for the suit
    let leftright = '10px';

    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('number', num);

    // Create front and back sides of the card
    let front = document.createElement('div');
    let back = document.createElement('div');
    front.className ='front';
    back.className = 'back';

    card.appendChild(front);
    card.appendChild(back);

    // Adjust left/right offset for '10'
    if (num == '10') {
        leftright = '4px';
    }
    
    // Add number to each corner of the card
    element = document.createElement('div');
    Object.assign(element, {
        innerHTML: num,
        style: `position: absolute; top: 10px; left: ${leftright}; font-size: 20pt; color: ${shape.color};`,
    });
    front.appendChild(element);

    element = document.createElement('div');
    Object.assign(element, {
        innerHTML: num,
        style: `position: absolute; top: 10px; right: ${leftright}; font-size: 20pt; color: ${shape.color};`,
    });
    front.appendChild(element);

    element = document.createElement('div');
    Object.assign(element, {
        innerHTML: num,
        style: `position: absolute; bottom: 10px; right: ${leftright}; font-size: 20pt; transform: rotate(180deg); color: ${shape.color};`,
    });
    front.appendChild(element);

    element = document.createElement('div');
    Object.assign(element, {
        innerHTML: num,
        style: `position: absolute; bottom: 10px; left: ${leftright}; font-size: 20pt; transform: rotate(180deg); color: ${shape.color};`,
    });
    front.appendChild(element);

    // Add small suit images to each corner
    element = document.createElement('img');
    Object.assign(element, {
        src: shape.image,
        style: `position: absolute; top: 40px; left: 10px; height: 15px; filter: ${shape.filter}`,
    });
    front.appendChild(element);

    element = document.createElement('img');
    Object.assign(element, {
        src: shape.image,
        style: `position: absolute; top: 40px; right: 10px; height: 15px; filter: ${shape.filter}`,
    });
    front.appendChild(element);

    element = document.createElement('img');
    Object.assign(element, {
        src: shape.image,
        style: `position: absolute; bottom: 40px; right: 10px; height: 15px; transform: rotate(180deg); filter: ${shape.filter}`,
    });
    front.appendChild(element);

    element = document.createElement('img');
    Object.assign(element, {
        src: shape.image,
        style: `position: absolute; bottom: 40px; left: 10px; height: 15px; transform: rotate(180deg); filter: ${shape.filter}`,
    });
    front.appendChild(element);

    // Add big suit images in the center, depending on card value
    if (num == '2' || num == '3') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 20px; left: 50%; height: 40px; transform: translateX(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '2' || num == '3') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; bottom: 20px; left: 50%; height: 40px; transform: translateX(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '3' || num == '5' || num == '9' || num == 'A' || num == 'K' || num == 'Q' || num == 'J') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; bottom: 20px; left: 50%; top: 50%; height: 40px; transform: translateX(-50%) translateY(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    // Add more suit images for higher card values
    if (num == '4' || num == '5' || num == '6' || num == '7' || num == '8' || num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 20px; left: 35%; height: 40px; transform: translateX(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '4' || num == '5' || num == '6' || num == '7' || num == '8' || num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 20px; left: 65%; height: 40px; transform: translateX(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '4' || num == '5' || num == '6' || num == '7' || num == '8' || num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; bottom: 20px; left: 35%; height: 40px; transform: translateX(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '4' || num == '5' || num == '6' || num == '7' || num == '8' || num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; bottom: 20px; left: 65%; height: 40px; transform: translateX(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '6' || num == '7' || num == '8') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 50%; left: 65%; height: 40px; transform: translateX(-50%) translateY(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '6' || num == '7' || num == '8') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 50%; left: 35%; height: 40px; transform: translateX(-50%) translateY(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '7' || num == '8' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 33%; left: 50%; height: 40px; transform: translateX(-50%) translateY(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '8' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 67%; left: 50%; height: 40px; transform: translateX(-50%) translateY(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 63%; left: 20%; height: 40px; transform: translateX(-50%) translateY(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 63%; left: 80%; height: 40px; transform: translateX(-50%) translateY(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 40%; left: 20%; height: 40px; transform: translateX(-50%) translateY(-50%); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    if (num == '9' || num == '10') {
        element = document.createElement('img');
        Object.assign(element, {
            src: shape.image,
            style: `position: absolute; top: 40%; left: 80%; height: 40px; transform: translateX(-50%) translateY(-50%) rotate(180deg); filter: ${shape.filter}`,
        });
        front.appendChild(element);
    }

    card.setAttribute('flipped', false);

    // Enable flipping for debugging
    if (window.debug)
        card.onclick = () => flipCard(card);

    return card;
}

// Returns shape info (image, color, filter) for a given suit type
window.shape = type => {
    if (type == 'hearts') {
        return {
            image: 'images/hearts.png',
            color: '#FF1342',
            filter: 'invert(80%) sepia(100%) saturate(5000%) hue-rotate(340deg) brightness(100%) contrast(100%)'
        }
    }
    if (type == 'diamonds') {
        return {
            image: 'images/diamonds.png',
            color: '#FF1342',
            filter: 'invert(80%) sepia(100%) saturate(5000%) hue-rotate(340deg) brightness(100%) contrast(100%)'
        }
    }
    if (type == 'clubs') {
        return  {
            image: 'images/clubs.png',
            color: 'white',
            filter: ''
        }
    }
    if (type == 'spades') {
        return  {
        image: 'images/spades.png',
        color: 'white',
        filter: ''
    }
    }
    return 'error';
}

// Flips a card element between front and back
const flipCard = card => {
    let front = card.getElementsByClassName('front')[0];
    let back = card.getElementsByClassName('back')[0];
    if (card.attributes['flipped'].value == 'false') {
        card.attributes['flipped'].value = 'true';
        setTimeout(() => {
            front.style.display = 'none';
            back.style.display = 'block';
            card.style.transform = 'rotate3d(0, 1, 0, 180deg)';
        }, 200);
        card.style.transform = 'rotate3d(0, 1, 0, 90deg)';
    }
    else {
        card.style.transform = 'rotate3d(0, 1, 0, 90deg)';
        setTimeout(() => {
            front.style.display = 'block';
            back.style.display = 'none';
            card.style.transform = 'rotate3d(0, 1, 0, 0deg)';
        }, 200);
        card.attributes['flipped'].value = 'false';
    }
};

// Returns a random card from the deck that hasn't been drawn yet
const getRandomCard = () => {
    let type = Math.floor(Math.random() * 4);
    let num = Math.floor(Math.random() * 13);
    let types = [deck.hearts, deck.diamonds, deck.spades, deck.clubs];
    let nums = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // If card is already out, try again
    if (types[type][nums[num]].isOut) {
        return getRandomCard();
    }
    else {
        types[type][nums[num]].isOut = true;
        return createCard(Object.keys(deck)[type], nums[num]);
    }
}

// Resets the deck so all cards are available again
const resetDeck = () => {
    for (let type in deck) {
        for (let num in deck[type]) {
            deck[type][num].isOut = false;
        }
    }
}

// Calculates the total points for a given hand (array of card elements)
const calculateDeck = deck => {
    let deckNums = [];
    let points = 0;
    for (let i = 0; i < deck.length; i++) {
        deckNums.push(deck[i].getAttribute('number'));
    }

    deck = sortDeck(deckNums);
    for (let i = 0; i < deck.length; i++) {
        let card = deck[i];
        if (card != 'A' && card != 'K' && card != 'Q' && card != 'J') {
            points += parseInt(card);
        }
        else if (card == 'K' || card == 'Q' || card == 'J') {
            points += 10;
        }
        else if (card == 'A') {
            // Ace is 11 unless it would bust, then it's 1
            if (points + 11 > 21) { points += 1; }
            else {points += 11;}
        }
        else {
            endGame('Error calculating points');
        }
    }
    return points;
}

// Moves Aces to the end of the deck array for easier point calculation
const sortDeck = deck => {
    deck.forEach(card => {
        if (card == 'A') {
            let temp = deck[deck.length - 1];
            deck[deck.length - 1] = card;
            deck[deck.indexOf(card)] = temp;
        }
    });
    return deck;
}

// Deck object: each suit contains all card values, each with an isOut flag
const deck = {
    hearts: {
        'A': { isOut: false },
        '2': { isOut: false },
        '3': { isOut: false },
        '4': { isOut: false },
        '5': { isOut: false },
        '6': { isOut: false },
        '7': { isOut: false },
        '8': { isOut: false },
        '9': { isOut: false },
        '10': { isOut: false },
        'J': { isOut: false },
        'Q': { isOut: false },
        'K': { isOut: false }
    },
    diamonds: {
        'A': { isOut: false },
        '2': { isOut: false },
        '3': { isOut: false },
        '4': { isOut: false },
        '5': { isOut: false },
        '6': { isOut: false },
        '7': { isOut: false },
        '8': { isOut: false },
        '9': { isOut: false },
        '10': { isOut: false },
        'J': { isOut: false },
        'Q': { isOut: false },
        'K': { isOut: false }
    },
    spades: {
        'A': { isOut: false },
        '2': { isOut: false },
        '3': { isOut: false },
        '4': { isOut: false },
        '5': { isOut: false },
        '6': { isOut: false },
        '7': { isOut: false },
        '8': { isOut: false },
        '9': { isOut: false },
        '10': { isOut: false },
        'J': { isOut: false },
        'Q': { isOut: false },
        'K': { isOut: false }
    },
    clubs: {
        'A': { isOut: false },
        '2': { isOut: false },
        '3': { isOut: false },
        '4': { isOut: false },
        '5': { isOut: false },
        '6': { isOut: false },
        '7': { isOut: false },
        '8': { isOut: false },
        '9': { isOut: false },
        '10': { isOut: false },
        'J': { isOut: false },
        'Q': { isOut: false },
        'K': { isOut: false }
    }
}