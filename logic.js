import { gameStartDisplay, gameBoardDisplay, displayGrid } from "./display.js";
import createBoard from "./gameboard.js";
import createFleet from "./ships.js";
import Player from "./player.js";
import toAlphaNumeric from "./utilities.js";

let playerOne = {};
let playerTwo = {};

const gameStart = () => {
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

    console.log("playerOne: ", playerOne);
    console.log("playerTwo: ", playerTwo);

    gameBoardDisplay();
    displayGrid(playerOne.name + "-" + "ship");
    displayGrid(playerOne.name + "-" + "strategy");
    displayGrid(playerTwo.name + "-" + "ship");
    displayGrid(playerTwo.name + "-" + "strategy");

    gameLogic(playerOne, "ship");
    // gameLogic(playerOne, "strategy")
    // gameLogic(playerTwo, "ship");
    // gameLogic(playerTwo, "strategy")
  });
};

// const placeShips = () => {}

const gameLogic = (player, type) => {
  // Logic needed for determining grid type

  // For the ship board, show where ships are
  // and display hit/misses.
  // Re-render
  if (type === "ship") {
    // player.gameBoard.shipPositions[i].ocuppiedCoordinates

    let alphaNumbericArray = [];

    for (let i = 0; i < 5; i++) {
      alphaNumbericArray = [];
      alphaNumbericArray = toAlphaNumeric(
        player.gameBoard.shipPositions[i].ocuppiedCoordinates
      );
      player.gameBoard.shipPositions[i].ocuppiedCoordinates =
        alphaNumbericArray;
      console.log(
        player.gameBoard.shipPositions[i].type +
          " " +
          player.gameBoard.shipPositions[i].ocuppiedCoordinates
      );
    }

    const gridClass = player.name + "-" + type;
  }

  // For strategy board, need clickable squares that
  // display a hit/miss (they become disabled after clickd on)
  // Re-render
  if (type === "strategy") {
  }
};

gameStart();
