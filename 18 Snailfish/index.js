// https://medium.com/noders/estructuras-de-datos-con-javascript-parte-1-pilas-stacks-5a2092cff16a
// https://github.com/Xabadu/js-data-structures
import { Console } from 'console';
import fs from 'fs';
let input = fs
    .readFileSync('./day18.txt', { encoding: 'utf-8' })
    .split("\r\n").filter(x => x.length != 0)
    .map(snail => snail.replace(/\s/gm,''))
    ;




class Stack {
  constructor() {
    this.stack = [];
  }
  push(element) {// Agrega un nueva calor a la pila	
    this.stack.push(element);
    return this.queue;
  }
  pop() {        // Retorna el último valor añadido a la pila y lo saca de ésta{
    return this.stack.pop();
  }
  peek(n=-1) {   // Retorna el último valor añadido a la pila sin sacarlo 	
    return this.stack[this.stack.length + n];
  }
  size() {       // Retorna el número de lelementos de la pila
    return this.stack.length;
  }
  isEmpty() {
    return this.stack.length === 0;
  }
  print() {     // Muestra el contenido de la pila
    return this.stack.reduce((acum, rec) =>  acum += rec, '');
  }
}

const explodeSnail = (inp) => {
  let input = inp;
  const stack = new Stack();
  let cont = 0 ;
  let isExplosion = false;
  let num1, num2;
  while (input.length != 0) {
    let resp = /(\[|\]|,|\d+).*/gm.exec(input)[1].toString();
    input = input.substring(resp.length);
    if (resp == '[') cont++;
    if (resp == ']') cont--;
    if (resp == ']' && cont >= 4 && !isExplosion) {
      isExplosion = true;
      num2 = stack.pop();
      stack.pop();
      num1 = stack.pop()
      stack.pop();

      const arr = [];
      let end = false;
      while (!end) {
        const elem = stack.pop();
        if (stack.size() != 0) {
          if (elem.substring(0,1)>='0' && elem.substring(0,1)<='9') {
            stack.push((Number(elem)+Number(num1)).toString())
            for (let item of arr) stack.push(item)
            break
          } else {
            arr.unshift(elem);
          }
        } else {
            stack.push(elem)
            for (let item of arr) stack.push(item)
            end = true;
        }
      }
      stack.push('0')        
    } else if (isExplosion && resp >='0' && resp <='9') {
        isExplosion = false;
        stack.push((Number(resp)+Number(num2)).toString());
        stack.push(input);
        input = '';
    } else {
        stack.push(resp);
    }
  }
  const out = stack.print();
  return [inp !== out, out];
}

const divideSnail = (inp) => {
  let input = inp
  let output = ''; 
  while (input.length != 0) {
    let resp = /(\[|\]|,|\d+).*/gm.exec(input)[1].toString();
    input = input.substring(resp.length);
    if (resp.substring(0,1) >='0' && resp.substring(0,1) <='9' && Number(resp)>9) {
      output += '[' + Math.floor(Number(resp)/2) + ',' + Math.ceil(Number(resp)/2) + ']';
      output += input;
      input = ''
    } else {
      output += resp;
    }
  }
  return [inp !== output, output];
}  

const reduceSnail = (input)  => {
  let snail = input;
  let end = false;
  while (!end) {
    const resp1 =  explodeSnail(snail);
    snail = resp1[1];
    if (!resp1[0]) {
      const resp2 =  divideSnail(resp1[1]);
      snail = resp2[1]
      if (!resp2[0]) {
        end = true;
      }
    }
  }
  return snail;
}

const verifySnail = (inp) => {
  let input = inp;
  const stack = new Stack();
  let cont = 0 ;
  let num1, num2;
  while (input.length != 0) {
    let resp = /(\[|\]|,|\d+).*/gm.exec(input)[1].toString();
    input = input.substring(resp.length);
    if (resp == ']' ) {
      num2 = stack.pop();
      stack.pop();
      num1 = stack.pop()
      stack.pop();
      stack.push((3*Number(num1) + 2*Number(num2)).toString())
    } else {
        stack.push(resp);
    }
  }
  const out = stack.print();
  return [inp !== out, out];
}

const addSnail = (input1, input2) => {
  return '[' + input1 + ',' + input2 + ']';
}

const magnitude = (input) => {
  let summation = input
    .reduce((acum,rec) => {
      let resp = addSnail(acum,rec);
      resp = (reduceSnail(resp))
      return resp;
    });
    return verifySnail(summation);
}
console.log('Parte 1:', magnitude(input))

let max = 0;
for (let i=0; i<input.length; i++) {
  for (let j=0; j<input.length; j++) {
    if (i != j) {
      const arr = [input[i],input[j]]
      const [_, magn] = magnitude(arr);
      if (Number(magn) > max)   max = Number(magn);
    }
  }
}
console.log('Parte 2:', max)