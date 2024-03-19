document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    let currentPlayer = 'X'; // Definido como 'X' por padrão
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(event) {
        const cell = event.target;
        
        if (cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            checkResult();
            swapPlayer();
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
                resetBoardAfterDelay();
                break;
            }
        }

        if (!Array.from(cells).some(cell => cell.textContent === '') && gameActive) {
            gameActive = false;
            message.textContent = "Empate!";
            resetBoardAfterDelay();
        }
    }

    function resetBoardAfterDelay() {
        setTimeout(() => {
            cells.forEach(cell => {
                cell.textContent = '';
            });
            message.textContent = '';
            currentPlayer = 'X';
            gameActive = true;
        }, 5000); // 5 segundos em milissegundos
    }
});
