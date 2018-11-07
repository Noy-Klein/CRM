const express = require('express');
const bodyParser = require('body-parser');

let SERVER_PORT = 2000;

const app = express();

const clientApi = require('./clientApi');

app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('build'));
app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(clientApi);
//routes

app.listen(SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});