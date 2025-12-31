const gameStartDisplay = () => {
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
  console.log("gameBoardDisplay accessed...");

  singleGameGrid("ship");
};

const singleGameGrid = (type) => {
  let title;

  if (type === "ship") {
    title = "Your Ships";
  } else if (type === "strategy") {
    title = "Your Hits and Misses";
  }

  console.log("attempting to create 10x10 grid...");

  const body = document.body;

  const board = document.createElement("div");
  body.appendChild(board);
  Object.assign(board.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  const boardTitle = document.createElement("h2");
  board.appendChild(boardTitle);
  boardTitle.textContent = title;
  boardTitle.style.textAlign = "center";
  const gridContainerDiv = document.createElement("div");
  board.appendChild(gridContainerDiv);

  Object.assign(gridContainerDiv.style, {
    display: "grid",
    height: "500px",
    width: "500px",
    gridTemplateColumns: "repeat(10, 50px)",
    gridTemplateRows: "repeat(10 50px)",
  });

  for (let i = 1; i < 101; i++) {
    let cell = document.createElement("div");

    cell.id = `${i}`;

    cell.textContent = `${i}`;

    Object.assign(cell.style, {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      border: "1px solid black",
    });

    gridContainerDiv.appendChild(cell);
  }
};

export { gameStartDisplay, gameBoardDisplay };
