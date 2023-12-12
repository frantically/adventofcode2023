utils = require('../utils.js')

data = utils.fileToArray("sample.txt")
        .map(line => line.split(""))

console.log(data)

console.log(`Part 1: ${""}`)

const characters = ["a", "b", "c", "d"];

function combinations(arr, min = 1, max) {
  const combination = (arr, depth) => {
    if (depth === 1) {
      return arr;
    } else {
      const result = combination(arr, depth - 1).flatMap((val) =>
        arr.map((char) => val + char)
      );
      return arr.concat(result);
    }
  };

  return combination(arr, max).filter((val) => val.length >= min);
}
const result = combinations(characters, 4, 4);

//console.log(`Combinations: ${result.length}`, result);

console.log(`Part 2: ${""}`)