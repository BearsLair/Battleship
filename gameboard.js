class Cell {
  constructor(id, x, y, shipPresent) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.cellPicked = false;
    // Ship type, else false:
    this.shipPresent = shipPresent;
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

const createBoard = (playerName) => {};

export default createBoard;
