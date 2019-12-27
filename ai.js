const dealerAi = function () {
    if (!game.gameOver) {
        //house at least 17, determine winner
        if (game.players[game.players.length - 1].totalValue >= 17) {
            determineWinner()
            //house lower than 17 and lower than player one, push new card into deck(hit)
        } else if (game.players[game.players.length - 1].totalValue < 17) {
            hitCard(1)
            //display new score
            display()
            //check for blackjack
            blackjack()
            //if not blackjack, no game over, check for loss
            if (!game.gameOver) {
                checkForLoss()
            }
        }
        //run dealer Ai again, until game is over
        dealerAi()
    }
}