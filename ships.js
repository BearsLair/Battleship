class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.isSunk = false;
  }

  hit() {
    this.length--;
    if (this.length === 0) {
      this.isSunkFunc();
    }
  }
  isSunkFunc() {
    this.isSunk = true;
  }
}

const createFleet = () => {
  const shipTypes = [
    // Carrier, length 5
    ["Ca", 5],
    // Battleship, length 4
    ["Ba", 4],
    // Cruiser, length 3
    ["Cr", 3],
    // Submarine, length 3
    ["Su", 3],
    // Destroyer, length 2
    ["De", 2],
  ];

  let currentShip;
  let fleet = [];

  // Create array of all five Ship classes to be tracked by gameboard
  for (let i = 0; i < shipTypes.length; i++) {
    currentShip = new Ship(shipTypes[i][0], shipTypes[i][1]);
    fleet.push(currentShip);
  }

  return fleet;
};

export default createFleet;
