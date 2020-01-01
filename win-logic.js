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
            displayNewHand()
            game.turnOver = true
            message.textContent = "You lost!"
            //reset bet amount
            game.players[0].currentBet = 0
            gameOver()
            return true
        }
    } else if (game.players[game.players.length - 1].totalValue > 21) {
        if (adjustForAce(game.players[game.players.length - 1])) {
            return true
        } else {
            displayNewHand()
            game.turnOver = true
            message.textContent = "House lost!"
            //winning!
            profit()
            //reset bet amount!
            game.players[0].currentBet = 0
            return true
        }
    }
}

const determineWinner = function () {
    //if player has higher value than dealer, player wins, game over
    if (game.players[0].totalValue > game.players[game.players.length - 1].totalValue) {
        displayNewHand()
        game.turnOver = true
        //winning!
        profit()
        //reset bet amount
        game.players[0].currentBet = 0
        message.textContent = "You won!"
        return true
        //if player has lower value than dealer, dealer wins, game over
    } else if (game.players[0].totalValue < game.players[game.players.length - 1].totalValue) {
        displayNewHand()
        game.turnOver = true
        //reset bet amount
        game.players[0].currentBet = 0
        message.textContent = "House won!"
        gameOver()
        return true
        //if player and dealer have the same value, push(draw) and return the bets.
    } else if (game.players[0].totalValue === game.players[game.players.length - 1].totalValue) {
        displayNewHand()
        game.turnOver = true
        //give back the bet and reset bet amount
        game.players[0].balance = game.players[0].balance + game.players[0].currentBet
        game.players[0].currentBet = 0

        message.textContent = "Push! Draw!"
        return true
    }
}

const determineAiWinner = function () {
    const house = game.players.length - 1

    for (let i = 1; i < game.players.length - 1; i++) {
            //if AI has Blackjack
        if (game.players[i].totalValue === 21) {

            // AiProfit()
            return true
            // if AI is over 21, loses bet
        } else if (game.players[i].totalValue > 21) {
            game.players[i].currentBet = 0
            return true

            //if AI has higher value than dealer and below 22, AI wins
        } else if (game.players[i].totalValue > game.players[house].totalValue && game.players[i].totalValue < 22) {

            console.log("PC WON!")
            //winning!
            // AiProfit()
            //reset bet amount
            game.players[i].currentBet = 0
            return true

            //if AI has lower value than dealer, and dealer below 22, AI loses
        } else if (game.players[i].totalValue < game.players[house].totalValue && game.players[house].totalValue < 22) {
            //reset bet amount
            game.players[i].currentBet = 0
            return true

            //if AI and dealer have the same value, push(draw) and return the bets.
        } else if (game.players[i].totalValue === game.players[house].totalValue) {
            //give back the bet and reset bet amount
            game.players[i].balance = game.players[i].balance + game.players[i].currentBet
            game.players[i].currentBet = 0
            return true
        }
    }
}

//check each player, if their card value is 21 for instant win
const blackjack = function () {
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[0].totalValue === 21 || game.players[game.players.length - 1].totalValue === 21) {
            //if player has blackjack, give winning
            if (game.players[0].totalValue === 21) {
                //calculate winnings
                profit()
            }
            displayNewHand()
            game.turnOver = true
            //reset bet
            game.players[0].currentBet = 0
            gameOver()
            message.textContent = `BLACKJACK`
            return true
        }
    }
}

const profit = function () {
    //winnings are bet * 1.5
    game.players[0].balance = game.players[0].balance + (game.players[0].currentBet * 1.5)
}