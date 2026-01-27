class Cell {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.cellPicked = false;
    // Ship type, else false:
    this.shipPresent = false;
  }
}

class Gameboard {
  constructor(player, ships) {
    this.player = player;
    this.ships = ships;
    this.shipsBoard = [];
    this.strategyBoard = [];
  }

  addShips(placementsArray) {}

  receiveAttack(attackCoordinate) {}

  allshipsSunk() {}
}

const createBoard = (player, ships) => {
  const newBoard = new Gameboard(player, ships);

  const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  let x;
  let y;
  let alphaNum;
  let cell;

  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      x = k;
      y = i;
      alphaNum = alphaCol[k] + numRow[i];

      cell = new Cell(alphaNum, x, y);

      newBoard.shipsBoard.push(cell);
      newBoard.strategyBoard.push(cell);
    }
  }

  return newBoard;
};

export default createBoard;
