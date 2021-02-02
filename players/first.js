'use strict'

module.exports = (signs, board) => board.indexOf(signs[0])

if (!module.parent) console.log(module.exports('012', '0'.repeat(9)))
