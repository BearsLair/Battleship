import Player from "./player";
import createBoard from "./gameboard";

let playerOne;
let playerTwo;

beforeEach(() => {
  playerOne = new Player(
    "Patrick",
    "human",
    createBoard("ship"),
    createBoard("strategy")
  );

  playerTwo = new Player(
    "Computer",
    "CPU",
    createBoard("ship"),
    createBoard("strategy")
  );

  playerOne.shipBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  playerTwo.shipBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
});

test("A player has a name, type, ship and strategy boards", () => {
  expect(playerOne.name).toBe("Patrick");
  expect(playerOne.humanOrCPU).toBe("human");
  expect(playerOne).toHaveProperty("shipBoard");
  expect(playerOne).toHaveProperty("strategyBoard");
});

test("PLayer 1 shipBoard has 100 cells", () => {
  expect(playerOne.shipBoard.board).toHaveLength(100);
});

test("Player 1 strategyBoard has 100 cells", () => {
  expect(playerOne.strategyBoard.board).toHaveLength(100);
});

test("Player 1 is a human opponent", () => {
  expect(playerOne.humanOrCPU).toBe("human");
});

test("Player 2 is a CPU opponent", () => {
  expect(playerTwo.humanOrCPU).toBe("CPU");
});

test("Player 1 and 2 has five ships set on shipboard", () => {
  expect(playerOne.shipBoard.shipPositions).toHaveLength(5);
  expect(playerTwo.shipBoard.shipPositions).toHaveLength(5);
});
