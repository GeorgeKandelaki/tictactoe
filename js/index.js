"use strict";
const gridRows = 3;
const gridColumns = 3;

const player1 = 1;
const player2 = 2;

const tictactoe = document.querySelector(".tictactoe");
let grid = [];

let curPlayer = player1;

// Some Reusable helper functions
function joinTemplate(arr, templateFn, join = true) {
    const result = arr.map((el) => templateFn(el));
    if (join) return result.join("");
    else return result;
}

function renderHTML(parentEl, HTML, position, clear = false) {
    clear ? (parentEl.innerHTML = "") : false;
    parentEl.insertAdjacentHTML(position, HTML);
    return true;
}

// Functions for TicTacToe Functionality
function createGrid(rows = 3, columns = 3) {
    let grid = [];

    for (let i = 0; i < rows && rows > 2; ++i) {
        // Create Rows
        grid[i] = [];

        for (let x = 0; x < columns && columns > 2; ++x) {
            // Create Columns
            grid[i][x] = 0;
        }
    }

    return grid;
}

function getColumns(grid, gridWidth) {
    let updatedGrid = [];

    // Flip the Array, Create a Array where there are Columns
    for (let i = 0; i < grid.length; ++i) {
        updatedGrid[i] = [];

        for (let x = 0; x < gridWidth; ++x) {
            updatedGrid[i][x] = grid[x][i];
        }
    }

    return updatedGrid;
}

function checkWinner(gridRows, gridColumns, gridWidth) {
    let winner = null;

    // Check Rows
    for (let i = 0; i < gridRows.length; ++i) {
        if (gridRows[i].every((el) => el === 1)) return (winner = player1);
        else if (gridRows[i].every((el) => el === 2)) return (winner = player2);
    }

    // Check Columns
    for (let i = 0; i < gridColumns.length; ++i) {
        if (gridColumns[i].every((el) => el === 1)) return (winner = player1);
        else if (gridColumns[i].every((el) => el === 2)) return (winner = player2);
    }

    // Check Left-to-Right Diagonal
    let firstCellLR = gridRows[0][0];
    if (firstCellLR && gridRows.every((_, i) => gridRows[i][i] === firstCellLR)) {
        return (winner = firstCellLR === 1 ? player1 : player2);
    }

    // Check Right-to-Left Diagonal
    let firstCellRL = gridRows[0][gridWidth - 1];
    if (firstCellRL && gridRows.every((_, i) => gridRows[i][gridWidth - i - 1] === firstCellRL)) {
        return (winner = firstCellRL === 1 ? player1 : player2);
    }

    return winner;
}

function playTheMove(grid, gridWidth, square, player) {
    const posx = square % gridWidth;
    const posy = Math.floor(square / gridWidth);
    grid[posy][posx] = player;

    return true;
}

function showWinner(player) {
    renderHTML(
        document.body,
        `<h1 class="winner__text">Player ${player} has won the game! <a href="/">Play Again?</a>`,
        "beforebegin"
    );
    return true;
}

function renderDraw() {
    renderHTML(document.body, `<h1 class="winner__text"> It was a Draw! <a href="/">Play Again?</a>`, "beforebegin");
    return true;
}

function fillOutSquare(square, player) {
    if (player === player1) {
        curPlayer = player2;
        square.textContent = "X";
    } else if (player === player2) {
        curPlayer = player1;
        square.textContent = "0";
    }
}

grid = createGrid(gridRows, gridColumns);
const playedSquares = [];
tictactoe.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches(".tictactoe__item")) return false;

    const square = target;
    if (playedSquares.includes(square)) return false;

    playedSquares.push(square);
    playTheMove(grid, gridColumns, square.dataset.square, curPlayer);
    fillOutSquare(square, curPlayer);

    const winner = checkWinner(grid, getColumns(grid, gridColumns), gridRows);
    if (grid.flat().length === playedSquares.length) return renderDraw();
    if (winner) return showWinner(winner);
});
