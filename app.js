function Board() {
  //create board
  let board = [];
  for (let x = 0; x < 9; x++) {
    board.push("-");
  }

  const displayBoard = () => {
    console.log(`
    [${board[0]}][${board[1]}][${board[2]}]
    [${board[3]}][${board[4]}][${board[5]}]
    [${board[6]}][${board[7]}][${board[8]}]
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
    if (board[index] !== "-") alert("invalid move");
    else board[index] = token;
    displayBoard();
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

  const gameRound = (index) => {
    board.addToken(index, getActivePlayer().getPlayerToken());
    if (board.checkWin()) alert(`${getActivePlayer().getPlayerName()} wins!`);
    switchActivePlayer();
    console.log(`${getActivePlayer().getPlayerName()} to move`);
  };

  return { gameRound, board };
}

const newGame = Game();
