/*####################################
  # ---  Day 4: Calamar gigante   --- #
  ####################################*/

  import fs from 'fs';
  const input = fs.readFileSync('./day4.txt', { encoding: 'utf-8' })
                  .split("\r\n").filter(x => x.length != 0)
  
  const numTabs = (input.length - 1) / 5;                
  const numbers = input[0].split(',');
  const tabs = new Array(numTabs).fill(0).map(() => new Array(5).fill([]));
  for (let i=0; i<5; i++) 
  for (let j=0; j<numTabs; j++)
    tabs[j][i]=input[i+1+j*5].replace(/\s\s/gm,' ').replace(/^\s/gm,'').split(' ')
  
  let conts = new Array(numTabs).fill(0).map(() => new Array(2).fill(0).map(() => new Array(5).fill(0)));
  
  //   Parte 1
  let winner = {'tab':-1, 'number': -1};
  let ended = false;
  for (let number of numbers) 
  for (let tab=0; tab<tabs.length && !ended; tab++)
  for (let raw=0; raw<5 && !ended; raw++)
  for (let col=0; col<5 && !ended; col++)
    if (tabs[tab][raw][col] === number) {
      tabs[tab][raw][col]=-tabs[tab][raw][col];
      conts[tab][0][raw]++; 
      conts[tab][1][col]++; 
      if (conts[tab][0][raw] === 5 || conts[tab][1][col]===5) {
          console.log(number, tab, raw, col )
          winner = {'tab':tab, 'number': number}; 
          ended = true
      }   
    }
  
  let suma = tabs[winner.tab].flat(1).reduce((acum,rec) => (rec >0 ) ? acum+=Number(rec) : acum, 0);
  console.log( 'Parte 1', winner, suma, suma*winner.number )
  
//   Parte 2

for (let i=0; i<5; i++) {
  for (let j=0; j<numTabs; j++)
  tabs[j][i]=input[i+1+j*5].replace(/\s\s/gm,' ').replace(/^\s/gm,'').split(' ')
}
conts = new Array(numTabs).fill(0).map(() => new Array(2).fill(0).map(() => new Array(5).fill(0)));


let loser = {'tab':-1, 'number': -1};
const winners = new Array(numTabs).fill(0)
ended = false;
for (let number of numbers) 
for (let tab=0; tab<tabs.length && !ended; tab++)
for (let raw=0; raw<5 && !ended; raw++)
for (let col=0; col<5 && !ended; col++)
  if (tabs[tab][raw][col] === number) {
    if (number === 24)
      number = 24;
    tabs[tab][raw][col]=-tabs[tab][raw][col];
    conts[tab][0][raw]++; 
    conts[tab][1][col]++; 
    if (conts[tab][0][raw] === 5 || conts[tab][1][col]===5) {
        winners[tab] = 1;
        if (winners.reduce((acum,rec) => acum+rec,0) === numTabs) {
          loser = {'tab':tab, 'number': number}; 
          ended = true;
        }
    }   
  }
suma = tabs[loser.tab].flat(1).reduce((acum,rec) => (rec >0 ) ? acum+=Number(rec) : acum, 0);
console.log( 'Parte 2', loser, suma, suma*loser.number )
