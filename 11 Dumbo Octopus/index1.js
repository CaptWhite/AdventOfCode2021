/*##################################
  # --- Día 11: Pulpo Dumbo   --- ## 
  #################################*/
import fs from 'fs';
let input = fs
  .readFileSync('./day11.txt', { encoding: 'utf-8' })
  .split("\r\n")
  .filter(x => x.length != 0)
  .map(val => val.split('').map(Number));

const board = input;
let cont = 0;
const flash = (point) => {
  cont++;
  const [x,y] = point;
  for (let i=x-1; i<=x+1; i++)
    for (let j=y-1; j<=y+1; j++) {
      if (i>-1 && j>-1 && i<board[0].length && j<board.length
        && (i!=x || j!=y)) {
          if (board[i][j] == 0) {}
          else if (board[i][j] == 9) {board[i][j] = 0; flash([i,j])  }
          else board[i][j] += 1 
      }
    }
}

for (let i=0; i<100; i++) {
  const list = []
  board
    .map((x, i) => x.map((x, j) => {
        if (board[i][j] === 9) {
          board[i][j] = 0;
          list.push([i,j])
        } else 
        board[i][j] += 1;
      })
    )
    
  list.map(flash)
}


console.log ('Parte 1:', board, cont)


