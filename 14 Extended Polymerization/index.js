import fs from 'fs';
let input = fs
    .readFileSync('./day14-test.txt', { encoding: 'utf-8' })

const [input1, input2] = input.split('\r\n\r\n');
let rules = input2.split('\r\n');
rules = rules
    .map(val => /(\w+) -> (\w)/gm.exec(val))
    .reduce((acc, curr) => {acc[curr[1]] = curr[2]; return acc}, {});

    let cont = 2
    for (let i=0; i<40; i++) {
        cont = cont + cont-1
        console.log(cont)
    }

let polymer = input1.split('');
const generations = 5;
let contN = 0
const calculate = (polymer, times)  => {
      
    if (times == 0) return;
    if (rules[polymer]) {
        if (rules[polymer] === 'N') contN++ 
        console.log('contN:', contN, 'newPol:', polymer.substring(0,1) + rules[polymer], 'times:', times)
        calculate( polymer.substring(1,0) + rules[polymer], times-1); 
    }
    //calculate( polymer.substring(2,1) + rules[polymer], times-1);
    console.log('polymer', polymer, 'times:', times)    
}






const res = calculate('NB', generations);




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
for (let i=0; i<10; i++) {
    console.log(i)
    newPolymer = step(newPolymer);
    const components = [...new Set(newPolymer)];
    const newPolymerArray = newPolymer.split('') 
    const quantities = components
        .map(comp => newPolymerArray.reduce((acum, curr) => (curr === comp) ? ++acum : acum,0));

    const difference = Math.max(...quantities) - Math.min(...quantities);    

    console.log('Parte 1:', newPolymer.length, components, quantities, difference );


}

const components = [...new Set(newPolymer)];
const newPolymerArray = newPolymer.split('') 
const quantities = components
    .map(comp => newPolymerArray.reduce((acum, curr) => (curr === comp) ? ++acum : acum,0));

const difference = Math.max(...quantities) - Math.min(...quantities);    


//console.log('Parte 1:', rules, newPolymer, newPolymer.length, components, quantities, difference );

