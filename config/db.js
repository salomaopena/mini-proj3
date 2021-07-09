module.exports = (app, callback) => {
    const config = require('./config')
    const mongoose = require('mongoose')


    global.mongoConnection = mongoose.createConnection(
        config.mongodb.uri, {
            reconnectTries: Number.MAX_VALUE,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }, (error) => {
            if (error) { console.log("****************Ocorreu um erro interno ao MongoDB****************" + error) } else {
                console.log('*****Conexão efectuada com sucesso ao MongoDB*****')
            }
            return callback()

        })

}