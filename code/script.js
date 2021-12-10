'use strict';

//selecting elements (score)
const scorePlayer0Element = document.querySelector("#score--0");
const scorePlayer1Element = document.querySelector("#score--1");
//selecting elements (dice)
const diceElement = document.querySelector(".dice");
//selecting elements (buttons)
const buttonNewElement = document.querySelector(".btn--new");
const buttonRollElement = document.querySelector(".btn--roll");
const buttonHoldElement = document.querySelector(".btn--hold");
//Selecting elements for the Current score of each player
const currScorePlayer0 = document.querySelector("#current--0");
const currScorePlayer1 = document.querySelector("#current--1");

//starting conditions
scorePlayer0Element.textContent = "0";
scorePlayer1Element.textContent = "0";

//Variable for current score
let totalScores = [0, 0]; //totalScores[0] for player0 and totalScores[1] for player1
let activePlayer = 0; //0 for player0 | 1 for player1
let currentScore = 0;
let keepPlaying = true; //To check if the game finished with a winner

const rollingTheDice = () => {
    let dice = Math.trunc(Math.random() * 6) + 1; //values 1 - 6
    diceElement.src = `../res/dice-${dice}.png`;
    diceElement.classList.remove("hidden"); //We display the dice

    return dice;
}

const updateCurrentScore = (dice) => {
    currentScore = currentScore + dice;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
}

const changePlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0; //Switching the player
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
    currentScore = 0;
}

//Function that is used to update the total score when the player press the hold button to keep his current score
const updateTotalScore = () => {
    totalScores[activePlayer] = totalScores[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];
}

//Function that is called when we have a winner
const gameOver = () => {
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    keepPlaying = false;
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    diceElement.classList.add("hidden");
}

//Function that is called to reset the game
const initialization = () => {
    scorePlayer0Element.textContent = "0";
    scorePlayer1Element.textContent = "0";
    currScorePlayer0.textContent = "0";
    currScorePlayer1.textContent = "0";
    totalScores[0] = 0;
    totalScores[1] = 0;
    currentScore = 0;
    keepPlaying = true;
    diceElement.classList.add("hidden");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
    document.querySelector(`.player--1`).classList.remove("player--active");
}

//Rolling dice functionality
buttonRollElement.addEventListener("click", function() {
    if (keepPlaying) {
        let dice = rollingTheDice();

        if (dice !== 1) {
            updateCurrentScore(dice);
        }else {
            changePlayer();
        }
    }
},false);

//Press the button to hold the score
buttonHoldElement.addEventListener("click", function() {
    updateTotalScore();
    if (totalScores[activePlayer] >= 50) {
        gameOver();
    }else {
        changePlayer();
    }
}, false);

//Functionality to reset the game
buttonNewElement.addEventListener("click", initialization);