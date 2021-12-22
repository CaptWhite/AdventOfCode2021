import fs from 'fs';
let input = fs
    .readFileSync('./day22.txt', { encoding: 'utf-8' })
    .split('\r\n')
    .map(val => /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/gm.exec(val))
    .map(val => ({ 'action': val[1], 'x': [Number(val[2]), Number(val[3])], 'y': [Number(val[4]), Number(val[5])], 'z': [Number(val[6]), Number(val[7])]}))

let board = new Array(101).fill()
           .map(() => new Array(101).fill()
           .map(() => new Array(101).fill(0)));

for (const step of input) {

  if (!((step.x[0] < -50 &&  step.x[1] < -50) || (step.x[0] > 50 &&  step.x[1] > 50) || 
        (step.y[0] < -50 &&  step.y[1] < -50) || (step.y[0] > 50 &&  step.y[1] > 50) ||
        (step.z[0] < -50 &&  step.z[1] < -50) || (step.z[0] > 50 &&  step.z[1] > 50) )) {
    console.log(step)
    for (let i=step.x[0]; i<=step.x[1]; i++ ) {
      for (let j=step.y[0]; j<=step.y[1]; j++ ) {
        for (let k=step.z[0]; k<=step.z[1]; k++ ) {
          const res = (step.action == 'on') ? 1 : 0;
          board[i+50][j+50][k+50] = res;
        }
      }
    }
  }
}  

const cont =board
  .flat()
  .flat()
  .flat()
  .reduce((a,b) => Number(a)+Number(b), 0)
console.log('cont', cont)
  
