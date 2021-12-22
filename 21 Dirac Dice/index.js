import fs from 'fs';
let input = fs
    .readFileSync('./day21-test.txt', { encoding: 'utf-8' })
    .split('\r\n')
//    .map(val => val.match(/Player \d starting position: (\d+)/gm))
    .map(val => Number(/Player \d starting position: (\d+)/gm.exec(val)[1]))

console.log(input)

const player1 = {'position': input[0], 'score':0};
const player2 = {'position': input[1], 'score':0}; 
let wins1 = 0, wins2 = 0;
const top=21
let punctuation, dice ;
  
const move = (players, level) => { 
  const newPlayers = [];
  for (let dim=0; dim<3**level; dim++) {
//    console.log('level', level, players.length);
    const [player1, player2] = [...players[3**level-1]];
    for (let dice=1; dice<4; dice++ ) {
//      console.log('level', level, 'dice', dice);
      punctuation = (player1.position + dice - 1) % 10 + 1;
      player1.position = punctuation;
      player1.score += punctuation;
      punctuation = (player2.position + dice - 1) % 10 + 1;
      player2.position = punctuation;
      player2.score += punctuation;
      if (player1.score > player2.score)      wins1++;
      else if (player1.score < player2.score) wins2++;
      newPlayers.push([player1, player2]) 
    }
  }
  level++;
  if (level == 20) 
      return
  move(newPlayers, level)
}

move([[player1, player2]], 0);
console.log('wins:', wins1,wins2)


  
