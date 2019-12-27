//if value is 
const adjustForAce = function(player){
    //iterate through cards
    //check for an ace when player is over 21
    for (let i = 0; i < player.cards.length; i++){
        if (player.cards[i].weight === 11 && player.totalValue > 21){
            //set aces weight to 1 and recalculate totalValue
            player.cards[i].weight = 1
            player.totalValue = 0
            for (let j = 0; j < player.cards.length; j++){
                player.totalValue = player.totalValue + player.cards[j].weight
            }
            alert("Ace adjusted from 11 to 1")
            display()
            return true
        }
    }
}

const checkForLoss = function () {
    //if value over 21, lose and game over...
    if (game.players[0].totalValue > 21) {
        //... if user doesnt have an Ace to adjust its value to 1
        if (adjustForAce(game.players[0])){
            return true
        } else {
            game.gameOver = true
            alert("player loses")
            return true
        }
    } else if (game.players[game.players.length - 1].totalValue > 21) {
        if (adjustForAce(game.players[game.players.length - 1])){
            return true
        } else {
        game.gameOver = true
        alert("house loses!")
        return true
        }
    }
}

const determineWinner = function () {
    //if player has higher value than dealer, player wins, game over
    if (game.players[0].totalValue > game.players[game.players.length - 1].totalValue) {
        game.gameOver = true
        alert("player wins!")
        return true
        //if player has lower value than dealer, dealer wins, game over
    } else if (game.players[0].totalValue < game.players[game.players.length - 1].totalValue) {
        game.gameOver = true
        alert("house wins!")
        return true
        //if player and dealer have the same value, push(draw) and return the bets.
    } else if (game.players[0].totalValue === game.players[game.players.length - 1].totalValue) {
        game.gameOver = true
        alert("Push! Bets returned!")
        return true
    }
}