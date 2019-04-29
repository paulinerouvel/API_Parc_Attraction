'use strict';

const models = require('../models');
const Utilisateur = require('../models/Utilisateur');
const database = models.database;

class utilisateurController{

    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/


    async addUser(newUser){
        try{
            const res = await database.connection.execute('INSERT INTO utilisateur (nom, prenom, date_naissance, tel, mail,' +
            ' adresse, cp, ville, type, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            , [newUser.nom, newUser.prenom, newUser.date_de_naissance, newUser.tel, newUser.mail,
                newUser.adresse, newUser.cp, newUser.ville, newUser.type, newUser.mot_de_passe]);

            return res;
        }
        catch{
            return undefined;
        }

    }

    async addAccesParc(idParc, idUser){

        try{
            let today = new Date();
            let d;
            let m;
            let y;


            parseInt(today.getDate()) < 10 ? d = "0" + today.getDate() : d = today.getDate();
            parseInt(today.getUTCMonth() + 1) < 10 ? m = "0" + parseInt(today.getUTCMonth() +1) : m = parseInt(today.getUTCMonth() +1);
            y = today.getFullYear();
            
            let date =  y.toString() + '-' + m.toString() + '-' + d.toString();


            let res = await database.connection.execute('INSERT INTO acces_parc (Parc_id, Utilisateur_id, `date`) VALUES (?, ?, ?)',
            [idParc, idUser, date]);
            return res;
        }
        catch{
            return undefined;
        }
        
    }

    async addAccesAttraction(idUser, idAttraction){
        try{

            let today = new Date();
            let d;
            let m;
            let y;


            parseInt(today.getDate()) < 10 ? d = "0" + today.getDate() : d = today.getDate();
            parseInt(today.getUTCMonth() + 1) < 10 ? m = "0" + parseInt(today.getUTCMonth() +1) : m = parseInt(today.getUTCMonth() +1);
            y = today.getFullYear();
            
            let date =  y.toString() + '-' + m.toString() + '-' + d.toString();

            const res = await database.connection.execute('INSERT INTO acces_attraction (Attraction_id, Utilisateur_id,' +
            ' date) VALUES (?, ?, ?)'
            , [idAttraction, idUser, date]);
            return res;
        }
        catch{
            return undefined;
        }
        
    }


    async addSortieParc(idUser, idParc){
        try{

            let today = new Date();
            let d;
            let m;
            let y;


            parseInt(today.getDate()) < 10 ? d = "0" + today.getDate() : d = today.getDate();
            parseInt(today.getUTCMonth() + 1) < 10 ? m = "0" + parseInt(today.getUTCMonth() +1) : m = parseInt(today.getUTCMonth() +1);
            y = today.getFullYear();
            
            let date =  y.toString() + '-' + m.toString() + '-' + d.toString();

            const res = await database.connection.execute('INSERT INTO sortie_parc (Parc_id, Utilisateur_id,' +
            ' date) VALUES (?, ?, ?)'
            , [idParc, idUser, date]);
            return res;
        }
        catch{
            return undefined;
        }
        
    }


    // async addBilletUtilisateur(user, pass, dateDebut, dateFin) {
    //     const res = await database.connection.execute('INSERT INTO Billet_Utilisateur (Utilisateur_id, Billet_id, ' +
    //         'dateAchat, dateDebut, dateFin) VALUES (?, ?, ?, ?, ?)'
    //         , [user.id, pass.id, Date.now(), dateDebut, dateFin]);  
    //     return res;
    // }



    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getUserById(id){

        try{
            const res = await database.connection.query('SELECT * FROM utilisateur WHERE id = ?', [id]);

            const rows = res[0];
            if(rows.length > 0) {
                return new Utilisateur(rows[0].id, rows[0].nom, rows[0].prenom, rows[0].date_naissance, rows[0].tel, rows[0].mail,
                    rows[0].adresse, rows[0].cp, rows[0].ville, rows[0].type, rows[0].mot_de_passe);
            }
        }
        catch{
            return undefined;
        }

        
    }

    async getUserByEmail(mail){

        try{
            const res = await database.connection.query('SELECT * FROM `utilisateur` WHERE `mail` = ?', [mail]);
        
            const rows = res[0];
            if(rows.length > 0) {
                return new Utilisateur(rows[0].id, rows[0].nom, rows[0].prenom, rows[0].date_naissance, rows[0].tel, rows[0].mail,
                    rows[0].adresse, rows[0].cp, rows[0].ville, rows[0].type, rows[0].mot_de_passe);
            }
        }
        catch{
            return undefined;
        }
        
    }

    async getAllUsers(){
        try{
            const res = await database.connection.query('SELECT * FROM utilisateur');
            return res[0].map((row) => new Utilisateur(row.id, row.nom, row.prenom, row.date_naissance, row.tel,
            row.mail, row.adresse, row.cp, row.ville, row.type, row.mot_de_passe));
        }
        catch{
            return undefined;
        }
        
    }

    async getAccesParcByUser(idUtilisateur){
        try{
            const res = await database.connection.query('SELECT * FROM acces_parc WHERE Utilisateur_id= ?', [idUtilisateur]);
            return res[0];
        }
        catch{
            return undefined;
        }
    }

    async getSortieParcByUser(idUtilisateur){
        try{
            const res = await database.connection.query('SELECT * FROM sortie_parc WHERE Utilisateur_id= ?', [idUtilisateur]);
            return res[0];
        }
        catch{
            return undefined;
        }
    }

    async getAccesAttractionByUserAndAttr(idUtilisateur, idAttraction){
        try{
            const res = await database.connection.query('SELECT * FROM acces_attraction WHERE Utilisateur_id = ? AND Attraction_id = ?', [idUtilisateur, idAttraction]);
            return res[0];
        }
        catch{
            return undefined;
        }
    }
    

    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/
    async updateUser(user){

        try{
            const res = await database.connection.execute('UPDATE utilisateur SET nom = ?, prenom = ?, date_naissance = ?, tel = ?, ' +
            'mail = ?, adresse = ?, cp = ?, ville = ?, type = ?, mot_de_passe = ? WHERE id = ?',
            [user.nom, user.prenom, user.date_de_naissance, user.tel, user.mail, user.adresse, user.cp,
                user.ville, user.type, user.mot_de_passe, user.id]);

            return res;
        }
        catch{
            return undefined;
        }
        
    }




    /***********************************************************************************/
    /**                                     DELETE FUNCTIONS                          **/
    /***********************************************************************************/

    async deleteUser(id){
        try{
            const res = await database.connection.execute('DELETE FROM utilisateur WHERE id = ?', [id]);
            return res;
        }
        catch{
            return undefined;
        }
    }

 

}

module.exports = new utilisateurController();