import Player from "./player";
import createBoard from "./gameboard";
import createFleet from "./ships";

let playerOne;
let playerTwo;

beforeEach(() => {
  const playerFleet = createFleet();

  playerOne = new Player("Patrick", "human");
  playerOne.gameBoard = createBoard();
  playerOne.gameBoard.shipPositions = createFleet();

  playerTwo = new Player("Computer", "CPU");
  playerTwo.gameBoard = createBoard();
  playerTwo.gameBoard.shipPositions = createFleet();

  playerOne.gameBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  playerTwo.gameBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
});

test("A player has a name and player is either human or the CPU", () => {
  expect(playerOne.name).toBe("Patrick");
  expect(playerOne.humanOrCPU).toBe("human");
});

test("Player 1 is a human opponent", () => {
  expect(playerOne.humanOrCPU).toBe("human");
});

test("Player 2 is a CPU opponent", () => {
  expect(playerTwo.humanOrCPU).toBe("CPU");
});
