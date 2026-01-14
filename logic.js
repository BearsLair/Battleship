import { gameStartDisplay, gameBoardDisplay, displayGrid } from "./display.js";
import createBoard from "./gameboard.js";
import createFleet from "./ships.js";
import Player from "./player.js";

let playerOne = {};
let playerTwo = {};

const gameStart = () => {
  gameStartDisplay();

  submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", () => {
    const playerOneName = document.querySelector("#playerOneInput").value;
    const playerTwoName = document.querySelector("#playerTwoInput").value;

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

    gameLogic(playerOne, playerTwo);
  });
};

// const placeShips = () => {}

const gameLogic = (playerOne, playerTwo) => {
  gameBoardDisplay();
  displayGrid(playerOne.name + "-" + "ship");
  displayGrid(playerOne.name + "-" + "strategy");
  displayGrid(playerTwo.name + "-" + "ship");
  displayGrid(playerTwo.name + "-" + "strategy");
};

gameStart();
