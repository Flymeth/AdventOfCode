const fs = require("node:fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8" })
const cards = input.split(/\r?\n/)

const cardInformationsRegexp = /(?<win_number>(?:\d+\s*)+)\|(?<get_numbers>(?:\s*\d+)+)/

let points= 0
for(const card of cards) {
    const { win_number, get_numbers } = cardInformationsRegexp.exec(card).groups
    const winningNumbers = win_number.trim().split(/\s+/).map(v => parseInt(v))
    const foundNumbers = get_numbers.trim().split(/\s+/).map(v => parseInt(v))

    const winningNumbersFound = foundNumbers.filter(nb => winningNumbers.includes(nb)).length
    if(winningNumbersFound) points+= 2 ** (winningNumbersFound - 1)
}

console.log("You get", points, "points.")
