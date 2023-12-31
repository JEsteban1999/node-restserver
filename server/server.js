require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB)
    .catch(err => console.log(err))
    .then(() => console.log('Base de datos ONLINE'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT)
});