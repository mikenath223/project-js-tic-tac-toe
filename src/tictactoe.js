const board = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];

let players;

const selectQuery = query => document.querySelector(query);
const cells = document.querySelectorAll('.box');

const game = (() => {
  const display = () => board.map((item, index) => {
    cells[index].innerHTML = item;
    return null;
  });

  function storePlayers(player1, player2) {
    players = [player1, player2];
  }

  const checkBox = position => {
    const boardPos = board[position];
    if (boardPos !== 'X' && boardPos !== 'O') {
      return true;
    }
    return false;
  };

  const setWinner = (pattern, winner) => {
    let winnerName;
    let loserName;
    let loser;
    if (winner === 'Player1') {
      loser = 'Player2';
      [winnerName, loserName] = players;
    } else {
      loser = 'Player1';
      [loserName, winnerName] = players;
    }
    selectQuery(
      '.turns',
    ).innerHTML = `${winner}: ${winnerName} won😍🎉!!! <br/> ${loser}: ${loserName} lost😒`;

    board.forEach((_item, index) => {
      if (!pattern.includes(index)) {
        board[index] = ':(';
      }
    });
    return display();
  };

  function setTie(player1, player2) {
    selectQuery(
      '.turns',
    ).innerHTML = `No Winner:  ITS A TIE!!! <br/> Thanks for playing ${player1} and ${player2}`;
  }

  const checkWin = () => {
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    return patterns.map(p => {
      if (board[p[0]] === 'X' && board[p[1]] === 'X' && board[p[2]] === 'X') {
        return setWinner(p, 'Player1');
      }
      if (board[p[0]] === 'O' && board[p[1]] === 'O' && board[p[2]] === 'O') {
        return setWinner(p, 'Player2');
      }
      if (board.indexOf('...') === -1 && board.indexOf(':(') === -1) {
        const [player1, player2] = players;
        return setTie(player1, player2);
      }
      return null;
    });
  };

  const placeMark = position => {
    if (checkBox(position)) {
      const countX = board.filter(x => x === 'X').length;
      const countO = board.filter(y => y === 'O').length;
      if (countX > countO) {
        board[position] = 'O';
      } else {
        board[position] = 'X';
      }
    }
    display();
    checkWin();
  };

  const gameLogic = (mark, position) => {
    if (checkBox(position)) {
      placeMark(mark, position);
      display();
    }
  };

  const reStart = () => {
    window.location.reload();
  };

  return {
    display,
    checkBox,
    placeMark,
    gameLogic,
    checkWin,
    setWinner,
    storePlayers,
    reStart,
  };
})();

const checkPlay = (() => {
  const getInputs = () => {
    const selectQuery = query => document.querySelector(query);
    const finalSubmitBut = selectQuery("input[type='submit']");
    const player1Submit = selectQuery('.play1sub');
    const form = selectQuery('form');
    form.onsubmit = e => e.preventDefault();
    const player1Name = selectQuery('#player1');
    const player2Name = selectQuery('#player2');

    const checkVal = inputval => {
      if (inputval.length > 0) {
        return true;
      }
      return false;
    };
    const showRules = () => {
      selectQuery('.rules').setAttribute(
        'style',
        'height: 300px; width: 350px; padding: 10px',
      );
    };

    player1Submit.onclick = e => {
      const parent = e.target.parentNode;
      if (checkVal(player1Name.value)) {
        selectQuery('.player2').style.display = 'block';
        parent.classList.add('slide-out');
      } else {
        parent.classList.add('vibrate');
        parent.onanimationend = e => e.target.classList.remove('vibrate');
      }
    };

    finalSubmitBut.onclick = e => {
      const { parentNode } = e.target;
      if (checkVal(player2Name.value)) {
        game.storePlayers(player1Name.value, player2Name.value);
        parentNode.classList.add('slide-out');
        form.style.display = 'none';
        showRules();
        selectQuery('.info-name').style.display = 'none';
        selectQuery('.board-wrapper').style.visibility = 'visible';
        selectQuery('.rules-board-wrap').classList.add('show-board');
        selectQuery('.gameboard').style.transform = 'translate3d(0px, 0, 0px)';
      } else {
        parentNode.classList.add('vibrate');
        parentNode.onanimationend = e => e.target.classList.remove('vibrate');
      }
    };
  };

  const clickListen = () => {
    cells.forEach((cell, ind) => {
      cell.onclick = () => {
        game.placeMark(ind);
      };
    });
  };

  return { clickListen, getInputs };
})();

checkPlay.clickListen();
checkPlay.getInputs();

const reStartGame = selectQuery('button.restart-game');
reStartGame.addEventListener('click', game.reStart);
