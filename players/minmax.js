'use strict'

module.exports = (signs, board) => {
  const moves = [0,1,2,3,4,5,6,7,8]
  const winningRows = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]]
  const winFor = (p, board) => winningRows.some(row => !row.some(i => board[i] !== p))
  const tie = board => !~board.indexOf(signs[0])
  const moveOnBoard = (move, board, p) => board.slice(0, move) + p + board.slice(move+1)

  const negaMax = (signs, board) => {
    if (board === signs[0].repeat(9)) return { move: 0 } // optimization
    if (winFor(signs[1], board)) return { val:  1 }
    if (winFor(signs[2], board)) return { val: -1 }
    if (tie(board))       return { val:  0 }

    return moves
      .filter(i => board[i] === signs[0])
      .map(i => ({ move: i, val: -negaMax(signs[0] + signs[2] + signs[1], moveOnBoard(i, board, signs[1])).val }))
      .sort((n, m) => m.val - n.val)[0]
  }
  return negaMax(signs, board).move
}

////////////////////////////////////////////////////////////////////////////////

if (!module.parent) console.log(module.exports('012', '0'.repeat(9)))
