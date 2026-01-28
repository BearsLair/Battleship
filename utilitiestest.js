import {
  toAlphaNumeric,
  shipAbbreviation,
  shipAlphaNumToCoor,
  shipCoorToAlphaNum,
} from "./utilities";

test("Array coordinates turned into alpha-numeric values", () => {
  expect(
    toAlphaNumeric([
      [1, 3],
      [2, 5],
      [3, 7],
    ])
  ).toStrictEqual(["B4", "C6", "D8"]);
});

test("Ship type Carrier should return the abbreviation Ca", () => {
  expect(shipAbbreviation("Carrier")).toBe("Ca");
});

test("Ship type Submarine should return the abbreviation Su", () => {
  expect(shipAbbreviation("Submarine")).toBe("Su");
});

test("Alpha-Numeric coordinates transformed into arrays with [x,y] coordinates", () => {
  expect(shipAlphaNumToCoor("A3")).toStrictEqual([0, 2]);
  expect(shipAlphaNumToCoor("J10")).toStrictEqual([9, 9]);
});

test("Ship x,y coordinates are converted into array of alpha-numeric coordinates", () => {
  expect(
    shipCoorToAlphaNum([
      {
        ocuppiedCoordinates: [
          [1, 0],
          [3, 5],
        ],
      },
      {
        ocuppiedCoordinates: [
          [2, 1],
          [5, 3],
        ],
      },
    ])
  ).toStrictEqual([
    {
      ocuppiedCoordinates: ["B1", "D6"],
    },
    {
      ocuppiedCoordinates: ["C2", "F4"],
    },
  ]);
});
