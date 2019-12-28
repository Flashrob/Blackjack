//draw new card and push into array
const hitCard = function (player) {
    //push new card from deck into players card array
    game.players[player].cards.push(deck[0])
    game.players[player].totalValue = game.players[player].totalValue + deck[0].weight
    //remove the card from the deck
    deck.shift()
}

//stand button click function
const stand = function () {
    const stand = document.querySelector("#stand")
    stand.addEventListener("click", function () {
        //on click, if not game over, set player turn to false, start dealer AI
        if (game.gameOver === false) {
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
        if (game.gameOver) {}
    })
}

//retry button function
const retry = function () {
    const retry = document.querySelector("#retry")
    retry.addEventListener("click", function () {
        //on click reset playerTurn and gameOver false
        game.playerTurn = true
        game.gameOver = false
        //reset totalValue and cards in Hand for players
        for (let i = 0; i < game.players.length; i++) {
            game.players[i].totalValue = 0
            game.players[i].cards = []
        }
        //create, shuffle the deck and deal two cards
        createDeck()
        //display score
        display()
        //check for instant win after dealing cards
        blackjack()
        //instant adjust for ace, if two aces were drawn after retry
        for (let i = 0; i < game.players.length; i++) {
            adjustForAce(game.players[i])
        }
        //make retry button disappear
        displayRetry()
    })
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
    retry()
    //check for instant win after dealing cards
    blackjack()
    //instant adjust for ace, if two aces were drawn at start of the game
    for (let i = 0; i < game.players.length; i++) {
        adjustForAce(game.players[i])
    }
}

//display retry button
const displayRetry = function () {
    const retry = document.querySelector("#retry")
    retry.classList.toggle("d-none")
}