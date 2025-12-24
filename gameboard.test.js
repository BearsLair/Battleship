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
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  expect(newBoard.shipPositions).toHaveLength(5);
});

test("The ships are carrier, battleship, cruiser, submarine, and destoyer", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  expect(newBoard.shipPositions[0].type).toBe("Carrier");
  expect(newBoard.shipPositions[1].type).toBe("Battleship");
  expect(newBoard.shipPositions[2].type).toBe("Cruiser");
  expect(newBoard.shipPositions[3].type).toBe("Submarine");
  expect(newBoard.shipPositions[4].type).toBe("Destroyer");
});

test("Carrier at B1 in horizontal position", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  expect(newBoard.shipPositions[0].ocuppiedCoordinates).toStrictEqual([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ]);
});

test("Battleship at B5 in vertical position", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  expect(newBoard.shipPositions[1].ocuppiedCoordinates).toStrictEqual([
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ]);
});

test("arrayPresent returns correctly", () => {
  const newBoard = createBoard("Player1", "Ship");
  expect(
    newBoard.arrayPresent(
      [
        [2, 3],
        [3, 3],
        [5, 6],
      ],
      [3, 3]
    )
  ).toBe(true);
  expect(
    newBoard.arrayPresent(
      [
        [2, 3],
        [3, 3],
        [5, 6],
      ],
      [1, 4]
    )
  ).toBe(false);
});

test("Ship positions array on the board is not empty", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  expect(newBoard.shipPositions.length).not.toBe(0);
});

test("Received an attack that missed a ship", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  newBoard.receiveAttack([0, 0]);
  expect(newBoard.missedAttacks[0]).toStrictEqual([0, 0]);
});

test("Carrier received an attack that reduced hitpoints to 4", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  newBoard.receiveAttack([3, 0]);
  expect(newBoard.shipPositions[0]).toMatchObject({ hitPoints: 4 });
});

test("Carrier received an attack on coordinate [3,0]", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  newBoard.receiveAttack([3, 0]);
  expect(newBoard.shipPositions[0].hitCoordinates[0]).toStrictEqual([3, 0]);
});

test("All ships sunk returns 'All Ships Sunk!'", () => {
  const newBoard = createBoard("Player1", "Ship");
  newBoard.addShips([
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);

  for (let i = 0; i < newBoard.shipPositions.length; i++) {
    newBoard.shipPositions[i].isSunk = true;
  }

  expect(newBoard.allshipsSunk()).toBe("All Ships Sunk!");
});
