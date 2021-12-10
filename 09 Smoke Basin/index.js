/*##################################
  # --- Día 9: Cuenca de humo --- ## 
  #################################*/
  import fs from 'fs';
  const input = fs
    .readFileSync('./day9.txt', { encoding: 'utf-8' })
    .split("\r\n")
    .filter(x => x.length != 0)
    .map(val => val.split('').map(Number));
  
    let board = new Array(input.length+2).fill(0).map(() => new Array(input[0].length+2).fill(9));
    board = board
      .map((row,idx1) => 
          row.map((val, idx2) => {
            if (idx1>0 && idx1<board.length-1)
              if (idx2>0 && idx2<row.length-1) 
                val = input[idx1-1][idx2-1]
          return val
          } 
        ) 
      )
  
  const lowPoint = [];
  let lowCoord = [];
  for (let i=1; i<board.length-1; i++) {
    for (let j=1; j<board[0].length-1; j++) {
      if (board[i][j] < board[i-1][j] &&  board[i][j] < board[i+1][j]  
      && board[i][j] < board[i][j-1] &&  board[i][j] < board[i][j+1]) {
      lowPoint.push(board[i][j]); 
      lowCoord.push([i-1,j-1])
      }
    }
  }
      
  const resp1 = lowPoint
    .reduce ((acum, rec) => acum + Number(rec) + 1, 0)
      
  console.log( 'Parte 1', lowPoint, resp1 ); 
  
    // ************   PARTE 2 ************
  // ***********************************
  
    const initBoard = () => {
    board = new Array(input.length+2).fill(0).map(() => new Array(input[0].length+2).fill(9));
    board = board
      .map((row,idx1) => 
          row.map((val, idx2) => {
            if (idx1>0 && idx1<board.length-1)
              if (idx2>0 && idx2<row.length-1) {
                val = (input[idx1-1][idx2-1] === 9) ? 9 : 0;
              }
          return val
          } 
        ) 
      )
  }
  
  const limits = (direction, point) => {      
    let limI=0, limS=0, lims = [];
    let ended = false;
    const pos = (direction === 'H') ? 1 : 0;
    for (let i=point[pos]; !ended; i--) {      
      if (direction === 'H') if (board[point[0]][i] === 9) ended = true;  // busca posiciones 'x' por izquierda que continen un 9
      if (direction === 'V') if (board[i][point[1]] === 9) ended = true;  // busca posiciones 'y' por arriba    que continen un 9
      limI = i;
    }
    ended = false;
    for (let i=point[pos]; !ended; i++) {      
      if (direction === 'H') if (board[point[0]][i] === 9) ended = true;  // busca posiciones 'x' por derecha que continen un 9
      if (direction === 'V') if (board[i][point[1]] === 9) ended = true;  // busca posiciones 'y' por derecha que continen un 9
      limS = i;
    }
  
    for (let i=limI+1; i<=limS-1; i++) {
      if (direction === 'H') lims.push([point[0],i])
      if (direction === 'V') lims.push([i,point[1]])
    }
    return lims;                                    // devuelve los puntos comprendidos entre 9's
  }
  
  // ********************************************************************
  
  
  const buffHor = [], buffVer = []
  const orientation = (direction, flooded, input ) => {
    let sal = []
    if ( (direction === 'H' && buffHor.includes(input)) || 
         (direction === 'V' && buffVer.includes(input))) {
      sal = []
    } else {
      (direction === 'H') ? buffHor.push(input) : buffVer.push(input); 
      if (flooded)
        flooded = false;
      let points = [];
      for (let point of input) {

        (direction === 'H') ? points = limits('H', point) : points = limits('V', point)
        sal = [sal, points].map(x=>x.map(x=>x.toString()))
        sal = [...new Set(sal)].flat(1)
        sal = sal.map(x=>x.split(',').map(Number))
        for (let item of points) {
          if (board[item[0]] [item[1]] === 0) {  flooded = true};
          board[item[0]] [item[1]] = 1;
        }
      }
    }
    sal = sal.map(x=>x.toString())
    sal = [...new Set(sal)].flat(1)
    sal = sal.map(x=>x.split(',').map(Number))
    return sal;
  }
  
  const process = (points) => {
//  console.log('points', points)
    initBoard();
    let suma = 0, sumaAnt = 0
    do {
      points = orientation('V',false, points);
      points = orientation('H', false, points);
      sumaAnt = suma
      suma = board.flat(1).reduce((a,r) => (r===1) ? ++a : a, 0)
    } while (suma > sumaAnt )

    return board.flat(1).reduce((acum,rec) => (rec === 1) ? ++acum : acum , 0)
  }
//lowCoord = [[3, 3]]
let resp2 = lowCoord
    .map(val => process([[val[0]+1, val[1]+1]]))
    .sort(function(a, b){return b-a});
  
  console.log( 'Parte 2', resp2[0], resp2[1], resp2[2], resp2[0] * resp2[1] * resp2[2])