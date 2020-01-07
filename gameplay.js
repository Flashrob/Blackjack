//function to draw new card
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
        //on click, if not game over, next player turn, start AI and dealer AI
        if (game.turnOver === false) {
            if (game.playerTurn === 0) {
                game.playerTurn++
                //draw cards for AI
                playerAi()
                //draw cards for dealer and check for win/loss/blackjack
                dealerAi()
            }
        }
    })
}

//hit button click function
const hitButton = function () {
    const hit = document.querySelector("#hit")
    hit.addEventListener("click", function () {
        //if it is player's turn, get another card and remove card from deck
        if (!game.turnOver) {
            if (game.playerTurn === 0) {
                //draw a card for player 0
                hitCard(0)
                //display the card
                display()
                //check for blackjack, will set turnOver to true in case oblackjack
                blackjack()
                //if blackjack is true, display next hand button
                if (blackjack()) {
                    displayNewHand()
                }
                //check for a loss or adjusted ace
                if (!game.turnOver) {
                    checkForLoss()
                }
            }
        }
    })
}

//next hand button click function
const dealNewHand = function () {
    const retry = document.querySelector("#retry")
    retry.addEventListener("click", function () {

        //on click reset game state
        game.players[0].loss = false
        game.playerTurn = 0
        game.turnOver = false

        //reset totalValue and cards in Hand for players
        for (let i = 0; i < game.players.length; i++) {
            game.players[i].totalValue = 0
            game.players[i].cards = []
        }

        //create, shuffle the deck and deal two cards
        createDeck(5)
        //display score
        display()

        //instant adjust for ace, if two aces were drawn after retry
        for (let i = 0; i < game.players.length; i++) {
            adjustForAce(game.players[i])
        }

        //check for instant win after dealing cards
        //check for gameOver if blackjack for house
        if(blackjack()){
            gameOver()
        }
        //enable bet and disable action after new hand was dealt
        enableBetButtons()
        disableActionButtons()
        //make game state message disappear
        document.querySelector(".message").classList.add("d-none")
        //make retry button disappear
        hideNewHand()
        //make new total values disappear before bet was made
        hideNewValue()
        //make cards disappear before bet was made
        deactivateCardDisplay()
        balance.innerHTML = `Place bet! Your Balance: ${game.players[0].balance}`
    })
}

//game over once players balance is 0
const gameOver = function () {
    if (game.players[0].balance === 0) {
        document.querySelector("#retry").classList.add("d-none")
        setTimeout(function () {
            //hide game board
            document.querySelector(".game-board").classList.add("d-none")
            //create div for restart button and game over header
            const restartDiv = document.createElement("div")
            restartDiv.id = "game-restart"
            //create game over header
            const lostText = document.createElement("h1")
            lostText.textContent = "GAME OVER!"
            //create restart button
            const restartButton = document.createElement("button")
            restartButton.textContent = "RESTART GAME!"
            restartButton.className = "btn btn-outline-danger"
            restartButton.addEventListener("click", function () {
                location.reload()
            })
            //append button and header to div, append div to body
            restartDiv.appendChild(lostText)
            restartDiv.appendChild(restartButton)
            document.body.appendChild(restartDiv)
            //hide the notification panel
            document.querySelector(".notification").classList.add("d-none")
        }, 1500)
    }
}