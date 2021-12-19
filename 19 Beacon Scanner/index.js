import { Console } from 'console';
import fs from 'fs';
let input = fs
    .readFileSync('./day18.txt', { encoding: 'utf-8' })
    .split("\r\n").filter(x => x.length != 0)
    .map(snail => snail.replace(/\s/gm,''))
    ;



console.log('Parte 1:')
