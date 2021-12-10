/*##################################
  # --- Día 9: Cuenca de humo --- ## 
  #################################*/
import fs from 'fs';
const input = fs
  .readFileSync('./day10.txt', { encoding: 'utf-8' })
  .split("\r\n")
  .filter(x => x.length != 0)

  const verificar1 = (val) => {
    let resto = val;
    for (let i=0;;) {
      const iter = resto.replace(/<>|{}|\[]|\(\)/gm,'')
      if (iter === resto)
        break
      else
        resto = iter; 
    }
    let exit = resto.match(/>|}|\]|\)/gm);
    exit = (exit === null) ? '' : exit[0].substring(0,1);
    return exit;
  
  }
  
  const quiz1 = input
    .map( verificar1)
    .filter(val => val != '')
    .reduce((a, v) => (v==')' ? a+=3 : v==']' ? a+=57 : v=='}' ? a+=1197 : a+25137), 0)
  
    console.log ('Parte 1:', quiz1)
  
// ****************    PART TWO   **********************  

const verificar2 = (val) => {
  let resto = val;
  for (let i=0;;) {
    const iter = resto.replace(/<>|{}|\[]|\(\)/gm,'')
    if (iter === resto)
      break
    else
      resto = iter; 
  }
  let exit = resto.match(/>|}|\]|\)/gm);
  exit = (exit === null) ? resto : '';
  return exit;
}
const quiz2 = input
  .map( verificar2)
  .filter(val => val != '')
  .map(val => val.split('').reverse().join().replace(/,/gm, '')
                 .replace(/\(/gm, ')').replace(/\[/gm, ']')
                 .replace(/{/gm, '}').replace(/</gm, '>')
                 .split('')     
                 .reduce((a, r) => (r==')') ? a=a*5+1 : (r==']') ? a=a*5+2 : (r=='}') ? a=a*5+3 : a=a*5+4, 0)                 
                 )
  .sort((a, b) => b-a) 

  console.log ('Parte 2:', quiz2[(quiz2.length-1)/2])
