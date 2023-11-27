const gameBoard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];
  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < cols; j++) {
      board[i][j] = 0;
    }
  }
  const getBoard = () => board;
  const putMark = (row, col, mark) => {
    if (board[row][col] === 0) {
      board[row][col] = mark;
    }
    console.table(board);
  };
  const printBoard = () => {
    const boardWithMarks = board.map((row) =>
      row.map((col) => (col === "" ? " " : col))
    );
    return console.table(boardWithMarks);
  };
  const checkForWin = function (mark) {
    function threeInRow() {
      let j = 0;
      for (let i = 0; i < rows; i++) {
        if (
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i][j + 2] &&
          board[i][j] === mark
        ) {
          return true;
        }
      }
    }
    function threeInCol() {
      let i = 0;
      for (let j = 0; j < cols; j++) {
        if (
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 2][j] &&
          board[i][j] === mark
        ) {
          return true;
        }
      }
    }
    function threeInDiag() {
      if (
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2] &&
        board[1][1] === mark
      ) {
        return true;
      }
      if (
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0] &&
        board[1][1] === mark
      ) {
        return true;
      }
    }

    if (threeInRow(board) || threeInCol(board) || threeInDiag(board)) {
      return true;
    }
    return false;
  };

  return {
    getBoard,
    putMark,
    printBoard,
    checkForWin,
  };
})();
const createPlayer = function (name) {
  let score = 0;
  const getScore = () => score;
  const giveScore = () => {
    score++;
  };
  return {
    name,
    getScore,
    giveScore,
  };
};
const gameLogic = function () {};

const Max = createPlayer("Max");
gameBoard.putMark(1, 0, -1);
gameBoard.putMark(1, 1, -1);
gameBoard.putMark(1, 2, -1);
console.log(`-1(O) win check:  ${gameBoard.checkForWin(-1)}`);
console.log(`+1(X) win check:  ${gameBoard.checkForWin(1)}`);
