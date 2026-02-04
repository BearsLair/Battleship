import Player from "./player";

test("A human player named Patrick can be created", () => {
  const playerOne = new Player("Patrick", false);
  expect(playerOne.name).toBe("Patrick");
  expect(playerOne.isCPU).toBe(false);
});

test("The called CPU is controlled by the CPU, and is not human", () => {
  const playerTwo = new Player("CPU", true);
  expect(playerTwo.name).toBe("CPU");
  expect(playerTwo.isCPU).toBe(true);
});
