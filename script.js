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
    gameLogic.startNewRound();
  });
  const putMark = function () {
    let row = this.parentNode.rowIndex;
    let col = this.cellIndex;

    mark = mark === "X" ? "O" : "X";
    if (board[row][col] === "") {
      board[row][col] = mark;
      gameBoard.numberOfMoves++;
    }
    gameBoard.displayBoard();

    gameLogic.checkForWin(mark);
  };

  cells.forEach((element) => element.addEventListener("click", putMark));

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
          let row = table.rows[i];
          let cells = [row.cells[j], row.cells[j + 1], row.cells[j + 2]];
          cells.forEach((cell) => cell.classList.add("winning-cell"));
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
          let cells = [
            table.rows[i].cells[j],
            table.rows[i + 1].cells[j],
            table.rows[i + 2].cells[j],
          ];
          cells.forEach((cell) => cell.classList.add("winning-cell"));
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
        let cells = [
          table.rows[0].cells[0],
          table.rows[1].cells[1],
          table.rows[2].cells[2],
        ];
        cells.forEach((cell) => cell.classList.add("winning-cell"));
        return true;
      }
      if (
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0] &&
        board[1][1] === mark
      ) {
        let cells = [
          table.rows[0].cells[2],
          table.rows[1].cells[1],
          table.rows[2].cells[0],
        ];
        cells.forEach((cell) => cell.classList.add("winning-cell"));
        return true;
      }
    }

    if (threeInRow() || threeInCol() || threeInDiag()) {
      console.log("Number of moves is equal to zero");
      cells.forEach((cell) => {
        if (!cell.classList.contains("winning-cell"))
          cell.classList.add("losing-cell");
        cell.removeEventListener("click", gameBoard.putMark);
      });

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
    gameBoard.createBoard();
    gameBoard.displayBoard();
    cells.forEach((cell) => {
      cell.classList.remove("winning-cell", "losing-cell");
      cell.addEventListener("click", gameBoard.putMark);
    });
    display.textContent = "Make your move!";
  };

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
gameBoard.createBoard();
gameBoard.displayBoard();
