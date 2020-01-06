const playerAi = function () {

    const aiBet = function (player, betAmount) {
        game.players[player].betMade = true
        game.players[player].currentBet = betAmount
        game.players[player].balance = game.players[player].balance - game.players[player].currentBet
    }

    const aiDraw = function (player, drawLimit) {
        //hit a card if value is 15 or below OR if house has a higher value
        if (game.players[player].totalValue <= drawLimit || game.players[player].totalValue < game.players[house].totalValue) {
            hitCard(player)
            display()
            playerAi()
        } else {
            game.playerTurn++
            playerAi()
        }
    }

    const house = game.players.length - 1
    //computer AI 1
    if (game.playerTurn === 1) {
        //if AI hasnt made a bet
        if (!game.players[1].betMade) {
            //AI 1 bet 10
            aiBet(game.playerTurn, 10)
        }
        aiDraw(game.playerTurn, 17)
    }
    //computer AI 2
    if (game.playerTurn === 2) {
        //if AI hasnt made a bet
        if (!game.players[2].betMade) {
            //AI 2 bet 25
            aiBet(game.playerTurn, 25)
        }
        aiDraw(game.playerTurn, 16)
    }
    // //computer AI 3
    if (game.playerTurn === 3) {
        //if AI hasnt made a bet
        if (!game.players[3].betMade) {
            //AI 3 bet 50
            aiBet(game.playerTurn, 50)
        }
        aiDraw(game.playerTurn, 15)
    }
}

const dealerAi = function () {
    const house = game.players.length - 1
    if (!game.turnOver) {
        //house at least 17, determine winner
        if (game.players[house].totalValue >= 17) {
            determineWinner()
            //house lower than 17 and lower than player one, push new card into deck(hit)
        } else if (game.players[house].totalValue < 17) {
            hitCard(house)
            //display new score
            display()
            //check for blackjack
            blackjack()
            if (blackjack()) {
                displayNewHand()
            }
            //if not blackjack and turn isnt over, check for loss in case player has not lost yet
            if (!game.turnOver && !game.players[0].loss) {
                checkForLoss()
            }
        }
        //run dealer Ai again, until game is over
        dealerAi()
        //run this when turn is over already
    } else {
        // if house below 17, draw even if player turn has finished
        // repeat until card value 17 and above
        if (game.players[house].totalValue < 17) {
            hitCard(house)
            display()
            dealerAi()
        } else {
            determineAiWinner()
        }
    }
}