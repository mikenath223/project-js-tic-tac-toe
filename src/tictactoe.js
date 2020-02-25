const board = ['X', 'O', 'X','X','X','O', 'X','X','...'];

const game = (() => {

    const display = () =>  {

	let cells = document.querySelectorAll(".box");
	board.map( (item, index) => {

	    let cell = cells[index];
	    cell.innerHTML = item;
	    
	})
    }

    const checkBox = (position) => {

	if ((board[position] !==  'X') || (board[position] !==  'O')) {
	    return false
	}
	return true;

	

    }

    return {display, checkBox}
    
})();

