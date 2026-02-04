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

test("Carrier has a length of 5", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.ships[0].type).toBe("Ca");
  expect(board.ships[0].length).toBe(5);
});

test("The ships board has 100 cells", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.shipsBoard.length).toBe(100);
});

test("The first cell on the ships board has an ID of A1 at x,y coordinate 0,0", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.shipsBoard[0].id).toBe("A1");
  expect(board.shipsBoard[0].x).toBe(0);
  expect(board.shipsBoard[0].y).toBe(0);
});

test("The last cell on the ships board has an ID of J10 at x,y coordiante 9,9", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  expect(board.shipsBoard[99].id).toBe("J10");
  expect(board.shipsBoard[99].x).toBe(9);
  expect(board.shipsBoard[99].y).toBe(9);
});

test("The cells from B1 to F1 are occupied by the Carrier", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  board.addShips([{ type: "Ca", start: "B1", orientation: "hor" }]);

  let locations = [];

  for (let i = 0; i < 100; i++) {
    if (board.shipsBoard[i].shipPresent === "Ca") {
      locations.push(board.shipsBoard[i].id);
    }
  }

  expect(locations).toStrictEqual(["B1", "C1", "D1", "E1", "F1"]);
});

test("The cells from B1 to F1 are occupied by the Carrier", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  let locations = [];

  for (let i = 0; i < 100; i++) {
    if (board.shipsBoard[i].shipPresent === "Ca") {
      locations.push(board.shipsBoard[i].id);
    }
  }

  expect(locations).toStrictEqual(["B1", "C1", "D1", "E1", "F1"]);
});

test("The cells from B4 to B7 are occupied by the Battleship", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  let locations = [];

  for (let i = 0; i < 100; i++) {
    if (board.shipsBoard[i].shipPresent === "Ba") {
      locations.push(board.shipsBoard[i].id);
    }
  }

  expect(locations).toStrictEqual(["B4", "B5", "B6", "B7"]);
});

test("The cells from D9 to F9  are occupied by the Cruiser", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  let locations = [];

  for (let i = 0; i < 100; i++) {
    if (board.shipsBoard[i].shipPresent === "Cr") {
      locations.push(board.shipsBoard[i].id);
    }
  }

  expect(locations).toStrictEqual(["D9", "E9", "F9"]);
});

test("The cells from F3 to F5  are occupied by the Submarine", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  let locations = [];

  for (let i = 0; i < 100; i++) {
    if (board.shipsBoard[i].shipPresent === "Su") {
      locations.push(board.shipsBoard[i].id);
    }
  }

  expect(locations).toStrictEqual(["F3", "F4", "F5"]);
});

test("The cells from J6 to J7  are occupied by the Destroyer", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  const board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  let locations = [];

  for (let i = 0; i < 100; i++) {
    if (board.shipsBoard[i].shipPresent === "De") {
      locations.push(board.shipsBoard[i].id);
    }
  }

  expect(locations).toStrictEqual(["J6", "J7"]);
});

// TODO test: shipsBoard need to receiveAttack() (hit/miss)
test("The cell D1 occupied by the Carrier can be hit", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  let board = createBoard(playerOne, newFleet);

  board.addShips([{ type: "Ca", start: "B1", orientation: "hor" }]);

  board.receiveAttack("D1");

  expect(board.shipsBoard[3].cellHitOrMiss).toBe("hit");
  expect(board.ships[0].length).toBe(4);
});

// TODO test: Opponent can MISS on cell with no ship present
test("The cell D1 occupied by the Carrier can be hit", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  let board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  board.receiveAttack("J1");

  expect(board.shipsBoard[9].cellHitOrMiss).toBe("miss");
});

// TODO test: A ship can be sunk
test("All ships can be sunk", () => {
  const playerOne = new Player("Patrick", false);
  const newFleet = createFleet();
  let board = createBoard(playerOne, newFleet);

  board.addShips([
    { type: "Ca", start: "B1", orientation: "hor" },
    { type: "Ba", start: "B4", orientation: "ver" },
    { type: "Cr", start: "D9", orientation: "hor" },
    { type: "Su", start: "F3", orientation: "ver" },
    { type: "De", start: "J6", orientation: "ver" },
  ]);

  board.receiveAttack("B1");
  board.receiveAttack("C1");
  board.receiveAttack("D1");
  board.receiveAttack("E1");
  board.receiveAttack("F1");

  board.receiveAttack("B4");
  board.receiveAttack("B5");
  board.receiveAttack("B6");
  board.receiveAttack("B7");

  board.receiveAttack("D9");
  board.receiveAttack("E9");
  board.receiveAttack("F9");

  board.receiveAttack("F3");
  board.receiveAttack("F4");
  board.receiveAttack("F5");

  board.receiveAttack("J6");
  board.receiveAttack("J7");

  board.allshipsSunkFunc();

  expect(board.allShipsSunk).toBe(true);
});

// TODO test: It should register that all ships on the board are sunk
