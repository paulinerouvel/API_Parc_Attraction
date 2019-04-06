'use strict';

const models = require('../models');
const controllers = require('../controllers');
const Pass = models.Pass;
const passController = controllers.PassController;
const Visitor = models.Visitor;
const database = models.database;


class visitorController{
    toString() {
        return JSON.stringify(this);
    }

    // Heritage de enterPark et newUser?

    buyPass(user, pass){
        //const newPassRes = await database.connection.execute('INSERT INTO Billet (type, description, prix) VALUES (?, ?, ?)'
        //    , [pass.type, pass.description, pass.prix]);
        //let newPass = passController.addPass(); // Il faut que quand je crée un billet, ça me renvoie l'id

        const res = await database.connection.execute('INSERT INTO Billet_Utilisateur (Utilisateur_id, Billet_id, ' +
            'dateAchat, dateDebut, dateFin) VALUES (?, ?, ?, ?, ?)'
            , [user.id, pass.id, Date.now(), Date.now(), pass.duree+Date.now()]);
        return new Pass();
    }
}

module.exports = new Visitor();