/*##############################
  # --- Day 1: Sonar Sweep --- #
  ##############################*/
import fs from 'fs';

const input = fs.readFileSync('./day1.txt', { encoding: 'utf-8' })
                .split("\r\n").filter(x => x.length != 0)
                .map(x => parseInt(x));

let res = input
    .map( (x, index, array) => (index===0 ) ? x : x - array[index-1])  
    .reduce ((acum, rec) => (rec > 0) ? ++acum : acum, 0)
    
console.log('Parte 1:', res-1);

res = input
    .map( (x, index, array) => (index<array.length-2) ? x + array[index+1] + array[index+2] : 0)
    .map( (x, index, array) => (index===0 ) ? x : x - array[index-1]) 
    .reduce ((acum, rec) => (rec > 0) ? ++acum : acum, 0)
    
console.log('Parte 2:', res-1);