const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

// Predefine the set of colors
const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#000080", "#808000"
];

// Function to generate a random color from the predefined set
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to initialize the game
function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Clear previous options
  colorOptions.innerHTML = '';

  // Generate 6 color options
  const options = [targetColor];
  while (options.length < 6) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Create buttons for each color option
  options.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => checkGuess(color));
    colorOptions.appendChild(button);
  });

  // Reset game status
  gameStatus.textContent = '';
  gameStatus.style.color = '#333';
}

// Function to check if the guess is correct
function checkGuess(guess) {
  if (guess === targetColor) {
    gameStatus.textContent = 'Correct! 🎉';
    gameStatus.style.color = 'green';
    gameStatus.classList.add('correct');
    score++;
    scoreElement.textContent = score;
    setTimeout(() => {
      gameStatus.classList.remove('correct');
      initGame();
    }, 1000); // Start a new game after 1 second
  } else {
    gameStatus.textContent = 'Wrong! Try again. 😅';
    gameStatus.style.color = 'red';
    gameStatus.classList.add('wrong');
    setTimeout(() => {
      gameStatus.classList.remove('wrong');
    }, 500);
  }
}

// Event listener for the new game button
newGameButton.addEventListener('click', () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

// Initialize the game when the page loads
initGame();




