const board = document.getElementById('board');
const status = document.getElementById('status');
const turnSpan = document.getElementById('turn');
const resetBtn = document.getElementById('reset');
const dance = document.getElementById('dance');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.index = i;
    box.addEventListener('click', handleClick);
    board.appendChild(box);
  }
}

function handleClick(e) {
  const index = parseInt(e.target.dataset.index);
  
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    status.textContent = `${currentPlayer} Wins! 🎉`;
    dance.classList.add('win', 'show');
    gameActive = false;

    // Auto hide celebration after 5 seconds
    setTimeout(() => {
      dance.classList.remove('show');
    }, 5000);
    return;
  }

  if (gameState.every(cell => cell !== null)) {
    status.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnSpan.textContent = currentPlayer;
  status.textContent = `Turn for `;
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && 
           gameState[a] === gameState[b] && 
           gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  dance.classList.remove('win', 'show');
  status.textContent = `Turn for `;
  turnSpan.textContent = 'X';
  createBoard();
}

// Event Listeners
resetBtn.addEventListener('click', resetGame);

// Initialize the game
createBoard();