const table = document.querySelector("table");
const rows = table.querySelectorAll("tr");
const cells = table.querySelectorAll("td");
const gameBoard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];
  const createBoard = () => {
    for (i = 0; i < rows; i++) {
      board[i] = [];
      for (j = 0; j < cols; j++) {
        board[i][j] = "";
      }
    }
    console.table(board);

    return board;
  };

  const getBoard = () => board;
  const putMark = (row, col, mark) => {
    if (board[row][col] === "") {
      board[row][col] = mark;
    }
    console.table(board);
    gameLogic.checkForWin(mark);
    gameBoard.displayBoard();
  };

  const displayBoard = () => {
    array = gameBoard.getBoard().flat();
    array.forEach((mark, i) => {
      cells[i].textContent = mark;
    });
  };

  return { createBoard, getBoard, putMark, displayBoard };
})();
const playerLogic = (function () {
  const createPlayer = function (name, mark) {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => {
      score++;
    };
    return {
      name,
      mark,
      getScore,
      giveScore,
    };
  };

  return { createPlayer };
})();

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
      if (mark === "X") winner = "X";
      else if (mark === "O") winner = "O";
      else return console.error("Winner is nor X, nor O");
      console.log(`Winner of the round is ${winner}`);
      table.style.backgroundColor = "green";
      return true;
    }
    return false;
  };
  const startNewRound = () => {
    board = gameBoard.getBoard();
    // gameBoard.printBoard();
    gameBoard.createBoard();
  };
  // if (checkForWin(1 || -1)) startNewRound();
  const gameFlow = () => {
    const player1 = playerLogic.createPlayer("Max", "X");
    const player2 = playerLogic.createPlayer("Bob", "O");
    // Осуществить выбор имени игрока и его маркировку
    gameBoard.displayBoard();
    let gameEnd = false;
    while (!gameEnd) {
      cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          gameBoard.putMark(e.target.dataset.row, e.target.dataset.col, mark);
        });
      });
    }
    if (checkForWin("X") || checkForWin("O")) {
      startNewRound();
    }
  };
  return { checkForWin, startNewRound, gameFlow };
})();

gameLogic.startNewRound();
gameBoard.putMark(1, 0, "X");
gameBoard.putMark(1, 1, "O");
gameBoard.putMark(1, 2, "X");
gameBoard.putMark(0, 1, "O");
gameBoard.putMark(2, 1, "X");
//

gameBoard.displayBoard();
gameLogic.gameFlow();
