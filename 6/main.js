utils = require('../utils.js')

input = utils.fileToArray('input.txt')
timeString = input.shift()
distanceString = input.shift()

part1Times = utils.extractNumbersFromString(timeString)
part1Distances = utils.extractNumbersFromString(distanceString)

function parseAsSingleNumber(line) {
    return parseInt(line.match(/([0-9].*[0-9])/)[1].replace(/\s/g, ""))
}

function attemptRace(time, currentRecord) {
    wins = 0
    for(i=0;i<time;i++) {
        if((time-i)*i > currentRecord) {
            wins++
        }
    }
    return wins
}

part1 = 1
while(part1Times.length > 0) {
    part1 *= attemptRace(part1Times.shift(), part1Distances.shift())
}

console.log(`Part 1: ${part1}`)

part2Time = parseAsSingleNumber(timeString)
part2Distance = parseAsSingleNumber(distanceString)
part2 = attemptRace(part2Time, part2Distance)

console.log(`Part 2: ${part2}`)