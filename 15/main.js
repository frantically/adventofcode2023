utils = require('../utils.js')

function loadData() {
    return utils.fileToArray("input.txt")[0].split(",")
}

function hash(str) {
    result = 0
    for(c of str.split("").map(c => c.charCodeAt(0))) {
        result += c
        result = (result * 17) % 256
    }
    return result
}

function processCommand(command, boxes) {
    parts = command.match(/([a-z]+)(=|-)([0-9]*)/)
    label = parts[1]
    instruction = parts[2]
    focalLength = instruction == "=" ? parseInt(parts[3]) : null
    box = hash(label)
    if(instruction == "-") {
        boxes[box] = boxes[box].filter(lens => lens[0] != label)
    } else {
        for(lens of boxes[box]) {
            if(lens[0] == label) {
                lens[1] = focalLength
                return
            }
        }
        boxes[box].push([label, focalLength])
    }
}

function print(command, boxes) {
    console.log(`After "${command}:"`)
    i = 0
    for(box of boxes) {
        if(box.length == 0) {
            continue
        }
        contents = box.map(lens => `[${lens[0]} ${lens[1]}]`)
        console.log(`Box ${i}: ${contents}`)
    }
    console.log()
}

part1 = data = loadData().map(hash).reduce((a,c) => a+c, 0)
console.log(`Part 1: ${data}`)

boxes = []
for(let i=0;i<256;i++) {
    boxes.push([])
}

loadData().map(c => processCommand(c, boxes))

result = 0
for(let b=0;b<boxes.length;b++) {
    for(let l=0;l<boxes[b].length;l++) {
        result += (b+1)*(l+1)*boxes[b][l][1]
    }
}

console.log(`Part 2: ${result}`)