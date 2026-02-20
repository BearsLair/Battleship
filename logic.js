import createBoard from "./gameboard.js";
import createFleet from "./ships.js";
import Player from "./player.js";

// CPU ship placement: generates valid, non-overlapping placements for all CPU ships
function CPUShipPlacement() {
  const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const shipTypes = [
    { type: "Ca", length: 5 },
    { type: "Ba", length: 4 },
    { type: "Cr", length: 3 },
    { type: "Su", length: 3 },
    { type: "De", length: 2 },
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function generatePlacements() {
    const placements = [];
    const occupied = new Set();

    for (let i = 0; i < shipTypes.length; i++) {
      const { type, length } = shipTypes[i];
      let placed = false;
      let tries = 0;
      while (!placed && tries < 100) {
        tries++;
        const orientation = Math.random() < 0.5 ? "hor" : "ver";
        let x, y;
        if (orientation === "hor") {
          x = getRandomInt(11 - length); // ensure ship fits horizontally
          y = getRandomInt(10);
        } else {
          x = getRandomInt(10);
          y = getRandomInt(11 - length); // ensure ship fits vertically
        }
        const start = alphaCol[x] + numRow[y];
        // Build all cells this ship would occupy
        let cells = [];
        for (let k = 0; k < length; k++) {
          let cellId;
          if (orientation === "hor") {
            cellId = alphaCol[x + k] + numRow[y];
          } else {
            cellId = alphaCol[x] + numRow[y + k];
          }
          cells.push(cellId);
        }
        // Check for overlap
        if (cells.some((cell) => occupied.has(cell))) {
          continue;
        }
        // Mark cells as occupied
        cells.forEach((cell) => occupied.add(cell));
        placements.push({ start, orientation, type });
        placed = true;
      }
      if (!placed) {
        // If failed to place after 100 tries, abort and signal to retry all
        return null;
      }
    }

    console.log("CPU Placements: ", placements);
    return placements;
  }

  // Keep generating until a valid, non-overlapping set is found
  let placements = null;
  while (!placements) {
    placements = generatePlacements();
  }
  return placements;
}

// Player One will be the user, Player Two will be the CPU opponent
let playerOneFleet;
let playerOne;
let playerOneBoard;

let playerTwoFleet;
let playerTwo;
let playerTwoBoard;

let cellSelection;

const shipPlacement = (playerShipsBoard) => {
  const body = document.body;

  const gridAndShipsDiv = document.createElement("div");
  body.appendChild(gridAndShipsDiv);
  Object.assign(gridAndShipsDiv.style, {
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr 1fr 1fr",
    height: "100vh",
    width: "100%",
  });
  gridAndShipsDiv.classList.add("gridAndShipsDiv");

  const titleAndNameDiv = document.createElement("div");
  gridAndShipsDiv.appendChild(titleAndNameDiv);
  Object.assign(titleAndNameDiv.style, {
    display: "flex",
    flexDirection: "column",
    gridArea: "1/1/2/4",
    justifyContent: "space-apart",
    alignItems: "center",
    width: "100%",
  });
  titleAndNameDiv.classList.add("titleAndNameDiv");

  const title = document.createElement("h2");
  titleAndNameDiv.appendChild(title);
  title.textContent = "Battleship!";
  title.classList.add("title");

  const nameDiv = document.createElement("div");
  titleAndNameDiv.appendChild(nameDiv);
  Object.assign(nameDiv.style, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "space-apart",
    width: "50%",
  });
  nameDiv.classList.add("nameDiv");

  const input = document.createElement("input");
  const nameLabel = document.createElement("p");
  nameLabel.textContent = "Your name:";
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(input);
  input.id = "nameInput";

  const shipGridDiv = document.createElement("div");
  gridAndShipsDiv.appendChild(shipGridDiv);
  shipGridDiv.classList.add("shipGridDiv");
  Object.assign(shipGridDiv.style, {
    display: "flex",
    gridArea: "2/1/3/3",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: "2rem",
  });

  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10, 50px)",
  });

  shipGridDiv.appendChild(grid);
  grid.classList.add("playerShipsGrid");

  const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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

      cell.addEventListener("click", () => {
        cellSelection = cell.id;
        console.log(cellSelection);
      });
    }
  }

  const shipsSelectionDiv = document.createElement("div");
  shipsSelectionDiv.classList.add("shipsSelectionDiv");
  gridAndShipsDiv.appendChild(shipsSelectionDiv);
  Object.assign(shipsSelectionDiv.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gridArea: "2/3/3/4",
    margin: 0,
    padding: "2rem",
  });

  // Carrier
  const carrierDiv = document.createElement("div");
  shipsSelectionDiv.appendChild(carrierDiv);
  carrierDiv.classList.add("carrierDiv");
  Object.assign(carrierDiv.style, {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "center",
    padding: "1rem",
  });

  const carrierLabel = document.createElement("h3");
  carrierDiv.appendChild(carrierLabel);
  carrierLabel.textContent = "Carrier";

  const carrierPosition = document.createElement("input");
  carrierDiv.appendChild(carrierPosition);
  carrierPosition.type = "text";
  carrierPosition.id = "Ca";
  Object.assign(carrierPosition.style, {
    width: "2rem",
  });

  const carrierHorLabel = document.createElement("p");
  carrierDiv.appendChild(carrierHorLabel);
  carrierHorLabel.textContent = "Horizontal";

  const carrierHorizontal = document.createElement("input");
  carrierDiv.appendChild(carrierHorizontal);
  carrierHorizontal.type = "radio";
  carrierHorizontal.name = "carrierOrientation";
  carrierHorizontal.value = "hor";

  const carrierVerLabel = document.createElement("p");
  carrierDiv.appendChild(carrierVerLabel);
  carrierVerLabel.textContent = "Vertical";

  const carrierVertical = document.createElement("input");
  carrierDiv.appendChild(carrierVertical);
  carrierVertical.type = "radio";
  carrierVertical.name = "carrierOrientation";
  carrierVertical.value = "ver";
  //

  // battleship
  const battleshipDiv = document.createElement("div");
  shipsSelectionDiv.appendChild(battleshipDiv);
  battleshipDiv.classList.add("battleshipDiv");
  Object.assign(battleshipDiv.style, {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "center",
    padding: "1rem",
  });

  const battleshipLabel = document.createElement("h3");
  battleshipDiv.appendChild(battleshipLabel);
  battleshipLabel.textContent = "Battleship";

  const battleshipPosition = document.createElement("input");
  battleshipDiv.appendChild(battleshipPosition);
  battleshipPosition.type = "text";
  battleshipPosition.id = "Ca";
  Object.assign(battleshipPosition.style, {
    width: "2rem",
  });

  const battleshipHorLabel = document.createElement("p");
  battleshipDiv.appendChild(battleshipHorLabel);
  battleshipHorLabel.textContent = "Horizontal";

  const battleshipHorizontal = document.createElement("input");
  battleshipDiv.appendChild(battleshipHorizontal);
  battleshipHorizontal.type = "radio";
  battleshipHorizontal.name = "battleshipOrientation";
  battleshipHorizontal.value = "hor";

  const battleshipVerLabel = document.createElement("p");
  battleshipDiv.appendChild(battleshipVerLabel);
  battleshipVerLabel.textContent = "Vertical";

  const battleshipVertical = document.createElement("input");
  battleshipDiv.appendChild(battleshipVertical);
  battleshipVertical.type = "radio";
  battleshipVertical.name = "battleshipOrientation";
  battleshipVertical.value = "ver";
  //

  // Cruiser
  const cruiserDiv = document.createElement("div");
  shipsSelectionDiv.appendChild(cruiserDiv);
  cruiserDiv.classList.add("cruiserrDiv");
  Object.assign(cruiserDiv.style, {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "center",
    padding: "1rem",
  });

  const cruiserLabel = document.createElement("h3");
  cruiserDiv.appendChild(cruiserLabel);
  cruiserLabel.textContent = "Cruiser";

  const cruiserPosition = document.createElement("input");
  cruiserDiv.appendChild(cruiserPosition);
  cruiserPosition.type = "text";
  cruiserPosition.id = "Ca";
  Object.assign(cruiserPosition.style, {
    width: "2rem",
  });

  const cruiserHorLabel = document.createElement("p");
  cruiserDiv.appendChild(cruiserHorLabel);
  cruiserHorLabel.textContent = "Horizontal";

  const cruiserHorizontal = document.createElement("input");
  cruiserDiv.appendChild(cruiserHorizontal);
  cruiserHorizontal.type = "radio";
  cruiserHorizontal.name = "cruiserOrientation";
  cruiserHorizontal.value = "hor";

  const cruiserVerLabel = document.createElement("p");
  cruiserDiv.appendChild(cruiserVerLabel);
  cruiserVerLabel.textContent = "Vertical";

  const cruiserVertical = document.createElement("input");
  cruiserDiv.appendChild(cruiserVertical);
  cruiserVertical.type = "radio";
  cruiserVertical.name = "cruiserOrientation";
  cruiserVertical.value = "ver";
  //

  // Submarine
  const subDiv = document.createElement("div");
  shipsSelectionDiv.appendChild(subDiv);
  subDiv.classList.add("subDiv");
  Object.assign(subDiv.style, {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "center",
    padding: "1rem",
  });

  const subLabel = document.createElement("h3");
  subDiv.appendChild(subLabel);
  subLabel.textContent = "Submarine";

  const subPosition = document.createElement("input");
  subDiv.appendChild(subPosition);
  subPosition.type = "text";
  subPosition.id = "Ca";
  Object.assign(subPosition.style, {
    width: "2rem",
  });

  const subHorLabel = document.createElement("p");
  subDiv.appendChild(subHorLabel);
  subHorLabel.textContent = "Horizontal";

  const subHorizontal = document.createElement("input");
  subDiv.appendChild(subHorizontal);
  subHorizontal.type = "radio";
  subHorizontal.name = "subOrientation";
  subHorizontal.value = "hor";

  const subVerLabel = document.createElement("p");
  subDiv.appendChild(subVerLabel);
  subVerLabel.textContent = "Vertical";

  const subVertical = document.createElement("input");
  subDiv.appendChild(subVertical);
  subVertical.type = "radio";
  subVertical.name = "subOrientation";
  subVertical.value = "ver";
  //

  // Destroyer
  const destroyerDiv = document.createElement("div");
  shipsSelectionDiv.appendChild(destroyerDiv);
  destroyerDiv.classList.add("destroyerDiv");
  Object.assign(destroyerDiv.style, {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "center",
    padding: "1rem",
  });

  const destroyerLabel = document.createElement("h3");
  destroyerDiv.appendChild(destroyerLabel);
  destroyerLabel.textContent = "Destroyer";

  const destroyerPosition = document.createElement("input");
  destroyerDiv.appendChild(destroyerPosition);
  destroyerPosition.type = "text";
  destroyerPosition.id = "Ca";
  Object.assign(destroyerPosition.style, {
    width: "2rem",
  });

  const destroyerHorLabel = document.createElement("p");
  destroyerDiv.appendChild(destroyerHorLabel);
  destroyerHorLabel.textContent = "Horizontal";

  const destroyerHorizontal = document.createElement("input");
  destroyerDiv.appendChild(destroyerHorizontal);
  destroyerHorizontal.type = "radio";
  destroyerHorizontal.name = "destroyerOrientation";
  destroyerHorizontal.value = "hor";

  const destroyerVerLabel = document.createElement("p");
  destroyerDiv.appendChild(destroyerVerLabel);
  destroyerVerLabel.textContent = "Vertical";

  const destroyerVertical = document.createElement("input");
  destroyerDiv.appendChild(destroyerVertical);
  destroyerVertical.type = "radio";
  destroyerVertical.name = "destroyerOrientation";
  destroyerVertical.value = "ver";
  //

  const submitButton = document.createElement("button");
  shipsSelectionDiv.appendChild(submitButton);
  submitButton.textContent = "Submit Ships";
  Object.assign(submitButton.style, {
    marginTop: "1rem",
    padding: "0.5rem",
    width: "50%",
    cursor: "pointer",
  });

  submitButton.addEventListener("click", () => {
    console.log("submit button clicked");
    // We will need to create a new player object (playerOne) for the player with the name inputted and assign them a fleet of ships (playerOneFleet) and a ship board (playerOneBoard)
    // Here we will need to gather the input data and use it to place the ships on the player's ship board
    let playerShips = [
      {
        type: "Ca",
        start: carrierPosition.value,
        orientation: carrierHorizontal.checked ? "hor" : "ver",
      },
      {
        type: "Ba",
        start: battleshipPosition.value,
        orientation: battleshipHorizontal.checked ? "hor" : "ver",
      },
      {
        type: "Cr",
        start: cruiserPosition.value,
        orientation: cruiserHorizontal.checked ? "hor" : "ver",
      },
      {
        type: "Su",
        start: subPosition.value,
        orientation: subHorizontal.checked ? "hor" : "ver",
      },
      {
        type: "De",
        start: destroyerPosition.value,
        orientation: destroyerHorizontal.checked ? "hor" : "ver",
      },
    ];

    // We will need to validate the input data to ensure that the ship placements are valid (e.g., not overlapping, within the bounds of the board, etc.)
    const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    for (let i = 0; i < playerShips.length; i++) {
      const ship = playerShips[i];
      const startCol = ship.start[0];
      const startRow = ship.start.slice(1);
      const shipLength =
        ship.type === "Ca"
          ? 5
          : ship.type === "Ba"
            ? 4
            : ship.type === "Cr"
              ? 3
              : ship.type === "Su"
                ? 3
                : 2;

      if (
        !alphaCol.includes(startCol) ||
        !numRow.includes(startRow) ||
        (ship.orientation === "hor" &&
          alphaCol.indexOf(startCol) + shipLength > alphaCol.length) ||
        (ship.orientation === "ver" &&
          numRow.indexOf(startRow) + shipLength > numRow.length)
      ) {
        alert(
          `Invalid placement for ${ship.type}. Please ensure the starting position is valid and the ship fits within the board.`,
        );
        return;
      }

      if (checkShipOverlap(playerShips)) {
        alert(
          `Invalid placement. Ships cannot overlap. Please adjust the positions.`,
        );
        return;
      }
    }
    // Display all ship placements and their orienation once to the player before they confirm their placements and proceed to the game phase
    let placementSummary = "Your ship placements:\n";
    playerShips.forEach((ship) => {
      placementSummary += `${ship.type} at ${ship.start} (${ship.orientation})\n`;
    });
    placementSummary += "Do you confirm these placements?";

    const confirmPlacement = confirm(placementSummary);

    if (!confirmPlacement) {
      return;
    } else {
      playerOneFleet = createFleet();
      playerOne = new Player(input.value, false);
      playerOneBoard = createBoard(playerOne, playerOneFleet);

      playerOneBoard.addShips(playerShips);

      // CPU opponent places ships randomly
      playerTwoFleet = createFleet();
      playerTwo = new Player("CPU", true);
      playerTwoBoard = createBoard(playerTwo, playerTwoFleet);

      playerTwoBoard.addShips(CPUShipPlacement());

      // Copy the opponent's ships board to player's strategy board
      // The ships on the strategy board won't be displayed
      playerOneBoard.strategyBoard = [...playerTwoBoard.shipsBoard];
      playerTwoBoard.strategyBoard = [...playerOneBoard.shipsBoard];
      /////////////////

      // After that, we can proceed to the game phase where the player can click on the strategy board to attack the opponent's ships
      displayGameBoard();
    }
  });
};

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

                if (playerTwoBoard.player.isCPU === true) {
                  setTimeout(() => {
                    cpuOpponentLogic();
                  }, 3000);
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

                if (playerTwoBoard.player.isCPU === true) {
                  setTimeout(() => {
                    cpuOpponentLogic();
                  }, 3000);
                }
              } else if (
                playerBoard.player.name === playerTwoBoard.player.name
              ) {
                playerTwoBoard.strategyBoard[currIndex].cellHitOrMiss = "miss";
                playerOneBoard.shipsBoard[currIndex].cellHitOrMiss = "miss";
              }
            }
            reRender();
          });
        } else if (
          playerBoard.strategyBoard[currIndex].cellHitOrMiss !== false
        ) {
          if (playerBoard.strategyBoard[currIndex].cellHitOrMiss === "hit") {
            cell.textContent = "💥";
          }
          if (playerBoard.strategyBoard[currIndex].cellHitOrMiss === "miss") {
            cell.textContent = "🌊";
          }
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

let cpuIndexLog = [];

const cpuOpponentLogic = () => {
  if (cpuIndexLog.length === 0) {
    for (let i = 0; i < 100; i++) {
      cpuIndexLog.push(i);
    }
  }

  const indexLogLength = cpuIndexLog.length;

  const cpuChoice = Math.floor(Math.random() * (indexLogLength - 1) + 1);
  const boardIndex = cpuIndexLog[cpuChoice];
  cpuIndexLog.splice(cpuChoice, 1);

  console.log("cpu chooses", playerTwoBoard.strategyBoard[boardIndex].id);

  if (playerTwoBoard.strategyBoard[boardIndex].shipPresent !== false) {
    playerTwoBoard.strategyBoard[boardIndex].cellHitOrMiss = "hit";
    playerOneBoard.shipsBoard[boardIndex].cellHitOrMiss = "hit";

    //////////////
    const playerOneShipHit = playerOneBoard.shipsBoard[boardIndex].shipPresent;

    for (let u = 0; u < 5; u++) {
      if (playerOneBoard.ships[u].type === playerOneShipHit) {
        playerOneBoard.ships[u].hit();
        console.log(
          `CPU hit Player One's ${playerOneShipHit}, it now has ${playerOneBoard.ships[u].length} hit points left!`,
        );
        if (playerOneBoard.ships[u].isSunk === true) {
          console.log(`CPU sunk Player One's ${playerOneShipHit}`);
        }

        if (allShipsSunkChecker(playerOneBoard)) {
          console.log(
            `All of ${playerOneBoard.player.name}'s ships are SUNK by CPU!`,
          );
        }

        break;
      }
    }

    /////////////
  } else if (playerTwoBoard.strategyBoard[boardIndex].shipPresent === false) {
    console.log("CPU missed!");
    playerTwoBoard.strategyBoard[boardIndex].cellHitOrMiss = "miss";
    playerOneBoard.shipsBoard[boardIndex].cellHitOrMiss = "miss";
  }

  reRender();
};

const checkShipOverlap = (playerShips) => {
  const alphaCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  let occupiedCells = [];

  for (let i = 0; i < playerShips.length; i++) {
    const ship = playerShips[i];
    const startCol = ship.start[0];
    const startRow = ship.start.slice(1);
    const shipLength =
      ship.type === "Ca"
        ? 5
        : ship.type === "Ba"
          ? 4
          : ship.type === "Cr"
            ? 3
            : ship.type === "Su"
              ? 3
              : 2;

    for (let j = 0; j < shipLength; j++) {
      let currentCell;
      if (ship.orientation === "hor") {
        currentCell = alphaCol[alphaCol.indexOf(startCol) + j] + startRow;
      } else {
        currentCell = startCol + numRow[numRow.indexOf(startRow) + j];
      }

      occupiedCells.push(currentCell);
    }
  }

  const uniqueCells = new Set(occupiedCells);

  return uniqueCells.size !== occupiedCells.length;
};

// displayGameBoard();
shipPlacement();
