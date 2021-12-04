/*####################################
  # --- Day 3: Binary Diagnostic --- #
  ####################################*/

import fs from 'fs';
const input = fs.readFileSync('./day3.txt', { encoding: 'utf-8' })
                .split("\r\n").filter(x => x.length != 0)

const part1 = (input, maxmin=1) => {       // maxim = 1 ->  buscar mayor numero coincidencias;   maxim = 0 ->  buscar menor numero coincidencias;   
  return input                             // [ '00100', '11110', ... ]
    .map(x => [...x])                      // [ [ '0', '0', '1', '0', '0' ], [ '1', '1', '1', '1', '0' ], ...]
    .reduce((acum, rec) => {   
        rec.forEach((n, idx) => acum[idx]+=Number(n));
        return acum;
      }, new Array(input[0].length).fill(0)
      )                                   // [ 7, 5, 8, 7, 5 ]
    .map(x => { 
        if (x>input.length/2) return Number(maxmin === 1);   
        if (x<input.length/2) return Number(maxmin !== 1);  
        if (x=input.length/2) return maxmin;
      })                                  // [ 1, 0, 1, 1, 0 ]
    .reduce((acum, rec) => {
        acum[0]+=rec;
        acum[1]+=(rec+1)%2;
        return acum;                      
      }, ['', '']  )                      // [ '10110', '01001' ]
    .map( binary => parseInt(binary, 2))  // [22, 9]  
}

let res =  part1(input);
console.log('Parte 1:', res[0], res[1], res[0]*res[1]);

//  ************************************************************

let input21 = input;
for (let i= 0; input21.length !== 1; i++) {
  const [maxTimesValue, ] = part1(input21, 1)
    .map( val => val.toString(2).padStart(input[0].length,'0'))
  input21 = input21.filter(x => x[i]===maxTimesValue.substring(i,i+1))
}  

let input22 = input;
for (let i= 0; input22.length !== 1; i++) {
  const [minTimesValue, ]  = part1(input22, 0)
    .map( val => val.toString(2).padStart(input[0].length,'0'))
  input22 = input22.filter(x => x[i]===minTimesValue.substring(i,i+1))
}  

console.log('Parte 2:', input21[0], input22[0], parseInt(input21, 2)*parseInt(input22, 2));
