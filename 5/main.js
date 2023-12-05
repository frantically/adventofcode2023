utils = require('../utils.js')

input = utils.fileToArray('input.txt')

function extractNumbersFromString(str) {
    return Array.from(str.matchAll(/[0-9]+/g)).map(m => parseInt(m[0]))
}

function parseMaps(input) {
    currentMap = null
    mappings = []

    for(line of input) {
        newMapMatch = line.match(/([a-z]+)-to-([a-z]+) map\:/)
        if(newMapMatch) {
            currentMap = {
                "from": newMapMatch[1],
                "to": newMapMatch[2],
                "mappings": []
            }
            mappings.push(currentMap)
        } else {
            nums = extractNumbersFromString(line)
            if(nums.length > 0) {
                currentMap.mappings.push({"destinationStart": nums[0], "sourceStart": nums[1], "length": nums[2]})
            }
        }
    }
    return mappings

}

34
48
4

36

function seedLocation(seed, maps) {
    currentValue = seed
    for(map of maps) {
        for(mapping of map.mappings) {
            if(currentValue >= mapping.sourceStart && currentValue < mapping.sourceStart + mapping.length) {
                currentValue = mapping.destinationStart + currentValue - mapping.sourceStart
                break
            }
        }
    }
    return currentValue
}

seeds = extractNumbersFromString(input.shift())
console.log(seeds)
input.shift() // throw away blank line

maps = parseMaps(input)
part1 = seeds
    .map(seed => seedLocation(seed, maps))
    .reduce((a, c) => Math.min(a, c), Number.MAX_VALUE)


console.log(`Part 1: ${part1}`)

part2 = Number.MAX_VALUE
while(seeds.length > 0) {
    initialSeed = seeds.shift()
    range = seeds.shift()
    for(i = initialSeed;i<initialSeed+range;i++) {
        part2 = Math.min(part2, seedLocation(i, maps))
    }
}

console.log(`Part 2: ${part2}`)