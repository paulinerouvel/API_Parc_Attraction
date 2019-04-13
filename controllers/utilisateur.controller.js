'use strict';

const models = require('../models');
const Utilisateur = require('../models/Utilisateur');
const database = models.database;

class utilisateurController{

    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/


    async addUser(newUser){
        const res = await database.connection.execute('INSERT INTO Utilisateur (nom, prenom, date_naissance, tel, mail,' +
            ' adresse, cp, ville, type, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            , [newUser.nom, newUser.prenom, newUser.date_naissance, newUser.tel, newUser.mail,
                newUser.adresse, newUser.cp, newUser.ville, newUser.type, newUser.mot_de_passe]);

        return res;
    }

    async addAccesParc(parc, user){
        await database.connection.execute('INSERT INTO Acces_Parc (Parc_id, Utilisateur_id, date), VALUES (?, ?, ?)',
            [parc.id, user.id, Date.now()]);
    }

    async addAccesAttraction(user, attraction){
        const res = await database.connection.execute('INSERT INTO Acces_Attraction (Attraction_id, Utilisateur_id,' +
            ' date) VALUES (?, ?, ?)'
            , [attraction.id, user.id, Date.now()]);
        return true;
    }

    async addBilletUtilisateur(user, pass, dateDebut, dateFin) {
        const res = await database.connection.execute('INSERT INTO Billet_Utilisateur (Utilisateur_id, Billet_id, ' +
            'dateAchat, dateDebut, dateFin) VALUES (?, ?, ?, ?, ?)'
            , [user.id, pass.id, Date.now(), dateDebut, dateFin]);  
        return res;
    }



    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getUserById(id){
        const res = await database.connection.query('SELECT * FROM utilisateur WHERE id = ?', [id]);

        const rows = res[0];
        if(rows.length > 0) {
            return new Utilisateur(rows[0].id, rows[0].nom, rows[0].prenom, rows[0].date_naissance, rows[0].tel, rows[0].mail,
                rows[0].adresse, rows[0].cp, rows[0].ville, rows[0].type, rows[0].mot_de_passe);
        }
        return undefined;
    }

    async getUserByEmail(mail){

        const res = await database.connection.query('SELECT * FROM `utilisateur` WHERE `mail` = ?', [mail]);
        
        const rows = res[0];
        if(rows.length > 0) {
            return new Utilisateur(rows[0].id, rows[0].nom, rows[0].prenom, rows[0].date_naissance, rows[0].tel, rows[0].mail,
                rows[0].adresse, rows[0].cp, rows[0].ville, rows[0].type, rows[0].mot_de_passe);
        }
        return undefined;
    }

    async getAllUsers(){
        const res = await database.connection.query('SELECT * FROM utilisateur');
        return res[0].map((row) => new Attraction(row.id, row.nom, row.prenom, row.date_naissance, row.tel,
            row.mail, row.adresse, row.cp, row.ville, row.type, row.mot_de_passe));
    }
    

    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/
    async updateUser(user){
        await database.connection.execute('UPDATE Utilisateur SET nom = \'?\', prenom = \'?\', date_naissance = \'?\', tel = \'?\', ' +
            'mail = \'?\', adresse = \'?\', cp = \'?\', ville = \'?\', type = \'?\', mot_de_passe = \'?\', WHERE id = ?',
            [user.name, user.prenom, user.date_naissance, user.tel, user.mail, user.adresse, user.cp,
                user.ville, user.type, user.mot_de_passe, user.id]);
    }

    async updateAccesParc(newParc, newUser, date, park, user){
        await database.connection.execute('UPDATE Acces_Parc SET Parc_id = \'?\', Utilisateur_id = \'?\', date = \'?\', WHERE Parc_id = \'?\' AND Utilisateur_id = ?',
            [newParc.id, newUser.id, date, park.id, user.id]);
    }


    /***********************************************************************************/
    /**                                     DELETE FUNCTIONS                          **/
    /***********************************************************************************/

    async deleteUser(user){
        await database.connection.execute('DELETE FROM Utilisateur WHERE id = ?', [user.id]);
    }

    async deleteAccesParc(parc, user){
        await database.connection.execute('DELETE FROM Acces_Parc WHERE Parc_id = \'?\' AND Utilisateur_id = ?', [parc.id, user.id]);
    }

}

module.exports = new utilisateurController();