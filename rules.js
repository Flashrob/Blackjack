const rulesLightbox = function () {
    const rules = document.querySelector("#rules-button")

    rules.addEventListener("click", function(){
        //create blackish backdrop
        const backdrop = document.createElement("div")
        backdrop.style.height = "100%"
        backdrop.style.width = "100%"
        backdrop.style.backgroundColor = "black"
        backdrop.style.opacity = "0.4"
        //create lightbox div
        const lightbox = document.createElement("div")
        lightbox.id = "rules"
        //create Rules header
        const ruleText = document.createElement("h1")
        ruleText.textContent = "Rules"
        //create ul and lis for rules
        const list = document.createElement("ul")
        const listItemOne = document.createElement("li")
        listItemOne.textContent = "Score above 21, You lose!"
        const listItemTwo = document.createElement("li")
        listItemTwo.textContent = "Score below the house, You lose!"
        const listItemThree = document.createElement("li")
        listItemThree.textContent = "Score above the house, below 21, you win!"
        const listItemFour = document.createElement("li")
        listItemFour.textContent = "Score 21, Blackjack, You win!"
        const listItemFive = document.createElement("li")
        listItemFive.textContent = "Same score as house, draw(push), bets returned!"
        list.appendChild(listItemOne)
        list.appendChild(listItemTwo)
        list.appendChild(listItemThree)
        list.appendChild(listItemFour)
        list.appendChild(listItemFive)
        //create gameplay header
        const gameText = document.createElement("h1")
        gameText.textContent = "Gameplay"
        gameText.style.marginBottom = "20px"
        //create gameplay buttons in a div
        const buttonDiv = document.createElement("div")
        buttonDiv.style.opacity = "0.5"
        const hitButton = document.createElement("button")
        hitButton.style.marginRight = "40px"
        hitButton.style.marginBottom = "15px"
        const standButton = document.createElement("button")
        standButton.style.marginBottom = "15px"
        hitButton.className = "btn btn-danger"
        hitButton.textContent = "Hit"
        standButton.className = "btn btn-danger"
        standButton.textContent = "Stand"
        //append buttons to div
        buttonDiv.appendChild(hitButton)
        buttonDiv.appendChild(standButton)
        //create descriptions for buttons
            //create a div for the uls
        const buttonListDiv = document.createElement("div")
        buttonListDiv.style.width = "100%"
        //button list one
        const buttonList = document.createElement("ul")
        buttonList.style.width = "30%"
        buttonList.style.margin = "0 auto 10px auto"
        //button list items
        const buttonListItemOne = document.createElement("li")
        buttonListItemOne.textContent = "HIT to draw a card"
        const buttonListItemTwo = document.createElement("li")
        buttonListItemTwo.textContent = "STAND to end your turn"
        //append button listitems to button ul
        buttonList.appendChild(buttonListItemOne)
        buttonList.appendChild(buttonListItemTwo)
        //append button ul to button div
        buttonListDiv.appendChild(buttonList)
        //create paragraph for betting info
        const p = document.createElement("p")
        p.textContent = "Place bet first, then play!"
        //append all above content to the lightbox
        lightbox.appendChild(ruleText)
        lightbox.appendChild(list)
        lightbox.appendChild(gameText)
        lightbox.appendChild(buttonDiv)
        lightbox.appendChild(buttonListDiv)
        lightbox.appendChild(p)
        //append lightbox and backdrop to body
        document.body.appendChild(backdrop)
        document.body.appendChild(lightbox)

        //create exit button
        const okayButton = document.createElement("button")
        okayButton.className = "btn btn-success"
        okayButton.style.width = "300px"
        okayButton.textContent = "Understood!"
        lightbox.appendChild(okayButton)
        okayButton.addEventListener("click", function(){
            document.body.removeChild(lightbox)
            document.body.removeChild(backdrop)
        })
    })
}