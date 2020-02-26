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
    selectQuery("form").onsubmit = e => e.preventDefault();
    const player1Name = selectQuery("#player1");
    const player2Name = selectQuery("#player2");
    console.log(player2Name);
    
    const checkVal = inputval => {
      if (inputval.length > 0) {
        return true;
      }
      return false;
    };
    // const hideElem =
    const showRules = () => {
      selectQuery(".rules").setAttribute(
        "style",
        "height: 290px; width: 350px; padding: 10px"
      );
      console.log('works');
      
    };

    player1Submit.onclick = e => {
      console.log(player1Name.value);
      if (checkVal(player1Name.value)) {

        e.target.parentNode.classList.add("slide-out");
      } else {
      console.log('works');
        e.target.parentNode.classList.add("vibrate");
      }
    };

    finalSubmitBut.onclick = e => {
      if (checkVal(player2Name.value)) {
        e.target.parentNode.classList.add("slide-out");
        showRules();
        selectQuery('.info-name').style.display = 'none';
      } else {
        e.target.parentNode.classList.add("vibrate");
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
