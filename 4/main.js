utils = require('../utils.js')

data = utils.fileToArray('input.txt')

//Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53 

function parseGameNumbers(numList) {
    return numList.split(" ").filter(n => n != '').map(n => parseInt(n))
}
function parseGame(line) {
    match = line.match(/Card.*([0-9]+): (.*) \| (.*)/)
    game = {
        "id": parseInt(match[1]),
        "winningNumbers": parseGameNumbers(match[2]),
        "playedNumbers": parseGameNumbers(match[3])
    }
    game['matched'] = game.playedNumbers.filter(n => game.winningNumbers.includes(n)).length
    return game
}
function part1(data) {
    part1 = "x"
}

function part2(data) {
    part2 = "y"
    console.log(`Part 2: ${part2}`)
}

part1(data)
part2(data)

part1 = data.map(line => parseGame(line))
    .filter(g => g.matched > 0)
    .map(g => Math.pow(2, g.matched-1))
    .reduce((a, c) => a + c, 0)

console.log(`Part 1: ${part1}`)

games = data.map(line => parseGame(line))
toPlay = [...games]
played = []
while(toPlay.length > 0) {
    if(toPlay.length % 100 == 0) {
        console.log("Left To Play: " + toPlay.length)
    }
    //console.log("playing " + JSON.stringify(game))
    game = toPlay.shift()
    for(i=0;i<game.matched;i++) {
        toPlay.push(games[game.id + i])
        //console.log("adding: " + (game.id + i))
    }
    played.push(game)
}

console.log(`Part 2: ${played.length}`)
