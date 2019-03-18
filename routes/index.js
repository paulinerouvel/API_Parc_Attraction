'use strict';

class RouterBuilder {

    build(app) {
        app.use('/attraction', require('./attractions.route'));
        app.use('/user', require('./users.route'));
    }
}

module.exports = RouterBuilder;
