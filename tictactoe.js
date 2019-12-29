// Get every single winning combination
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const grid = () => Array.from(document.querySelectorAll('.box'));
const boxNumId = (boxEl) => Number.parseInt(boxEl.id.replace('box-', ''));
const emptyBox = () => grid().filter(box => box.innerText === '');
const allSame = (arr) => arr.every(box => box.innerText === arr[0].innerText && box.innerText !== '');

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => boxNumId(emptyBox()[Math.floor(Math.random() * emptyBox().length)]);

// Loop through each box to see if a winner is found and add a class of winner
const endGame = (winningSequence) => {
    winningSequence.forEach(boxEl => boxEl.classList.add('winner'));
    disableListeners();
}

// Check to see if player won
const checkForWin = () => {
    let victory = false;

    // Checks to see if the comb matches one of the winning combinations array
    winningCombinations.forEach(comb => {
        const _grid = grid();
        const sequence = [_grid[comb[0]], _grid[comb[1]], _grid[comb[2]]];
        if(allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    });

    return victory;
}

// Function to create opponents turn
const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o');
        if(!checkForWin())
            enableListeners();
    }, 1000);
}

// Main player turn
const clickFn = (event) => {
    takeTurn(boxNumId(event.target), 'x');
    if(!checkForWin())
        opponentTurn();
};

const enableListeners = () => grid().forEach(box => box.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach(box => box.removeEventListener('click', clickFn));

enableListeners();


