const http = require('http');

const authorization = '1234567890-0987654321';

const methods = [
    'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
];

const headers = [
    'Accept', 'Authorization', 'Content-Type'
];

const messages = {
    200 : 'OK',
    401 : 'Unauthorized'
};

const _avoidCORS = res =>
{
    res.setHeader('Access-Control-Allow-Headers', headers.map(header => header.toLowerCase()).join());
    res.setHeader('Access-Control-Allow-Methods', methods.join());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
};

const _isSecure = req =>
{
    return req.headers['authorization'] === `Bearer ${authorization}`;
};

const _handler = (req, res) =>
{
    let status = 200;
    let response = {
        errors : [],
        data   : {}
    };

    if (_isSecure(req))
    {
        switch (req.method)
        {

        }
    }
    else
    {
        status = 401;
    }

    _exit(status, res, response);
};

const _exit = (status = 200, res = {}, response = {}) =>
{
    _avoidCORS(res);
    if (Number(status[0]) >= 4)
    {
        response.errors.push({
            code    : status,
            message : messages[status]
        });
    }
    res.statusCode      = status;
    res.statusMessage   = messages[status];
    res.end(JSON.stringify(response));
};

http
    .createServer(_handler)
    .listen(3000, 'localhost', () => console.log('Server running!'));
