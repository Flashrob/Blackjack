//All functions related to displaying or hiding stuff

// 
//
// MAIN DISPLAY FUNCTION
// MAIN DISPLAY FUNCTION
//
//

//display the cards
const displayCards = function () {

    const cards = document.querySelectorAll(".cards")
    const houseCards = document.querySelector(".house-cards")
    //reset card display
    cards.forEach(function (item) {
        item.innerHTML = ""
    })
    houseCards.innerHTML = ""

    //display cards for house in houseCards div
    for (let k = 0; k < game.players[game.players.length - 1].cards.length; k++) {
        const img = document.createElement("img")
        img.setAttribute("src", `${game.players[game.players.length-1].cards[k].image}`)
        img.className = `house-card-${k}`
        houseCards.appendChild(img)
    }

    //display cards for all players in cards div
    for (let i = 0; i < game.players.length - 1; i++) {
        for (let j = 0; j < game.players[i].cards.length; j++) {
            const img = document.createElement("img")
            img.setAttribute("src", `${game.players[i].cards[j].image}`)
            img.className = `card-image-${i}${j}`
            cards[i].appendChild(img)
        }
    }

}

//display the score
const display = function () {
    //select text divs and reset totalValue content for all players
    const text = document.querySelectorAll(".text")

    text.forEach(function (item) {
        item.innerHTML = ""
    })
    
    //reset game state message
    if (game.playerTurn === 0) {
        message.textContent = ""
    }


    //loop through all players
    for (let i = 0; i < game.players.length - 1; i++) {
        //create total value paragraph for each player
        const p = document.createElement("p")
        //set content to player cards total value
        p.textContent = `${game.players[i].totalValue}`
        //append paragraph to player's text div
        text[i].appendChild(p)
    }

    //select text div and reset content for house
    const textHouse = document.querySelector(".house-text")
    textHouse.innerHTML = ""
    //create a p for the house
    const pHouse = document.createElement("p")
    //set text content to house cards value
    pHouse.textContent = `${game.players[game.players.length-1].totalValue}`
    //append house p to text div
    textHouse.appendChild(pHouse)
    //display the current balance
    balance.innerHTML = `Your Balance: ${game.players[0].balance}`

    //display balance for ai
    //push balance into an array
    const balanceArray = []
    for (let i = 1; i < game.players.length - 1; i++) {
        balanceArray.push(`Balance: ${game.players[i].balance}`)
    }

        //TWO LOOPS BECAUSE PLAYER INDEX STARTS AT 1, BUT BALANCE INDEX STARTS AT 0

    //render each balance into their respective h3
    for (let j = 0; j < balanceArray.length; j++) {
        aiBalance[j].innerHTML = balanceArray[j]
    }

    //display the cards
    displayCards()
}

// 
// 
// MAIN DISPLAY FUNCTION END
// MAIN DISPLAY FUNCTION END
//
//

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

//display retry button
const displayNewHand = function () {
    const retry = document.querySelector("#retry")
    retry.classList.remove("d-none")
}

//hiding hand after retry
const hideNewHand = function () {
    const retry = document.querySelector("#retry")
    retry.classList.add("d-none")
}

//hiding value after retry
const hideNewValue = function () {
    const text = document.querySelectorAll(".text p")
    text.forEach(function (item) {
        item.classList.add("d-none")
    })
}

//displaying value after retry and bet
const displayNewValue = function () {
    const text = document.querySelectorAll(".text p")
    text.forEach(function (item) {
        item.classList.remove("d-none")
    })
}

//display card after bet
const activateCardDisplay = function () {
    const allImages = document.querySelectorAll("img")
    
    allImages.forEach(function (item) {
        item.classList.remove("d-none")
    })

    const text = document.querySelector(".text p")
    text.textContent = `${game.players[0].totalValue}`
    const houseText = document.querySelector(".house-text p")
    houseText.textContent = `${game.players[game.players.length - 1].totalValue}`
}

//hide cards when new hand is dealt
const deactivateCardDisplay = function () {
    const allImages = document.querySelectorAll("img")
    allImages.forEach(function (item) {
        item.classList.add("d-none")
    })
    const text = document.querySelector(".text p")
    text.textContent = ""
    const houseText = document.querySelector(".house-text p")
    houseText.textContent = ""
}