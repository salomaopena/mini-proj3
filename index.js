const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'
const path = require("path")
const express = require('express')
const app = express();

//Ficheiros estáticos
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))


//Configurações
require('./config/db')(app, () => {
    require('./config/router')(app)
    require('./config/middleware')(app)
    app.listen(PORT, HOST, (error) => {
        if (error) { console.log('Ocorreu um erro ao rodar o servidor: ' + error) } else {
            console.log('Servidor rodando em  http://localhost:' + PORT + ' ...')
        }
    });
});