let currentPlayer = "X";
let xScore = 0;
let oScore = 0;
let tieScore = 0;

const board = document.querySelector("#board");
const status = document.querySelector("#status");
const xScoreElement = document.querySelector("#x-score");
const oScoreElement = document.querySelector("#o-score");
const tieScoreElement = document.querySelector("#tie-score");
const resetButton = document.querySelector("#new-game-btn");

function handleBoxClick(event) {
  const box = event.target;
  box.textContent = currentPlayer;
  box.classList.add(currentPlayer);
  if (checkForWin()) {
    endGame(false);
  } else if (checkForTie()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
  }
}

function checkForWin() {
  const boxes = document.querySelectorAll(".box");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombos.some(function (combo) {
    return combo.every(function (index) {
      return boxes[index].classList.contains(currentPlayer);
    });
  });
}

function checkForTie() {
  const boxes = document.querySelectorAll(".box");
  return Array.from(boxes).every(function (box) {
    return box.classList.contains("X") || box.classList.contains("O");
  });
}

function endGame(isTie) {
  if (isTie) {
    status.textContent = "It's a tie!";
    tieScore++;
    tieScoreElement.textContent = tieScore;
  } else {
    status.textContent = `${currentPlayer} wins!`;
    if (currentPlayer === "X") {
      xScore++;
      xScoreElement.textContent = xScore;
    } else {
      oScore++;
      oScoreElement.textContent = oScore;
    }
  }
  document.querySelectorAll(".box").forEach(function (box) {
    box.removeEventListener("click", handleBoxClick);
  });
}

function resetGame() {
  currentPlayer = "X";
  status.textContent = `${currentPlayer}'s turn`;
  document.querySelectorAll(".box").forEach(function (box) {
    box.textContent = "";
    box.classList.remove("X");
    box.classList.remove("O");
    box.addEventListener("click", handleBoxClick, { once: true });
  });
  updateScores();
}

function updateScores() {
  xScoreElement.textContent = xScore;
  oScoreElement.textContent = oScore;
  tieScoreElement.textContent = tieScore;
}

function init() {
  document.querySelectorAll('.box').forEach(function(box) {
    box.addEventListener('click', handleBoxClick, { once: true });
  });
  resetButton.addEventListener('click', resetGame);
  updateScores();
}

init();
