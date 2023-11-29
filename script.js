// TODO Add a button to start new round
// TODO Add score system
// TODO Add a restart button
// TODO Add line to cross winning cells
// TODO improve style
const table = document.querySelector("table");
const rows = table.querySelectorAll("tr");
const cells = table.querySelectorAll("td");
const display = document.getElementById("display");

let mark = "X";

const gameBoard = (function () {
  let numberOfMoves = 0;
  const rows = 3;
  const cols = 3;
  const board = [];
  let mark = "X";
  const createBoard = () => {
    for (i = 0; i < rows; i++) {
      board[i] = [];
      for (j = 0; j < cols; j++) {
        board[i][j] = "";
      }
    }

    return board;
  };

  const getBoard = () => board;
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function () {
    gameBoard.createBoard();
    gameBoard.displayBoard();
  });
  const putMark = (row, col, mark) => {
    if (board[row][col] === "") {
      board[row][col] = mark;
      gameBoard.numberOfMoves++;
    }
    gameBoard.displayBoard();
    gameLogic.checkForWin(mark);
  };

  cells.forEach((element) =>
    element.addEventListener("click", function () {
      let rowIndex = this.parentNode.rowIndex;
      let colIndex = this.cellIndex;

      mark = mark === "X" ? "O" : "X";

      gameBoard.putMark(rowIndex, colIndex, mark);
    })
  );

  const displayBoard = () => {
    array = gameBoard.getBoard().flat();
    array.forEach((mark, i) => {
      cells[i].textContent = mark;
    });
  };

  return { createBoard, getBoard, putMark, displayBoard, numberOfMoves };
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
          console.log("rowWin");
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
          console.log("colWin");
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
        console.log("diag1Win");
        return true;
      }
      if (
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0] &&
        board[1][1] === mark
      ) {
        console.log("diag2Win");
        return true;
      }
    }

    if (threeInRow() || threeInCol() || threeInDiag()) {
      console.log("Number of moves is equal to zero");

      console.log("3check");
      if (mark === "X") winner = "X";
      else if (mark === "O") winner = "O";
      else return console.error("Winner is nor X, nor O?");
      display.textContent = `Winner of the round is ${winner}!`;
      // table.style.backgroundColor = "green";
      return true;
    } else if (gameBoard.numberOfMoves === 9) {
      gameBoard.numberOfMoves = 0;
      display.textContent = "Draw!";
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

    // if (checkForWin("X") || checkForWin("O")) {
    //   startNewRound();
    // }
  };
  return { checkForWin, startNewRound, gameFlow };
})();

// gameLogic.startNewRound();
// // Round start
// gameBoard.putMark(0, 0, "X");
// gameBoard.displayBoard();
// gameLogic.gameFlow();
