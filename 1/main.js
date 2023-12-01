utils = require('../utils.js')

part1 = utils.fileToArray('input.txt')
    .map(line => [...line.replace(/[^0-9]+/g, "")])
    .map(chars => parseInt(chars[0] + chars[chars.length-1]))
    .reduce((a, b) => a + b, 0)
console.log(`Part 1: ${part1}`)

function extractNumbers(str) {
    mappings = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five':5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
    }
    result = []
    while(str.length > 0) {
        Object.keys(mappings).forEach(startStr => {
            if(str.startsWith(startStr)) {
                result.push(mappings[startStr])
            }
        })
        str = str.slice(1)
    }
    return result
}

part2 = utils.fileToArray('input.txt')
    .map(line => extractNumbers(line))
    .map(chars => chars[0]*10 + chars[chars.length-1])
    .reduce((a, b) => a + b, 0)
console.log(`Part 2: ${part2}`)
