const fs = require("fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8"})
const lines = input.split(/\r?\n/)

const MAX_NUMBER_LENGTH = 3
const NUMBER_REGEXP = /\d+/gd // <- Regular Expression with indexes

let result = 0
for(let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const possibleGearsPositions = Array.from(line).map((char, charIndex) => char === "*" ? charIndex : -1).filter(index => index >= 0)
    if(!possibleGearsPositions.length) continue

    for(const position of possibleGearsPositions) {
        const ratio = getGearRatio(i, position)
        if(typeof ratio === "number") result+= ratio
    }
}
console.log("Result is", result)

/**
 * @param {number} lineIndex
 * @param {number} gearPosition
 * @returns {number | undefined}
 */
function getGearRatio(lineIndex, gearPosition) {
    const   line = lines[lineIndex],
            lineAbove = lines[lineIndex - 1] || "",
            lineBellow= lines[lineIndex + 1] || ""
    ;

    const partNumbers = []
    const partNumbersXRange = [
        Math.max(0, gearPosition - MAX_NUMBER_LENGTH),
        gearPosition + MAX_NUMBER_LENGTH + 1
    ]

    // Checking to the gear's left
    const leftNb = /\d+$/.exec(line.slice(partNumbersXRange[0], gearPosition))?.[0]
    if(leftNb) partNumbers.push(parseInt(leftNb))
    // Checking to the gear's right
    const rightNb = /^\d+/.exec(line.slice(gearPosition + 1, partNumbersXRange[1]))?.[0]
    if(rightNb) partNumbers.push(parseInt(rightNb))

    /**
     * @param {string} aboveOrBellowLine 
     */
    function checkOnYAxis(aboveOrBellowLine) {
        if(!aboveOrBellowLine || partNumbers.length > 2) return

        const searchingSegment = aboveOrBellowLine.slice(...partNumbersXRange)
        let partNumberRegexpResult = NUMBER_REGEXP.exec(searchingSegment)
        while (partNumberRegexpResult) {
            const { index, "0": partNumber } = partNumberRegexpResult
            const numberPosition = [
                partNumbersXRange[0] + index,
                partNumbersXRange[0] + index + partNumber.length
            ]
    
            if(
                (
                    numberPosition[0] >= gearPosition - 1
                    && numberPosition[0] <= gearPosition + 1
                ) || (
                    numberPosition[1] - 1 >= gearPosition - 1
                    && numberPosition[1] - 1 <= gearPosition + 1
                )
            ) partNumbers.push(parseInt(partNumber))
            
            partNumberRegexpResult = NUMBER_REGEXP.exec(searchingSegment)
        }
    }
    checkOnYAxis(lineAbove)
    checkOnYAxis(lineBellow)
    if(partNumbers.length === 2) return partNumbers[0] * partNumbers[1]
}
