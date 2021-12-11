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

let ended = false;
let quiz1 = -1, quiz2 = -1;
let cont = 0;
for (let i=0; !ended; i++) {
  const list = []
  board.map((x, i) => x.map((x, j) => {
    if (board[i][j] === 9) {
      board[i][j] = 0;
      list.push([i,j])
    } else 
    board[i][j] += 1;
  }))
    
  list.map(flash)

  if (i===(100-1)) quiz1 = cont;
  const sum = board.flat(1).reduce((a,r) => a+=r, 0);
  if (sum===0) {ended=true; quiz2=i+1};   
}

console.log ('Parte 1:', quiz1)
console.log ('Parte 2:', quiz2)