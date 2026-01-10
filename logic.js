import gameStartDisplay from "./display.js";
import createBoard from "./gameboard.js";
import createFleet from "./ships.js";

let playerOne;
let playerTwo;
let playerOneBoard;
let playerTwoBoard;
let gameWin = false;

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

    gameLogic();
  });
};

// const placeShips = () => {}

const gameBoardDisplay = (playerBoard, opponentBoard) => {
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

  singleGameGrid(playerBoard, "ship", opponentBoard);
  singleGameGrid(playerBoard, "strategy", opponentBoard);
};

const singleGameGrid = (playerBoard, type, opponentBoard) => {
  let title;

  if (type === "ship") {
    title = `${playerBoard.name}'s Ships`;
  } else if (type === "strategy") {
    title = `${playerBoard.name}'s Hits and Misses`;
  }

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

    let buttonDisabled = false;

    let hitOnCell = false;

    for (let i = 0; i < opponentBoard.shipPositions.length; i++) {
      if (opponentBoard.shipPositions[i].hitCoordinates.includes(cell.id)) {
        hitOnCell = true;
      }
    }

    if (type === "strategy" && hitOnCell === true) {
      cell.textContent = "💥";
      buttonDisabled = false;
    } else if (
      type === "strategy" &&
      opponentBoard.missedAttacks.includes(cell.id)
    ) {
      cell.textContent = "🌊";
      buttonDisabled = false;
    } else {
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
      cursor: "pointer",
    });

    gridContainerDiv.appendChild(cell);

    if (type === "strategy" && buttonDisabled === false) {
      cell.addEventListener("click", () => {
        let hitOnCell = false;

        for (let i = 0; i < opponentBoard.shipPositions.length; i++) {
          if (
            opponentBoard.shipPositions[i].ocuppiedCoordinates.includes(cell.id)
          ) {
            hitOnCell = true;
          }
        }

        if (hitOnCell === true) {
          opponentBoard.shipPositions[i].hit(cell.id);
          playerBoard.hitsOnOpponents.push(cell.id);
        } else {
          opponentBoard.opponentMisses.push(cell.id);
          playerBoard.missedAttacks.push(cell.id);
        }

        if (playerBoard.name === playerOne) {
          playerOneBoard = playerBoard;
          playerTwoBoard = opponentBoard;
        } else if (playerBoard.name === playerTwo) {
          playerTwoBoard = playerBoard;
          playerOneBoard = opponentBoard;
        }

        reRender();
      });
    }
  }
};

const gameLogic = () => {
  document.body.replaceChildren();

  // For testing //
  const playerOneFleet = createFleet();
  playerOneBoard = createBoard(playerOne);
  playerOneBoard.addShips(playerOneFleet, [
    ["Carrier", "B1", "horizontal"],
    ["Battleship", "B5", "vertical"],
    ["Cruiser", "D7", "horizontal"],
    ["Submarine", "I2", "vertical"],
    ["Destroyer", "G5", "horizontal"],
  ]);
  //////////////////

  const playerTwoFleet = createFleet();
  playerTwoBoard = createBoard(playerTwo);
  playerTwoBoard.addShips(playerTwoFleet, [
    ["Carrier", "B9", "horizontal"],
    ["Battleship", "B4", "vertical"],
    ["Cruiser", "F2", "horizontal"],
    ["Submarine", "H6", "vertical"],
    ["Destroyer", "H10", "horizontal"],
  ]);
  //////////////////
  gameBoardDisplay(playerOneBoard, playerTwoBoard);
  gameBoardDisplay(playerTwoBoard, playerOneBoard);
};

// gameStart();

const reRender = () => {
  const body = document.body;
  body.replaceChildren();

  gameBoardDisplay(playerOneBoard, playerTwoBoard);
  gameBoardDisplay(playerTwoBoard, playerOneBoard);
};

gameLogic();
