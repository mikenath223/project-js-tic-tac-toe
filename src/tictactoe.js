const board = [
  ["X", "O", "X"],
  ["X", "X", "O"],
  ["X", "X", "..."]
];

let cells = document.querySelectorAll(".box");

const game = (() => {
  const display = () => {
    board.map((item, index) => {
      let cell = cells[index];
      cell.innerHTML = item;
    });
  };

  const checkBox = position => {
    const boardPos = board[position];
    if (boardPos !== "X" && boardPos !== "O") {
      return true;
    }
    return false;
  };

  const placeMark = (mark, position) => (board[position] = mark);

  const gameLogic = (mark, position) => {
    if (checkBox(position)) {
      placeMark(mark, position);
      display();
    }
  };

  return { display, checkBox, placeMark, gameLogic };
})();

// game.gameLogic();

const checkPlay = (() => {
  const playersandTurns = [
    ["Player1", "X"],
    ["Player2", "O"]
  ];

  const getInputs = () => {
    const selectQuery = query => document.querySelector(query);
    const finalSubmitBut = selectQuery("input[type='submit']");
    const player1Submit = selectQuery(".play1sub");
    const form = selectQuery("form");
    form.onsubmit = e => e.preventDefault();
    const player1Name = selectQuery("#player1");
    const player2Name = selectQuery("#player2");
    console.log(player2Name);

    const checkVal = inputval => {
      if (inputval.length > 0) {
        return true;
      }
      return false;
    };
    const showRules = () => {
      selectQuery(".rules").setAttribute(
        "style",
        "height: 300px; width: 350px; padding: 10px"
      );
      console.log("works");
    };

    player1Submit.onclick = e => {
      console.log(player1Name.value);
      if (checkVal(player1Name.value)) {
        selectQuery(".player2").style.display = "block";
        e.target.parentNode.classList.add("slide-out");
      } else {
        e.target.parentNode.classList.add("vibrate");
        e.target.parentNode.onanimationend = e => {
          e.classList.remove("vibrate");
        };
      }
    };

    finalSubmitBut.onclick = e => {
      if (checkVal(player2Name.value)) {
        e.target.parentNode.classList.add("slide-out");
        form.style.display = "none";
        showRules();
        selectQuery(".info-name").style.display = "none";
        selectQuery(".board-wrapper").style.visibility = "visible";
        selectQuery(".rules-board-wrap").display = "flex";
        selectQuery(".gameboard").style.transform = "translate3d(0px, 0, 0px)";
      } else {
        e.target.parentNode.classList.add("vibrate");
        e.target.parentNode.onanimationend = e => {
          e.classList.remove("vibrate");
        };
      }
    };
  };

  const clickListen = () => {
    cells.forEach((cell, ind) => {
      cell.onclick = e => {
        e.target.innerHTML = "X";
      };
    });
  };

  // const getChoice = () => {

  // }

  return { clickListen, getInputs };
})();

checkPlay.clickListen();
checkPlay.getInputs();
