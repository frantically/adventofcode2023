utils = require('../utils.js')

data = utils.fileToArray("input.txt")
        .map(utils.extractNumbersFromString)

function nextNumber(data, append) {
    inputRow = append ? [...data] : [...data].reverse()

    stack = [inputRow]
    while(stack[stack.length-1].filter(n => n != 0).length > 0) {
        row = stack[stack.length-1]
        newRow = []
        for(i=0;i<row.length-1;i++) {
            newRow.push(append ? row[i+1] - row[i] : row[i] - row[i+1])
        }
        stack.push(newRow)
    }
    stack.reverse()
    stack[0].push(0)
    for(i = 1;i<stack.length;i++) {
        if(append) {
            stack[i].push(stack[i-1][stack[i].length-1] + stack[i][stack[i].length-1])
        } else {
            stack[i].push(stack[i][stack[i].length-1]- stack[i-1][stack[i].length-1])
        }
    }
    return inputRow[inputRow.length-1]
}

part1 = data.map(r => nextNumber(r, true))
    .reduce((a, c) => a+c, 0)
console.log(`Part 1: ${part1}`)

part2 = data.map(r => nextNumber(r, false))
    .reduce((a, c) => a+c, 0)
console.log(`Part 2: ${part2}`)