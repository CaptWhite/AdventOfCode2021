// import common from '../../../scripts/common';
import fs from 'fs';
let input = fs
    .readFileSync('./day14.txt', { encoding: 'utf-8' })

    let [initalPolymer, rules] = input.split('\r\n\r\n');

    let replacements = {};

    rules.split('\r\n').forEach(element => {
        let tokens = element.split(' -> ');
        replacements[tokens[0]] = tokens[1];
    });

    let pairs = {};
    let set = {};
    for (let i = 1; i < initalPolymer.length; i++) {
        let pair = initalPolymer[i - 1] + initalPolymer[i];
        if (!pairs[pair]) pairs[pair] = 0;
        pairs[pair]++;

        if (!set[pair[0]]) set[pair[0]] = 0;
        set[pair[0]]--;
    }

    for (let steps = 0; steps < 40; steps++) {
        let pairList = Object.entries(pairs);
        console.log('pairList', steps, pairList)
        pairList.forEach(([element, times]) => {
            
            if (replacements[element] && pairs[element] != 0) {
                let newPair = element[0] + replacements[element];
                if (!pairs[newPair]) pairs[newPair] = 0;
                pairs[newPair] += times;

                newPair = replacements[element] + element[1];
                if (!pairs[newPair]) pairs[newPair] = 0;
                pairs[newPair] += times;

                pairs[element] -= times;

                if (!set[replacements[element]]) set[replacements[element]] = 0;
                set[replacements[element]] -= times;
            }
        });
    }

    let pairList = Object.keys(pairs);
    pairList.forEach(element => {
        if (!set[element[0]]) set[element[0]] = 0;
        set[element[0]] += pairs[element];

        if (!set[element[1]]) set[element[1]] = 0;
        set[element[1]] += pairs[element];
    });

    let sorted = Object.entries(set).sort((a, b) => a[1] - b[1]);
    console.log( sorted[sorted.length - 1][1] - sorted[0][1] );
