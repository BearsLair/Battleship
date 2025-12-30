import gameStartDisplay from "./display.js";

let playerOne;
let playerTwo;

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

const gameLogic = () => {
  document.body.replaceChildren();
};

gameStart();
