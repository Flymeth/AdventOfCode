const fs = require("fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8"})

const lines = input.split(/\r?\n/)
const numberFinder = /\d+/gd
const symbol = /[^.\d]/

let result= 0
for(let i = 0; i < lines.length; i++) {
	const line = lines[i]
	const lineAbove = lines[i - 1] || ""
	const lineBellow = lines[i + 1] || ""

	let execResult = numberFinder.exec(line)
	while(execResult) {
		const { index, "0": {length} } = execResult
		const stringToCheckSymbols = (
			(line[index - 1] || "")
			+ (line[index + length] || "")
			+ (lineAbove.slice(Math.max(0, index - 1), index + length + 1) || "")
			+ (lineBellow.slice(Math.max(0, index - 1), index + length + 1) || "")
		)
		if(symbol.test(stringToCheckSymbols)) result+= parseInt(line.slice(index, index + length))

		execResult = numberFinder.exec(lines[i])
	}
}

console.log("The result is", result);