class Cell {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    // cellHitOrMiss false unless hit/miss is registered
    this.cellHitOrMiss = false;
    // Ship type, else false for no ship present:
    this.shipPresent = false;
  }
}

class Gameboard {
  constructor(player, ships) {
    this.player = player;
    this.ships = ships;
    this.shipsBoard = [];
    this.strategyBoard = [];
    this.allShipsSunk = false;
  }

  // TODO: addShips MUST work for entire codebase to work.
  // Ship types MUST go to the correct cell in shipsBoard array.
  // Ship on cell MUST flip shipPresent flag from false to correct ship type
  // Thorough testing needed before continuing.
  addShips(placementsArray) {
    const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    let list;
    let letter;
    let num;
    let shipLength;
    let current;
    let alphaIndex;
    let numIndex;

    for (let i = 0; i < placementsArray.length; i++) {
      list = [];
      letter = placementsArray[i].start[0];
      num = placementsArray[i].start.slice(1);

      shipLength = this.shipsList(placementsArray[i].type);

      if (placementsArray[i].orientation === "hor") {
        alphaIndex = alphaCol.indexOf(letter);

        for (let k = 0; k < shipLength; k++) {
          current = alphaCol[alphaIndex + k] + num;
          list.push(current);
        }
      } else if (placementsArray[i].orientation === "ver") {
        numIndex = numRow.indexOf(num);

        for (let k = 0; k < shipLength; k++) {
          current = letter + numRow[numIndex + k];
          list.push(current);
        }
      }

      for (let m = 0; m < list.length; m++) {
        for (let n = 0; n < this.shipsBoard.length; n++) {
          if (this.shipsBoard[n].id === list[m]) {
            this.shipsBoard[n].shipPresent = placementsArray[i].type;
          }
        }
      }
    }
  }

  shipsList(ship) {
    let value;

    switch (ship) {
      case "Ca":
        value = 5;
        break;
      case "Ba":
        value = 4;
        break;
      case "Cr":
        value = 3;
        break;
      case "Su":
        value = 3;
        break;
      case "De":
        value = 2;
    }

    return value;
  }

  // Assume D1, occupied by the carrier, is hit
  // Assume J1, which is empty, is registered as a miss
  receiveAttack(attackCoordinate) {
    const index = this.shipsBoard.findIndex(
      (cell) => cell.id === attackCoordinate,
    );

    if (this.shipsBoard[index].shipPresent === false) {
      this.shipsBoard[index].cellHitOrMiss = "miss";
    } else if (this.shipsBoard[index].shipPresent !== false) {
      this.shipsBoard[index].cellHitOrMiss = "hit";

      const currentShipType = this.shipsBoard[index].shipPresent;

      const shipIndex = this.ships.findIndex(
        (ship) => ship.type === currentShipType,
      );

      this.ships[shipIndex].hit();
    }
  }

  allshipsSunkFunc() {
    let shipsSunkAmount = 0;

    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk === true) {
        shipsSunkAmount++;
      }
    }

    if (shipsSunkAmount === this.ships.length) {
      this.allShipsSunk = true;
    }
  }
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
    }
  }

  return newBoard;
};

export default createBoard;
