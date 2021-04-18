(function () {
  let currentPlayer = "x";
  const winningRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
  ];

  const board = document.getElementById("board");
  const boxes = board.querySelectorAll(".box");
  const playerTurnEl = document.body.querySelector("#player-turn");
  const winnerEl = document.body.querySelector("#winner");

  playerTurnEl.textContent = currentPlayer;

  /**
   * @param {MouseEvent} event
   */
  function onBoxClicked(event) {
    /** @type {HTMLDivElement} */
    const theBox = event.currentTarget;
    theBox.textContent = currentPlayer;

    const boxesMap = Array.from(boxes).map((box) => box.textContent);

    for (let j = 0; j < winningRows.length; j++) {
      const winningRow = winningRows[j];
      const c1 = winningRow[0];
      const c2 = winningRow[1];
      const c3 = winningRow[2];
      const boxesIndexes = [boxesMap[c1], boxesMap[c2], boxesMap[c3]];
      if (boxesIndexes.every((v) => v === currentPlayer)) {
        winnerEl.textContent = currentPlayer;
        break;
      }
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    playerTurnEl.textContent = currentPlayer;
  }

  boxes.forEach((box) =>
    box.addEventListener("click", (event) => onBoxClicked(event))
  );
})();
