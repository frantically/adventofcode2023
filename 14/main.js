utils = require('../utils.js')

function loadData() {
    return utils.fileToArray("input.txt")
    .map(line => line.split(""))
}

function moveNorth(data) {
    movedARock = true
    while(movedARock) {
        movedARock = false
        for(let i=0;i<data.length-1;i++) {
            for(let j=0;j<data[0].length;j++) {
                if(data[i][j] == "." && data[i+1][j] == "O") {
                    data[i][j] = data[i+1][j]
                    data[i+1][j] = "."
                    movedARock = true
                }
            }
        }
    }
}

function moveSouth(data) {
    movedARock = true
    while(movedARock) {
        movedARock = false
        for(let i=data.length-2;i>=0;i--) {
            for(let j=0;j<data[0].length;j++) {
                if(data[i][j] == "O" && data[i+1][j] == ".") {
                    data[i][j] = "."
                    data[i+1][j] = "O"
                    movedARock = true
                }
            }
        }
    }
}

function moveEast(data) {
    movedARock = true
    while(movedARock) {
        movedARock = false
        for(let i=0;i<data.length;i++) {
            for(let j=data[0].length-2;j>=0;j--) {
                if(data[i][j] == "O" && data[i][j+1] == ".") {
                    data[i][j] = "."
                    data[i][j+1] = "O"
                    movedARock = true
                }
            }
        }
    }
}

function moveWest(data) {
    movedARock = true
    while(movedARock) {
        movedARock = false
        for(let i=0;i<data.length;i++) {
            for(let j=0;j<data[0].length-1;j++) {
                if(data[i][j] == "." && data[i][j+1] == "O") {
                    data[i][j] = "O"
                    data[i][j+1] = "."
                    movedARock = true
                }
            }
        }
    }
}

function spin() {
    moveNorth(data)
    moveWest(data)
    moveSouth(data)
    moveEast(data)
}

function northWallLoad(data) {
    result = 0
    for(let i=0;i<data.length;i++) {
        result += (data.length - i) * data[i].filter(x => x == "O").length
    }
    return result
}

data = loadData()
moveNorth(data)
console.log(`Part 1: ${northWallLoad(data)}`)

data = loadData()
history = []
spins = 1000000000

for(let i=0;i<spins;i++) {
    spin(data)
    digest = data.map(row => row.join("").trim()).join("|")
    if(history.includes(digest)) {
        history.push(digest)
        break
    } else {
        history.push(digest)
    }
}

firstOccurenceOfRepeatingItem = history.indexOf(history[history.length-1])
repeatsEvery = history.length - 1 - firstOccurenceOfRepeatingItem
remainingSpins = spins - history.length
resultIndex = (remainingSpins % repeatsEvery)+firstOccurenceOfRepeatingItem
result = history[resultIndex].split("|")
result = result.map(r => r.split(""))
console.log(`Part 2: ${northWallLoad(result)}`)