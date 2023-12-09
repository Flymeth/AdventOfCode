const fs = require("node:fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8"})
const [time, requiredDistance] = input.split(/\r?\n/).map(values => (
    parseInt(values.split(":")[1].trim().split(/\s+/).join(""))
))

let ways = 0
for(let holding = 0; holding <= time; holding++) {
    const distance = holding * (time - holding)
    if(distance > requiredDistance) ways++
}

console.log("We can beat the race by", ways, "ways.");
