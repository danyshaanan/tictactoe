'use strict'

const game = require('./game.js')
const names = ['minmax', 'dict', 'algo', 'defensive', 'aggressive', 'first'/*, 'random'*/]
const ps = names.map(name => ({ name, f: require(`./players/${name}.js`) }))

const pad = (str, len) => str + ' '.repeat(len - str.length)
const max = ps.reduce((max, p) => Math.max(max, p.name.length), 0) + 2
const gameResult = (signs, players) => `"${'-<^'[signs.indexOf(game(players, signs))]}"`
const parseResults = results => results.map(row => row.map(c => pad(c, max)).join('')).join('\n')

const results = Array.from(Array(ps.length + 1), () => [])
results[0][0] = 'p1 \\ p2'
ps.forEach((p1, i) => {
  results[i+1][0] = results[0][i+1] = p1.name
  ps.forEach((p2, j) => results[i+1][j+1] = gameResult(' xo', [p1, p2]))
})

console.log(parseResults(results))
