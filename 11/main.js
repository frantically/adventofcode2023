utils = require('../utils.js')

data = utils.fileToArray("input.txt")
        .map(line => line.split(""))

function areasToExpand(data) {
    blankRows = []
    for (i=0;i<data.length;i++) {
        if(!data[i].includes("#")) {
            blankRows.push(i)
        }
    }
    
    blankColumns = []
    for (j=0;j<data[0].length;j++) {
        hasGalaxy = false
        for (i=0;i<data.length;i++) {
            if(data[i][j] == "#") {
                hasGalaxy = true
            }
        }
        if(!hasGalaxy) {
            blankColumns.push(j)
        }
    }
    
    return [blankRows, blankColumns]
}

function locateGalaxies(data) {
    galaxies = []
    for(i=0;i<data.length;i++) {
        for(j=0;j<data[0].length;j++) {
            if(data[i][j] == "#") {
                galaxies.push([i, j])
            }
        }
    }
    return galaxies
}

function calculateTotalDistance(galaxies, expansionRatio) {
    totalDistance = 0

    for(i=0;i<galaxies.length;i++) {
        for(j=i+1;j<galaxies.length;j++) {
            rowExpansionsNeeded = blankRows.filter(x => x > Math.min(galaxies[i][0], galaxies[j][0]) && x < Math.max(galaxies[i][0], galaxies[j][0])).length
            columnExpansionsNeeded = blankColumns.filter(x => x > Math.min(galaxies[i][1], galaxies[j][1]) && x < Math.max(galaxies[i][1], galaxies[j][1])).length
            totalDistance += Math.abs(galaxies[j][1]-galaxies[i][1]) + Math.abs(galaxies[j][0]-galaxies[i][0])
            totalDistance += (rowExpansionsNeeded * expansionRatio)
            totalDistance += (columnExpansionsNeeded * expansionRatio)
            if(expansionRatio > 1) {
                totalDistance -= (rowExpansionsNeeded + columnExpansionsNeeded)
            }
        }
    }
    return totalDistance
}

[blankRows, blankColumns] = areasToExpand(data)
galaxies = locateGalaxies(data)

console.log(`Part 1: ${calculateTotalDistance(galaxies, 1)}`)
console.log(`Part 2: ${calculateTotalDistance(galaxies, 1000000)}`)

