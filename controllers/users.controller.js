'use strict';

const models = require('../models');
const Users = models.Users;
const database = models.database;

class userController{
    // toString(){
    //     return JSON.stringify(this);
    // }

    async addUser(newUser){
        const res = await database.connection.execute('INSERT INTO Utilisateur (nom, prenom, date_naissance, tel, mail,' +
            ' adresse, cp, ville, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            , [newUser.nom, newUser.prenom, newUser.dateNaissance, newUser.numero, newUser.mail,
                newUser.adresse, newUser.codePostal, newUser.ville, newUser.typeUtilisateur]);
    }

    async updUser(user){
        await database.connection.execute('UPDATE Utilisateur SET nom = \'?\', prenom = \'?\', date_naissance = \'?\', tel = \'?\', ' +
            'mail = \'?\', adresse = \'?\', cp = \'?\', ville = \'?\', type = \'?\', WHERE id = ?',
            [user.name, user.prenom, user.dateNaissance, user.numero, user.mail, user.adresse, user.codePostal,
                user.ville, user.typeUtilisateur, user.id]);
    }

    async delUser(user){
        await database.connection.execute('DELETE FROM Utilisateur WHERE id = ?', [user.id]);
    }


    async addAccesParc(park, user){
        this.park = park;
        await database.connection.execute('INSERT INTO Acces_Parc (Parc_id, Utilisateur_id, date), VALUES (?, ?, ?)',
            [park.id, user.id, Date.now()]);
    }

    async updAccesParc(newParc, newUser, date, park, user){
        await database.connection.execute('UPDATE Acces_Parc SET Parc_id = \'?\', Utilisateur_id = \'?\', date = \'?\', WHERE Parc_id = \'?\' AND Utilisateur_id = ?',
            [newParc.id, newUser.id, date, park.id, user.id]);
    }

    async delAccesPark(park, user){
        await database.connection.execute('DELETE FROM Acces_Parc WHERE Parc_id = \'?\' AND Utilisateur_id = ?', [park.id, user.id]);
    }


    async addAccesAttraction(user, attraction){
        // Table accès attraction
        const res = await database.connection.execute('INSERT INTO Acces_Attraction (Attraction_id, Utilisateur_id,' +
            ' date) VALUES (?, ?, ?)'
            , [attraction.id, user.id, Date.now()]);
        return true;
    }

    async addBilletUtilisateur(user, type, description, prix) {
        const res = await database.connection.execute('INSERT INTO Billet_Utilisateur (Utilisateur_id, Billet_id, ' +
            'dateAchat, dateDebut, dateFin) VALUES (?, ?, ?, ?, ?)'
            , [user.id, pass.id, Date.now(), Date.now(), pass.duree + Date.now()]);  // A traiter dans la route
        return new Pass();
    }
}

module.exports = userController;