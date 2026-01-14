import gameStartDisplay from "./display.js";
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
    playerTwo = new Player(playerTwoName, "human");

    console.log("playerOne: ", playerOne);
    console.log("playerTwo: ", playerTwo);

    // gameLogic();
  });
};

// const placeShips = () => {}

gameStart();
