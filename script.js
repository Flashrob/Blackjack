"use strict"

const game = {
    players: [{
            name: "playerOne",
            cards: [],
            totalValue: 0,
            balance: 100,
            currentBet: 0
        }, {
            name: "House",
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
    betMade: false,
    turnOver: false,
    gameOver: false,
    gameOverText: "",
    gameStart: false
}

//previously start game. With betting structure, start game only once a bet was made.
betEvent()
