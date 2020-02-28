const { version = '0.1.0' } = require('./package');
const bodyParser            = require('body-parser');
const express               = require('express');

const methods = [
    'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
];

const headers = [
    'Accept', 'Authorization', 'Content-Type'
];

const _avoidCORS = (req, res) =>
{
    res.setHeader('Access-Control-Allow-Headers', headers.map(header => header.toLowerCase()).join());
    res.setHeader('Access-Control-Allow-Methods', methods.join());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
};

const _reqHandler = (req, res) =>
{
    res.status(200).json({ "data": "It works!" });
};


const app = express();
app.use(bodyParser.json());

app.get('*', _avoidCORS);
app.get(`/api/${version}/health`, _reqHandler);
