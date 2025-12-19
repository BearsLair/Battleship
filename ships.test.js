import createFleet from "./ships";

test("Create ships", () => {
  expect(createFleet()).toEqual([
    { type: Carrier, length: 5, hitPoints: 5, isSunk: false },
    { type: Battleship, length: 4, hitPoints: 4, isSunk: false },
    { type: Cruiser, length: 3, hitPoints: 3, isSunk: false },
    { type: Submarine, length: 3, hitPoints: 3, isSunk: false },
    { type: Destroyer, length: 2, hitPoints: 2, isSunk: false },
  ]);
});
