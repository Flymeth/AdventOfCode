const fs = require("node:fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8"})
const [times, distances] = input.split(/\r?\n/).map(values => (
    values.split(":")[1].trim().split(/\s+/).map(v => parseInt(v))
))

let result = 0
for(let i = 0; i < times.length; i++) {
    const [time, requiredDistance] = [times[i], distances[i]]

    let size = 0
    for(let holding = 0; holding <= time; holding++) {
        const distance = holding * (time - holding)
        if(distance > requiredDistance) size++
    }
    result = (result * size) || size
}

console.log("We can beat the race by", result, "ways.");
