'use strict'

const winningRows = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
const isWin = (b, sign) => winningRows.some(indices => 3 === indices.filter(i => b[i] === sign).length)

module.exports = (players, signs) => {
  const validMove = (board, move) => board[move] === signs[0]
  const isTie = b => !~b.indexOf(signs[0])
  const print = board => console.log(`${board.slice(0, 3)}\n${board.slice(3, 6)}\n${board.slice(6, 9)}\n---`)
  const moveOnBoard = (move, board, sign) => board.slice(0, move) + sign + board.slice(move+1)

  let board = signs[0].repeat(9)
  let turn = 0
  while (!isTie(board)) {
    const p = signs[turn%2+1]
    const o = signs[(turn+1)%2+1]
    const move = players[turn%2].f(signs[0] + p + o, board)
    if (move === undefined) throw new Error(`player '${players[turn%2].name}' failed on invalid move: ${move}`)
    board = moveOnBoard(move, board, p)
    // print(board)
    if (isWin(board, p)) return p
    turn++
  }
  return signs[0]
}
