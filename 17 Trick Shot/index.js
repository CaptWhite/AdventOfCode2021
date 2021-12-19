import fs from 'fs';
let input = fs
    .readFileSync('./day17.txt', { encoding: 'utf-8' })

const [x1, x2, y1, y2] = /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/gm.exec(input)
    .splice(1,4)
    .map(Number)

const inArea = (px, py) => {
    return  x1 <= px && px <= x2  &&
            y1 <= py && py <= y2; 
}

let best = 0, total = 0;
for (let vy=-500; vy<500; vy++) {
    for (let vx=0; vx<200; vx++) {
        let px=0, py=0;
        let maxY = 0;
        const v = [vx, vy];
        while (px <= x2 && py >= y1 ) {
            maxY = Math.max(maxY, py);
            if (inArea(px, py)) {
                best = Math.max(best, maxY);
                total += 1;
                break;
            }
            px += v[0];
            py += v[1];
            if (v[0] > 0)   v[0] -= 1
            v[1] -= 1
        }
    }
}
console.log('Parte 1:',best)
console.log('Parte 2:',total)





