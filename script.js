const gameBoard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];
  const createBoard = () => {
    for (i = 0; i < rows; i++) {
      board[i] = [];
      for (j = 0; j < cols; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  };

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

  return { createBoard, getBoard, putMark, printBoard };
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
const gameLogic = (function () {
  let board = gameBoard.getBoard();

  const checkForWin = function (mark) {
    function threeInRow() {
      let j = 0;
      for (let i = 0; i < 3; i++) {
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
      for (let j = 0; j < 3; j++) {
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
  const startNewRound = () => {
    board = gameBoard.getBoard();
    // gameBoard.printBoard();
    if (gameLogic.checkForWin(-1)) {
      console.log("0 won round");
    }
    if (gameLogic.checkForWin(1)) {
      console.log("X won round");
    }
    gameBoard.createBoard();
  };
  return { checkForWin, startNewRound };
})();

const Max = createPlayer("Max");
gameBoard.createBoard();
gameBoard.putMark(1, 0, -1);
gameBoard.putMark(1, 1, -1);
gameBoard.putMark(1, 2, -1);
console.log(`-1(O) win check:  ${gameLogic.checkForWin(-1)}`);
console.log(`+1(X) win check:  ${gameLogic.checkForWin(1)}`);
console.log(gameLogic.startNewRound());
gameBoard.putMark(1, 1, 1);
