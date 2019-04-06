'use strict';

const models = require('../models');
const Admin = models.Admin;
const database = models.database;

class adminController{
    toString(){
        return JSON.stringify(this);
    }

    // Heritage de enterPark et newUser?

    maintainAttraction(admin, attraction, dateDebut, cout, dateFin, message){
        attraction.maintenance = 1;

        const res = await database.connection.execute('INSERT INTO Renovation (Attraction_id, Utilisateur_id,' +
            ' dateDebut, cout, dateFin, description) VALUES (?, ?, ?, ?, ?, ?)'
            , [attraction.id, admin.id, dateDebut, cout, dateFin, message]);
        return true;
    }

    modifyAttraction(attraction, attr){
        attraction.updateAttraction(attr);

    }

    setPass(user, pass){
        user.pass = pass;
    }
}

mondule.exports = new Admin();