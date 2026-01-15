import toAlphaNumeric from "./utilities";

test("Array coordinates turned into alpha-numeric values", () => {
  expect(
    toAlphaNumeric([
      [1, 3],
      [2, 5],
      [3, 7],
    ])
  ).toStrictEqual(["B4", "C6", "D8"]);
});
