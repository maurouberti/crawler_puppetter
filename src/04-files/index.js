const fs = require('fs');
const path = require('path');


let streamTxt = fs.createWriteStream(path.join(__dirname, '../../files/teste.txt'));
streamTxt.once('open', (f) => {
    streamTxt.write('Teste teste teste teste teste!!!')
    streamTxt.end()
});


const capture = require('../03-capture/index');
capture.then(values => {
    let streamJson = fs.createWriteStream(path.join(__dirname, '../../files/fundamentus.json'));
    streamJson.write(JSON.stringify(values));
    streamJson.end()
});
