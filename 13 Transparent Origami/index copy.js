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

const max = input1.reduce((acum, rec) => {
    if (rec[0]>acum[0]) acum[0] = rec[0];
    if (rec[1]>acum[1]) acum[1] = rec[1]; 
    return acum;}
    , [0,0])

let board = new Array(max[1]+1).fill(0).map(() => new Array(max[0]+1).fill('.'));
input1.forEach(([x,y]) => board[y][x] = '#' ) 
    
// turn 90 degrees
const turn = (board) => {
    const boardTurned = new Array(board[0].length).fill(0).map(() => new Array(board.length).fill('.'));
    for (let i=0; i<board.length; i++) 
        for (let j=0; j<board[0].length; j++)
            boardTurned[j][boardTurned[0].length-1-i] = board [i][j]
    return boardTurned;
}
turn(board) 

// vertical fold
let newBoard = [];
input2.forEach(folder => {
    if (folder[0] == 'x') 
        board = turn(board);

    if (folder[0] == 'y' || folder[0] == 'x') {
        const dimension = [Math.max(folder[1], board.length-folder[1]-1), board[0].length];
        newBoard =  new Array(dimension[0]).fill(0).map(() => new Array(dimension[1]).fill('.'));
        newBoard.slice(0, folder[1]-1)
        newBoard.forEach((_, idY) => newBoard[idY] = board[idY])

        console.log('newBoard1:', newBoard);

        board.slice(folder[1]+1)
        .forEach((y, idY) => {
            y.forEach((x,idX) => {
                if (newBoard[folder[1]-1-idY][idX] === '.' && board[idY+folder[1]+1][idX] === '#')
                    newBoard[folder[1]-1-idY][idX] = board[idY+folder[1]+1][idX] 
            })    
        })
    }
    console.log('newBoard2:', newBoard.flat(1).reduce((acum,r) => (r=='#') ? ++acum : acum , 0));

})
