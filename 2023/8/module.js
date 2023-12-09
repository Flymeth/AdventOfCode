const fs = require("node:fs")
const input = fs.readFileSync("input.txt", { encoding: "utf8" })
const lines = input.split(/\r?\n/)

const instructions = lines.shift()
// Remove empty line
lines.shift()
/**
 * @type {{[key: string]: {left: string, right: string}}}
 */
const network = {}
/**
 * @type {string[]}
 */
const part2Starters = []
for(const line of lines) {
    const result = /(?<waypoint>\w+)\s*=\s*\((?<left>\w+),\s*(?<right>\w+)\)/.exec(line)
    if(!result) throw new Error(`Invalid line <${line}>.`)
    const { waypoint, left, right } = result.groups
    network[waypoint] = { left, right }
    if(waypoint.endsWith("A")) part2Starters.push(waypoint)
}

module.exports = { instructions, network, part2Starters }