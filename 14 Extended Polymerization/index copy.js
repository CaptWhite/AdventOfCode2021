import fs from 'fs';
let input = fs
    .readFileSync('./day14-test.txt', { encoding: 'utf-8' })

const [input1, input2] = input.split('\r\n\r\n');
let rules = input2.split('\r\n');
rules = rules
    .map(val => /(\w+) -> (\w)/gm.exec(val))
    .reduce((acc, curr) => {acc[curr[1]] = curr[2]; return acc}, {});

let polymer = input1.split('');

const step = (polymer) => {
    let newPolymer = [];
    for (let i=0; i<polymer.length-1; i++) {
        newPolymer.push(polymer[i])
        const pair = polymer[i] + polymer[i+1];
        if (rules[pair]) newPolymer.push(rules[pair]) 
    }
    newPolymer.push(polymer[polymer.length-1])
    return newPolymer.join().replace(/,/gm,'')
}

let newPolymer = polymer;
for (let i=0; i<5; i++) {
    console.log(i)
    newPolymer = step(newPolymer);
    console.log(newPolymer)
}

const components = [...new Set(newPolymer)];
newPolymer = newPolymer.split('') 
const quantities = components
    .map(comp => newPolymer.reduce((acum, curr) => (curr === comp) ? ++acum : acum,0));

const difference = Math.max(...quantities) - Math.min(...quantities);    

console.log('Parte 1:', rules, newPolymer, newPolymer.length, components, quantities, difference );

