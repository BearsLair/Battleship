const gameStart = () => {
  const body = document.querySelector("body");
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
  playerOneDiv.appendChild(playerOneInput);

  const playerTwoDiv = document.createElement("div");
  mainDiv.appendChild(playerTwoDiv);
  const playerTwoTitle = document.createElement("p");
  playerTwoDiv.appendChild(playerTwoTitle);
  playerTwoTitle.textContent = "Player 2 Name: ";
  const playerTwoInput = document.createElement("input");
  playerTwoDiv.appendChild(playerTwoInput);

  const submitBtnDiv = document.createElement("div");
  mainDiv.appendChild(submitBtnDiv);
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Start!";
  submitBtnDiv.appendChild(submitBtn);

  submitBtn.addEventListener("click", () => {
    const playerOne = playerOneInput.value;
    const playerTwo = playerTwoInput.value;
  });
};

export default gameStart;
