document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const playerXButton = document.getElementById('playerX');
    const playerOButton = document.getElementById('playerO');
    let currentPlayer = 'X';
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    playerXButton.addEventListener('click', function() {
        currentPlayer = 'X';
        playerXButton.classList.add('active');
        playerOButton.classList.remove('active');
        resetGame();
    });

    playerOButton.addEventListener('click', function() {
        currentPlayer = 'O';
        playerOButton.classList.add('active');
        playerXButton.classList.remove('active');
        resetGame();
    });

    function handleCellClick(event) {
        const cell = event.target;
    
        if (cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            checkResult();
            if (gameActive) {
                swapPlayer();
            }
        }
    }
    

    function swapPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkResult() {
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

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            const cellA = cells[a].textContent;
            const cellB = cells[b].textContent;
            const cellC = cells[c].textContent;

            if (cellA !== '' && cellA === cellB && cellA === cellC) {
                gameActive = false;
                message.textContent = `O jogador ${currentPlayer} venceu!`;
                break;
            }
        }

        if (!Array.from(cells).some(cell => cell.textContent === '') && gameActive) {
            gameActive = false;
            message.textContent = "Empate!";
        }
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        message.textContent = '';
        gameActive = true;
    }
});

