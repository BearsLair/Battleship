import createBoard from "./gameboard.js";
import createFleet from "./ships.js";
import Player from "./player.js";

// For Testing //
const playerOneFleet = createFleet();
const playerOne = new Player("Patrick", false);
const playerOneBoard = createBoard(playerOne, playerOneFleet);

playerOneBoard.addShips([
  { type: "Ca", start: "B1", orientation: "hor" },
  { type: "Ba", start: "B4", orientation: "ver" },
  { type: "Cr", start: "D9", orientation: "hor" },
  { type: "Su", start: "F3", orientation: "ver" },
  { type: "De", start: "J6", orientation: "ver" },
]);

const playerTwoFleet = createFleet();
const playerTwo = new Player("CPU", true);
const playerTwoBoard = createBoard(playerTwo, playerTwoFleet);

playerTwoBoard.addShips([
  { type: "Ca", start: "A1", orientation: "ver" },
  { type: "Ba", start: "A8", orientation: "hor" },
  { type: "Cr", start: "D4", orientation: "hor" },
  { type: "Su", start: "G6", orientation: "hor" },
  { type: "De", start: "J1", orientation: "ver" },
]);

// Copy the opponent's ships board to player's strategy board
// The ships on the strategy board won't be displayed
playerOneBoard.strategyBoard = [...playerTwoBoard.shipsBoard];
playerTwoBoard.strategyBoard = [...playerOneBoard.shipsBoard];
/////////////////

// GameFlow governed by click events on the squares on both players' strategy boards
// No click events needed on the ships boards
const displayGameBoard = () => {
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
  displayGrid(playerOneBoard, "strategy");
  displayGrid(playerTwoBoard, "ships");
  displayGrid(playerTwoBoard, "strategy");
};

const allShipsSunkChecker = (shipsBoardToEval) => {
  let counter = 0;

  for (let z = 0; z < 5; z++) {
    if (shipsBoardToEval.ships[z].isSunk === true) {
      counter++;
    }
  }

  if (counter === 5) {
    return true;
  } else {
    return false;
  }
};

const displayGrid = (playerBoard, gridType) => {
  const gridDiv = document.createElement("div");
  Object.assign(gridDiv.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  });
  const title = document.createElement("h3");
  gridDiv.appendChild(title);
  title.textContent = `${playerBoard.player.name}'s ${gridType} board`;
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

  let index = 0;

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
          backgroundColor: "#4c78d7ff",
          height: "50px",
          width: "50px",
        });
        cell.id = alphaCol[k] + numRow[i];

        if (
          playerBoard.shipsBoard[index].shipPresent !== false &&
          playerBoard.shipsBoard[index].cellHitOrMiss === false
        ) {
          cell.textContent = playerBoard.shipsBoard[index].shipPresent;
        } else if (
          playerBoard.shipsBoard[index].shipPresent !== false &&
          playerBoard.shipsBoard[index].cellHitOrMiss === "hit"
        ) {
          cell.textContent = "💥";
        } else if (
          playerBoard.shipsBoard[index].shipPresent === false &&
          playerBoard.shipsBoard[index].cellHitOrMiss === "miss"
        ) {
          cell.textContent = "🌊";
        } else if (
          playerBoard.shipsBoard[index].shipPresent === false &&
          playerBoard.shipsBoard[index].cellHitOrMiss === false
        ) {
          cell.textContent = cell.id;
        }

        index++;
      }
    }
  }

  let currIndex = 0;

  if (gridType === "strategy") {
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
          backgroundColor: "#4c78d7ff",
          height: "50px",
          width: "50px",
          cursor: "pointer",
        });

        cell.id = alphaCol[k] + numRow[i];

        cell.textContent = cell.id;

        const currIndex = Number(`${i}${k}`);

        if (playerBoard.strategyBoard[currIndex].cellHitOrMiss === false) {
          cell.addEventListener("click", () => {
            if (playerBoard.strategyBoard[currIndex].shipPresent !== false) {
              if (playerBoard.player.name === playerOneBoard.player.name) {
                playerOneBoard.strategyBoard[currIndex].cellHitOrMiss = "hit";
                playerTwoBoard.shipsBoard[currIndex].cellHitOrMiss = "hit";
                //////////////
                const playerTwoShipHit =
                  playerTwoBoard.shipsBoard[currIndex].shipPresent;

                for (let t = 0; t < 5; t++) {
                  if (playerTwoBoard.ships[t].type === playerTwoShipHit) {
                    playerTwoBoard.ships[t].hit();

                    console.log(
                      `Player Two's ${playerTwoShipHit} has ${playerTwoBoard.ships[t].length} hit points left!`,
                    );
                    if (playerTwoBoard.ships[t].isSunk === true) {
                      console.log(`${playerTwoShipHit} sunk!`);
                    }

                    if (allShipsSunkChecker(playerTwoBoard)) {
                      console.log(
                        `All of ${playerTwoBoard.player.name}'s ships are SUNK!`,
                      );
                    }

                    break;
                  }
                }

                /////////////
              } else if (
                playerBoard.player.name === playerTwoBoard.player.name
              ) {
                playerTwoBoard.strategyBoard[currIndex].cellHitOrMiss = "hit";
                playerOneBoard.shipsBoard[currIndex].cellHitOrMiss = "hit";

                //////////////
                const playerOneShipHit =
                  playerOneBoard.shipsBoard[currIndex].shipPresent;

                for (let u = 0; u < 5; u++) {
                  if (playerOneBoard.ships[u].type === playerOneShipHit) {
                    playerOneBoard.ships[u].hit();
                    console.log(
                      `Player One's ${playerOneShipHit} has ${playerOneBoard.ships[u].length} hit points left!`,
                    );
                    if (playerOneBoard.ships[u].isSunk === true) {
                      console.log(`${playerOneShipHit} sunk!`);
                    }

                    if (allShipsSunkChecker(playerOneBoard)) {
                      console.log(
                        `All of ${playerOneBoard.player.name}'s ships are SUNK!`,
                      );
                    }

                    break;
                  }
                }

                /////////////
              }
            } else if (
              playerBoard.strategyBoard[currIndex].shipPresent === false
            ) {
              if (playerBoard.player.name === playerOneBoard.player.name) {
                playerOneBoard.strategyBoard[currIndex].cellHitOrMiss = "miss";

                playerTwoBoard.shipsBoard[currIndex].cellHitOrMiss = "miss";
              } else if (
                playerBoard.player.name === playerTwoBoard.player.name
              ) {
                playerTwoBoard.strategyBoard[currIndex].cellHitOrMiss = "miss";
                playerOneBoard.shipsBoard[currIndex].cellHitOrMiss = "miss";
              }
            }
            reRender();
          });
        }
      }
    }
  }
};

const reRender = () => {
  const gameBoard = document.querySelector(".gameBoard");
  gameBoard.replaceChildren();

  displayGrid(playerOneBoard, "ships");
  displayGrid(playerOneBoard, "strategy");
  displayGrid(playerTwoBoard, "ships");
  displayGrid(playerTwoBoard, "strategy");
};

displayGameBoard();
