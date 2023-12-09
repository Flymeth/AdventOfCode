const strNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const numbers = new RegExp(
	`${strNumbers.join("|")}|\\d`
)
console.log(numbers)

const fs = require("fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8"})
const lines = input.split("\r\n")
const regexp = new RegExp(`^.*?(?<first>${numbers.source})(?:.*(?<second>${numbers.source}).*?$)?`)

let finalResult = 0
for(const line of lines) {
	const result = regexp.exec(line)
	const { first, second } = result.groups
	
	const parsedFirst = (
		strNumbers.includes(first) ? strNumbers.indexOf(first) + 1 : first
	).toString()
	const parsedSecond = (
		second ? (
			strNumbers.includes(second) ? strNumbers.indexOf(second) + 1 : second
		) : parsedFirst
	).toString()
	
	const nb = parseInt(parsedFirst + parsedSecond)
	console.log(line, first, second, nb)
	if(isNaN(nb)) {
		console.log("Error on line <", line, "> -> Cannot build the number")
		throw 0
	}
	finalResult+= nb
}
console.log("The final number is:", finalResult)