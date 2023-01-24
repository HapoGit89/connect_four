/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])


function makeBoard() {
  for (let y = 0; y < HEIGHT; y++){
    board.push([])
    for (let x = 0; x < WIDTH; x++ ){
      board[y].push("");
    }
  }

}



function makeHtmlBoard() {
const htmlBoard = document.getElementById('board');

 
  const top = document.createElement("tr"); //creates table row HTML element
  top.setAttribute("id", "column-top");  // sets class for that row
  top.addEventListener("click", handleClick); // adds event listener for that row and adds handleclick as callback

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); // creates data cell element
    headCell.setAttribute("id", x); //sets its id to the current for loop index
    top.append(headCell); // appends headcell to top
  }
  htmlBoard.append(top); // appends the whole top row which data cells to the html structure


  for (let y = 0; y < HEIGHT; y++) {   // creates as many rows as the board has HEIGHT
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); // adds as many datacells to each row as the board has Width
      cell.setAttribute("id", `${y}-${x}`); //sets datacell id so the x and y position are included 
      row.append(cell);
    }
    htmlBoard.append(row);  //appends newly created row to htmlboard and jumps back in for loop
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
for (let i = 5; i>=0; i--){
  if (board[i][x] === "" ){
    return i}
}
  
  return null;
}



function placeInTable(x, y) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  const place = document.getElementById(`${x}-${y}`)
  piece.classList.add(`piece${currPlayer}`);
  place.appendChild(piece);
  board[x][y] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  window.alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }


  if(checkTie(board)){endGame("It is a tie!")}
  

  currPlayer === 1? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // for every column
    for (let x = 0; x < WIDTH; x++) { // for every row
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // this defines a dynamic horizontal row of 4 cells (first one would be the first 4 cells to the left, than x skips and its the 4 cells from teh second cell on. This is done for every row)
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // this defines a dynamic vertical row of 4 cells
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // this defines a dynamic to the right diagonal row of 4 cells
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // this defines a dynamic to the left diagonal row of 4 cells

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {  // checks if any of the 4 cell combinations is filled by one player
        return true;
      }
    }
  }
}

function checkTie(arr){ return arr.every((y)=> (y.every((x)=> x.length>0)))}

makeBoard();
makeHtmlBoard();
