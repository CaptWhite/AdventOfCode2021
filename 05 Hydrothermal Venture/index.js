/*#######################################
  # --- Day 5: Hydrothermal Venture --- #
  ######################################*/
import fs from 'fs';
const input = fs
  .readFileSync('./day5.txt', { encoding: 'utf-8' })
  .split("\r\n")
  .filter(x => x.length != 0)
  .map(row => /(\d+),(\d+) -> (\d+),(\d+)/gm.exec(row))
  .map(row => [Number(row[1]), Number(row[2]), Number(row[3]), Number(row[4])])

let rows = input
  .filter (col => (col[1] - col[3]) / (col[0] - col[2]) === 0 ||
                  !isFinite((col[1] - col[3]) / (col[0] - col[2])) ) ;

let [maxX, maxY] = rows
  .reduce((acum, rec) => {
    const xSup = (rec[0] > rec[2]) ? rec[0] : rec[2];
    const ySup = (rec[1] > rec[3]) ? rec[1] : rec[3];
    if (xSup>acum[0]) acum[0]=xSup;
    if (ySup>acum[1]) acum[1]=ySup;
    return acum;
  }, [0,0]
  );

let board = new Array(maxX + 1).fill(0).map(() => new Array(maxY + 1).fill(0));

rows.forEach(rec => {
    const slope = (rec[3] - rec[1]) / (rec[2] - rec[0]);
    if (slope === Infinity || slope === -Infinity ) {
      let limits = (rec[1] < rec[3]) ? [rec[1], rec[3]] : [rec[3], rec[1]]  
      for (let i=limits[0]; i<=limits[1]; i++)
        board[i][rec[0]] = board[i][rec[0]] + 1;

    } else if (slope === 0) {
      let limits = (rec[0] < rec[2]) ? [rec[0], rec[2]] : [rec[2], rec[0]]  
      for (let i=limits[0]; i<=limits[1]; i++)
        board[rec[1]][i] = board[rec[1]][i] + 1;
    }  
})

let res = board
  .flat(1)
  .reduce((acum,rec) => acum += Number(rec>1), 0)

console.log( 'Parte 1', res )

//  Parte 2   ***************************************************

rows = input
  .filter (col => (col[1] - col[3]) / (col[0] - col[2]) === 0 ||
                  Math.abs((col[1] - col[3]) / (col[0] - col[2])) === 1 ||
                  !isFinite((col[1] - col[3]) / (col[0] - col[2])) ) ;

[maxX, maxY] = rows
  .reduce((acum, rec) => {
    const xSup = (rec[0] > rec[2]) ? rec[0] : rec[2];
    const ySup = (rec[1] > rec[3]) ? rec[1] : rec[3];
    if (xSup>acum[0]) acum[0]=xSup;
    if (ySup>acum[1]) acum[1]=ySup;
    return acum;
  }, [0,0]
  );

board = new Array(maxX + 1).fill(0).map(() => new Array(maxY + 1).fill(0));

rows.forEach(rec => {
    const slope = (rec[3] - rec[1]) / (rec[2] - rec[0]);
    if (slope === Infinity || slope === -Infinity ) {
      let limits = (rec[1] < rec[3]) ? [rec[1], rec[3]] : [rec[3], rec[1]]  
      for (let i=limits[0]; i<=limits[1]; i++)
        board[i][rec[0]] = board[i][rec[0]] + 1;

    } else if (slope === 0) {
      let limits = (rec[0] < rec[2]) ? [rec[0], rec[2]] : [rec[2], rec[0]]  
      for (let i=limits[0]; i<=limits[1]; i++)
        board[rec[1]][i] = board[rec[1]][i] + 1;


    } else if (slope === 1 && rec[2] > rec[0]  ) {
      let x=rec[0], y=rec[1], inc=rec[2]-rec[0];
      for (let i=0; i<=inc; i++) {
        board[y][x] += 1;
        x++;
        y++;
      } 
    } else if (slope === 1 && rec[2] < rec[0]  ) {
    let x=rec[0], y=rec[1], inc=-(rec[2]-rec[0]);
    for (let i=0; i<=inc; i++) {
      board[y][x] += 1;
      x--;
      y--;
    } 
    } else if (slope === -1 && rec[2] > rec[0]  ) {
      let x=rec[0], y=rec[1], inc=(rec[2]-rec[0]);
      for (let i=0; i<=inc; i++) {
        board[y][x] += 1;
        x++;
        y--;
      } 
    } else if (slope === -1 && rec[2] < rec[0]  ) {
      let x=rec[0], y=rec[1], inc=-(rec[2]-rec[0]);
      for (let i=0; i<=inc; i++) {
        board[y][x] += 1;
        x--;
        y++;
      } 
    }  
})

res = board
  .flat(1)
  .reduce((acum,rec) => acum += Number(rec>1), 0)

console.log( 'Parte 2', res )
