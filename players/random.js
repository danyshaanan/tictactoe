'use strict'

module.exports = (signs,board)=>(a=>a[Math.floor(Math.random()*a.length)])([0,1,2,3,4,5,6,7,8].filter(i=>board[i]===signs[0]))

if (!module.parent) console.log(module.exports('012', '0'.repeat(9)))
