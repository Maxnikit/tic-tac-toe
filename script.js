// TODO Add a button to start new round
// TODO Add score system
// TODO Add a restart button
// TODO Add line to cross winning cells
// TODO improve style
const table = document.querySelector("table");
const rows = table.querySelectorAll("tr");
const cells = table.querySelectorAll("td");
const display = document.getElementById("display");

const gameBoard = (function () {
  let numberOfMoves = 0;
  const rows = 3;
  const cols = 3;
  const board = [];
  let mark = "O";
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
  const restartBtn = document.createElement("button");
  restartBtn.id = "restartBtn";
  restartBtn.textContent = "Restart";
  startBtn.addEventListener("click", function () {
    gameLogic.startGame();
    startBtn.replaceWith(restartBtn);
  });

  restartBtn.addEventListener("click", function () {
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

  // cells.forEach((element) => element.addEventListener("click", putMark));

  const displayBoard = () => {
    array = gameBoard.getBoard().flat();
    array.forEach((mark, i) => {
      cells[i].textContent = mark;
    });
    cells.forEach((cell) => {
      if (cell.innerHTML === "X") {
        cell.innerHTML = `<img src="img/X.png"/>`;
      } else if (cell.innerHTML === "O") {
        cell.innerHTML = `<img src="img/O.png"/>`;
      }
    });
  };

  return { createBoard, getBoard, putMark, displayBoard, numberOfMoves };
})();

const gameLogic = (function () {
  let board = gameBoard.getBoard();
  let scoreX = 0;
  let scoreO = 0;
  const scoreXDisplay = document.querySelector(".scoreXDisplay");
  const scoreODisplay = document.querySelector(".scoreODisplay");
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
      cells.forEach((cell) => {
        if (!cell.classList.contains("winning-cell"))
          cell.classList.add("losing-cell");
        cell.removeEventListener("click", gameBoard.putMark);
      });

      if (mark === "X") {
        winner = "X";
        giveScore("X");
      } else if (mark === "O") {
        winner = "O";
        giveScore("O");
      } else return console.error("Winner is nor X, nor O?");
      display.textContent = `Winner of the round is ${winner}!`;
      gameBoard.numberOfMoves = 0;
      displayScore();

      return true;
    } else if (gameBoard.numberOfMoves === 9) {
      gameBoard.numberOfMoves = 0;
      display.textContent = "Draw!";
      return true;
    }
    return false;
  };
  const startGame = () => {
    gameLogic.setNames();
    gameLogic.displayScore();

    gameLogic.startNewRound();
  };
  const giveScore = function (mark) {
    if (mark === "X") {
      scoreX++;
    } else if (mark === "O") {
      scoreO++;
    }
  };
  const displayScore = function () {
    scoreXDisplay.textContent = `Score:${scoreX}`;
    scoreODisplay.textContent = `Score:${scoreO}`;
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
  const setNames = function () {
    const inputs = document.querySelectorAll("Input");
    inputs.forEach((input) => {
      let chosenName = input.value;
      let name = document.createElement("name");
      name.textContent = chosenName;
      input.replaceWith(name);
    });
  };

  return {
    checkForWin,
    startGame,
    startNewRound,
    setNames,
    giveScore,
    displayScore,
  };
})();
gameBoard.createBoard();
gameBoard.displayBoard();
