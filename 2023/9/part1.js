const { histories } = require("./module")

/**
 * @param {number[]} sequence 
 */
function findNextHistory(sequence) {
    const sub = []
    for(let i = 1; i < sequence.length; i++) {
        sub.push(sequence[i] - sequence[i - 1])
    }
    if(sub.find(v => v !== 0)) return sequence.at(-1) + findNextHistory(sub)
    return sequence.at(-1)
}

const extrapolatedValues = histories.map(sequence => findNextHistory(sequence))
console.log("Sum of the right extrapolated values is", extrapolatedValues.reduce((pre, cur) => pre + cur));
