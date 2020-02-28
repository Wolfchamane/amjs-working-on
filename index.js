const { version = '0.1.0' } = require('./package');
const bodyParser            = require('body-parser');
const express               = require('express');

const port = 5000;

const methods = [
    'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
];

const headers = [
    'Accept', 'Authorization', 'Content-Type'
];

const _avoidCORS = res =>
{
    console.log('Avoiding CORS');
    res.set({
        'Access-Control-Allow-Headers'  : headers.map(header => header.toLowerCase()).join(),
        'Access-Control-Allow-Methods'  : methods.join(),
        'Access-Control-Allow-Origin'   : '*',
        'Content-Type'                  :'application/json'
    });
};

const _reqHandler = (req, res) =>
{
    console.log('Request catched!');
    _avoidCORS(res);
    res.status(200).json({ "data": "It works!" });
};


const app = express();
app.use(bodyParser.json());

app.get(`/api/${version}/health`, _reqHandler);

app.listen(port, () => console.log(`Server running @${port}`));
