document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const cells = [];

    let currentPlayer = 'X';
    let isGameOver = false;
    let timerInterval;
    let seconds = 0;

    const timerDisplay = document.getElementById('timer');
    const currentPlayerDisplay = document.getElementById('current-player');

    function startGame() {
        clearInterval(timerInterval);
        seconds = 0;
        timerDisplay.textContent = '00:00';
        currentPlayer = 'X';
        isGameOver = false;
        currentPlayerDisplay.textContent = "Ход игрока Х";
        for (let i = 0; i < 9; i++) {
            cells[i].textContent = '';
        }
        startTimer();
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = cells.indexOf(cell);

        if (!isGameOver && cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                isGameOver = true;
                currentPlayerDisplay.textContent = `Игрок ${currentPlayer} побеждает!`;
                clearInterval(timerInterval);
                return;
            }
            if (checkDraw()) {
                isGameOver = true;
                currentPlayerDisplay.textContent = "It's a draw!";
                clearInterval(timerInterval);
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = `Ход игрока ${currentPlayer}`;
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some((condition) => {
            const [a, b, c] = condition;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function updateTimer() {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    }

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }

    document.getElementById('new-game-btn').addEventListener('click', startGame);

    startGame();
});
