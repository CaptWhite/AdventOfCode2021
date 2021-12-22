import fs from 'fs';
let input = fs
    .readFileSync('./day20.txt', { encoding: 'utf-8' })

const [input1, input2] = input.split('\r\n\r\n');
let algorithm = input1
let scanner   = input2
    .split('\r\n')
    .map(val => val.split('').map(it => (it=='#') ? '1' : '0'));

 
const expandBoard = (board) => {
    let newBoard = new Array(board.length+2).fill('0').map(() => new Array(board[0].length+2).fill('0'));
    newBoard = newBoard
      .map((row,idx1) => 
          row.map((val, idx2) => {
            if (idx1>0 && idx1<newBoard.length-1)
              if (idx2>0 && idx2<row.length-1) 
                val = board[idx1-1][idx2-1]
          return val
          } 
        ) 
      )
    return newBoard;
}

const contractBoard = (board) => {
    let newBoard = new Array(board.length-2).fill('0').map(() => new Array(board[0].length-2).fill('0'));
    newBoard = newBoard
      .map((row,idx1) => 
          row.map((val, idx2) => {
                val = board[idx1+1][idx2+1]
          return val
          } 
        ) 
      )
    return newBoard;
}
const applyAlgorithm = (board) => {
    board = expandBoard (board);
    let newBoard = new Array(board.length).fill('0').map(() => new Array(board[0].length).fill('0'));
    newBoard = newBoard
      .map((row,idx1) => 
        row.map((_, idx2) => {
          let resp = ((idx1>0 && idx1<newBoard.length-1) && (idx2>0 && idx2<row.length-1)) 
              ? board[idx1-1][idx2-1] + board[idx1-1][idx2+0] + board[idx1-1][idx2+1] +
                board[idx1+0][idx2-1] + board[idx1+0][idx2+0] + board[idx1+0][idx2+1] +
                board[idx1+1][idx2-1] + board[idx1+1][idx2+0] + board[idx1+1][idx2+1]
              : '000000000';

          const resp2 = (algorithm[parseInt(resp,2)] == '#') ? '1' : '0';
 //         if (idx1 == 2 || idx1 == 1) console.log(idx1, idx2, board[idx1+0][idx2+0], resp, resp2 ) 
          return resp2;
          } 
      ) 
       )
    newBoard = contractBoard(newBoard);
    return newBoard;
}

const draw = (board) => board.map(row => row.join('')).join('\r\n').replace(/0/gm, '.').replace(/1/gm, '#') + '\r\n'


let board = scanner;
//console.log(draw(board))
board = expandBoard (board);
board = applyAlgorithm(board);  console.log(draw(board))
board = expandBoard (board);
board = applyAlgorithm(board);  console.log(draw(board))




const cont = board
  .flat()
  .reduce((acum, rec) => (rec == '1') ? ++acum : acum, 0)


console.log('Parte 1:', cont)

/*
That's not the right answer; your answer is too low. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 5146.) [Return to Day 20]
That's not the right answer; your answer is too high. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 5728.) [Return to Day 20]
That's not the right answer. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Because you have guessed incorrectly 4 times on this puzzle, please wait 5 minutes before trying again. (You guessed 5095.) [Return to Day 20]
*/
