(function () {
  const randomNum = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
  let currentPlayer = randomNum ? "x" : "o";
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
  let boxes = populateBoxes();
  const playerTurnEl = document.body.querySelector("#player-turn");
  // const winnerEl = document.body.querySelector("#winner");

  playerTurnEl.textContent = currentPlayer;

  /**
   * @param {MouseEvent} event
   */
  function onBoxClicked(event) {
    /** @type {HTMLDivElement} */
    const theBox = event.currentTarget;
    const theBoxSpan = theBox.querySelector("span");

    theBoxSpan.classList.remove(currentPlayer === "x" ? "o" : "x");
    theBoxSpan.classList.add(currentPlayer);
    theBoxSpan.textContent = currentPlayer;

    theBoxSpan.animate(
      [
        {
          opacity: 0,
          transform: "scale(0)",
        },
        {
          opacity: 1,
          transform: "scale(1)",
        },
      ],
      {
        duration: 100,
        fill: "forwards",
        easing: "ease",
      }
    );

    const boxesMap = Array.from(boxes).map(
      (box) => box.querySelector("span").textContent
    );

    for (let j = 0; j < winningRows.length; j++) {
      const winningRow = winningRows[j];
      const c1 = winningRow[0];
      const c2 = winningRow[1];
      const c3 = winningRow[2];
      const boxesIndexes = [boxesMap[c1], boxesMap[c2], boxesMap[c3]];
      if (boxesIndexes.every((v) => v === currentPlayer)) {
        // winnerEl.textContent = currentPlayer;
        break;
      }
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    playerTurnEl.textContent = currentPlayer;
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

  boxes.forEach((box) =>
    box.addEventListener("click", (event) => onBoxClicked(event))
  );
})();
