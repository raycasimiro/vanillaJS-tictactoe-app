function Cell(pIndex) {
  let value = "";
  let index = pIndex;
  const getValue = () => value;
  const setValue = (newVal) => (value = newVal);
  const getIndex = () => index;

  const createCellHTML = () => {
    let cell = document.createElement("div");
    if (value === "X") cell.style.backgroundImage = "url(images/x.png)";
    if (value === "O") cell.style.backgroundImage = "url(images/o.png)";
    cell.setAttribute("cell-index", index);
    return cell;
  };
  return { getValue, setValue, getIndex, createCellHTML };
}
function Board() {
  let board = [];
  let winCells = [];
  for (let x = 0; x < 9; x++) {
    board.push(Cell(x));
  }

  const createBoardHTML = () => {
    let grid = document.createElement("div");
    grid.classList.add("grid");
    for (let items of board) {
      grid.appendChild(items.createCellHTML());
    }
    return grid;
  };

  const showWinCells = () => {
    let grid = document.querySelector(".grid");
    grid.children[winCells[0]].classList.add("blink");
    grid.children[winCells[1]].classList.add("blink");
    grid.children[winCells[2]].classList.add("blink");
  };

  //winning combinations
  const combinations = [
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
    for (let x of combinations) {
      if (
        board[x[0]].getValue() === board[x[1]].getValue() &&
        board[x[1]].getValue() === board[x[2]].getValue() &&
        board[x[0]].getValue() !== ""
      ) {
        winCells = x;
        return true;
      }
    }
    return false;
  };

  const addToken = (index, token) => {
    if (board[index].getValue() !== "") alert("invalid move");
    else board[index].setValue(token);
  };

  const isValidMove = (index) => {
    if (board[index].getValue() !== "") return false;
    else return true;
  };

  return { addToken, checkWin, createBoardHTML, isValidMove, showWinCells };
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
  const main = document.querySelector("main");
  let playerTurn = 1;
  const switchActivePlayer = () => {
    playerTurn++;
  };
  const getActivePlayer = () => {
    if (playerTurn % 2 !== 0) return player1;
    else return player2;
  };

  const update = () => {
    main.innerHTML = ``;
    main.appendChild(board.createBoardHTML());
  };

  //initial render
  update();

  //get player input
  main.addEventListener("click", (e) => {
    let index = parseInt(e.target.getAttribute("cell-index"));
    if (index >= 0 && index <= 9)
      if (board.isValidMove(index) && !board.checkWin()) gameRound(index);
  });

  main.addEventListener("dblclick", (e) => {
    console.log(playerTurn);
    if (board.checkWin() || playerTurn === 10) location.reload();
  });

  const gameRound = (index) => {
    board.addToken(index, getActivePlayer().getPlayerToken());

    update();
    if (board.checkWin()) board.showWinCells();

    switchActivePlayer();
  };

  return { board };
}

const newGame = Game();
