const adjustForAce = function (player) {
    //iterate through cards
    //check for an ace(weight 11) when player is over 21
    for (let i = 0; i < player.cards.length; i++) {
        if (player.cards[i].weight === 11 && player.totalValue > 21) {
            //set ace's weight to 1 and recalculate totalValue
            player.cards[i].weight = 1
            player.totalValue = 0
            for (let j = 0; j < player.cards.length; j++) {
                player.totalValue = player.totalValue + player.cards[j].weight
            }
            //display the new total Value
            display()

            //display message for player, if ace adjusted value
            if (player === game.players[0]) {
                message.textContent = "Ace adjusted"
            }
            return true
        }
    }
}

const endTurn = function (){
    //turn over since over 21
    game.turnOver = true
    //player lost, makes Ai still draw afterwards
    game.players[0].loss = true
    //increase turn so AIs can play
    game.playerTurn++
    playerAi()
    dealerAi()
}

//check each player, if their card value is 21 for instant win
const blackjack = function () {
    const house = game.players.length - 1
    //intant blackjack test for Ai
    for (let i = 1; i < game.players.length - 1; i++) {
        //if they didnt win
        if (!game.players[i].win) {
            if (game.players[i].totalValue === 21 && game.players[house].totalValue !== 21) {
                game.players[i].win = true
                AiProfit()
            }
        }
    }
    //check if player or house has blackjack
    if (game.players[0].totalValue === 21 || game.players[house].totalValue === 21) {

        //if player has blackjack, give winnings
        if (game.players[0].totalValue === 21) {
            //calculate winnings and end turn
            profit()
            endTurn()
            //reset bet
            game.players[0].currentBet = 0
            message.textContent = `BLACKJACK`
            return true
        } else {
            endTurn()
            //reset bet
            game.players[0].currentBet = 0
            //check for gameOver!
            gameOver()
            message.textContent = `HOUSE 21!`
            return true
        }
    }
}

const checkForLoss = function () {
    const house = game.players.length - 1
    //if value over 21, lose and game over...
    if (game.players[0].totalValue > 21) {
        //... if user doesnt have an Ace to adjust its value to 1
        if (adjustForAce(game.players[0])) {
            return true
        } else {
            endTurn()
            //display next hand button, since player lost
            displayNewHand()
            message.textContent = "You lost!"
            //reset bet amount
            game.players[0].currentBet = 0
            //check for game over!
            gameOver()
            return true
        }
        //if the house is over 21
    } else if (game.players[house].totalValue > 21) {
        //check if house can adjust value of an ace
        if (adjustForAce(game.players[house])) {
            return true
        } else {
            //if no ace adjustment, house lost, display next hand button
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
    const house = game.players.length - 1
    //if player has higher value than dealer, player wins, game over
    if (game.players[0].totalValue > game.players[house].totalValue && game.players[0].totalValue < 22) {
        //display next hand button
        displayNewHand()
        game.turnOver = true
        //winning!
        profit()
        //reset bet amount
        game.players[0].currentBet = 0
        message.textContent = "You won!"
        return true

        //if player has lower value than dealer, dealer wins, game over
    } else if (game.players[0].totalValue < game.players[house].totalValue && game.players[0].totalValue < 22) {
        //display next hand button
        displayNewHand()
        game.turnOver = true
        //reset bet amount
        game.players[0].currentBet = 0
        message.textContent = "House won!"
        gameOver()
        return true

        //if player and dealer have the same value, push(draw) and return the bets.
    } else if (game.players[0].totalValue === game.players[house].totalValue && game.players[0].totalValue < 22) {
        //display next hand button
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
    //paid is a variable to check if one win scenario happened already
    let paid = false
    for (let i = 1; i < game.players.length - 1; i++) {
        //reset AI betMade
        game.players[i].betMade = false
        //if the AIs did not win yet(blackjack)
        if (!game.players[i].win) {
            //first check if AI is holding a hand of over 21 with an ace
            if (adjustForAce(game.players[i])) {
                return true
            } else {
                //if house over 21 and AI 21 and below
                if (game.players[house].totalValue > 21 && game.players[i].totalValue < 21) {
                    paid = true
                    game.players[i].win = true
                    AiProfit()
                    game.players[i].currentBet = 0

                    //if AI is over 21
                } else if (game.players[i].totalValue > 21 && paid === false) {
                    paid = true
                    game.players[i].currentBet = 0

                    //if AI has higher value than dealer and below 22, AI wins
                } else if (game.players[i].totalValue > game.players[house].totalValue && game.players[i].totalValue < 21 && paid === false) {
                    paid = true
                    //winning!
                    game.players[i].win = true
                    AiProfit()
                    //reset bet amount
                    game.players[i].currentBet = 0

                    //if AI has lower value than dealer, and dealer below 22, AI loses
                } else if (game.players[i].totalValue < game.players[house].totalValue && game.players[house].totalValue < 22 && paid === false) {
                    paid = true
                    //reset bet amount
                    game.players[i].currentBet = 0

                    //if AI and dealer have the same value, push(draw) and return the bets.
                } else if (game.players[i].totalValue === game.players[house].totalValue && paid === false) {
                    paid = true
                    //give back the bet and reset bet amount
                    game.players[i].balance = game.players[i].balance + game.players[i].currentBet
                    game.players[i].currentBet = 0
                                }
            }
        }
    }
}

const profit = function () {
    //winnings are bet * 1.5
    game.players[0].balance = game.players[0].balance + (game.players[0].currentBet * 1.5)
}

const AiProfit = function () {
    //loop through all AIs
    for (let i = 1; i < game.players.length - 1; i++) {
        //if AI has won, give winnings, reset win and bet state
        if (game.players[i].win) {
            game.players[i].balance = game.players[i].balance + (game.players[i].currentBet * 1.5)
            game.players[i].win = false
            game.players[i].currentBet = 0
        }
        //reset betMade after profit check
        game.players[i].betMade = false
    }
}