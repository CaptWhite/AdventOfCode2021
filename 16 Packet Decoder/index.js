import fs from 'fs';
let input = fs
    .readFileSync('./day16.txt', { encoding: 'utf-8' })

let packet = input.split('')
    .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('');

const tableTTT = {'000':0, '001':1, '010':2, '011':3, '100':4, '101':5, '110':6, '111':7} 
const tableOpe = {'000':'+', '001':'*', '010':'min', '011':'max', '100':'num', '101':'>', '110':'<', '111':'='} 

const manageTTT_literal = ( len ) => {
    const paquete = packet.substring(len);
    versionSum += parseInt(paquete.substring(0,3), 2);
    let subpackets = ''
    len += 6;
    for (let i=0; ;i++) {
        len += 5;
        subpackets += paquete.substring(6+i*5+1, 6+i*5+5)
        if (paquete.substring(6+i*5,6+i*5+1) === '0')
           break
    }
    resultado += ' ' + parseInt(subpackets, 2) + ' ';
    return len;
}
        
const manageTTT_operator = ( len ) => {
    
    const paquete = packet.substring(len);
    versionSum += parseInt(paquete.substring(0,3), 2);
    resultado += ' ' + tableOpe[paquete.substring(3,6)] + ' ( ';
    const id = paquete.substring(6,7);

    if (id === '0') {
        const numDigits = parseInt(paquete.substring(7,7+15), 2);
        const packetLen = numDigits+22+len;
        len = 22+len;
        for (let i=0; len < packetLen; numDigits) {
            len = manageVVV( len) ;   
        }
    } else {
        const numPackets = parseInt(paquete.substring(7,7+11), 2);
        len = 18+len;
        for (let i=0; i< numPackets; i++ ) {
            len = manageVVV( len);
        }
    }
    resultado += ' )';
    return len
}

const manageVVV = ( len ) => {
    let paquete = packet.substring(len)
    if (paquete.substring(3,6) === '100')  
        return manageTTT_literal( len );
    else
        return manageTTT_operator( len );
}   

let versionSum = 0; 
let resultado = '';    
const resp = manageVVV(0);
console.log('Resultado: ', resultado)
console.log('Parte 1', versionSum);
