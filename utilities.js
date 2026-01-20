const toAlphaNumeric = (array) => {
  const alphaColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numericRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  let alphaNumericArray = [];
  let x;
  let y;

  for (let i = 0; i < array.length; i++) {
    x = alphaColumns[array[i][0]];
    y = numericRows[array[i][1]];
    alphaNumericArray.push(x + y);
  }

  return alphaNumericArray;
};

const shipCoorToAlphaNum = (shipPositions) => {
  let pos = shipPositions;
  let coor;

  for (let i = 0; i < pos.length; i++) {
    const alphaColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const numericRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    let x;
    let y;

    for (let k = 0; k < pos[i].ocuppiedCoordinates.length; k++) {
      // shipPositions[i].ocuppiedCoordinates[k]
      coor =
        alphaColumns[pos[i].ocuppiedCoordinates[k][0]] +
        numericRows[pos[i].ocuppiedCoordinates[k][1]];
      pos[i].ocuppiedCoordinates[k] = coor;
    }
  }

  return pos;
};

const shipAbbreviation = (shipType) => {
  let abbr;

  switch (shipType) {
    case "Carrier":
      abbr = "Car";
      break;
    case "Battleship":
      abbr = "Bat";
      break;
    case "Cruiser":
      abbr = "Cru";
      break;
    case "Submarine":
      abbr = "Sub";
      break;
    case "Destroyer":
      abbr = "Des";
      break;
  }

  return abbr;
};

const shipAlphaNumToCoor = (alphaNum) => {
  const alphaColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numericRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const alpha = alphaNum[0];
  const num = alphaNum.slice(1);

  const x = alphaColumns.indexOf(alpha);
  const y = numericRows.indexOf(num);

  return [x, y];
};

export {
  toAlphaNumeric,
  shipAbbreviation,
  shipAlphaNumToCoor,
  shipCoorToAlphaNum,
};
