import createBoard from "./gameboard";
import createFleet from "./ships";
import Player from "./player";

test("A game board for human player Patrick can be created", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.player.name).toBe("Patrick");
  expect(board.player.isCPU).toBe(false);
});

test("The board has five ships", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.ships.length).toBe(5);
});

test("Both the ships and strategy boards have 100 cells each", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.shipsBoard.length).toBe(100);
  expect(board.strategyBoard.length).toBe(100);
});

test("The first cell has an ID of A1 at x,y coordinate 0,0", () => {});

test("The last cell has an ID of J10 at x,y coordiante 9,9", () => {});

// Ships are not yet placed on the board
// Ships need to receiveAttack
// It should register that all ships on the board are sunk
