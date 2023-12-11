utils = require('../utils.js')

data = utils.fileToArray("input.txt")
        .map(line => line.split(""))

VALID_NORTH_SHAPES = ["|", "F", "7"]
VALID_EAST_SHAPES = ["7", "-", "J"]
VALID_SOUTH_SHAPES = ["L", "J", "|"]
VALID_WEST_SHAPES = ["L", "F", "-"]

function findStartLocation(data) {
    startLocation = null
    for(i = 0;i<data.length;i++) {
        if(data[i].includes("S")) {
            return {row: i, col: data[i].indexOf("S")}
        }
    }
    return null
}

function validTransition(from, to, permittedFrom, permittedTo, visitedLocations, data) {
    return permittedFrom.includes(data[from.row][from.col]) &&
        permittedTo.includes(data[to.row][to.col]) && 
        !visitedLocations.includes(JSON.stringify(to))
}

function findNextLocation(currentLocation, visitedLocations) {
    north = {row: currentLocation.row-1, col: currentLocation.col}
    if(validTransition(currentLocation, north, VALID_SOUTH_SHAPES, VALID_NORTH_SHAPES, visitedLocations, data)) {
        return north
    }
    east = {row: currentLocation.row, col: currentLocation.col+1}
    if(validTransition(currentLocation, east, VALID_WEST_SHAPES, VALID_EAST_SHAPES, visitedLocations, data)) {
        return east
    }
    south = {row: currentLocation.row+1, col: currentLocation.col}
    if(validTransition(currentLocation, south, VALID_NORTH_SHAPES, VALID_SOUTH_SHAPES, visitedLocations, data)) {
        return south
    }
    west = {row: currentLocation.row, col: currentLocation.col-1}
    if(validTransition(currentLocation, west, VALID_EAST_SHAPES, VALID_WEST_SHAPES, visitedLocations, data)) {
        return west
    }
    return null
}

function deriveStartShape(currentLocation, data) {
    northConnected = VALID_NORTH_SHAPES.includes(data[currentLocation.row-1][currentLocation.col])
    eastConnected = VALID_EAST_SHAPES.includes(data[currentLocation.row][currentLocation.col+1])
    southConnected = VALID_SOUTH_SHAPES.includes(data[currentLocation.row+1][currentLocation.col])
    westConnected = VALID_WEST_SHAPES.includes(data[currentLocation.row][currentLocation.col-1])
    if(northConnected && southConnected) {
        return "|"
    } else if (eastConnected && westConnected) {
        return "-"
    } else if (eastConnected && northConnected) {
        return "L"
    } else if (eastConnected && southConnected) {
        return "F"
    } else if (westConnected && northConnected) {
        return "J"
    } else if (westConnected && southConnected) {
        return "7"
    }
}

function walkPath(startLocation) {
    visitedLocations = []
    currentLocation = startLocation
    visitedLocations.push(JSON.stringify(currentLocation))
    while((nextLocation = findNextLocation(currentLocation, visitedLocations)) != null) {
        visitedLocations.push(JSON.stringify(nextLocation))
        currentLocation = nextLocation
    }
    return visitedLocations
}

function markInsideOutsideLoop(data, visitedLocations) {
    for(i=0;i<data.length;i++) {
        inside = false
        horizontalWallStart = null
        for(j=0;j<data[0].length;j++) {
            currentLocation = {row: i, col: j}
            if(visitedLocations.includes(JSON.stringify(currentLocation))) {
                value = data[i][j]
                if(value == "|") {
                    inside = !inside
                } else if(["F", "L"].includes(value)) {
                    horizontalWallStart = value
                } else if(value == "7" && horizontalWallStart == "L") {
                    inside = !inside
                } else if(value == "J" && horizontalWallStart == "F") {
                    inside = !inside
                }
                continue
            }
            data[i][j] = inside ? "I" : "O"
        }
    }
}

startLocation = findStartLocation(data)
data[startLocation.row][startLocation.col] = deriveStartShape(startLocation, data)
visitedLocations = walkPath(startLocation)
console.log(`Part 1: ${visitedLocations.length/2}`)

markInsideOutsideLoop(data, visitedLocations)
part2 = data.map(row => row.filter(x => x == "I").length)
    .reduce((a, c) => a + c, 0)
console.log(`Part 2: ${part2}`)