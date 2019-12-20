//basic card arrays
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const deck = []

const createDeck = function () {
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
                weight: weight
            }
            //push card object to deck
            deck.push(card)
            game.gameOver = false
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

//display the score
const display = function () {
    //select text div and reset content
    const text = document.querySelector(".text")
    text.innerHTML = ""
    //loop through all players
    for (let i = 0; i < game.players.length; i++) {
        //create a div and p for each player
        const div = document.createElement("div")
        const p = document.createElement("p")
        //set content to player cards value
        p.textContent = `${game.players[i].name}: Value ${game.players[i].totalValue}`
        //append divs to text div, and paragraphs to divs
        text.appendChild(div)
        div.appendChild(p)
    }
}