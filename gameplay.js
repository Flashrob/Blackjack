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
        if (game.turnOver === false) {
            if (game.playerTurn === 0) {
                game.playerTurn++
                playerAi()
                dealerAi()
            }
        }
    })
}

const hitButton = function () {
    const hit = document.querySelector("#hit")
    hit.addEventListener("click", function () {
        //if it is playerOne's turn, get another card and remove card from deck
        if (!game.turnOver) {
            if (game.playerTurn === 0) {
                hitCard(0)
                //display the card
                display()
                //check for blackjack
                blackjack()
                if (blackjack()){
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

//retry button function
const dealNewHand = function () {
    const retry = document.querySelector("#retry")
    retry.addEventListener("click", function () {
        
        //on click reset playerTurn and gameOver false
        game.players[0].loss = false
        game.playerTurn = 0
        game.turnOver = false
        //reset totalValue and cards in Hand for players
        for (let i = 0; i < game.players.length; i++) {
            game.players[i].totalValue = 0
            game.players[i].cards = []
        }
        //create, shuffle the deck and deal two cards
        createDeck()
        //display score
        display()
               //instant adjust for ace, if two aces were drawn after retry
               for (let i = 0; i < game.players.length; i++) {
                adjustForAce(game.players[i])
                }
        //check for instant win after dealing cards
        blackjack()

        enableBetButtons()
        disableActionButtons()
        document.querySelector(".message").classList.add("d-none")

        //make retry button disappear
        hideNewHand()
        deactivateCardDisplay()
        balance.innerHTML = `Place bet! Your Balance: ${game.players[0].balance}`
    })
}

//display retry button
const displayNewHand = function () {
    const retry = document.querySelector("#retry")
    retry.classList.remove("d-none")
}

const hideNewHand = function() {
    const retry = document.querySelector("#retry")
    retry.classList.add("d-none")
}

const activateCardDisplay = function () {
    const allImages = document.querySelectorAll("img")
    allImages.forEach(function (item) {
        item.classList.remove("d-none")
    })
    const text = document.querySelector(".text p")
    text.textContent = `${game.players[0].totalValue}`
    const houseText = document.querySelector(".house-text p")
    houseText.textContent = `${game.players[game.players.length - 1].totalValue}`
}

const deactivateCardDisplay = function () {
    const allImages = document.querySelectorAll("img")
    allImages.forEach(function (item) {
        item.classList.add("d-none")
    })
    const text = document.querySelector(".text p")
    text.textContent = ""
    const houseText = document.querySelector(".house-text p")
    houseText.textContent = ""
}

const gameOver = function () {
    if (game.players[0].balance === 0) {
        document.querySelector("#retry").classList.add("d-none")
        setTimeout(function () {
            //hide game board
            document.querySelector(".game-board").classList.toggle("d-none")
            //create div for restart button and game over header
            const restartDiv = document.createElement("div")
            restartDiv.id = "game-restart"
            //create game over header
            const lostText = document.createElement("h1")
            lostText.textContent = "GAME OVER!"
            //create restart button
            const restartButton = document.createElement("button")
            restartButton.textContent = "RESTART GAME!"
            restartButton.addEventListener("click", function () {
                location.reload()
            })
            //append button and header to div, append div to body
            restartDiv.appendChild(lostText)
            restartDiv.appendChild(restartButton)
            document.body.appendChild(restartDiv)
            //hide the notification panel
            document.querySelector(".notification").classList.toggle("d-none")
        }, 1500)

    }
}