utils = require('../utils.js')

data = utils.fileToArray("input.txt")
    .map(line => line.split(""))

movedARock = true

while(movedARock) {
    movedARock = false
    for(i=0;i<data.length-1;i++) {
        for(j=0;j<data[0].length;j++) {
            if(data[i][j] == "." && data[i+1][j] == "O") {
                data[i][j] = data[i+1][j]
                data[i+1][j] = "."
                movedARock = true
            }
        }
    }
}

part1 = 0
for(i=0;i<data.length;i++) {
    part1 += (data.length - i) * data[i].filter(x => x == "O").length
}

console.log(`Part 1: ${part1}`)