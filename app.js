function Cell(pIndex) {
  let value = "-";
  let index = pIndex;
  const getValue = () => value;
  const setValue = (newVal) => (value = newVal);
  const getIndex = () => index;
  const createCellHTML = () => {
    let cell = document.createElement("div");
    cell.innerHTML = value;
    return cell;
  };
  return { getValue, setValue, getIndex, createCellHTML };
}
function Board() {
  //create board
  let board = [];
  for (let x = 0; x < 9; x++) {
    board.push(Cell(x));
  }

  const displayBoard = () => {
    console.log(`
    [${board[0].getValue()}][${board[1].getValue()}][${board[2].getValue()}]
    [${board[3].getValue()}][${board[4].getValue()}][${board[5].getValue()}]
    [${board[6].getValue()}][${board[7].getValue()}][${board[8].getValue()}]
    `);
  };

  const createBoardHTML = () => {
    let grid = document.createElement("div");
    let main = document.querySelector("main");
    main.innerHTML = ``;
    grid.classList.add("grid");
    for (let items of board) {
      grid.appendChild(items.createCellHTML());
    }

    main.appendChild(grid);
  };

  //winning combinations
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWin = () => {
    for (let row of combinations) {
      if (
        board[row[0]] === board[row[1]] &&
        board[row[1]] === board[row[2]] &&
        board[row[0]] !== "-"
      )
        return true;
    }
    return false;
  };

  const addToken = (index, token) => {
    if (board[index].getValue() !== "-") alert("invalid move");
    else board[index].setValue(token);
  };

  return { board, addToken, checkWin, displayBoard, createBoardHTML };
}

function Player(pName, pToken) {
  let name = pName;
  let token = pToken;
  let score = 0;
  const getPlayerToken = () => token;
  const getPlayerName = () => name;
  const addPlayerScore = () => score++;
  const getPlayerScore = () => score;
  return { getPlayerName, getPlayerToken, addPlayerScore, getPlayerScore };
}

function Game() {
  const board = Board();
  const player1 = Player("p1", "X");
  const player2 = Player("p2", "O");

  let playerTurn = 1;
  const switchActivePlayer = () => {
    playerTurn++;
  };
  const getActivePlayer = () => {
    if (playerTurn % 2 !== 0) return player1;
    else return player2;
  };

  const getInput = (e) => {
    console.log(e);
  };

  board.displayBoard();
  board.createBoardHTML();

  const gameRound = (index) => {
    board.addToken(index, getActivePlayer().getPlayerToken());
    if (board.checkWin()) alert(`${getActivePlayer().getPlayerName()} wins!`);
    switchActivePlayer();
    board.displayBoard();
    board.createBoardHTML();
    console.log(`${getActivePlayer().getPlayerName()} to move`);
  };

  return { gameRound, board };
}

const newGame = Game();
