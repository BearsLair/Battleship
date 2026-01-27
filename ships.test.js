import createFleet from "./ships";

test("Each ship object has a type", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.type === "string")).toBe(true);
});
test("Each ship object has a length", () => {
  const data = createFleet();
  expect(data.every((item) => typeof item.length === "number")).toBe(true);
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

test("Each ship should have an empty occupidedCoordinates array", () => {
  const data = createFleet();
  expect(data[0].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[1].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[2].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[3].ocuppiedCoordinates).toStrictEqual([]);
  expect(data[4].ocuppiedCoordinates).toStrictEqual([]);
});

test("The fleet has a carrier, battleship, cruiser, submarine, and destroyer", () => {
  const data = createFleet();
  expect(data[0].type).toBe("Ca");
  expect(data[1].type).toBe("Ba");
  expect(data[2].type).toBe("Cr");
  expect(data[3].type).toBe("Su");
  expect(data[4].type).toBe("De");
});

test("The carrier has a length of 5, battleship 4, cruiser 3, submarine 3, and the destroyer 2", () => {
  const data = createFleet();
  expect(data[0].length).toBe(5);
  expect(data[1].length).toBe(4);
  expect(data[2].length).toBe(3);
  expect(data[3].length).toBe(3);
  expect(data[4].length).toBe(2);
});

test("When the carrier is hit 3 times, it has 2 hitpoints left", () => {
  const data = createFleet();
  data[0].hit();
  data[0].hit();
  data[0].hit();
  expect(data[0].length).toBe(2);
});

test("When the battleship is hit 4 times, the isSunk flag is true", () => {
  const data = createFleet();
  data[1].hit();
  data[1].hit();
  data[1].hit();
  data[1].hit();
  expect();
});

test("The entire fleet can be sunk", () => {
  const data = createFleet();

  data[0].hit();
  data[0].hit();
  data[0].hit();
  data[0].hit();
  data[0].hit();

  data[1].hit();
  data[1].hit();
  data[1].hit();
  data[1].hit();

  data[2].hit();
  data[2].hit();
  data[2].hit();

  data[3].hit();
  data[3].hit();
  data[3].hit();

  data[4].hit();
  data[4].hit();

  let allShipAreSunk = true;

  for (let i = 0; i < 5; i++) {
    if (data[i].isSunk === false) {
      allShipAreSunk = false;
      break;
    }

    expect(allShipAreSunk).toBe(true);
  }
});
