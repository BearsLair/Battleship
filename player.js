class Player {
  constructor(name, humanOrCPU) {
    this.name = name;
    this.humanOrCPU = humanOrCPU;
    this.shipBoard = {};
    this.strategyBoard = {};
  }
}

export default Player;
