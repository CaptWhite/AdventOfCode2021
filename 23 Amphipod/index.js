// import fs from 'fs';
// let input = fs
//     .readFileSync('./day23.txt', { encoding: 'utf-8' })
//     .split('\r\n')
//     .map(val => /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/gm.exec(val))
//     .map(val => ({ 'action': val[1], 'x': [Number(val[2]), Number(val[3])], 'y': [Number(val[4]), Number(val[5])], 'z': [Number(val[6]), Number(val[7])]}))


//     "use strict";

// // ========================= //
// // = Copyright (c) NullDev = //
// // ========================= //

// /* eslint-disable consistent-return, no-param-reassign, curly */

// let fs = require("fs");
// let path = require("path");
// let { performance } = require("perf_hooks");
import fs from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'

/*
#############
#...........#
###B#C#A#B###
  #C#D#D#A#
  #########
A:1 , B:2 , C:3 , D:4
Could be solved by hand but it's Advent of CODE after all
*/

let INPUT = String(fs.readFileSync('./day23-test.txt', { encoding: 'utf-8' })).split('\r\n')
    .filter((_, i) => (i === 2 || i === 3))
    .map(e => e.trim()
        .replace(/#/gm, "")
        .replace(/A/gm, "1")
        .replace(/B/gm, "2")
        .replace(/C/gm, "3")
        .replace(/D/gm, "4")
        .split("")
        .map(Number)
    )
    .map((e, i, a) => ((i === 0) ? e.map((e1, i1) => ([e1, a[1][i1]])) : null))
    .filter(e => !!e)
    .flat();

const pStart = performance.now();

// As you may have guessed, we're brute forcing.
let RES = Number.MAX_SAFE_INTEGER;
const STORE = {};

let solver = function(room, hall, point, tmp = room + "|" + hall, found = true){
    if (point >= RES) return;
    outer1: for (let i = 0; i < room.length; i++){ // Second day where I have to use a label >.>
        for (let j = 0; j < 2; j++) 
          if (room[i][j] !== i + 1){
            found = false;
            break outer1;
        }
    }
    if (found && RES > point) return (RES = point);
    if (STORE[tmp] && STORE[tmp] <= point) return;
    STORE[tmp] = point;
    for (let i = 0; i < room.length; i++){
        let roomId = room[i].findIndex(x=>(x !== 0));
        if (roomId === -1) continue;
        let val = room[i][roomId];
        if (val === i + 1 && room[i].every(x => (x === val || x === 0))) continue;
        let targetRoom = roomId;
        for (let j = i + 1; j >= 0; j--){
            if (hall[j] !== 0) break;
            ((targetRoom++) || 1) && ((j !== 0) && targetRoom++);
            let curRoom = [...(room.map(x=>[...x]))];
            let hallPoints = [...hall];
            ((hallPoints[j] = curRoom[i][roomId]) && (curRoom[i][roomId] = 0) || 1) && solver(
                curRoom, hallPoints,
                point + targetRoom * (10 ** (val - 1))
            );
        }
        targetRoom = roomId;
        for (let j = i + 2; j < hall.length; j++){
            if (hall[j] !== 0) break;
            ((targetRoom++) || 1) && ((j !== hall.length - 1) && targetRoom++);
            let curRoom = [...(room.map(x=>[...x]))];
            let hallPoints = [...hall];
            ((hallPoints[j] = curRoom[i][roomId]) && (curRoom[i][roomId] = 0) || 1) && solver(
                curRoom, hallPoints,
                point + targetRoom * (10 ** (val - 1))
            );
        }
    }
    outer2: for (let i = 0; i < hall.length; i++){
        if (hall[i] === 0) continue;
        let val = hall[i];
        if (!room[val - 1].every(x => (x === val || x === 0))) continue;
        let targetRoom = 2;
        if (i < val) for (let j = i + 1; j <= val; j++, targetRoom++){
            if (hall[j] !== 0) continue outer2;
            (j !== 1) && targetRoom++;
        }
        else if (i > val + 1) for (let j = i - 1; j >= val + 1; j--, targetRoom++){
            if (hall[j] !== 0) continue outer2;
            (j !== hall.length - 2) && targetRoom++;
        }
        let roomId = room[val - 1].findIndex(x=>(x !== 0));
        ((roomId === -1) && (roomId = 2) || 1) && roomId--;
        let curRoom = [...(room.map(x=>[...x]))];
        let hallPoints = [...hall];
        ((targetRoom += roomId) && (curRoom[val - 1][roomId] = val) && (hallPoints[i] = 0) || 1) && solver(
            curRoom, hallPoints,
            point + targetRoom * (10 ** (val - 1))
        );
    }
};

solver(INPUT, [0, 0, 0, 0, 0, 0, 0], 0);

const pEnd = performance.now();

console.log("LEAST ENERGY REQUIRED: " + RES);
console.log(pEnd - pStart);