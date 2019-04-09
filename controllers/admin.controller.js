'use strict';

const models = require('../models');
const Admin = models.Admin;
const database = models.database;

class adminController{
    toString(){
        return JSON.stringify(this);
    }

    // Heritage de enterPark et newUser?



    modifyAttraction(attraction, attr){
        attraction.updateAttraction(attr);

    }

    setPass(user, pass){
        user.pass = pass;
    }
}

mondule.exports = new Admin();