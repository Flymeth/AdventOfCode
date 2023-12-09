const fs = require("fs")
const input = fs.readFileSync("input.txt", { encoding: "utf8" })
const games = input.split("\r\n")
const parser = /Game \d+: (?<infos>.+)/
const tirage_parser = /(?:(?:((?<green>\d+) green)|((?<red>\d+) red)|((?<blue>\d+) blue)),?)/g

let result = 0
skip: for(let i = 0; i < games.length; i++) {
	const game = i + 1
	console.log("------------------------------\nChecking game", game, ":")
	const { infos } = parser.exec(games[i]).groups
	const tirages = infos.split(";")
	let maxred= 0, maxgreen= 0, maxblue= 0;
	
	for(const tirage of tirages) {
		console.log("Tirage:", tirage)
		let values = tirage_parser.exec(tirage).groups
		let green = undefined, red = undefined, blue = undefined;
		while(values) {
			green??= values.green
			red??= values.red
			blue??= values.blue
			values = tirage_parser.exec(tirage)?.groups
		}
		
		console.log("Parsed:\nred:", red,"; green:", green, "; blue:", blue)
		
		if(red) maxred = Math.max(maxred, parseInt(red))
		if(green) maxgreen = Math.max(maxgreen, parseInt(green))
		if(blue) maxblue = Math.max(maxblue, parseInt(blue))
	}

	const power = maxgreen * maxred * maxblue
	result+= power
}

console.log("The result of the puzzle is:", result)