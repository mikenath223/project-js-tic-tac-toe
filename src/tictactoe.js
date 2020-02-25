const board = ["X", "O", "X", "X", "X", "O", "X", "X", "..."];
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
  const clickListen = () => {
    cells.forEach((cell, ind) => {
      
      cell.onclick = (e) => {
        console.log(e.target);
        e.target.innerHTML = "X"
      }
    })
  };

  // const getChoice = () => {

  // }

  return { clickListen };
})();

checkPlay.clickListen()