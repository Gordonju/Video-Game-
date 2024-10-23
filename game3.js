document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const restartButton = document.getElementById('restart');
    const startButton = document.getElementById('start-button');
    const timeDisplay = document.getElementById('time-display');
    restartButton.classList.add('glow');
    startButton.classList.add('glow');
    timeDisplay.classList.add('glow');
    
    const words = ['star', 'moon', 'sun', 'planet', 'asteroid', 'meteor', 'comets', 'galaxy', 'star', 'moon', 'sun', 'planet', 'asteroid', 'meteor', 'comets', 'galaxy'];
    let flippedCards = [];
    let matchedPairs = 0;
    let gameStarted = false;
    let startTime;
    let timer;

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const createBoard = () => {
        shuffleArray(words);
        for (let i = 0; i < words.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = words[i];
            card.innerHTML = `<div class="front"></div><div class="back">${words[i]}</div>`;
            grid.appendChild(card);
        }
    };

    const flipCard = e => {
        if (!gameStarted) return; // Prevent flipping cards before the game starts

        const clickedCard = e.target.closest('.card');
        if (clickedCard && !clickedCard.classList.contains('flipped') && flippedCards.length < 2) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    };

    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.name === card2.dataset.name) {
            matchedPairs++;
            if (matchedPairs === words.length / 2) {
                clearInterval(timer); // Stop the timer
                const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                setTimeout(() => alert(`Congratulations! You found all the pairs in ${timeTaken} seconds!`), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };

    const restartGame = () => {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        gameStarted = false; // Reset game state
        timeDisplay.textContent = "Time: 0 seconds"; // Reset time display
        clearInterval(timer); // Stop timer
        createBoard();
    };

    const startGame = () => {
        restartGame(); // Clear previous game state
        gameStarted = true; // Set game state to started
        startTime = Date.now(); // Record the start time

        // Start timer to update time display every second
        timer = setInterval(() => {
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            timeDisplay.textContent = `Time: ${timeTaken} seconds`;
        }, 1000);
    };

    grid.addEventListener('click', flipCard);
    restartButton.addEventListener('click', restartGame);
    startButton.addEventListener('click', startGame); // Start game on button click

    createBoard(); // Create the game board on page load
});
