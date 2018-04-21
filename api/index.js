const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

class Api {
    constructor() {
        this.app = express();
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(require('./routes'));
    }

    startListening = () => {
        console.log("API is listening on port 3000");
        this.app.listen(3000);
    };
}

module.exports = Api;
