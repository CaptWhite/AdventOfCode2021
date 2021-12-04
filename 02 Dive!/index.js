/*##############################
  # ---    Day 2: Dive!    --- #
  ##############################*/
import fs from 'fs';

const input = fs.readFileSync('./day2.txt', { encoding: 'utf-8' })
                .split("\r\n").filter(x => x.length != 0);

let res = input
  .map(rec => rec.split(' '))
  .reduce((acum, rec) => {
    if (rec[0] === 'forward') acum.x += Number(rec[1]); 
    if (rec[0] === 'down')    acum.z += Number(rec[1]); 
    if (rec[0] === 'up')      acum.z -= Number(rec[1]); 
    return acum;
  }, {'x': 0, 'z': 0}
  );
console.log('Parte 1:', res, '->', res.x * res.z );

res = input
  .map(rec => rec.split(' '))
  .reduce((acum, rec) => {
    if (rec[0] === 'forward') {acum.x += Number(rec[1]); acum.z += Number(rec[1]) * acum.aim};    
    if (rec[0] === 'down')    acum.aim += Number(rec[1]); 
    if (rec[0] === 'up')      acum.aim -= Number(rec[1]); 
    return acum;
  }, {'x': 0, 'z': 0, 'aim': 0}
  );
  console.log('Parte 2:', res, '->', res.x * res.z );
