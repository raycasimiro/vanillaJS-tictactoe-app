function Board() {
  //set number of rows and columns
  const row = 3;
  const cols = 3;
  //create board
  let board = [];
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push("-");
    }
  }

  let board2 = [];
  for (let x = 0; x < 9; x++) {
    board2.push("- ");
  }

  const displayBoard = () => {
    console.log(`
    [${board2[0]}][${board2[1]}][${board2[2]}]
    [${board2[3]}][${board2[4]}][${board2[5]}]
    [${board2[6]}][${board2[7]}][${board2[8]}]
    `);
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
    //convert 2D array to 1D
    let x = [].concat(...board);

    for (let row of combinations) {
      if (
        x[row[0]] === x[row[1]] &&
        x[row[1]] === x[row[2]] &&
        x[row[0]] !== "-"
      )
        return true;
    }
    return false;
  };

  const addToken = (x, y, token) => {
    if (board[x][y] !== "-") alert("invalid move");
    else board[x][y] = token;
    displayBoard();
    // console.table(board);
  };

  return { board, addToken, checkWin };
}

function Cell() {
  let value = 0;
  const getValue = () => {
    return value;
  };
  const setValue = (newVal) => {
    value = newVal;
  };
  return { getValue, setValue };
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

  const gameRound = (row, col) => {
    board.addToken(row, col, getActivePlayer().getPlayerToken());
    if (board.checkWin()) alert(`${getActivePlayer().getPlayerName()} wins!`);
    switchActivePlayer();
    console.log(`${getActivePlayer().getPlayerName()} to move`);
  };

  return { gameRound, board };
}

const newGame = Game();
// console.table(newGame.board.board);
