const { histories } = require("./module")

/**
 * @param {number[]} sequence 
 */
function findNextHistory(sequence) {
    const sub = []
    for(let i = 1; i < sequence.length; i++) {
        sub.push(sequence[i] - sequence[i - 1])
    }
    if(sub.find(v => v !== 0)) return sequence[0] - findNextHistory(sub)
    return sequence[0]
}

const extrapolatedValues = histories.map(sequence => findNextHistory(sequence))
console.log("Sum of the left extrapolated values is", extrapolatedValues.reduce((pre, cur) => pre + cur));
