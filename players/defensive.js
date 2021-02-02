'use strict'

module.exports = (signs, b) => {
  const winningRows = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]]

  const rowsIncluding = i => winningRows.filter(row => ~row.indexOf(i))
  const looksLike = like => row => row.map(i => b[i]).sort().join('') === like
  const hasRowsThatLookLike = (n, like) => i => rowsIncluding(i).filter(looksLike(like)).length >= n

  // const win            = hasRowsThatLookLike(1, signs[0] + signs[1].repeat(2))
  const block          = hasRowsThatLookLike(1, signs[0] + signs[2].repeat(2))
  // const fork           = hasRowsThatLookLike(2, signs[0].repeat(2) + signs[1])
  const blockFork      = hasRowsThatLookLike(2, signs[0].repeat(2) + signs[2])
  const center         = i => i === 4
  const oppositeCorner = i => corner(i) && b[{ 0: 8, 8: 0, 2: 6, 6: 2 }[i]] === signs[2]
  const corner         = i => i%2 === 0 && i !== 4
  const side           = i => i%2 === 1

  const conditions = [block, blockFork, center, oppositeCorner, corner, side]
  const emptySpaces = [0,1,2,3,4,5,6,7,8].filter(i => b[i] === signs[0])

  for (let condition of conditions) {
    for (let move of emptySpaces) {
      if (condition(move)) return move
    }
  }

  return b.indexOf(signs[0]) //should not happen
}

if (!module.parent) console.log(module.exports('012', '0'.repeat(9)))
