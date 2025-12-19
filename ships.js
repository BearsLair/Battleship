/*
Carrier: 5
Battleship: 4
Cruiser: 3
Submarine: 3
Destroyer: 2
*/

class ship {
  constructor(type, length, hitPoints) {
    this.type = type;
    this.length = length;
    this.hitPoints = hitPoints;
    this.isSunk = false;
  }
}

const shipTypes = [
  { Carrier: 5 },
  { Battleship: 4 },
  { Cruiser: 3 },
  { Submarine: 3 },
  { Destroyer: 2 },
];

const createFleet = () => {};
