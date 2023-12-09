const fs = require("node:fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8" })
const cards = input.split(/\r?\n/)

const cardInformationsRegexp = /(?<win_number>(?:\d+\s*)+)\|(?<get_numbers>(?:\s*\d+)+)/

const cardsAmount = cards.map(() => 1)
for(let cardID = 0; cardID < cards.length; cardID++) {
    const card = cards[cardID]
    const { win_number, get_numbers } = cardInformationsRegexp.exec(card).groups
    const winningNumbers = win_number.trim().split(/\s+/).map(v => parseInt(v))
    const foundNumbers = get_numbers.trim().split(/\s+/).map(v => parseInt(v))
    const winningNumbersFound = foundNumbers.filter(nb => winningNumbers.includes(nb)).length

    for(let i = 1; i <= winningNumbersFound; i++) {
        const cardIDWon = cardID + i
        cardsAmount[cardIDWon]+= cardsAmount[cardID]
    }
}

console.log("Finnaly, I end up with", cardsAmount.reduce((pre, cur) => pre + cur), "cards!")
