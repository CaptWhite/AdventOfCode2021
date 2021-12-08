/*##################################
  # Day 8: Seven Segment Search   ## 
  #################################*/
import fs from 'fs';
const input = fs
  .readFileSync('./day8.txt', { encoding: 'utf-8' })
  .split("\r\n")

let output = input
  .map(display => display.split(' | ')[1])
  .map(display => display.split(' ')
     .map(display => display.length))
  .flat(1)
  .reduce((acum,rec) => 
      (rec===2 || rec===3 || rec===4 || rec===7 ) ?  ++acum : acum, 0  )

console.log( 'Parte 1', output);   // 495


const conversor = (vals) => {
    const segments = new Array(input.length).fill('');
    const segm5 = [];
    const segm6 = [];

    // 6 => Tiene seis segmentos y no contiene los dos del 1  
    const buscar6 = () => {
      for (const [index, value] of segm6.entries()) {
        let cont = 0
        for (let i=0; i<value.length; i++) 
          for (let j=0; j<segments[1].length; j++) 
            if (value.substring(i,i+1) === segments[1].substring(j,j+1) ) 
              cont ++
        if (cont < 2)
          segments[6] = segm6[index]; 
      }
    }

    // 3 => Tiene cinco segmentos y si contiene los dos del 1  
    const buscar3 = () => {
      for (const [index, value] of segm5.entries()) {
        let cont = 0
        for (let i=0; i<value.length; i++) 
          for (let j=0; j<segments[1].length; j++) 
            if (value.substring(i,i+1) === segments[1].substring(j,j+1) ) 
              cont ++
        if (cont === 2)
          segments[3] = segm5[index]; 
      }
    }

    // 9 => Tiene seis segmentos y si contiene los cuatro del 4  
    const buscar9 = () => {
      for (const [index, value] of segm6.entries()) {
        let cont = 0
        for (let i=0; i<value.length; i++) 
          for (let j=0; j<segments[4].length; j++) 
            if (value.substring(i,i+1) === segments[4].substring(j,j+1) ) 
              cont ++
        if (cont === 4)
          segments[9] = segm6[index]; 
      }
    }

      // 5 => Tiene cinco segmentos y contiene cinco de los seis del 9 y no es el 3 
      const buscar5 = () => {
        for (const [index, value] of segm5.entries()) {
          let cont = 0
          for (let i=0; i<value.length; i++) 
            for (let j=0; j<segments[9].length; j++) 
              if (value.substring(i,i+1) === segments[9].substring(j,j+1) ) 
                cont ++
          if (cont === 5 && value !== segments[3])
            segments[5] = segm5[index]; 
        }
      }

      // 2 => Tiene cinco segmentos y no es el 3 ni el 5
      const buscar2 = () => {
        for (const [index, value] of segm5.entries()) 
          if (!segments.includes(value)) 
            segments[2] = segm5[index];
      }

      // 0 => Tiene cinco segmentos y no es el 6 ni el 9
      const buscar0 = () => {
        for (const [index, value] of segm6.entries()) 
          if (!segments.includes(value)) 
            segments[0] = segm6[index];
      }  

    for (let seg of vals ) {
      if (seg.len === 2)  segments[1] = seg.sgm;
      if (seg.len === 3)  segments[7] = seg.sgm;
      if (seg.len === 4)  segments[4] = seg.sgm;
      if (seg.len === 5)  segm5.push(seg.sgm);
      if (seg.len === 6)  segm6.push(seg.sgm);
      if (seg.len === 7)  segments[8] = seg.sgm;
    }
    buscar6();
    buscar3(); 
    buscar9();
    buscar5();
    buscar0(); 
    buscar2();
    return segments;    
};

const left = input
  .map(display => display.split(' | ')[0])                      // separa la parte izquierda del enunciado
  .map(display => display.split(' ')                            // separa los 10 dígitos que van del 0 al 9 sin orden
    .map(display => ({'sgm':display.split('').sort().join(''),
                      'len':display.length}))                   // se etiqueta cada código con su longitud
  ).map( vals => conversor(vals))                               // rutina que convierte cada código en un número
                                                                // devuelve los códigos en un array de 10 en función de su valor
  

const right = input
  .map(display => display.split(' | ')[1])                      // separa la parte derecha del enunciado
  .map(display => display.split(' ')                            // separa los 4 dígitos de cada pantalla 
    .map(display => display.split('').sort().join('')))         // se ordenan para poder comparalos mas tarde
  .map((val, idx) => {                                          // se codifica cada código con un número según lo
    const res = [];                                             //    calculado en la parte izquierda del enunciado  
    for (let item of val) res.push(left[idx].indexOf(item)) 
    return res;
    })
  .map(val => Number(val.reduce((acum, rec) => acum+rec, '')))  // converte el array de números en un número
  .reduce((acum,rec) => acum+rec, 0);                           // sumatorio de todos los números

  
console.log( 'Parte 2', right);   // 495

