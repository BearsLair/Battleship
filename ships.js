class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.isSunk = false;
    this.ocuppiedCoordinates = [];
  }

  hit(coor) {
    this.hitPoints--;
    if (this.length === 0) {
      this.isSunkFunc();
    }
  }
  isSunkFunc() {
    if (this.hitPoints === 0) {
      this.isSunk = true;
    }
  }
}

const createFleet = () => {
  const shipTypes = [
    // Carrier
    ["Ca", 5],
    // Battleship
    ["Ba", 4],
    // Cruiser
    ["Cr", 3],
    // Submarine
    ["Su", 3],
    // Destroyer
    ["De", 2],
  ];

  let currentShip;
  let fleet = [];

  for (let i = 0; i < shipTypes.length; i++) {
    currentShip = new Ship(shipTypes[i][0], shipTypes[i][1]);
    fleet.push(currentShip);
  }

  return fleet;
};

export default createFleet;
