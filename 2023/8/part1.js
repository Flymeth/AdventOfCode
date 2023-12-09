const { instructions, network } = require("./module")

let steps = 0
let currentWaypoint = "AAA"
while(currentWaypoint !== "ZZZ") {
    const instructionID = steps % instructions.length
    currentWaypoint = instructions[instructionID] === "L" ? network[currentWaypoint].left : network[currentWaypoint].right
    
    steps++
}

console.log("Achieved ZZZ in", steps, "steps!")
