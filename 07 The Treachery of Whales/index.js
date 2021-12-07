/*#######################################
  # Día 7: La traición de las ballenas## --- #
  #######################################*/
import fs from 'fs';
const input = fs
  .readFileSync('./day7.txt', { encoding: 'utf-8' })
  .split(",")
  .map(x => Number(x))
  
// tabla de frecuencias de la entrada
const frequencies = [];      //  16,1,2,0,4,2,7,1,2,14
input.forEach(rec => {
  (frequencies.some( x => x.num === rec)) 
      ? frequencies.find(x => x.num === rec).rep = frequencies.find(x => x.num === rec).rep + 1
      : frequencies.push({'num': rec, 'rep': 1});
})

const quiz = (parte) => {
  // cálculo del consumo
  return frequencies
    .map( origen => 
      frequencies
        .map (destination => { 
          if (parte === 'part 1') return Math.abs(destination.num - origen.num) * destination.rep; 
          if (parte === 'part 2') return Math.abs(destination.num - origen.num) * (Math.abs(destination.num - origen.num) + 1) * destination.rep / 2;
        })
    .reduce((acum,rec) => acum+rec)   
    )
    .reduce((acum, rec) => (rec<acum) ? rec : acum, Infinity ); 
    ;
}

console.log( 'Parte 1', quiz('part 1'));
console.log( 'Parte 2', quiz('part 2'));
