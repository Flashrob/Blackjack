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
    hitButton()
    //event listener for stand button
    stand()
    //check for instant win after dealing cards
    blackjack()
}

//stand button click function
const stand = function () {
    const stand = document.querySelector("#stand")
    stand.addEventListener("click", function () {
        //on click, if not game over, set player turn to false, start dealer AI
        if (!game.gameOver) {
            if (game.playerTurn) {
                game.playerTurn = false
                dealerAi()
            }
        }

    })
}



const hitButton = function () {
    const hit = document.querySelector("#hit")
    hit.addEventListener("click", function () {
        //if it is playerOne's turn, get another card and remove card from deck
        if (!game.gameOver) {
            if (game.playerTurn) {
                hitCard(0)
                //display the card
                display()
                //check for blackjack
                blackjack()
                //if no blackjack, no game over, check for a loss
                if (!game.gameOver) {
                    checkForLoss()
                }
            }
        }
        //check for gameOver after click, if not, check for loss.
        if (game.gameOver) {

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
    //if value over 21, lose and game over
    if (game.players[0].totalValue > 21) {
        game.gameOver = true
        alert("player loses")
        return true
    } else if (game.players[game.players.length - 1].totalValue > 21) {
        game.gameOver = true
        alert("house loses!")
        return true
    }
}

const determineWinner = function () {
    //if player has higher value than dealer, player wins, game over
    if (game.players[0].totalValue > game.players[game.players.length - 1].totalValue) {
        game.gameOver = true
        alert("player wins!")
        return true
        //if player has lower value than dealer, dealer wins, game over
    } else if (game.players[0].totalValue < game.players[game.players.length - 1].totalValue) {
        game.gameOver = true
        alert("house wins!")
        return true
        //if player and dealer have the same value, push(draw) and return the bets.
    } else if (game.players[0].totalValue === game.players[game.players.length - 1].totalValue) {
        game.gameOver = true
        alert("Push! Bets returned!")
        return true
    }
}

const dealerAi = function () {
    if (!game.gameOver) {
        //house at least 17, determine winner
        if (game.players[game.players.length - 1].totalValue >= 17) {
            determineWinner()
            //house lower than 17 and lower than player one, push new card into deck(hit)
        } else if (game.players[game.players.length - 1].totalValue < 17) {
            hitCard(game.players.length-1)
            //display new score
            display()
            //check for blackjack
            blackjack()
            //if not blackjack, no game over, check for loss
            if (!game.gameOver) {
                checkForLoss()
            }
        }
        //run dealer Ai again, until game is over
        dealerAi()
    }
}

//draw new card and push into array
const hitCard = function (player) {
    //push new card from deck into players card array
    game.players[player].cards.push(deck[0])
    game.players[player].totalValue = game.players[player].totalValue + deck[0].weight
    //remove the card from the deck
    deck.shift()
}

startGame()