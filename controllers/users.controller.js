1
'use strict';

const models = require('../models');
const Users = models.Users;
const database = models.database;

class userController{
    toString(){
        return JSON.stringify(this);
    }

    async addUser(newUser){
        const res = await database.connection.execute('INSERT INTO Utilisateur (nom, prenom, date_naissance, tel, mail,' +
            ' adresse, cp, ville, type) VALUES (?, ?, ?)'
            , [newUser.name, newUser.lastName, newUser.birthDate, newUser.phone, newUser.mail,
                newUser.address, newUser.postalCode, newUser.park, newUser.city, newUser.userType]);
    }

    enter(park, user){
        this.park = park;
        await database.connection.execute('INSERT INTO Acces_Parc (Parc_id, Utilisateur_id, date), VALUES (?, ?, ?)',
            [park.id, user.id, Date.now()]);
    }

    //leave(park){
    //    this.park = null;
    //}

    useAttraction(user, attraction){
        // Table accès attraction
        const res = await database.connection.execute('INSERT INTO Acces_Attraction (Attraction_id, Utilisateur_id,' +
            ' date) VALUES (?, ?, ?)'
            , [attraction.id, user.id, Date.now()]);
        return true;
    }
}

module.exports = new Users();