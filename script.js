"use strict"

const game = {
    players: [{
            name: "playerOne",
            cards: [],
            totalValue: 0,
            balance: 100,
            currentBet: 0,
            //checks if bet was made
            betMade: false,
            //check if turn is lost, for AI function
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
    //checks if turn is over
    turnOver: false,
    //checks if game is over(balance 0)
    gameOver: false,
    gameOverText: "",
    //checks if game has started when clicking on bet for the first time
    gameStart: false
}

//rules button event. form input event to start the game.
rulesLightbox()
nameInput()