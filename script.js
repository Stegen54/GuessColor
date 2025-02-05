let score = 0;
let targetColor = '';

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateColors() {
    const colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(generateRandomColor());
    }
    return colors;
}

function updateGameStatus(message) {
    document.querySelector('[data-testid="gameStatus"]').textContent = message;
}

function initializeGame() {
    const colors = generateColors();
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.querySelector('[data-testid="colorBox"]').style.backgroundColor = targetColor;
    
    const colorButtons = document.querySelectorAll('[data-testid="colorOption"]');
    colorButtons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => checkGuess(colors[index]);
    });
    
    updateGameStatus('');
}

function checkGuess(guessedColor) {
    if (guessedColor.toLowerCase() === targetColor.toLowerCase()) {
        score++;
        document.querySelector('[data-testid="score"]').textContent = score;
        updateGameStatus('Correct! 🎉');
        setTimeout(initializeGame, 1000);
    } else {
        updateGameStatus('Wrong! Try again 😢');
    }
}

document.querySelector('[data-testid="newGameButton"]').onclick = () => {
    score = 0;
    document.querySelector('[data-testid="score"]').textContent = score;
    initializeGame();
};

// Initialize the game when the page loads
initializeGame();
