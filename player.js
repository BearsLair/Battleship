class Player {
  constructor(name, humanOrCPU, shipBoard, strategyBoard) {
    this.name = name;
    this.humanOrCPU = humanOrCPU;
    this.shipBoard = shipBoard;
    this.strategyBoard = strategyBoard;
  }
}

module.exports = Player;
