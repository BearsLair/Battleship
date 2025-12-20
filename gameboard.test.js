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
