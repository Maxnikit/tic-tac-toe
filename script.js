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
  };
  const printBoard = () => {
    const boardWithMarks = board.map((row) =>
      row.map((col) => (col === "" ? " " : col))
    );
    return console.table(boardWithMarks);
  };
  const checkForWin = function (board) {
    function threeInRow(board) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (
            board[i][j] === board[i][j + 1] &&
            board[i][j] === board[i][j + 2]
          ) {
            return true;
          }
        }
      }
    }
    function threeInCol(board) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (
            board[i][j] === board[i + 1][j] &&
            board[i][j] === board[i + 2][j]
          ) {
            return true;
          }
        }
      }
    }
    function threeInDiag(board) {
      if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
      }
      if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
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
const Max = createPlayer("Max");
const gameLogic = function () {};

const checkForWin = function (board) {
  function threeInRow(board) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i][j + 2]
        ) {
          return true;
        }
      }
    }
  }
  function threeInCol(board) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 2][j]
        ) {
          return true;
        }
      }
    }
  }
  function threeInDiag(board) {
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return true;
    }
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return true;
    }
  }

  if (threeInRow(board) || threeInCol(board) || threeInDiag(board)) {
    return true;
  }
  return false;
};
// TODO Check for win is not working. Cannon read properties of "0"
