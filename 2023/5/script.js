const fs = require("node:fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8" })
const lines = input.split(/\r?\n/).filter(Boolean)
const seeds = lines.shift().split(":")[1].split(" ").slice(1).map(v => parseInt(v))

/**
 * @param {string} map 
 */
function parseMap(map) {
    const [destination, source, length] = map.split(" ").map(v => parseInt(v))
    return {source, destination, length}
}
/**
 * @type {{
 *  [key: string]: (ReturnType<typeof parseMap>)[]
 * }}
 */
const maps = {}
let key = "<unknown>"
for(const line of lines) {
    const regResult = /(?<key>.+) map:/.exec(line)
    if(regResult) {
        key = regResult.groups.key
        maps[key] = []
    }else maps[key].push(parseMap(line))
}

/**
 * @param {number} src
 * @param {string} type
 */
function getDestination(src, type) {
    const key = Object.keys(maps).find(k => k.startsWith(`${type}-to`))
    if(!key) throw new Error("Invalid key found.")
    
    const result = {
        next: key.split("-")[2],
        destination: src
    }

    for(const map of maps[key]) {
        const {source, destination, length} = map
        if(source <= src && src <= source + length) {
            const difference = src - source
            result.destination= destination + difference
            break;
        }
    }

    return result
}

/**
 * @param {number} src 
 * @returns {{
 *  key: string, 
 *  source: number, 
 *  destination: number, 
 *  next?: ReturnType<getFullTree>
 * }}
 */
function getFullTree(src, type = "seed") {
    const result = getDestination(src, type)
    const next = result.next === "location" ? undefined : getFullTree(result.destination, result.next)
    
    return {
        key: type,
        source: src,
        destination: result.destination,
        next
    }
}
const trees = seeds.map(s => getFullTree(s))

/**
 * @param {ReturnType<typeof getFullTree>} tree 
 */
function getLocation(tree) {
    /**
     * @param {ReturnType<typeof getFullTree>} tree
     * @returns {number}
     */
    const getter = (tree) => tree.next ? getter(tree.next) : tree.destination

    return getter(tree)
}

let min = Math.min(...trees.map(tree => getLocation(tree)))
console.log("The nearest destination is", min);
