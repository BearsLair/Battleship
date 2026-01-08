import { gameStartDisplay, gameBoardDisplay } from "./display.js";
import createBoard from "./gameboard.js";
import createFleet from "./ships.js";

let playerOne;
let playerTwo;

// For testing
playerOne = "Patrick";
playerTwo = "CPU";
//////////////

const gameStart = () => {
  gameStartDisplay();

  submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", () => {
    playerOne = document.querySelector("#playerOneInput").value;
    playerTwo = document.querySelector("#playerTwoInput").value;

    console.log("Players: ", playerOne, " , ", playerTwo);

    gameLogic();
  });
};

// const placeShips = () => {}

const gameLogic = () => {
  document.body.replaceChildren();

  console.log("Should display player grids");

  // For testing //
  const playerOneFleet = createFleet();
  const playerOneBoard = createBoard(playerOne);
  playerOneBoard.addShips(playerOneFleet, [
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  //////////////////
  gameBoardDisplay(playerOneBoard);

  const playerTwoFleet = createFleet();
  const playerTwoBoard = createBoard(playerTwo);
  playerTwoBoard.addShips(playerTwoFleet, [
    ["Carrier", "B9", "horizontal"],
    ["Battleship", "B4", "vertical"],
    ["Cruiser", "F2", "horizontal"],
    ["Submarine", "H6", "vertical"],
    ["Destroyer", "H10", "horizontal"],
  ]);
  //////////////////
  gameBoardDisplay(playerTwoBoard);
};

// gameStart();

gameLogic();
