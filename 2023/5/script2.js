const fs = require("node:fs")
const input = fs.readFileSync("input.txt", {encoding: "utf8" })
const lines = input.split(/\r?\n/).filter(Boolean)
const seedsStartRangeGetter = /(?<start>\d+)\s*(?<range>\d+)/g
const stringSeeds = lines.shift().split(":")[1].trim()
/**
 * @type {{start: number, end: number}[]}
 */
const seeds = []
let seedsRegResult = seedsStartRangeGetter.exec(stringSeeds)
while(seedsRegResult) {
    const { groups } = seedsRegResult
    const start = parseInt(groups.start)
    const range = parseInt(groups.range)
    seeds.push({
        start,
        end: start + range - 1 // The last one is not taken (see the exemple)
    })
    seedsRegResult = seedsStartRangeGetter.exec(stringSeeds)
}

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
Object.values(maps).forEach(m => m.sort((a, b) => a.source - b.source))

/**
 * @param {(typeof seeds)[number]} src
 * @param {string} type
 */
function getDestination(src, type) {
    const key = Object.keys(maps).find(k => k.startsWith(`${type}-to`))
    if(!key) throw new Error("Invalid key found.")

    const result= {
        from: type,
        to: key.split("-")[2],
        map: key,
        source: src,
        /**
         * @type {(typeof seeds[number] & {srcmap?: typeof seeds[number]})[]}
         */
        destinations: []
    }
    for(let mapID = 0; mapID < maps[key].length; mapID++) {
        const { source, destination, length } = maps[key][mapID]
        if(mapID === 0 && src.start < source) {
            result.destinations.push({
                start: src.start,
                end: source
            })
        }

        const inside = {
            start: Math.max(source, src.start),
            end: Math.min(source + length, src.end)
        }
        if(inside.start < inside.end) {
            if(mapID !== 0 && result.destinations.at(-1)?.srcmap?.end < inside.start) {
                result.destinations.push({
                    start: result.destinations.at(-1)?.srcmap?.end,
                    end: inside.start
                })
            }
        
            const shift = destination - source
            result.destinations.push({
                start: inside.start + shift,
                end: inside.end + shift,
                srcmap: inside
            })
        }


        if(mapID === maps[key].length -1 && src.end > source + length) {
            result.destinations.push({
                start: source+ length,
                end: src.end
            })
        }
    }

    if(!result.destinations.length) result.destinations.push(src)
    return result
}

/**
 * @param {typeof seeds[number]} source 
 * @param {string} type
 * @returns {{
 *  map: string,
 *  destinations: ((typeof seeds[number]) & {
 *      parsed: ReturnType<typeof getFullTree> | false
 *  })[]
 * }}
 */
function getFullTree(source, type = "seed") {
    const result = getDestination(source, type)
    return {
        map: result.map,
        destinations: result.destinations.map(infos => ({
            ...infos,
            parsed: result.to !== "location" && getFullTree(infos, result.to)
        }))
    }
}
const trees = seeds.map(seed => getFullTree(seed))
fs.writeFileSync("tree.json", JSON.stringify(trees[0], undefined, 2))

/**
 * @param {ReturnType<typeof getFullTree>} tree 
 * @returns {typeof seeds}
 */
function getLocations(tree) {
    if(tree.map.endsWith("location")) return tree.destinations.map(({start, end}) => ({start, end}))
    return tree.destinations.map(subtree => getLocations(subtree.parsed)).flat()
}
const locations = trees.map(tree => getLocations(tree))
const min = Math.min(
    ...locations.flat().map(({start}) => start)
)
console.log("The nearest location is", min)
