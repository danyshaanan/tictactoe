'use strict'

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

    // dict[parseInt(board, 3)] = best.move
    return best
  }
  return negaMax(signs, board).move
}


////////////////////////////////////////////////////////////////////////////////

const count_bits = i => {
	let sum = 0;
	while (i) {
		i &= i - 1
		sum++
	}
	return sum
}

const f_board = 0b111111111

const signs = '012'
const moveOnBoard = (move, board, p) => board.slice(0, move) + p + board.slice(move+1)

const gen_legal_boards = _ => {
	let count = 0
	const legal_boards = []
	for (let i = 0; i <= f_board; i++) {
		for (let j = 0; j <= f_board; j++) {
			if (!(i & j)) {
				const bi = count_bits(i)
				const bj = count_bits(j)
				const d = bj - bi
				if (0 <= d && d <= 1) {
					legal_boards.push([i, j, (i << 9) | j])
				}
			}
		}	
	}
	return legal_boards
}

const cboard_to_jsboard = (i, j) => {
	let s = ''
	for (let n = 0; n < 9; n++) {
		if (i & (1 << n)) s += signs[1]
		else if (j & (1 << n)) s += signs[2]
		else s += signs[0]
	}
	return s
}

////////////////////////////////////////////////////////////////////////////////


const legal_boards = gen_legal_boards()

const dict = {}

let c = 0
for (let [i, j, b] of legal_boards) {
	const jsboard = cboard_to_jsboard(i, j)
	const move = ttt(signs, jsboard)
	if (move !== undefined) {
		dict[b] = move
	}
}

let s = Object.entries(dict).map(([board, move]) => `          case ${board}: return ${move};`).join('\n')

console.log(`

uint64_t best_move_per_board_dictionary(uint64_t board) {
	switch (board) {
${s}
	  default: return 0;
	}
}

`)