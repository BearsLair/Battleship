const createFleet = require("./ships");

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
  }
}

class Gameboard {
  constructor() {
    this.board = [];
    this.shipPositions = [];
    this.missedAttacks = [];
  }

  addShips(placementsArray) {
    const fleet = createFleet();

    let curr;
    let coordinates = [];

    for (let i = 0; i < 5; i++) {
      curr = placementsArray[i];
      coordinates = this.shipCoordinates(fleet[i].length, curr[1], curr[2]);
      fleet[i].ocuppiedCoordinates = coordinates;
      this.shipPositions.push(fleet[i]);
    }
  }

  shipCoordinates(length, id, orientation) {
    const baseCell = this.board.find((position) => position.id === id);
    let coordinates = [];
    let baseCellCoor = [baseCell.x, baseCell.y];
    coordinates.push(baseCellCoor);

    if (orientation === "horizontal") {
      for (let i = 1; i < length; i++) {
        let updatedCoor = baseCellCoor[0] + 1;
        baseCellCoor = [updatedCoor, baseCellCoor[1]];
        coordinates.push(baseCellCoor);
      }
    } else if (orientation === "vertical") {
      for (let i = 1; i < length; i++) {
        let updatedCoor = baseCellCoor[1] + 1;
        baseCellCoor = [baseCellCoor[0], updatedCoor];
        coordinates.push(baseCellCoor);
      }
    }

    return coordinates;
  }

  receiveAttack(attackCoordinate) {
    // Check if coordinate matches a ship position first
    // Send hit to ship, and hit coordinates
    let missed = true;

    for (let i = 0; i < this.shipPositions.length; i++) {
      if (
        this.arrayPresent(
          this.shipPositions[i].ocuppiedCoordinates,
          attackCoordinate
        )
      ) {
        this.shipPositions[i].hit(attackCoordinate);
        missed = false;
        break;
      }
    }

    // Else, Send coordinate to missed Cell
    if (missed === true) {
      this.missedAttacks.push(attackCoordinate);
    }
  }

  allshipsSunk() {
    let shipSunkCount = 0;
    for (let i = 0; i < this.shipPositions.length; i++) {
      if (this.shipPositions[i].isSunk) {
        shipSunkCount++;
      }
    }

    if (shipSunkCount === 5) {
      return "All Ships Sunk!";
    }
  }

  arrayPresent(parentArray, targetArray) {
    if (parentArray.length === 0) {
      return false;
    }

    const x = targetArray[0];
    const y = targetArray[1];

    for (let i = 0; i < parentArray.length; i++) {
      if (parentArray[i][0] === x && parentArray[i][1] === y) {
        return true;
      }
    }

    return false;
  }
}

const createBoard = () => {
  let newBoard = new Gameboard();

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

module.exports = createBoard;
