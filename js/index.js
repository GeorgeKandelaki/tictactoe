"use strict";

const tictactoe = document.querySelector(".tictactoe");

let grid = [];

const gridRows = 3;
const gridColumns = 3;

const player1 = 1;
const player2 = 2;

let curPlayer = player1;

let exampleGrid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

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

function playTheMove(grid, gridColumns, square, player) {
    const row = Math.floor(square / 3);
    grid[row];
    for (let i = 0; i < gridColumns; ++i) {}
}

function createGridDOM(grid) {
    const flatGrid = grid.flat();

    renderHTML(tictactoe, joinTemplate());
}

tictactoe.addEventListener("click", (e) => {
    const { target } = e;
    grid = createGrid(gridRows, gridColumns);

    if (!target.matches(".tictactoe__item")) return false;

    const { square } = target.dataset;
    playTheMove(grid, gridColumns, square, curPlayer);
});
