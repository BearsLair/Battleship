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

const shipAbbreviation = (shipType) => {
  let abbr;

  switch (shipType) {
    case "Carrier":
      abbr = "Ca";
      break;
    case "Battleship":
      abbr = "Ba";
      break;
    case "Cruiser":
      abbr = "Cr";
      break;
    case "Submarine":
      abbr = "Su";
      break;
    case "Destroyer":
      abbr = "De";
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

// const shipCoorToAlphaNum = () => {} ???

export { toAlphaNumeric, shipAbbreviation, shipAlphaNumToCoor };
