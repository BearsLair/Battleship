import {
  toAlphaNumeric,
  shipAbbreviation,
  shipAlphaNumToCoor,
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

test("Alpha-Numeric coordinates transfomred into arrays with [x,y] coordinates", () => {
  expect(shipAlphaNumToCoor("A3")).toStrictEqual([0, 2]);
  expect(shipAlphaNumToCoor("J10")).toStrictEqual([9, 9]);
});
