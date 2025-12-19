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

class Gameboards {
  constructor(player, type) {
    this.player = player;
    this.type = type;
    this.board = [];
    this.shipPositions = [];
  }
}

const createBoard = (player, type) => {};

export default createBoard;
