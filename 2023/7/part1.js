const { hands, validCardsPart1: validCards } = require("./module")

/**
 * @param {string} hand
 */
function getHandType(hand) {
    const cards = Array.from(new Set(hand))
    const cardsNumbers = cards.map(card => hand.match(new RegExp(card, "g")).length)
    const maxSameCardAmount = Math.max(...cardsNumbers)

    if(maxSameCardAmount === 5) return 7
    if(maxSameCardAmount === 4) return 6
    if(maxSameCardAmount === 3) {
        if(cards.length === 2) return 5
        else return 4
    }
    if(maxSameCardAmount === 2) {
        if(cards.length === 3) return 3
        else return 2
    }
    return 1
}

/**
 * A sorting function to place the best hands bellow the worst
 * @param {string} hand1 
 * @param {string} hand2 
 */
function sorter(hand1, hand2) {
    const [hand1Type, hand2Type] = [hand1, hand2].map(getHandType)
    if(hand1Type === hand2Type) {
        let cardID = 0
        while(hand1[cardID] === hand2[cardID]) cardID++
        const hand1CardValue = validCards.indexOf(hand1[cardID])
        const hand2CardValue = validCards.indexOf(hand2[cardID])
        return hand2CardValue - hand1CardValue
    }else return hand1Type - hand2Type
}

const sortedHands = hands.sort((hand1, hand2) => sorter(hand1.card, hand2.card))
const totalWinnings = sortedHands
    .map(({ bid }, index) => bid * (index + 1))
    .reduce((pre, cur) => pre + cur)
;
console.log("Total winnings:", totalWinnings);
