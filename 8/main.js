utils = require('../utils.js')

function loadData(file) {

    data = utils.fileToArray(file)
    leftRight = data.shift().split("").map(x => x == "L")
    data.shift() //extraLine

    steps = {}
    for (line of data) {
        steps[line.substring(0, 3)] = {left: line.substring(7, 10), right: line.substring(12, 15)}
    }
    
    return [leftRight, steps]
}


function part1() {
    [leftRight, steps] = loadData('input.txt')
    currentLocation = "AAA"
    stepsTaken = 0
    instructions = []
    while(currentLocation != "ZZZ") {
        if(instructions.length == 0) {
            instructions = leftRight.slice()
        }
        leftInstruction = instructions.shift()
        currentLocation = leftInstruction ? steps[currentLocation].left : steps[currentLocation].right
        stepsTaken++
    }
    
    console.log(`Part 1: ${stepsTaken}`)
}

function part2() {
    [leftRight, steps] = loadData('input.txt')
    currentLocations = Object.keys(steps).filter(s => s.endsWith("A"))
    stepsTakenForEachLocation = []
    for(cl of currentLocations) {
        currentLocation = cl
        stepsTaken = 0
        instructions = []
        while(!currentLocation.endsWith("Z")) {
            if(instructions.length == 0) {
                instructions = leftRight.slice()
            }
            leftInstruction = instructions.shift()
            currentLocation = leftInstruction ? steps[currentLocation].left : steps[currentLocation].right
            stepsTaken++
        }
        stepsTakenForEachLocation.push(stepsTaken)
    }
    console.log(`Part 2: ${stepsTakenForEachLocation.reduce(lcm)}`)
    
}

// Taken from https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
function gcd(a, b) {
    return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}

part1()
part2()