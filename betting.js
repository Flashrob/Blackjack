//make bet buttons do something and starts the game once a bet is made
const betEvent = function () {
    const player = game.players[0]

    //display gameboard
    document.querySelector(".game-board").classList.remove("d-none")

    //display player name
    document.querySelector("#player-name").textContent = player.name

    const controlButtonActivity = function () {
        //display possible Blackjack message
        message.classList.remove("d-none")
        //disable bet buttons after bet and enable action buttons
        disableBetButtons()
        enableActionButtons()
    }

    //disable action buttons
    disableActionButtons()

    //display value and blackjackmessage
    const displayValueAndBlackjack = function(){
        //display total value
        message.classList.remove("d-none")
        displayNewValue()
        //display possible instant blackjack message
        if (blackjack()) {
            displayNewHand()
        }
    }

    //display Balance
    const displayBalance = function(){
        //set new balance
        player.balance = player.balance - player.currentBet
        //display balance
        balance.innerHTML = `Your Balance: ${player.balance}`
    }

    //selecting bet buttons
    const ten = document.querySelector("#ten")
    const twentyFive = document.querySelector("#twentyfive")
    const fifty = document.querySelector("#fifty")
    const all = document.querySelector("#all-in")

    //event listener for $10 Button
    ten.addEventListener("click", function (e) {
        if (!player.betMade) {
            //display value and blackjack message
            displayValueAndBlackjack()

            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((player.balance - 10) >= 0) {
                player.currentBet = 10
                displayBalance()
                //makes bet buttons disabled and activates action buttons
                controlButtonActivity()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
            //make cards/hand visible with click if there is a bet
            if (player.currentBet > 0) {
                activateCardDisplay()
            }
        }
    })


    //event listener for $25 Button
    twentyFive.addEventListener("click", function () {
        if (!player.betMade) {
            //display value and blackjack message
            displayValueAndBlackjack()

            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((player.balance - 25) >= 0) {
                player.currentBet = 25
                displayBalance()
                //makes bet buttons disabled and activates action buttons
                controlButtonActivity()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
            //make cards/hand visible with click if there is a bet
            if (player.currentBet > 0) {
                activateCardDisplay()
            }
        }
    })

    //event listener for $50 Button
    fifty.addEventListener("click", function () {
        if (!player.betMade) {
            //display value and blackjack message
            displayValueAndBlackjack()

            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((player.balance - 50) >= 0) {
                player.currentBet = 50
                displayBalance()
                //makes bet buttons disabled and activates action buttons
                controlButtonActivity()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
            //make cards/hand visible with click if there is a bet
            if (player.currentBet > 0) {
                activateCardDisplay()
            }
        }
    })

    //event listener for All-in Button
    all.addEventListener("click", function () {
        if (!player.betMade) {
            //display value and blackjack message
            displayValueAndBlackjack()

            //all in, bet amount is full balance and balance is set to 0
            player.currentBet = player.balance
            displayBalance()
            //makes bet buttons disabled and activates action buttons
            controlButtonActivity()
            //if game hasnt started yet, start the game
            if (!game.gameStart) {
                startGame()
                game.gameStart = true
            }
        }
        //make cards/hand visible with click if there is a bet
        if (player.currentBet > 0) {
            activateCardDisplay()
        }
    })
}