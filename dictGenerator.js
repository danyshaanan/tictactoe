'use strict'

const dict = {}

const ttt = (signs, board) => {
  const moves = [0,1,2,3,4,5,6,7,8]
  const winningRows = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]]
  const winFor = (p, board) => winningRows.some(row => !row.some(i => board[i] !== p))
  const tie = board => !~board.indexOf(signs[0])
  const moveOnBoard = (move, board, p) => board.slice(0, move) + p + board.slice(move+1)

  const negaMax = (signs, board) => {
    if (winFor(signs[1], board)) return { val:  1 }
    if (winFor(signs[2], board)) return { val: -1 }
    if (tie(board))       return { val:  0 }

    const best = moves
      .filter(i => board[i] === signs[0])
      .map(i => ({ move: i, val: -negaMax(signs[0] + signs[2] + signs[1], moveOnBoard(i, board, signs[1])).val }))
      .sort((n, m) => m.val - n.val)[0]

    dict[parseInt(board, 3)] = best.move
    return best
  }
  return negaMax(signs, board).move
}


////////////////////////////////////////////////////////////////////////////////

const moveOnBoard = (move, board, p) => board.slice(0, move) + p + board.slice(move+1)

var signs = '012'

ttt(signs, signs[0].repeat(9))
'000000000'.split('').forEach((_, i) => ttt(signs[0] + signs[2] + signs[1], moveOnBoard(i, signs[0].repeat(9), signs[1])))

console.log(`'use strict'

const dict = ${JSON.stringify(dict, 0, 2)}

module.exports = (signs, b) => {
  const player = b.split('').reduce((t, c) => t - (c === signs[0] ? 1 : 0), 9) % 2
  const board = b.split('').map(c => (player ? '021' : '012')[signs.indexOf(c)]).join('')
  const key = parseInt(board, 3)
  return dict[key]
}

if (!module.parent) console.log(module.exports('zxc', 'z'.repeat(9)))`)
