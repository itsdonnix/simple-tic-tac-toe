import { randomNum, reverse } from "./utils";

(function () {
  let currentPlayer;

  const scores = {
    x: 0,
    o: 0,
  };
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
  ];
  const prevMatchesIndexes = {
    x: [],
    o: [],
  };

  const btnResetGame = document.body.querySelector("#btn-reset-game");
  const board = document.getElementById("board");
  const boxes = populateBoxes();
  const playerTurnEl = document.body.querySelector("#player-turn");
  const scoreEls = {
    x: document.querySelector("#x-score"),
    o: document.querySelector("#o-score"),
  };

  // const winnerEl = document.body.querySelector("#winner");

  /**
   * @param {MouseEvent} event
   */
  function onBoxClicked(event) {
    /** @type {HTMLDivElement} */
    const theBox = event.currentTarget;
    const theBoxSpan = theBox.querySelector("span");

    if (!!theBoxSpan.textContent) return;

    theBoxSpan.classList.remove(reverse(currentPlayer));
    theBoxSpan.classList.add(currentPlayer);
    theBoxSpan.textContent = currentPlayer;

    theBoxSpan.animate(
      [
        {
          opacity: 0,
          transform: "scale(0)",
        },
        {
          transform: "scale(1.6)",
        },
        {
          opacity: 1,
          tranform: "scale(1)",
        },
      ],
      {
        duration: 200,
        fill: "forwards",
        easing: "linear",
      }
    );

    const boxesMap = Array.from(boxes).map(
      (box) => box.querySelector("span").textContent
    );

    let currentWinner = null;

    for (let j = 0; j < winningLines.length; j++) {
      const winningRow = winningLines[j];
      const c1 = winningRow[0];
      const c2 = winningRow[1];
      const c3 = winningRow[2];
      const boxesIndexes = [boxesMap[c1], boxesMap[c2], boxesMap[c3]];

      if (boxesIndexes.every((v) => v === currentPlayer)) {
        // currentWinnerEl.textContent = currentPlayer;
        /** @type {Array} */
        const currentPlayerPrevIndexes = prevMatchesIndexes[currentPlayer];
        const isDuplicatedIndexes = currentPlayerPrevIndexes.some(
          (v) => v[0] === c1 && v[1] === c2 && v[2] === c3
        );

        if (!isDuplicatedIndexes) {
          currentWinner = currentPlayer;
          prevMatchesIndexes[currentPlayer].push([c1, c2, c3]);
        }
      }
    }

    if (currentWinner) {
      incrementScore(currentPlayer);
    }

    if (boxes.every((box) => !!box.querySelector("span").textContent)) {
      resetBoard();
    }

    currentPlayer = reverse(currentPlayer);
    playerTurnEl.textContent = currentPlayer;
  }

  /**
   * @param {String} player
   */
  function incrementScore(player) {
    scores[player]++;
    scoreEls[player].textContent = scores[player];
  }

  function resetGame() {
    resetBoard();
    scores.o = 0;
    scores.x = 0;
    scoreEls.o.textContent = 0;
    scoreEls.x.textContent = 0;
    init();
  }

  function resetBoard() {
    boxes.forEach((box) => {
      box.querySelector("span").textContent = "";
    });
    prevMatchesIndexes.o = [];
    prevMatchesIndexes.x = [];
  }

  function populateBoxes() {
    const boxes = [];
    for (let i = 0; i < 9; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      const span = document.createElement("span");
      box.appendChild(span);
      board.appendChild(box);
      boxes.push(box);
    }
    return boxes;
  }

  function init() {
    currentPlayer = randomNum() ? "x" : "o";
    playerTurnEl.textContent = currentPlayer;
  }

  boxes.forEach((box) => box.addEventListener("click", onBoxClicked));
  btnResetGame.addEventListener("click", resetGame);
  init();
})();
