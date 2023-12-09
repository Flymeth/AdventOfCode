const fs = require("fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8"})
const lines = input.split("\r\n")
const regexp = /^.*?(?<first>\d)(?:.*(?<second>\d).*?$)?/

let finalResult = 0
for(const line of lines) {
	const result = regexp.exec(line)
	const { first, second } = result.groups
	const nb = parseInt(first + (second || first))
	console.log(first, second, nb)
	if(isNaN(nb)) {
		console.log("Error on line <", line, "> -> Cannot build the number")
		continue
	}
	finalResult+= nb
}
console.log("The final number is:", finalResult)