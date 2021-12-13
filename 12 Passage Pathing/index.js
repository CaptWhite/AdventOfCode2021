/*######################################
  # --- Day 12: Passage Pathing   --- ## 
  #####################################*/
import fs from 'fs';
let input = fs
  .readFileSync('./day12.txt', { encoding: 'utf-8' })
  .split("\r\n")
  .filter(x => x.length != 0)
  .map(val => val.split('-'));

const board = input;

const vertices = [];
board.forEach(inpx => {inpx.forEach(inp => {if (!vertices.includes(inp)) vertices.push(inp)});})

let adjacent = {};
vertices.forEach(vertexA => {
    adjacent[vertexA] = [];
    board.forEach(vertexB => { 
      if (vertexA === vertexB[0])  adjacent[vertexA].push(vertexB[1]); 
      if (vertexA === vertexB[1])  adjacent[vertexA].push(vertexB[0]); 
    });
});

let paths = [];
const buildPaths = (path) => {
  if (path[path.length - 1] === 'end') 
    paths.push(path);
  else {
    const adjs = adjacent[path[path.length - 1]];
    adjs.forEach( adj => {
      if (adj === 'start' || (adj > '`' && adj < '{' && path.includes(adj))) {
      } else {
        buildPaths([...path, adj])
      }
    })
  }
}  
buildPaths(['start'])
console.log ('Parte 1:', paths.length)

//    Part TWO

paths = [];
const buildPaths2 = (path) => {
  if (path[path.length - 1] === 'end') 
    paths.push(path);
  else {
    const smallCaves = {};
    path.forEach(vertex => {
      if (vertex !== 'start' && (vertex > '`' && vertex < '{' )) {
        (smallCaves[vertex]) ? smallCaves[vertex]++ : smallCaves[vertex]=1; 
      }
    })

    const twoVisits = Object.values(smallCaves).filter(it => it == 2).length;
    if (twoVisits > 1) { return}
    const adjs = adjacent[path[path.length - 1]];
    adjs.forEach( adj => {
      if (adj !== 'start' && smallCaves[adj] != 2 ) {
        buildPaths2([...path, adj])
      }
    })
  }
}  
buildPaths2(['start'])
console.log ('Parte 2:', paths.length)