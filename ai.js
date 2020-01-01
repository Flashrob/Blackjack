const playerAi = function (){
    const house = game.players.length - 1
        //computer player 1
        if (game.playerTurn === 1){
            //player 1 makes a bet
            if (!game.players[1].betMade){
                game.players[1].betMade = true
                game.players[1].currentBet = 10
                game.players[1].balance = game.players[1].balance - game.players[1].currentBet
            }
            //hit a card if value is 15 or below OR if house has a higher value
            if (game.players[1].totalValue <= 15 || game.players[1].totalValue < game.players[house].totalValue){
                hitCard(1)
                display()
                playerAi()
            } else {
                game.playerTurn++
                playerAi()
            }
        }
        // //computer player 2
        // if (game.playerTurn === 2){
        //     if (game.players[2].totalValue < 17){
        //         hitCard(2)
        //         display()
        //     } else {
        //         game.playerTurn++
        //         playerAi()
        //         determineAiWinner()
        //     }
        // }
        // //computer player 3
        // if (game.playerTurn === 3){
        //     if (game.players[1].totalValue <= 14){
        //         hitCard(3)
        //         display()
        //     } else {
        //         game.playerTurn = false
        //         playerAi()
        //         determineAiWinner()
        //     }
        // }
}

const dealerAi = function () {
    if (!game.turnOver) {
        const house = game.players.length - 1
        //house at least 17, determine winner
        if (game.players[house].totalValue >= 17) {
            determineWinner()
            determineAiWinner()
            //house lower than 17 and lower than player one, push new card into deck(hit)
        } else if (game.players[house].totalValue < 17) {
            hitCard(house)
            //display new score
            display()
            //check for blackjack
            blackjack()
            //if not blackjack, no game over, check for loss
            if (!game.turnOver) {
                checkForLoss()
            }
        }
        //run dealer Ai again, until game is over
        dealerAi()
    }
}

