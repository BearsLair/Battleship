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

const displayGrid = (gridID) => {
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
  grid.classList.add("grid");
  grid.id = gridID;

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

      cell.id = alphaColumns[k] + numericRows[i];
      cell.textContent = cell.id;
    }
  }
};

export { gameStartDisplay, gameBoardDisplay, displayGrid };
