import { gameStartDisplay, gameBoardDisplay } from "./display.js";
import createBoard from "./gameboard.js";
import createFleet from "./ships.js";

let playerOne;
let playerTwo;
let playerOneFleet;
let playerOneBoard;

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
  const playerOneBoard = createBoard();
  playerOneBoard.addShips(playerOneFleet, [
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  //////////////////
  gameBoardDisplay(playerOneBoard);
};

// gameStart();

gameLogic();
