"use strict"
const game = {
    players: [{
            name: "playerOne",
            cards: [],
            totalValue: 0,
            cash: 0
        }, {
            name: "house",
            cards: [],
            totalValue: 0,
            losses: 0
        },
        // {
        //     name: "playerTwo",
        //     cards: [],
        //     totalValue: 0,
        //     cash: 0
        // }
    ],
    playerTurn: true,
    gameOver: false
}
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
        for(let j = 0; j < 2; j++){
            game.players[i].cards.push(deck[0])
            game.players[i].totalValue = game.players[i].totalValue + deck[0].weight
            deck.shift()
        }
    }
}

const startGame = function () {
    createDeck()
    hitCard()
    blackjack()
}

const hitCard = function () {
    const hit = document.querySelector("#hit")
    hit.addEventListener("click", function () {
        if (game.playerTurn === true) {
            game.players[0].cards.push(deck[0])
            game.players[0].totalValue = game.players[0].totalValue + deck[0].weight
            deck.shift()
            game.playerTurn = !game.playerTurn
            console.log(game.players)

        } else if (game.playerTurn === false) {
            game.players[1].cards.push(deck[0])
            game.players[1].totalValue = game.players[1].totalValue + deck[0].weight
            deck.shift()
            console.log(game.players)
            game.playerTurn = !game.playerTurn
        }
        blackjack()
        if (game.gameOver) {

        } else {
            if (checkForLoss()) {

            }
        }

    })
}

const blackjack = function () {
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].totalValue === 21) {
            game.gameOver = true
        }
    }
}

const checkForLoss = function () {
    if (game.players[0].totalValue > 21) {
        alert("You lost!")
        return true
    }
    if (game.players[1].totalValue > 21) {
        alert("The house lost!")
        return true
    }
}

startGame()