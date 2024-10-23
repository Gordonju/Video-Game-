let board = ['', '', '', '', '', '', '', '', '']; 
let currentPlayer = 'X'; 
let gameActive = true; 

// Function to update the status display
function updateStatus() {
    document.getElementById('status').innerHTML = `<span style="color: yellow;">Player ${currentPlayer}'s Turn</span>`;
}

function makeMove(cell, index) { 
    if (board[index] !== '' || !gameActive) { 
        return; 
    } 
    board[index] = currentPlayer; 
    cell.innerText = currentPlayer; 
    cell.classList.add('taken'); 
    checkWinner(); 
} 

function checkWinner() { 
    const winningCombinations = [ 
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns 
        [0, 4, 8], [2, 4, 6] // Diagonals 
    ]; 

    for (const combination of winningCombinations) { 
        const [a, b, c] = combination; 
        if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
            document.getElementById('status').innerText = `Player ${currentPlayer} Wins!`; 
            gameActive = false; 
            return; 
        } 
    } 

    if (!board.includes('')) { 
        document.getElementById('status').innerText = 'Draw!'; 
        gameActive = false; 
        return; 
    } 

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(); // Update the status to reflect the current player's turn
} 

function resetGame() { 
    board = ['', '', '', '', '', '', '', '', '']; 
    currentPlayer = 'X'; 
    gameActive = true; 
    document.getElementById('status').innerText = ''; 
    document.querySelectorAll('.cell').forEach(cell => { 
        cell.innerText = ''; 
        cell.classList.remove('taken'); 
    });
    updateStatus(); // Update status at the start of a new game
}

// Initialize the status display at the start
updateStatus();
