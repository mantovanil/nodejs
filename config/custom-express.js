const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;