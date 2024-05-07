const gridSize = 5;
let choicesArray = [];
let solution = ''
let gameArray = initializeGame();
let solutionArray = gameArray.map(row => row.slice());
let gameWon = false;

function initializeGame() {
    const gameArray = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    for (let i = 0; i < gridSize; i++) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        choicesArray.push({ row, col }); 
        toggleCell(gameArray, row, col);
        toggleCell(gameArray, row - 1, col);
        toggleCell(gameArray, row + 1, col);
        toggleCell(gameArray, row, col - 1);
        toggleCell(gameArray, row, col + 1);
    }

    return gameArray;
}

function toggleCell(array, row, col) {
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        array[row][col] = 1 - array[row][col];
    }
}

function getRandomColor1() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); 
    const saturation = Math.floor(Math.random() * 31) + 70;
    const lightness = Math.floor(Math.random() * 21) + 70; 

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


function renderGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('is-off');
            
            if (gameWon) {
                cell.style.backgroundColor = getRandomColor();
                const title = document.getElementById('h1-title');
                title.innerHTML = "You Won! Lit UP!"
            } else {
                cell.style.backgroundColor = gameArray[i][j] === 1 ? '#f2f2f2' : '#333333';
            }

            cell.addEventListener('click', () => toggleCellOnClick(i, j));
            gameContainer.appendChild(cell);
        }
    }
}

function toggleCellOnClick(row, col) {
    toggleCell(gameArray, row, col);
    toggleCell(gameArray, row - 1, col);
    toggleCell(gameArray, row + 1, col);
    toggleCell(gameArray, row, col - 1);
    toggleCell(gameArray, row, col + 1);

    renderGame();

    if (checkWin()) {
        gameWon = true;
        alert('You win!');
        renderGame();
    }
}

function checkWin() {
    return gameArray.every(row => row.every(cell => cell === 0));
}

function showSolution() {
    const reversedArray = choicesArray.slice().reverse();
    const solutionText = reversedArray.map((choice, index) => `{ ${choice.row + 1}, ${choice.col + 1} }`).join(', ');
    const solution = document.getElementById('solution');
    solution.innerHTML = solutionText;
}

renderGame();
