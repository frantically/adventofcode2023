utils = require('../utils.js')

grid = utils.fileToArray('input.txt')
gridChars = grid.map(line => [...line])

function partSymbol(num) {
    [number, row, start, len] = num
    minRow = Math.max(row-1, 0)
    maxRow = Math.min(row+1, grid.length-1)
    minCol = Math.max(start-1, 0)
    maxCol = Math.min(start+len, grid[0].length-1)
    for(i=minRow;i<=maxRow;i++) {
        for(j=minCol;j<=maxCol;j++) {
            // console.log(gridChars[i][j])
            symbol = gridChars[i][j].match(/[^0-9\.]/)
            if(symbol != null) {
                return [symbol, i, j]
            }
        }
    }
    return [null, null, null]
}


numbers = []

for(i in grid) {
    matches = grid[i].matchAll(/[0-9]+/g)
    for (match of matches) {
        numbers.push([parseInt(match[0]), parseInt(i), match.index, match[0].length])
    }
}

part1 = numbers.filter(number => partSymbol(number)[0] != null)
    .map(num => num[0])
    .reduce((a, part) => a + part, 0)

console.log(`Part 1: ${part1}`)

gearsToNumbers = {}
for(number of numbers) {
    [symbol, row, col] = partSymbol(number)
    if(symbol == "*") {
        numbersForGear = gearsToNumbers[`${row}_${col}`]
        if(numbersForGear == null) {
            numbersForGear = []
            gearsToNumbers[`${row}_${col}`] = numbersForGear
        }
        numbersForGear.push(number)
        // console.log("GEAR FOR:")
        // console.log(number)
    }
}
part2 = Object.values(gearsToNumbers).map(parts => parts.length == 2 ? parts[0] * parts[1] : 0)
    .reduce((a, part) => a + part, 0)

console.log(`Part 2: ${part2}`)

// console.log(part2)
// console.log(JSON.stringify(gearsToNumbers, null, 2))