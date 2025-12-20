// Both Players (or CPUs) have two boards:
//      1. PLayer Ship Placement Board (10 x 10)
//      2. PLayer Hit Stragegy Board (10 x 10)

// Columns are referred to by letters A - J.
// Rows are referrred to by numbers 1 - 10.
// Cells are called by referring to Col-Row (e.g. A-10)

class Cell {
  constructor(id) {
    this.id = id;
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
}

const createBoard = (player, type) => {
  let newBoard = new Gameboard(player, type);

  const charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  let id = "";
  let newCell;

  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      id = charArray[i] + numArray[k];
      newCell = new Cell(id);
      newBoard.board.push(newCell);
    }
  }

  return newBoard;
};

export default createBoard;
