import createFleet from "./ships";

test("Each ship object has a type", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.type === "string")).toBe(true);
});
test("Each ship object has a length", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.length === "number")).toBe(true);
});
test("Each ship object has hitPoints", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.hitPoints === "number")).toBe(true);
});
test("Each ship object has a isSunk property", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.isSunk === "boolean")).toBe(true);
});
test("Each ship object has a hit method", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.hit === "function")).toBe(true);
});
test("Each ship object has a sunk method", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.isSunkFunc === "function")).toBe(
    true
  );
});

test("Each ship's ocuppiedCoordinates array should be empty", () => {
  const data = createFleet();
  expect(data[0].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[1].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[2].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[3].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[4].ocuppiedCoordinates).toStrictEqual([]);
});

test("Each ship's hitCoordinates array should be empty", () => {
  const data = createFleet();
  expect(data[0].hitCoordinates).toStrictEqual([]);
  expect(data[1].hitCoordinates).toStrictEqual([]);
  expect(data[2].hitCoordinates).toStrictEqual([]);
  expect(data[3].hitCoordinates).toStrictEqual([]);
  expect(data[4].hitCoordinates).toStrictEqual([]);
});
