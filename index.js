let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let isLock = false
let message = ""
let player = {
    name : "chips",
    chips : 175
}
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el") // same as getElementById but have to mention type #sum-el
let cardsEl = document.querySelector("#cards-el")
let playerEl = document.getElementById("player-el")
let refreshBtn = document.getElementById("startGameBtn")

playerEl.textContent = player.name + ": $" + player.chips

// rule box
let rulesShown = false
let rulesBox = document.getElementById("rules-box")
let overlay = document.getElementById("overlay")

// betting functionality
let currentBet = 0

let betInfoEl = document.getElementById("bet-info")
let betContainer = document.getElementById("bet-container")


function startGame() {
    console.log("Current Bet:", currentBet)
    if (!rulesShown) {
        showRules()
        rulesShown = true
        return
    }

    if (currentBet === 0) {
        messageEl.textContent = "Place a bet first!"
        return
    }

    refreshBtn.textContent = "START GAME"
    if(isLock === false) {
        isAlive = true
        hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        sum = firstCard + secondCard
        cards = [firstCard, secondCard]
        renderGame()
    } 
}

function getRandomCard() {

    let randomNumber = Math.floor( Math.random() * 13 ) + 1

    if(randomNumber === 1 ) {
        return 11
    }
    else if(randomNumber >= 11 && randomNumber <= 13 ) {
        return 10
    }
    else {
        return randomNumber
    }
}

function renderGame() {
    
    isLock = true
    cardsEl.textContent = "Cards: " 
    for(i=0;i<cards.length;i++) {
        cardsEl.textContent += cards[i] + " "
    }

    if(sum <= 20) {
        message = "Do you want to draw a new card ?"
    }
    else if(sum === 21) {
        message = "Wohoo! You've got BlackJack!"
        hasBlackJack = true
        
        // player chips
        player.chips += currentBet * 2
        playerEl.textContent = `${player.name}: $${player.chips}`
        // restart game
        refreshBtn.textContent = "RESTART GAME"
        isLock = false
        //betting info
        betContainer.style.display = "block"
        currentBet = 0
        betInfoEl.textContent = ""
    }
    else {
        message = "You're out of game!"
        isAlive = false
        refreshBtn.textContent = "RESTART GAME"
        isLock = false
        
        betContainer.style.display = "block"
        currentBet = 0
        betInfoEl.textContent = ""
    }
    messageEl.textContent = message
    sumEl.textContent = "Sum: " + sum
    // to render or sent the js content in web page you must send that like this  messageEl.textContent = message
    // or if we write message = messageEl.textContant it won't send the data to page
}

function newCard() {

    if(isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }  
}

function showRules() {
    rulesBox.style.display = "block"
    overlay.style.display = "block"
}

function hideRules() {
    rulesBox.style.display = "none"
    overlay.style.display = "none"
    document.getElementById("bet-container").style.display = "block"
}

function placeBet(amount) {

    if (player.chips < amount) {
        messageEl.textContent = "Not enough chips!"
        return
    }

    currentBet = amount

    player.chips -= amount

    playerEl.textContent =
        `${player.name}: $${player.chips}`

    betInfoEl.textContent =
        `Bet: $${amount} | Potential Win: $${amount * 2}`

    betContainer.style.display = "none"
}


