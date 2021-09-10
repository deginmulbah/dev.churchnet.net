const crypto = require('crypto')
const moment = require('moment');
exports.username = (name, domain) => {
    const ranNum = crypto.randomBytes(2).toString('hex')
    // const ranNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    // rannNum.toString()   
    domain.replace("^[a-zA-Z]t[a-zA-Z]plh[a-zA-Z]l[a-zA-Z]:5000$")
    const username = `${name}${ranNum}@${domain}`
    return username
}
exports.userpass = () => {
    const ranNum = crypto.randomBytes(2).toString('hex')
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';
    for (i = 1; i <= 2; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += `M${ str.charAt(char)}`
    }
    // let pass = ''
    // for(i = 1; i <= 2 ; i++ ){ 
    //     const char = Math.floor(Math.random() * name.length + 1);
    //     pass =+ `${ranNum}${name.charAt(char)}`
    // }
    return pass;
}