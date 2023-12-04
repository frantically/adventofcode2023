utils = require('../utils.js')

function parseGameNumbers(numList) {
    return numList.split(" ").filter(n => n != '').map(n => parseInt(n))
}

function parseGame(line) {
    match = line.match(/Card\s*([0-9]+): (.*) \| (.*)/)
    game = {
        "id": parseInt(match[1]),
        "winningNumbers": parseGameNumbers(match[2]),
        "playedNumbers": parseGameNumbers(match[3])
    }
    game['matched'] = game.playedNumbers.filter(n => game.winningNumbers.includes(n)).length
    return game
}

games = utils.fileToArray('input.txt')
    .map(line => parseGame(line))

part1 = games.filter(g => g.matched > 0)
    .map(g => Math.pow(2, g.matched-1))
    .reduce((a, c) => a + c, 0)

console.log(`Part 1: ${part1}`)

games.slice().reverse().map(game => {
    cards = 1 //this game
    for(i=0;i<game.matched;i++) {
        cards += games[game.id + i].cards
    }
    game['cards'] = cards
})

part2 = games.map(game => game.cards)
    .reduce((a, c) => a + c, 0)

console.log(`Part 2: ${part2}`)