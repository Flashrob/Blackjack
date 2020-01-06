// TODO
// ADD EXTRA FEATURES
// REMOVE BUGS
// MAKE GAME OVER NOT RELOAD THE PAGE, BUT RESET EVERYTHING
// MAKE LAYOUT RESPONSIVE

let deck = []
const message = document.querySelector(".message")
const balance = document.querySelector("#balance")
const aiBalance = document.querySelectorAll(".ai-balance")

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
            game.turnOver = false
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

const startGame = function () {
    //create, shuffle the deck and deal two cards
    createDeck()
    //display score
    display()
    //event listener for hit button
    hitButton()
    //event listener for stand button
    stand()
    //event listener for retry button
    dealNewHand()
    //instant adjust for ace, if two aces were drawn at start of the game
    for (let i = 0; i < game.players.length; i++) {
        adjustForAce(game.players[i])
    }
    //check for instant win after dealing cards
    blackjack()
    if (blackjack()){
        displayNewHand()
    }
}

//initial input form for player name!
const nameInput = function () {
    const form = document.querySelector("#name-input")
    form.addEventListener("submit", function(e){
        var music = new Audio();
        music.src = "bgsound.mp3";
        music.play();
        //prevent page reload
        e.preventDefault()
        //set player name to input field value
        game.players[0].name = e.target.elements[0].value
        //make form and rules button disappear
        form.classList.add("d-none")
        document.querySelector("#rules-button").classList.add("d-none")
        //start the game
        betEvent()
    })
}

