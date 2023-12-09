const fs = require("fs")
const input = fs.readFileSync("input.txt", { encoding: "utf8" })
const games = input.split("\r\n")
const parser = /Game \d+: (?<infos>.+)/
const tirage_parser = /(?:(?:((?<green>\d+) green)|((?<red>\d+) red)|((?<blue>\d+) blue)),?)/g

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const maximum = {
	red: 12,
	green: 13,
	blue: 14
}
let result = 0
skip: for(let i = 0; i < games.length; i++) {
	const game = i + 1
	console.log("------------------------------\nChecking game", game, ":")
	const { infos } = parser.exec(games[i]).groups
	const tirages = infos.split(";")
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
		if(red && parseInt(red) > maximum.red) continue skip
		if(green && parseInt(green) > maximum.green) continue skip
		if(blue && parseInt(blue) > maximum.blue) continue skip
	}
	console.log("This game is valid!")
	result+= game
}

console.log("The result of the puzzle is:", result)