const express = require('express');
const bodyParser = require('body-parser');
const {resource} = require('./resource-files');
const dataProviders = require('../data-providers');

const hostname = '127.0.0.1';
const port = 8088;

module.exports.startServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    resource(app, dataProviders.filesHash, 'files');

    app.use((err, request, response, next) => {
        console.log(err);
        response.status(500).send('Something broke!');
        next();
    });

    app.listen(port, hostname, (err) => {
        if (err) {
            return console.log('something bad happened', err);
        }
        return console.log(`Server running at http://${hostname}:${port}/`);
    });
};
