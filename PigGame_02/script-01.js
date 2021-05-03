'use strict';
// Get button and Texts
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const currentPlayer0 = document.querySelector('.player--0');
const currentPlayer1 = document.querySelector('.player--1');
const rollImg = document.querySelector('.dice');
// Define variables
let currentScore, scores, playing, activePlayer;
// Starting Conditions
const inint = function() {
    currentScore = 0;
    scores = [0, 0];
    playing = true;
    activePlayer = 0;
    // Reset the textes
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    // Reset the classes
    rollImg.classList.add('hidden');
    currentPlayer0.classList.add('player--active');
    currentPlayer1.classList.remove('player--active');
    currentPlayer0.classList.remove('player--winner');
    currentPlayer1.classList.remove('player--winner');
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
};
// Call the Starting condition
inint();

// Define fuctions
const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    currentPlayer0.classList.toggle('player--active');
    currentPlayer1.classList.toggle('player--active');
};
// Define Roll button functionality
btnRollDice.addEventListener('click', function() {
    if (playing) {
        // Roll dice
        const rollNumber = Math.trunc(Math.random() * 6) + 1;
        // Display dice
        rollImg.classList.remove('hidden');
        rollImg.src = `dice-${rollNumber}.png`;

        if (rollNumber !== 1) {
            currentScore += rollNumber;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            document.getElementById(`name--${activePlayer}`).textContent =
                'YOU WINNN!!';
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            rollImg.classList.add('hidden');
            playing = false;
        } else {
            switchPlayer();
        }
    }
});
btnNewGame.addEventListener('click', inint);