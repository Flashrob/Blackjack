// TODO
// ADD OTHER PLAYERS
// ADD BETTING
    // - repeat
// ADD RULES LIGHTBOX
// ADD EXTRA FEATURES
// MAKE LAYOUT RESPONSIVE

let deck = []
const message = document.querySelector(".message")
const balance = document.querySelector("#balance")

const createDeck = function () {
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    deck = []
    //loop through suits and values arrays, to create a full deck in the deck object
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {

            //set card weight for winning logic
            let weight = parseInt(values[i])

            if (values[i] === "J" || values[i] === "Q" || values[i] === "K") {
                weight = 10
            }
            if (values[i] === "A") {
                weight = 11
            }
            //create card object
            let card = {
                suit: suits[j],
                value: values[i],
                weight: weight,
                image: `images/${suits[j][0]}${values[i]}.png`
            }

            //push card object to deck
            deck.push(card)
            game.turnOver = false
        }
    }
    //shuffle 1000 times
    shuffleDeck(1000)
    //deal Cards
    dealCards()
}

//shuffle the deck
const shuffleDeck = function (shuffleLoops) {
    //assign every value with a random new one, as many times as shuffleLoops
    for (let i = 0; i < shuffleLoops; i++) {
        for (let j = 0; j < deck.length; j++) {
            let ran = Math.floor(Math.random() * (52 - 0)) + 0
            let temp = deck[j]
            deck[j] = deck[ran]
            deck[ran] = temp
        }
    }
}

//deal two cards to all players
const dealCards = function () {
    //deal two cards to each player
    for (let i = 0; i < game.players.length; i++) {
        for (let j = 0; j < 2; j++) {
            hitCard(i)
        }
    }
}

//display the cards
const displayCards = function () {

    const cards = document.querySelectorAll(".cards")
    const houseCards = document.querySelector(".house-cards")
    //reset card display
    cards.forEach(function (item) {
        item.innerHTML = ""
    })
    houseCards.innerHTML = ""

    //display cards for house in houseCards div
    for (let k = 0; k < game.players[game.players.length - 1].cards.length; k++) {
        const img = document.createElement("img")
        img.setAttribute("src", `${game.players[game.players.length-1].cards[k].image}`)
        img.className = `house-card-${k}`
        houseCards.appendChild(img)
    }

    //display cards for all players in cards div
    for (let i = 0; i < game.players.length - 1; i++) {
        for (let j = 0; j < game.players[i].cards.length; j++) {
            const img = document.createElement("img")
            img.setAttribute("src", `${game.players[i].cards[j].image}`)
            img.className = `card-image-${j}`
            cards[i].appendChild(img)
        }
    }

}

//display the score
const display = function () {
    //select text div and reset content for player
    const text = document.querySelector(".text")
    text.innerHTML = ""
    message.textContent = ""

    //loop through all players
    for (let i = 0; i < game.players.length - 1; i++) {
        //create p for each player
        const p = document.createElement("p")
        //set content to player cards value
        p.textContent = `${game.players[i].totalValue}`
        //append paragraph to text div
        text.appendChild(p)
    }

    //select text div and reset content for house
    const textHouse = document.querySelector(".house-text")
    textHouse.innerHTML = ""
    //create a p for the house
    const pHouse = document.createElement("p")
    //set text content to house cards value
    pHouse.textContent = `${game.players[game.players.length-1].totalValue}`
    //append house p to text div
    textHouse.appendChild(pHouse)
    //display the current balance
    balance.innerHTML = `Your Balance: ${game.players[0].balance}`
    //display the cards
    displayCards()
}

const startGame = function () {
    //create, shuffle the deck and deal two cards
    createDeck()
    //display score
    display()
    //event listener for hit button
    hitButton()
    //event listener for stand button
    stand()
    //event listener for retry button
    dealNewHand()
    //check for instant win after dealing cards
    blackjack()
    //instant adjust for ace, if two aces were drawn at start of the game
    for (let i = 0; i < game.players.length; i++) {
        adjustForAce(game.players[i])
    }
}