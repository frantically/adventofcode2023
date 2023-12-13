utils = require("../utils.js");

data = utils
  .fileToArray("sample.txt")
  .map((line) => line.split(" "))
  .map((line) => [line[0], JSON.parse(`[${line[1]}]`)]);

console.log("?".match(new RegExp("[#\\?]")));

function validCombinations(row) {
      console.log(row);
      //regex = "";
      //for (x of row[1]) {
      //  console.log(x);
      //  if (regex.length > 0) {
      //    regex += "[.\\?]+";
      //  }
      //  for (i = 0; i < x; i++) {
      //    regex += "[#\\?]";
      //  }
      //}
    regex = "(?<!#)" + row[1].map(x => `[#\\?]{${x}}`).join("\.+") + "[$\\.]"
     console.log(regex);
regex = new RegExp(`${regex}`);

      toTry = [];

      toTry.push(row[0])
        console.log(toTry)
      combinations = []
      while (toTry.length > 0) {
            current = toTry.shift();
        console.log("Attempting: " + current)
            if (current.match(regex)) {
          if (current.indexOf("?") < 0) {
            combinations.push(current);
          } else {
            toTry.push(current.replace("?", "#"));
            toTry.push(current.replace("?", "."));
          }
        }
      }
    return combinations
}

//part1 = data.map(validCombinations)
console.log(validCombinations(data[1]))
//console.log(part1)
console.log(`Part 1: ${""}`);

//console.log(`Combinations: ${result.length}`, result);

console.log(`Part 2: ${""}`);
