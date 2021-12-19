import fs from 'fs';
let input = fs
    .readFileSync('./day15-test.txt', { encoding: 'utf-8' })

const [input1, input2] = input.split('\r\n\r\n');
let rules = input2.split('\r\n');
rules = rules
    .map(val => /(\w+) -> (\w)/gm.exec(val))
    .reduce((acc, curr) => {acc[curr[1]] = curr[2]; return acc}, {});




//console.log('Parte 1:', rules, newPolymer, newPolymer.length, components, quantities, difference );

