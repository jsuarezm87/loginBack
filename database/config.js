const mongoose = require('mongoose');
const message = require('../constants/messages');

const dbConnection = async() => {
    try {        
        await mongoose.connect( process.env.CONNECTION_STRING , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (error) {
        throw new Error(message.DB_ERROR);
    }
}

module.exports = {
    dbConnection
}