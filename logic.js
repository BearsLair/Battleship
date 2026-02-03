import createBoard from "./gameboard.js";
import createFleet from "./ships.js";
import Player from "./player.js";

// For Testing //
const playerOne = new Player("Patrick", false);
const newFleet = createFleet();
const playerOneBoard = createBoard(playerOne, newFleet);

playerOneBoard.addShips([
  { type: "Ca", start: "B1", orientation: "hor" },
  { type: "Ba", start: "B4", orientation: "ver" },
  { type: "Cr", start: "D9", orientation: "hor" },
  { type: "Su", start: "F3", orientation: "ver" },
  { type: "De", start: "J6", orientation: "ver" },
]);
/////////////////

// GameFlow governed by click events on the squares on both players' strategy boards
// No click events needed on the ships boards
const displayGameBoard = (playerBoard) => {
  const body = document.body;
  body.replaceChildren();

  Object.assign(body.style, {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  });

  const gameBoard = document.createElement("div");
  Object.assign(gameBoard.style, {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "200vh",
  });

  gameBoard.classList.add("gameBoard");

  body.appendChild(gameBoard);

  displayGrid(playerOneBoard, "ships");
  // displayGrid(playerOneBoard, "strategy");
};

const displayGrid = (playerBoard, gridType) => {
  const gridDiv = document.createElement("div");
  const gameBoard = document.querySelector(".gameBoard");
  gameBoard.appendChild(gridDiv);

  Object.assign(gridDiv.style, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  });

  gridDiv.classList.add("gridDiv");

  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10, 50px)",
  });
  gridDiv.appendChild(grid);
  grid.classList.add(playerBoard.player.name + "-" + gridType);

  const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  if (gridType === "ships") {
    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < 10; k++) {
        const cell = document.createElement("div");
        grid.appendChild(cell);
        Object.assign(cell.style, {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          padding: 0,
          border: "1px solid black",
          backgroundColor: "#2342db",
          height: "50px",
          width: "50px",
        });
        cell.id = alphaCol[k] + numRow[i];
        cell.textContent = cell.id;
      }
    }
  }
};

displayGameBoard(playerOneBoard);
