"use strict"

const game = {
    players: [{
            name: "playerOne",
            cards: [],
            totalValue: 0,
            balance: 100,
            currentBet: 0,
            betMade: false,
            loss: false
        }, 
        {
            name: "playerTwo",
            cards: [],
            totalValue: 0,
            balance: 200,
            currentBet: 0,
            betMade: false,
            win: false
        },
        {
            name: "playerThree",
            cards: [],
            totalValue: 0,
            balance: 150,
            currentBet: 0,
            betMade: false,
            win: false
        },
        {
            name: "playerFour",
            cards: [],
            totalValue: 0,
            balance: 400,
            currentBet: 0,
            betMade: false,
            win: false
        },
         {
            name: "House",
            cards: [],
            totalValue: 0,
            losses: 0
        },
    ],
    playerTurn: 0,
    turnOver: false,
    gameOver: false,
    gameOverText: "",
    gameStart: false
}

//rules button event. form input event to start the game.
rulesLightbox()
nameInput()