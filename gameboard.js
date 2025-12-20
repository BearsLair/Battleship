import createFleet from "./ships";

const mockPlacement = [
  ["Carrier", "B1", "horizontal"],
  ["Battleship", "B5", "vertical"],
  ["Cruiser", "D7", "horizontal"],
  ["Submarine", "I2", "vertical"],
  ["Destroyer", "G5", "horizontal"],
];

// Both Players (or CPUs) have two boards:
//      1. PLayer Ship Placement Board (10 x 10)
//      2. PLayer Hit Strategy Board (10 x 10)

// Columns are referred to by letters A - J.
// Rows are referrred to by numbers 1 - 10.
// Cells are called by referring to Col-Row (e.g. A-10)

// Coordinates use inverted positive Cartesian coordinate system,
// with orgin in upper-left of the board.
class Cell {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.hit = false;
  }
}

// Type in Gameboard class refers to "Ship" placement board,
// or "Strategy" board for recording hits and misses on opponent.
class Gameboard {
  constructor(player, type) {
    this.player = player;
    this.type = type;
    this.board = [];
    this.shipPositions = [];
  }
  addShips() {
    const fleet = createFleet();

    let curr;
    let coordinates = [];

    for (let i = 0; i < 5; i++) {
      curr = mockPlacement[i];
      coordinates = this.shipCoordinates(curr[0], curr[1], curr[2]);
    }
  }
  shipCoordinates(type, id, orientation) {}
}

const createBoard = (player, type) => {
  let newBoard = new Gameboard(player, type);

  const charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  let id = "";
  let newCell;

  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      id = charArray[k] + numArray[i];
      newCell = new Cell(id, k, i);
      newBoard.board.push(newCell);
    }
  }

  return newBoard;
};

export default createBoard;
