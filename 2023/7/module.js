const fs = require("node:fs")
const input = fs.readFileSync("input.txt",  { encoding: "utf8" })
exports.hands = input.split(/\r?\n/).map(hand => {
    const [card, bid] = hand.split(" ")
    return {card, bid: parseInt(bid)}
})
exports.validCardsPart1 = "AKQJT98765432"
exports.validCardsPart2 = "AKQT98765432J"