import fs from 'fs';
let input = fs
    .readFileSync('./day14-test.txt', { encoding: 'utf-8' })
    .split("\r\n")


console.log('Parte 1:', board.flat(1).reduce((acum,r) => (r=='#') ? ++acum : acum , 0));
