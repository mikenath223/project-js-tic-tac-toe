const board = ["...", "...", "...","...", "...", "...","...", "...", "..."];

let players;

const selectQuery = query => document.querySelector(query);
let cells = document.querySelectorAll(".box");

const game = (() => {
  const display = () => {
    board.map((item, index) => {
      let cell = cells[index];
      cell.innerHTML = item;
    });
  };

function storePlayers (player1, player2){
	 players = [player1, player2];
      console.log(players);
}

  const checkBox = position => {
    const boardPos = board[position];
    if (boardPos !== "X" && boardPos !== "O") {
      return true;
    }
    return false;
  };

    const placeMark = (position) => {

	if (checkBox(position)) {
	    countX = board.filter(x => x === 'X').length;
	    countO = board.filter(y => y === 'O').length;
	    if (countX > countO) {
	    board[position] = 'O';
	    }
	    else { board[position] = 'X'}

	}
	display();
	checkWin();
    }
    
  const gameLogic = (mark, position) => {
    if (checkBox(position)) {
      placeMark(mark, position);
      display();
    }
  };

    const reStart = () => {

	board.forEach((item,index) => {board[index] =  "..."});
	display();

    };

    const checkWin = () => {



	patterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,0], [0,4,8] ];
	patterns.map((p, i) => {

	if ((board[p[0]] == 'X' && board[p[1]] == 'X' && board[p[2]] == 'X')) {
	    return setWinner(p, 'player1')
     } else if ((board[p[0]] == 'O'  && board[p[1]] == 'O' && board[p[2]] == 'O')) {
     return setWinner(p, 'Player2')
	}
	});

    }

  const setWinner = (pattern, winner) => {

	pattern.map((item) => { 

 
    //cells[item].outerHTML = `<div class="box" data-key="${item+1}"> <i class="em em-fire" aria-role="presentation" aria-label="FIRE"></i></div>`
	       
    let winnerName;
    if (winner == 'Player1') {
   winnerName = players[0];
   } else {
   	winnerName = players[1];
   }

	    selectQuery('.turns').innerHTML = `${winner}: ${winnerName} won!!!`;
	});

      board.forEach((item, index) => {

	  if(!pattern.includes(index)) { board[index] = ":("; }
	  
      }); 
      display();

}

    return { display, checkBox, placeMark, gameLogic, checkWin, setWinner, storePlayers, reStart };
})();

// game.gameLogic();

const checkPlay = (() => {
  const playersandTurns = [
    ["Player1", "X"],
    ["Player2", "O"]
  ];

    const getInputs = () => {

	// listen for restart
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
      	game.storePlayers(player1Name.value, player2Name.value);
        e.target.parentNode.classList.add("slide-out");
        form.style.display = "none";
        showRules();
        selectQuery(".info-name").style.display = "none";
        selectQuery(".board-wrapper").style.visibility = "visible";
        selectQuery(".rules-board-wrap").classList.add('show-board');
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
          game.placeMark(ind);
	  
      };
    });
  };

  // const getChoice = () => {

  // }

  return { clickListen, getInputs };
})();

checkPlay.clickListen();
checkPlay.getInputs();


const reStartGame = document.querySelector("button.restart-game");
reStartGame.addEventListener('click', game.reStart);
console.log(reStartGame);


// DELETE ABOVE

const board = ["...", "...", "...","...", "...", "...","...", "...", "..."];

let players;

const selectQuery = query => document.querySelector(query);
let cells = document.querySelectorAll(".box");

const game = (() => {
  const display = () => {
    board.map((item, index) => {
      let cell = cells[index];
      cell.innerHTML = item;
    });
  };

function storePlayers (player1, player2){
	 players = [player1, player2];
}

  const checkBox = position => {
    const boardPos = board[position];
    if (boardPos !== "X" && boardPos !== "O") {
      return true;
    }
    return false;
  };

    const placeMark = (position) => {

	if (checkBox(position)) {
	    countX = board.filter(x => x === 'X').length;
	    countO = board.filter(y => y === 'O').length;
	    if (countX > countO) {
	    board[position] = 'O';
	    }
	    else { board[position] = 'X'}

	}
	display();
	checkWin();
    }
    
  const gameLogic = (mark, position) => {
    if (checkBox(position)) {
      placeMark(mark, position);
      display();
    }
  };

    const reStart = () => {

	board.forEach((item,index) => {board[index] =  "..."});
	display();

    };

    const checkWin = () => {



	patterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,0], [0,4,8] ];
	patterns.map((p, i) => {

	if ((board[p[0]] == 'X' && board[p[1]] == 'X' && board[p[2]] == 'X')) {
	    return setWinner(p, 'player1')
     } else if ((board[p[0]] == 'O'  && board[p[1]] == 'O' && board[p[2]] == 'O')) {
     return setWinner(p, 'Player2')
	}
	});

    }

  const setWinner = (pattern, winner) => {

	pattern.map((item) => { 

 
    let winnerName;
    if (winner == 'Player1') {
   winnerName = players[0];
   } else {
   	winnerName = players[1];
   }

	    selectQuery('.turns').innerHTML = `${winner}: ${winnerName} won!!!`;
	});

      board.forEach((item, index) => {

	  if(!pattern.includes(index)) { board[index] = ":("; }
	  
      }); 
      display();

}

    return { display, checkBox, placeMark, gameLogic, checkWin, setWinner, storePlayers, reStart };
})();


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
  
    };

    player1Submit.onclick = e => {
    
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
      	game.storePlayers(player1Name.value, player2Name.value);
        e.target.parentNode.classList.add("slide-out");
        form.style.display = "none";
        showRules();
        selectQuery(".info-name").style.display = "none";
        selectQuery(".board-wrapper").style.visibility = "visible";
        selectQuery(".rules-board-wrap").classList.add('show-board');
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
          game.placeMark(ind);
	  
      };
    });
  };

 
  return { clickListen, getInputs };
})();

checkPlay.clickListen();
checkPlay.getInputs();


const reStartGame = document.querySelector("button.restart-game");
reStartGame.addEventListener('click', game.reStart);

