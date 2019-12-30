const dealerAi = function () {
    if (!game.turnOver) {
        const house = game.players.length - 1
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
            //if not blackjack, no game over, check for loss
            if (!game.turnOver) {
                checkForLoss()
            }
        }
        //run dealer Ai again, until game is over
        dealerAi()
    }
}