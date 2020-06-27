const mongoose = require('mongoose')
const Fundamentus = require('./schema/fundamentus')

mongoose.connect('mongodb://localhost:27017/fundamentus_puppetter', { useNewUrlParser: true, useUnifiedTopology: true });

const papel = 'VVAR3';
const data = (new Date()).toISOString().substr(0, 10);

(async () => {
    const findResult = await Fundamentus.find({c_Papel: papel, created_at: data});
    if (findResult.length) {
        mongoose.disconnect();
        return console.log(findResult);
    }
    
    const values = await require('../03-capture/index');
    await Fundamentus.insertMany(values);

    mongoose.disconnect();
    return console.log('insert', values);
})();