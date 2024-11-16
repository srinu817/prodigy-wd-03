const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedIndex] !== '' || !gameActive || currentPlayer !== 'X') return;

    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkForWinner()) {
        statusText.textContent = `Rajesh wins!`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = 'O';
        statusText.textContent = `AI's Turn`;
        aiMove();
    }
};

const aiMove = () => {
    let bestMove = findBestMove();
    boardState[bestMove] = currentPlayer;
    cells[bestMove].textContent = currentPlayer;

    if (checkForWinner()) {
        statusText.textContent = `AI wins!`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = 'X';
        statusText.textContent = `Rajesh's Turn`;
    }
};

const findBestMove = () => {
    // AI tries to win
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === '') {
            boardState[i] = 'O';
            if (checkForWinner()) {
                boardState[i] = '';
                return i;
            }
            boardState[i] = '';
        }
    }

    // AI tries to block Rajesh's win
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === '') {
            boardState[i] = 'X';
            if (checkForWinner()) {
                boardState[i] = '';
                return i;
            }
            boardState[i] = '';
        }
    }

    // AI picks a random empty spot
    let emptyIndices = boardState.map((value, index) => value === '' ? index : null).filter(index => index !== null);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

const checkForWinner = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
};

const restartGame = () => {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
    statusText.textContent = `Rajesh's Turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
