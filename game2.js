const resultText = document.getElementById('result-text');
const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

// Function to update and display the score
const updateScore = () => {
    const scoreText = document.getElementById('score-text');
    scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
};

// Function to play a round of rock-paper-scissors
const playRound = (playerChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    if (playerChoice === computerChoice) {
        resultText.textContent = `It's a draw! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
        playerScore++;
    } else {
        resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
        computerScore++;
    }
    updateScore(); // Update the score display after each round
};

// Initial score display
updateScore();
