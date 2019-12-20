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

const startGame = function () {
    //create, shuffle the deck and deal two cards
    createDeck()
    //display score
    display()
    //event listener for hit button
    hitCard()
    //event listener for stand button
    stand()
    //check for instant win after dealing cards
    blackjack()
}

const stand = function () {
    const stand = document.querySelector("#stand")
    stand.addEventListener("click", function () {
        if (game.gameOver === false) {
            if (game.playerTurn === true) {
                game.playerTurn = !game.playerTurn
                ai()
            } else {
                ai()
            }
        }

    })
}

const hitCard = function () {
    const hit = document.querySelector("#hit")
    hit.addEventListener("click", function () {
        //if it is playerOne's turn, get another card and remove card from deck
        if (game.gameOver === false) {
            if (game.playerTurn === true) {
                game.players[0].cards.push(deck[0])
                game.players[0].totalValue = game.players[0].totalValue + deck[0].weight
                deck.shift()
                display()
                blackjack()
            } else {
                ai()
            }

        }
        //check for gameOver after click, if not, check for loss.
        if (game.gameOver) {

        } else {
            if (checkForLoss()) {
                game.gameOver = true
            }
        }

    })
}

//check each player, if their card value is 21 for instant win
const blackjack = function () {
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].totalValue === 21) {
            game.gameOver = true
            return alert(`BLACKJACK by ${game.players[i].name}`)
        }
    }
}

const checkForLoss = function () {
    if (game.players[0].totalValue > 21) {
        return true
    }
    if (game.players[1].totalValue > 21) {
        return true
    }
}

const determineWinner = function () {
    
}

const ai = function () {
    if (game.playerTurn === false) {
        if (game.players[1].totalValue > 17) {
            game.playerTurn = !game.playerTurn
        } else {
            game.players[1].cards.push(deck[0])
            game.players[1].totalValue = game.players[1].totalValue + deck[0].weight
            deck.shift()
            game.playerTurn = !game.playerTurn
            display()
            blackjack()
            checkForLoss()
        }
    }
}

const display = function () {
    const text = document.querySelector(".text")
    text.innerHTML = ""
    for (let i = 0; i < game.players.length; i++) {

        const div = document.createElement("div")
        const p = document.createElement("p")
        p.textContent = `${game.players[i].name}: Value ${game.players[i].totalValue}`
        text.appendChild(div)
        div.appendChild(p)
    }
}

startGame()