import createBoard from "./gameboard";

// Check if array has unique items
const checkArrayForUniques = (array) => {
  const newSet = new Set(array);
  const setArray = [...newSet];

  if (setArray.length === array.length) {
    return true;
  } else {
    return false;
  }
};

test("Gameboard has a player", () => {
  const newBoard = createBoard("Player1", "Ship");
  expect(newBoard.player).toBe("Player1");
});

test("GameBoard has a type", () => {
  const newBoard = createBoard("Player1", "Ship");
  expect(newBoard.type).toBe("Ship");
});

test("There are 100 cells", () => {
  const newBoard = createBoard("Player1", "Ship");
  expect(newBoard.board).toHaveLength(100);
});

test("Each cell has a unique id", () => {
  const newBoard = createBoard("Player1", "Ship");
  let ids = [];

  for (let i = 0; i < 100; i++) {
    ids.push(newBoard.board[i].id);
  }

  expect(checkArrayForUniques(ids)).toBe(true);
});

test("A cell has a hit condition", () => {
  const newBoard = createBoard("Player1", "Ship");

  expect(newBoard.board[0].hit).toBe(false);
});

test("The board has a shipPositions array", () => {
  const newBoard = createBoard("Player1", "Ship");

  expect(Object.hasOwn(newBoard, "shipPositions")).toBe(true);
});

test("A cell has inverted postive x,y coordinates", () => {
  const newBoard = createBoard("Player1", "Ship");

  expect(newBoard.board[2].x).toBe(2);
  expect(newBoard.board[2].y).toBe(0);
});

test("shipPositions array has length of five", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips();
  expect(newBoard.shipPositions).toHaveLength(5);
});
test("The ships are carrier, battleship, cruiser, submarine, and destoyer", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips();
  expect(newBoard.shipPositions[0].type).toBe("Carrier");
  expect(newBoard.shipPositions[1].type).toBe("Battleship");
  expect(newBoard.shipPositions[2].type).toBe("Cruiser");
  expect(newBoard.shipPositions[3].type).toBe("Submarine");
  expect(newBoard.shipPositions[4].type).toBe("Destroyer");
});
test("Occupied ship coordinates are correct", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips();
  expect(newBoard.shipPositions[0].type).toBe([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ]);
  expect(newBoard.shipPositions[1].type).toBe([
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ]);
  expect(newBoard.shipPositions[2].type).toBe([
    [3, 6],
    [4, 6],
    [5, 6],
  ]);
  expect(newBoard.shipPositions[3].type).toBe([
    [8, 1],
    [8, 2],
    [8, 3],
  ]);
  expect(newBoard.shipPositions[4].type).toBe([
    [6, 4],
    [6, 5],
  ]);
});
