utils = require('../utils.js')

function extractGameData(line) {
    game = {
        "id": parseInt(line.match(/Game ([0-9]+)/)[1]),
        "picks": []
    }
    picksString = line.split(": ")[1]
    picksString.split(";").forEach(pickString => {
        pick = { "red": 0, "blue": 0, "green": 0}
        pickString.split(",").forEach(colorPick => {
            colorPick = colorPick.trim()
            pick[colorPick.split(" ")[1]] = parseInt(colorPick.split(" ")[0])
        })
        game.picks.push(pick)
    })
    return game
}

function filterGame(minColors, game) {
    for(i in game['picks']) {
        if(game.picks[i]['red'] > minColors['red'] ||
        game.picks[i]['blue'] > minColors['blue'] ||
        game.picks[i]['green'] > minColors['green']) {
            return false
        }
    }
    return true
}

function gamePower(game) {
    red = green = blue = 0
    for(i in game['picks']) {
        red = Math.max(red, game['picks'][i]['red'])
        green = Math.max(green, game['picks'][i]['green'])
        blue = Math.max(blue, game['picks'][i]['blue'])
    }
    return red * green * blue
}

part1 = utils.fileToArray('input.txt')
    .map(line => extractGameData(line))
    .filter(game => filterGame({"red": 12, "green": 13, "blue": 14}, game))
    .reduce((a, game) => a + game['id'], 0)
console.log(`Part 1: ${part1}`)

part2 = utils.fileToArray('input.txt')
    .map(line => extractGameData(line))
    .map(game => gamePower(game))
    .reduce((a, power) => a + power, 0)
console.log(`Part 2: ${part2}`)