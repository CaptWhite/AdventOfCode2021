import fs from 'fs';
let input = fs
    .readFileSync('./day16.txt', { encoding: 'utf-8' })

let packet = input.split('')
packet = packet
    .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('');

const tableTTT = {'000':0, '001':1, '010':2, '011':3, '100':4, '101':5, '110':6, '111':7} 

const manageTTT_literal = ( len ) => {
    const paquete = packet.substring(len);
    versionSum += parseInt(paquete.substring(0,3), 2);
    console.log( 'ver', parseInt(paquete.substring(0,3), 2) );
    const packetTTT = paquete.substring(3);
    let subpackets = ''
    len += 6;
    for (let i=0; ;i++) {
        const subnumber = packetTTT.substring(i*5+3+1, i*5+3+5)
        console.log(subnumber)
        len += 5;
        subpackets += subnumber
        if (packetTTT.substring(i*5+3,i*5+3+1) === '0')
           break
    }
    return len;
}
                                    
const manageTTT_operator = ( len ) => {
    const paquete = packet.substring(len);
    versionSum += parseInt(paquete.substring(0,3), 2);
    console.log( 'ver', parseInt(paquete.substring(0,3), 2));
    
    const id = paquete.substring(6,7);
    if (id === '0') {
        const numDigits = parseInt(paquete.substring(7,7+15), 2);
        let lenAcum = 22+len;
        for (let i=0; lenAcum < numDigits+22+len; numDigits, i++) {
            lenAcum = manageVVV( lenAcum) ;   
        }
        return lenAcum;
    } else {
        const numPackets = parseInt(paquete.substring(7,7+11), 2);
        let lenAcum = 18+len;
        for (let i=0; i< numPackets; i++ ) {
            lenAcum = manageVVV( lenAcum);
        }
        return lenAcum;
    }
}

let versionSum = 0; 
let long = 0;
const manageVVV = ( len ) => {
    let paquete = packet.substring(len)
    if (len === packet.length) return
    else {  
        if (tableTTT[paquete.substring(3,6)] === 4)  
            long = manageTTT_literal( len );
        else
            long = manageTTT_operator( len );
    }
    return long;
}   
    
const resp = manageVVV(0);
console.log('Parte 1', versionSum);



