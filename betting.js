const betEvent = function () {
    disableActionButtons()

    const ten = document.querySelector("#ten")
    const twentyFive = document.querySelector("#twentyfive")
    const fifty = document.querySelector("#fifty")
    const all = document.querySelector("#all-in")


    //event listener for $10 Button
    ten.addEventListener("click", function () {
        if (!game.betMade) {
            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((game.players[0].balance - 10) >= 0) {
                game.players[0].currentBet = 10
                game.players[0].balance = game.players[0].balance - game.players[0].currentBet
                balance.innerHTML = `Your Balance: ${game.players[0].balance}`
                //disable bet buttons after bet and enable action buttons
                disableBetButtons()
                enableActionButtons()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
        }
    })

    //event listener for $25 Button
    twentyFive.addEventListener("click", function () {
        if (!game.betMade) {
            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((game.players[0].balance - 25) >= 0) {
                game.players[0].currentBet = 25
                game.players[0].balance = game.players[0].balance - game.players[0].currentBet
                balance.innerHTML = `Your Balance: ${game.players[0].balance}`
                //disable bet buttons after bet and enable action buttons
                disableBetButtons()
                enableActionButtons()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
        }
    })

    //event listener for $50 Button
    fifty.addEventListener("click", function () {
        if (!game.betMade) {
            //if bet amount doesnt go beyond 0, set bet amount and subtract from balance
            if ((game.players[0].balance - 50) >= 0) {
                game.players[0].currentBet = 50
                game.players[0].balance = game.players[0].balance - game.players[0].currentBet
                balance.innerHTML = `Your Balance: ${game.players[0].balance}`
                //disable bet buttons after bet and enable action buttons
                disableBetButtons()
                enableActionButtons()
                //if game hasnt started yet, start the game
                if (!game.gameStart) {
                    startGame()
                    game.gameStart = true
                }
            }
        }
    })

    //event listener for All-in Button
    all.addEventListener("click", function () {
        if (!game.betMade) {
            game.players[0].currentBet = game.players[0].balance
            game.players[0].balance = game.players[0].balance - game.players[0].currentBet
            balance.innerHTML = `Your Balance: ${game.players[0].balance}`
            //disable bet buttons after bet and enable action buttons
            disableBetButtons()
            enableActionButtons()
            //if game hasnt started yet, start the game
            if (!game.gameStart) {
                startGame()
                game.gameStart = true
            }
        }
    })
}

const allBets = document.querySelectorAll(".bet-buttons button")
const actionButtons = document.querySelectorAll(".buttons button")

const disableActionButtons = function () {
    actionButtons.forEach(function (item) {
        item.disabled = true
    })
}

const enableActionButtons = function () {
    actionButtons.forEach(function (item) {
        item.disabled = false
    })
}

const disableBetButtons = function () {
    allBets.forEach(function (item) {
        item.disabled = true
        game.betMade = true
    })
}

const enableBetButtons = function () {
    allBets.forEach(function (item) {
        item.disabled = false
        game.betMade = false
    })
}