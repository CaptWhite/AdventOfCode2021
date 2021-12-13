import fs from 'fs';
let input = fs
    .readFileSync('./day13.txt', { encoding: 'utf-8' })
    .split("\r\n")

const input1 = input
    .filter(text => text.length>0 && text.substring(0,1) != 'f')
    .map(val => val.split(','))
    .map(val => val.map(Number))

const input2 = input
    .filter(text => text.length>0 && text.substring(0,1) == 'f')
    .map(text => /fold along (\w)=(\d+)/gm.exec(text))
    .map(x => [x[1],Number(x[2])] )   

// turn 90 degrees
const turn90 = (board) => {
    const boardTurned = new Array(board[0].length).fill(0).map(() => new Array(board.length).fill('.'));
    for (let i=0; i<board.length; i++) 
        for (let j=0; j<board[0].length; j++)
            boardTurned[j][boardTurned[0].length-1-i] = board [i][j]
    return boardTurned;
}

// turn 270 degrees
const turn270 = (board) => {
    board = turn90 (board);
    board = turn90 (board);
    board = turn90 (board);
    return board;
}

const fold = (instrc) => { 
    const dimension = [Math.max(instrc[1], board.length-instrc[1]-1), board[0].length];
    const newBoard =  new Array(dimension[0]).fill(0).map(() => new Array(dimension[1]).fill('.'));
    newBoard
        .slice(0, instrc[1]-1)
        .forEach((_, idY) => newBoard[idY] = board[idY])
    board
        .slice(instrc[1]+1)
        .forEach((y, idY) => {
            y.forEach((_,idX) => {
                if (newBoard[instrc[1]-1-idY][idX] === '.' && board[idY+instrc[1]+1][idX] === '#')
                    newBoard[instrc[1]-1-idY][idX] = board[idY+instrc[1]+1][idX] 
            })    
        })
    return newBoard;
}    

const max = input1.reduce((acum, rec) => {
    if (rec[0]>acum[0]) acum[0] = rec[0];
    if (rec[1]>acum[1]) acum[1] = rec[1]; 
    return acum;}
    , [0,0])

//   Part O N E  ******************************
let board = new Array(max[1]+1).fill(0).map(() => new Array(max[0]+1).fill('.'));
input1.forEach(([x,y]) => board[y][x] = '#' ) 
input2
    .slice(0, 1)
    .forEach(instrc => {
        if (instrc[0] == 'x')  board = turn90(board);
        board = fold(instrc);
        if (instrc[0] == 'x')  board = turn270(board);
    })
console.log('Parte 1:', board.flat(1).reduce((acum,r) => (r=='#') ? ++acum : acum , 0));

//   Part T W O *******************************
board = new Array(max[1]+1).fill(0).map(() => new Array(max[0]+1).fill('.'));
input1.forEach(([x,y]) => board[y][x] = '#' ) 

input2.forEach(instrc => {
    if (instrc[0] == 'x')  board = turn90(board);
    board = fold(instrc);
    if (instrc[0] == 'x')  board = turn270(board);
})
console.log('Parte 2:',  board.map(lin => lin.toString().replace(/,/gm,'')))