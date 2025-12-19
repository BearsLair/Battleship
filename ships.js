class ship {
  constructor(type, length, hitPoints) {
    this.type = type;
    this.length = length;
    this.hitPoints = hitPoints;
    this.isSunk = false;
  }
  hit = () => {
    this.hitPoints - 1;
  };
  isSunk = () => {
    if (this.hitPoints === 0) {
      this.isSunk = true;
    }
  };
}

const shipTypes = [
  { Carrier: 5 },
  { Battleship: 4 },
  { Cruiser: 3 },
  { Submarine: 3 },
  { Destroyer: 2 },
];

const createFleet = () => {};

export default createFleet;
