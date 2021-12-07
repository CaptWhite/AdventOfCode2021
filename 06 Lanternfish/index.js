/*#######################################
  # --- Day 5: Hydrothermal Venture --- #
  ######################################*/

import fs from 'fs';
const input = fs
  .readFileSync('./day6.txt', { encoding: 'utf-8' })
  .split(",")

// Parte 1: numDias =  80
// Parte 2: numDias = 256
const numDias = 80
const initDays = numDias + 1
let initValue = 0

const calculateNewState = (days, state) => {
  let newGen = false
  for (let day=1; day<=days; day++) {
    calendar[initValue][initDays-days+day-1] = calendar[initValue][initDays-days+day-1] + 1;

    if (state === 0) {
      state = 6;
      newGen = true
    } else if (newGen) {
      newGen = false;
      calculateNewState(days-day+1, 8);
      state -= 1;
    } else 
      state -= 1;
  }
};

// Desarrollo de cada uno de los posibles items
let calendar = new Array(7).fill(0).map(() => new Array(initDays).fill(0));
[1,2,3,4,5,6].forEach(rec => {
  let dias = initDays;
  initValue = rec;
  calculateNewState(dias, rec);
  }
)

const resp = calendar
  .map((digit, idx) => digit[numDias] * input.filter(x=>Number(x)===idx).reduce((a,b) => ++a, 0))
  .reduce((acum, rec) => acum + rec, 0);

console.log( 'Parte 2', resp);
