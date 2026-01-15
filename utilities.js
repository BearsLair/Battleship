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

export default toAlphaNumeric;
