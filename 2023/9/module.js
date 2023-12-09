const fs = require("node:fs")
const input = fs.readFileSync("input.txt", { encoding: "utf8" })
const lines = input.split(/\r?\n/)
const histories = lines.map(line => line.split(" ").map(v => parseInt(v)))

module.exports = { histories }