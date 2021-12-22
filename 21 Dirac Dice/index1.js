import fs from 'fs';
let input = fs
    .readFileSync('./day21.txt', { encoding: 'utf-8' })
    .split('\r\n')
//    .map(val => val.match(/Player \d starting position: (\d+)/gm))
    .map(val => Number(/Player \d starting position: (\d+)/gm.exec(val)[1]))

console.log(input)

const player1 = {'position': input[0], 'score':0};
const player2 = {'position': input[1], 'score':0}; 
for (let dice=1; ; dice=dice+6) {
  let punctuation = (player1.position + dice+0 + dice+1 + dice+2 - 1) % 10 + 1;
  player1.position = punctuation;
  player1.score += punctuation;
  console.log('P1:', dice, dice+1, dice+2, player1)
  if (player1.score>999) {
    player1.wins = true;
    player1.times = dice+2;
    player2.times = dice-1;
    break;
  }    
  
  punctuation = (player2.position + dice+3 + dice+4 + dice+5 - 1) % 10 + 1;
  player2.position = punctuation;
  player2.score += punctuation;
  console.log('P2:', dice+3, dice+4, dice+5, player2)
  if (player2.score>999) {
     player2.wins = true;
     player2.times = dice+5;
     player2.times = dice+2;
     break;
  }
}

let resp = 0; 
if (player1.wins)  resp = player1.times * player2.score;
if (player2.wins)  resp = player2.times * player1.score;
console.log('resp:',resp);

console.log(player1, player2, player1.times * player1.score, player2.times * player2.score )
