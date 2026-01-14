const gameStartDisplay = () => {
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

  submitBtn.addEventListener("click", () => {
    let playerOne = playerOneInput.value;
    let playerTwo = playerTwoInput.value;
  });
};

const gameBoardDisplay = () => {
  const body = document.body;
  body.replaceChildren();

  const gameBoardDiv = document.createElement("div");
  body.appendChild(gameBoardDiv);
  Object.assign(gameBoardDiv.style, {
    margin: 0,
    padding: 0,
    height: "150vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  });
};

const displayCell = () => {};

const displayGrid = () => {};

export default gameStartDisplay;
