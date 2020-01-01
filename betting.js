const betEvent = function () {

    const controlButtonActivity = function(){
        //display possible Blackjack message
        document.querySelector(".message").classList.remove("d-none")
        //disable bet buttons after bet and enable action buttons
        disableBetButtons()
        enableActionButtons()
    }

    //disable action buttons
    disableActionButtons()

    //selecting bet buttons
    const ten = document.querySelector("#ten")
    const twentyFive = document.querySelector("#twentyfive")
    const fifty = document.querySelector("#fifty")
    const all = document.querySelector("#all-in")

    //event listener for $10 Button
    ten.addEventListener("click", function () {
        if (!game.players[0].betMade) {
            //display possible instant blackjack message
            document.querySelector(".message").classList.remove("d-none")
            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((game.players[0].balance - 10) >= 0) {
                game.players[0].currentBet = 10
                game.players[0].balance = game.players[0].balance - game.players[0].currentBet
                balance.innerHTML = `Your Balance: ${game.players[0].balance}`
                //makes bet buttons disabled and activates action buttons
                controlButtonActivity()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
            //make cards/hand visible with click if there is a bet
            if(game.players[0].currentBet > 0){
                activateCardDisplay()
            }
        }
    })

    //event listener for $25 Button
    twentyFive.addEventListener("click", function () {
        if (!game.players[0].betMade) {
            //display possible instant blackjack message
            document.querySelector(".message").classList.remove("d-none")
            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((game.players[0].balance - 25) >= 0) {
                game.players[0].currentBet = 25
                game.players[0].balance = game.players[0].balance - game.players[0].currentBet
                balance.innerHTML = `Your Balance: ${game.players[0].balance}`
               //makes bet buttons disabled and activates action buttons
               controlButtonActivity()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
            //make cards/hand visible with click if there is a bet
            if(game.players[0].currentBet > 0){
                activateCardDisplay()
            }
        }
    })

    //event listener for $50 Button
    fifty.addEventListener("click", function () {
        if (!game.players[0].betMade) {
            //display possible instant blackjack message
            document.querySelector(".message").classList.remove("d-none")
            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((game.players[0].balance - 50) >= 0) {
                game.players[0].currentBet = 50
                game.players[0].balance = game.players[0].balance - game.players[0].currentBet
                balance.innerHTML = `Your Balance: ${game.players[0].balance}`
                //makes bet buttons disabled and activates action buttons
               controlButtonActivity()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
            //make cards/hand visible with click if there is a bet
            if(game.players[0].currentBet > 0){
                activateCardDisplay()
            }
        }
    })

    //event listener for All-in Button
    all.addEventListener("click", function () {
        if (!game.players[0].betMade) {
            //display possible instant blackjack message
            document.querySelector(".message").classList.remove("d-none")
            //all in, bet amount is full balance and balance is set to 0
            game.players[0].currentBet = game.players[0].balance
            game.players[0].balance = game.players[0].balance - game.players[0].currentBet
            balance.innerHTML = `Your Balance: ${game.players[0].balance}`
            //makes bet buttons disabled and activates action buttons
            controlButtonActivity()
            //if game hasnt started yet, start the game
            if (!game.gameStart) {
                startGame()
                game.gameStart = true
            }
        }
        //make cards/hand visible with click if there is a bet
        if(game.players[0].currentBet > 0){
            activateCardDisplay()
        }
    })
}


//select all bet and action buttons
const allBets = document.querySelectorAll(".bet-buttons button")
const actionButtons = document.querySelectorAll(".buttons button")

//disable the action buttons as long as no bet is made
const disableActionButtons = function () {
    actionButtons.forEach(function (item) {
        item.disabled = true
    })
}

//enable action buttons once bet was made
const enableActionButtons = function () {
    actionButtons.forEach(function (item) {
        item.disabled = false
    })
}
//once bet button is clicked, deactivate and set betMade to true
const disableBetButtons = function () {
    allBets.forEach(function (item) {
        item.disabled = true
        game.players[0].betMade = true
    })
}

//once next hand is dealt, enable bet buttons and set betMade to false
const enableBetButtons = function () {
    allBets.forEach(function (item) {
        item.disabled = false
        game.players[0].betMade = false
    })
}