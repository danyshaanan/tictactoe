# Tic Tac Toe

A Tic Tac Toe engine with different players, pitted against each other.

### Run

```bash
npm start

> @ start ./tictactoe
> node main.js

p1 \ p2        aggressive.js  algo.js        defensive.js   dict.js        first.js       minmax.js      random.js
aggressive.js  "^"            "^"            "^"            "^"            "<"            "^"            "<"
algo.js        "<"            "-"            "-"            "-"            "<"            "-"            "<"
defensive.js   "<"            "-"            "-"            "-"            "<"            "-"            "<"
dict.js        "<"            "-"            "-"            "-"            "<"            "-"            "<"
first.js       "<"            "^"            "^"            "^"            "<"            "^"            "<"
minmax.js      "<"            "-"            "-"            "-"            "<"            "-"            "<"
random.js      "<"            "^"            "^"            "^"            "<"            "^"            "<"
```

where `<` is a win for `p1`, `^` is a win for `p2`, and `-` is a tie.

Note that since the `random.js` player is not deterministic, this results table aren't either.

### Add a player

A player is a JS file in the `./players` directory that exposes a `move` function.
For example, this is a valid player that plays the first empty spot:

```js
module.exports = (signs, board) => board.indexOf(signs[0])
```

where:
* `signs` is a string of length 3:
  * `signs[0]` is a character marking empty cells
  * `signs[1]` is a character marking cells played by the current player
  * `signs[2]` is a character marking cells played by the opponent
* `board` is a string of length 9 that encodes the content of the board according to `signs`, (line by line)
* The return value is an integer between 0 and 8 that denotes the cell to play

For example, this board:

```
xo.
ox.
...
```
can be encoded as the `signs, board` pair `'.xo', 'xo.ox....'` or equivalently `'012', '120210000'`, and a return value of 8 (the last cell) would be a win for the current player (`x` or `1`).