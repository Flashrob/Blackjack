//if value is 
const adjustForAce = function (player) {
    //iterate through cards
    //check for an ace when player is over 21
    for (let i = 0; i < player.cards.length; i++) {
        if (player.cards[i].weight === 11 && player.totalValue > 21) {
            //set aces weight to 1 and recalculate totalValue
            player.cards[i].weight = 1
            player.totalValue = 0
            for (let j = 0; j < player.cards.length; j++) {
                player.totalValue = player.totalValue + player.cards[j].weight
            }
            display()
            message.textContent = "Ace adjusted"
            return true
        }
    }
}

const checkForLoss = function () {
    //if value over 21, lose and game over...
    if (game.players[0].totalValue > 21) {
        //... if user doesnt have an Ace to adjust its value to 1
        if (adjustForAce(game.players[0])) {
            return true
        } else {
            displayRetry()
            game.gameOver = true
            message.textContent = "You lost!"
            return true
        }
    } else if (game.players[game.players.length - 1].totalValue > 21) {
        if (adjustForAce(game.players[game.players.length - 1])) {
            return true
        } else {
            displayRetry()
            game.gameOver = true
            message.textContent = "House lost!"
            return true
        }
    }
}

const determineWinner = function () {
    //if player has higher value than dealer, player wins, game over
    if (game.players[0].totalValue > game.players[game.players.length - 1].totalValue) {
        displayRetry()
        game.gameOver = true
        message.textContent = "You won!"
        return true
        //if player has lower value than dealer, dealer wins, game over
    } else if (game.players[0].totalValue < game.players[game.players.length - 1].totalValue) {
        displayRetry()
        game.gameOver = true
        message.textContent = "House won!"
        return true
        //if player and dealer have the same value, push(draw) and return the bets.
    } else if (game.players[0].totalValue === game.players[game.players.length - 1].totalValue) {
        displayRetry()
        game.gameOver = true
        message.textContent = "Push! Draw!"
        return true
    }
}

//check each player, if their card value is 21 for instant win
const blackjack = function () {
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].totalValue === 21) {
            displayRetry()
            game.gameOver = true
            return message.textContent = `BLACKJACK`
        }
    }
}