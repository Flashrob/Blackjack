// TODO
// IMPROVE CSS FOR HOUSE AND PLAYER
    // - add borders for value text(inspiration from other BJ games?)
    // - make card boxes and buttons fixed position
    // - make nicer buttons (Bootstrap?)
    // - Visible line between players and house
    // - Maybe some writing on the table, curved from top to top
// NOTIFICATIONS
    // - win or loss message, blackjack message, ace adjustment message
    // - retry button appear
// REFACTOR JS

let deck = []

const createDeck = function () {
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    deck = []
    //loop through suits and values arrays, to create a full deck in the deck object
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {

            //set card weight for winning logic
            let weight = parseInt(values[i])

            if (values[i] === "J" || values[i] === "Q" || values[i] === "K") {
                weight = 10
            }
            if (values[i] === "A") {
                weight = 11
            }
            //create card object
            let card = {
                suit: suits[j],
                value: values[i],
                weight: weight,
                image: `images/${suits[j][0]}${values[i]}.png`
            }
            
            //push card object to deck
            deck.push(card)
            game.gameOver = false
        }
    }
    //shuffle 1000 times
    shuffleDeck(1000)
    //deal Cards
    dealCards()
}

//shuffle the deck
const shuffleDeck = function (shuffleLoops) {
    //assign every value with a random new one, as many times as shuffleLoops
    for (let i = 0; i < shuffleLoops; i++) {
        for (let j = 0; j < deck.length; j++) {
            let ran = Math.floor(Math.random() * (52 - 0)) + 0
            let temp = deck[j]
            deck[j] = deck[ran]
            deck[ran] = temp
        }
    }
}

//deal two cards to all players
const dealCards = function () {
    //deal two cards to each player
    for (let i = 0; i < game.players.length; i++) {
        for (let j = 0; j < 2; j++) {
            hitCard(i)
        }
    }
}

//display the cards
const displayCards = function () {
    
    const cards = document.querySelectorAll(".cards")
    console.log(cards)
    const houseCards = document.querySelector(".house-cards")
    cards.forEach(function(item){
        item.innerHTML = ""
    })
    houseCards.innerHTML = ""
    //display cards for house in houseCards div
    for (let k = 0; k < game.players[game.players.length-1].cards.length; k++){
        const img = document.createElement("img")
            img.setAttribute("src", `${game.players[game.players.length-1].cards[k].image}`)
            houseCards.appendChild(img)
    }
    //display cards for all players in cards div
    for (let i = 0; i < game.players.length - 1; i++){
        for (let j = 0; j < game.players[i].cards.length; j++){
            const img = document.createElement("img")
            img.setAttribute("src", `${game.players[i].cards[j].image}`)
            cards[i].appendChild(img)
        }
    }
}

//display the score
const display = function () {
    //select text div and reset content for player
    const text = document.querySelector(".text")
    text.innerHTML = ""
    //loop through all players
    for (let i = 0; i < game.players.length - 1; i++) {
        //create a div and p for each player
        const div = document.createElement("div")
        const p = document.createElement("p")
        //set content to player cards value
        p.textContent = `${game.players[i].name}: Value ${game.players[i].totalValue}`

        //append divs to text div, and paragraphs to divs
        text.appendChild(div)
        div.appendChild(p)
    }
    //select text div and reset content for house
    const textHouse = document.querySelector(".house-text")
    textHouse.innerHTML = ""
    //create a div and p for the house
    const divHouse = document.createElement("div")
    const pHouse = document.createElement("p")
    //set text content to house cards value
    pHouse.textContent = `${game.players[game.players.length-1].name}: Value ${game.players[game.players.length-1].totalValue}`
    //repeat as above
    textHouse.appendChild(divHouse)
    divHouse.appendChild(pHouse)

    //display the cards
    displayCards()
}