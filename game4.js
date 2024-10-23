let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let winCount = 0;

document.getElementById('submit').addEventListener('click', function() {
    const userGuess = Number(document.getElementById('guess').value);
    attempts++;
    let message = '';

    if (userGuess < 1 || userGuess > 100) {
        message = 'Please enter a number between 1 and 100.';
    } else if (userGuess > randomNumber) {
        message = 'Too high! Try again.';
    } else if (userGuess < randomNumber) {
        message = 'Too low! Try again.';
    } else {
        message = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts!`;
        winCount++;
        document.getElementById('winCount').innerText = `Wins: ${winCount}`;
        resetGame();
    }

    document.getElementById('message').innerText = message;
});

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guess').value = '';
}
