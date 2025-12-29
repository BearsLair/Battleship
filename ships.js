class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.hitPoints = length;
    this.isSunk = false;
    this.ocuppiedCoordinates = [];
    this.hitCoordinates = [];
  }

  hit(coor) {
    this.hitPoints--;
    this.hitCoordinates.push(coor);

    if (this.hitPoints === 0) {
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
    ["Carrier", 5],
    ["Battleship", 4],
    ["Cruiser", 3],
    ["Submarine", 3],
    ["Destroyer", 2],
  ];

  let currentShip;
  let fleet = [];

  for (let i = 0; i < shipTypes.length; i++) {
    currentShip = new Ship(shipTypes[i][0], shipTypes[i][1]);
    fleet.push(currentShip);
  }
  return fleet;
};

module.exports = createFleet;
