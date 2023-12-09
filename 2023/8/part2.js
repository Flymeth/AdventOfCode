const { instructions, network, part2Starters: starters } = require("./module")

const steps = starters.map((currentWP) => {
    let steps = 0
    while(!currentWP.endsWith("Z")) {
        const instruction = instructions[steps % instructions.length]
        currentWP = instruction === "L" ? network[currentWP].left : network[currentWP].right
        
        steps++
    }
    return steps
})

/**
 * @see https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
 */
const gcd = (a, b) => b == 0 ? a : gcd (b, a % b)
const lcm = (a, b) =>  a / gcd (a, b) * b
const lcmAll = (ns) => ns .reduce (lcm, 1)
const rng = (lo, hi) => [...Array (hi - lo + 1)] .map ((_, i) => lo + i)

console.log("Reached Z locations in", lcmAll(steps), "steps.");
