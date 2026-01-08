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

const gameBoardDisplay = (playerBoard, name) => {
  console.log("gameBoardDisplay accessed...");

  const body = document.body;
  const playerBoardsDiv = document.createElement("div");
  body.appendChild(playerBoardsDiv);
  playerBoardsDiv.classList.add("playerboards");
  Object.assign(playerBoardsDiv.style, {
    margin: 0,
    padding: 0,
    height: "200vh",
    width: "100%",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  });

  singleGameGrid(playerBoard, "ship", name);
  singleGameGrid(playerBoard, "strategy", name);
};

const singleGameGrid = (playerBoard, type) => {
  let title;

  if (type === "ship") {
    title = `${playerBoard.name}'s Ships`;
  } else if (type === "strategy") {
    title = `${playerBoard.name}'s Hits and Misses`;
  }

  console.log("attempting to create 10x10 grid...");

  const board = document.createElement("div");

  const playerBoards = document.querySelector(".playerboards");

  playerBoards.appendChild(board);
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
  // Obtain ids of cells occupied by each ship to display on grid

  let shipCells = [];

  const charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  for (let i = 0; i < playerBoard.shipPositions.length; i++) {
    let current = playerBoard.shipPositions[i].ocuppiedCoordinates;

    for (let k = 0; k < current.length; k++) {
      let x = current[k][0];
      let char = charArray[x];
      let y = current[k][1];
      let num = numArray[y];

      let id = char + num;

      current[k] = id;
      shipCells.push(id);
    }
  }

  console.log(shipCells);

  console.log(playerBoard.shipPositions[1]);

  // Create individual cells to be displayed, all 100
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");

    cell.id = `${playerBoard.board[i].id}`;

    if (type === "ship") {
      if (shipCells.includes(playerBoard.board[i].id)) {
        for (let k = 0; k < playerBoard.shipPositions.length; k++) {
          let shipType = playerBoard.shipPositions[k].type;

          if (
            playerBoard.shipPositions[k].ocuppiedCoordinates.includes(
              playerBoard.board[i].id
            )
          ) {
            switch (shipType) {
              case "Carrier":
                cell.textContent = "Car";
                break;
              case "Battleship":
                cell.textContent = "Bat";
                break;
              case "Cruiser":
                cell.textContent = "Cru";
                break;
              case "Submarine":
                cell.textContent = "Sub";
                break;
              case "Destroyer":
                cell.textContent = "Des";
                break;
            }
          }
        }
      } else {
        cell.textContent = `${playerBoard.board[i].id}`;
      }
    }

    if (type === "strategy") {
      cell.textContent = `${playerBoard.board[i].id}`;
    }

    Object.assign(cell.style, {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      border: "1px solid black",
      backgroundColor: "#4db8ff",
    });

    gridContainerDiv.appendChild(cell);

    if (type === "strategy") {
      cell.addEventListener("click", () => {
        console.log(`Miss on cell ${cell.id}`);
      });
    }
  }
};

export { gameStartDisplay, gameBoardDisplay };
