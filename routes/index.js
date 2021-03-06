'use strict';

const cors = require('cors');



class RouterBuilder {

    build(app) {

        app.use(cors());

        // Add headers
        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,X-Requested-With,content-type, x-request-id');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
        app.use('/attraction', require('./attraction.route'));
        app.use('/utilisateur', require('./utilisateur.route'));
        app.use('/billet', require('./billet.route'));
        app.use('/parc', require('./parc.route'));
        app.use('/renovation', require('./renovation.route'));
        app.use('/billet_utilisateur', require('./billet_utilisateur.route'));
    }
}

module.exports = new RouterBuilder();
