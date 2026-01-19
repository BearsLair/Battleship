import createBoard from "./gameboard.js";
import createFleet from "./ships.js";
import Player from "./player.js";
import {
  toAlphaNumeric,
  shipAbbreviation,
  shipAlphaNumToCoor,
  shipCoorToAlphaNum,
} from "./utilities.js";

let playerOne = {};
let playerTwo = {};
let pOneShipPosCopy;
let pTwoShipPosCopy;

const gameStart = () => {
  console.log("gameStart()");
  gameStartDisplay();

  submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", () => {
    // const playerOneName = document.querySelector("#playerOneInput").value;
    // const playerTwoName = document.querySelector("#playerTwoInput").value;

    // Testing //
    const playerOneName = "Patrick";
    const playerTwoName = "CPU";
    /////////////

    playerOne = new Player(playerOneName, "human");
    playerOne.gameBoard = createBoard(playerOneName);
    playerOne.gameBoard.shipPositions = createFleet();
    console.log(playerOne.gameBoard.shipPositions);
    playerOne.gameBoard.addShips([
      ["Carrier", "B1", "horizontal"],
      ["Battleship", "B5", "vertical"],
      ["Cruiser", "D7", "horizontal"],
      ["Submarine", "I2", "vertical"],
      ["Destroyer", "G5", "horizontal"],
    ]);
    playerTwo = new Player(playerTwoName, "human");
    playerTwo.gameBoard = createBoard(playerTwoName);
    playerTwo.gameBoard.shipPositions = createFleet();
    playerTwo.gameBoard.addShips([
      ["Carrier", "A1", "horizontal"],
      ["Battleship", "A3", "vertical"],
      ["Cruiser", "H7", "horizontal"],
      ["Submarine", "C2", "vertical"],
      ["Destroyer", "G10", "horizontal"],
    ]);

    pOneShipPosCopy = shipCoorToAlphaNum([
      ...playerOne.gameBoard.shipPositions,
    ]);
    console.log("pOneShipPosCopy: ", pOneShipPosCopy);

    pTwoShipPosCopy = shipCoorToAlphaNum([
      ...playerTwo.gameBoard.shipPositions,
    ]);

    gameBoardDisplay();

    displayGrid(
      playerOne.name + "-" + "ship",
      "ship",
      pOneShipPosCopy,
      shipAbbreviation
    );

    displayGrid(playerOne.name + "-" + "strategy", "strategy");

    displayGrid(
      playerTwo.name + "-" + "ship",
      "ship",
      pTwoShipPosCopy,
      shipAbbreviation
    );

    displayGrid(playerTwo.name + "-" + "strategy", "strategy");

    // gameLogic(playerOne, "ship");
    // gameLogic(playerOne, "strategy")
    // gameLogic(playerTwo, "ship");
    // gameLogic(playerTwo, "strategy")
  });
};

// const placeShips = () => {}

const gameStartDisplay = () => {
  console.log("gameStartDisplay");
  const body = document.body;
  Object.assign(body.style, {
    display: "border-box",
    margin: 0,
    padding: 0,
  });

  const title = document.createElement("h1");
  title.textContent = "Welcome to Battleship!";
  body.appendChild(title);

  const hr = document.createElement("hr");
  body.appendChild(hr);

  const mainDiv = document.createElement("div");
  body.appendChild(mainDiv);

  const playerOneDiv = document.createElement("div");
  mainDiv.appendChild(playerOneDiv);
  const playerOneTitle = document.createElement("p");
  playerOneDiv.appendChild(playerOneTitle);
  playerOneTitle.textContent = "Player 1 Name: ";
  const playerOneInput = document.createElement("input");
  playerOneInput.setAttribute("id", "playerOneInput");
  playerOneDiv.appendChild(playerOneInput);

  const playerTwoDiv = document.createElement("div");
  mainDiv.appendChild(playerTwoDiv);
  const playerTwoTitle = document.createElement("p");
  playerTwoDiv.appendChild(playerTwoTitle);
  playerTwoTitle.textContent = "Player 2 Name: ";
  const playerTwoInput = document.createElement("input");
  playerTwoInput.setAttribute("id", "playerTwoInput");
  playerTwoDiv.appendChild(playerTwoInput);

  const submitBtnDiv = document.createElement("div");
  mainDiv.appendChild(submitBtnDiv);
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.textContent = "Start!";
  submitBtnDiv.appendChild(submitBtn);
};

const gameBoardDisplay = () => {
  console.log("gameBoardDisplay()");
  const body = document.body;
  body.replaceChildren();

  const gameBoardDiv = document.createElement("div");
  gameBoardDiv.classList.add("gameBoardDiv");
  body.appendChild(gameBoardDiv);
  Object.assign(gameBoardDiv.style, {
    margin: 0,
    padding: 0,
    height: "200vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  });
};

const displayGrid = (gridID, type, shipPositions, abbrCallback) => {
  const gridDiv = document.createElement("div");
  const gameBoardDiv = document.querySelector(".gameBoardDiv");
  gameBoardDiv.appendChild(gridDiv);

  Object.assign(gridDiv.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  });

  const title = document.createElement("h3");
  title.textContent = gridID;
  const grid = document.createElement("div");
  gridDiv.appendChild(title);
  gridDiv.appendChild(grid);
  grid.classList.add(gridID);

  Object.assign(grid.style, {
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10, 50px)",
  });

  const alphaColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numericRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      const cell = document.createElement("div");
      grid.appendChild(cell);
      Object.assign(cell.style, {
        margin: 0,
        padding: 0,
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });

      let shipPresent = false;
      let shipPos;

      cell.id = alphaColumns[k] + numericRows[i];

      if (type === "ship") {
        for (let j = 0; j < shipPositions.length; j++) {
          // console.log(shipPositions[j].ocuppiedCoordinates);
          if (shipPositions[j].ocuppiedCoordinates.includes(cell.id)) {
            shipPos = abbrCallback(shipPositions[j].type);
            shipPresent = true;
          }
        }

        // if statement here
        if (type === "ship" && shipPresent) {
          cell.textContent = shipPos;
        } else if (type === "ship" && ~shipPresent) {
          cell.textContent = cell.id;
          // TODO: Logic for hits/misses
        }
      } else if (type === "strategy") {
        cell.textContent = cell.id;
        // TODO: Logic for hits/misses
      }
    }
  }
};

// Game flow logic governed by clickable squares on player's
// strategy (hits/misses on opponent) board, which manipulate
// the global playerOne and playerTwo objects.

// const gameLogic = (player, type) => {
//   // Logic needed for determining grid type

//   // For the ship board, show where ships are
//   // and display hit/misses.
//   // Re-render
//   if (type === "ship") {
//     // player.gameBoard.shipPositions[i].ocuppiedCoordinates

//     let cell;

//     for (let i = 0; i < shipPosCopy.length; i++) {
//       for (let k = 0; k < shipPosCopy[i].ocuppiedCoordinates.length; k++) {
//         cell = document.querySelector(
//           `.${gridId} > #${shipPosCopy[i].ocuppiedCoordinates[k]}`
//         );
//         cell.value = shipPosCopy[i].ocuppiedCoordinates[k];
//       }
//     }
//   }

//   // For strategy board, need clickable squares that
//   // display a hit/miss (they become disabled after clickd on)
//   // Re-render
//   if (type === "strategy") {
//   }
// };

gameStart();
