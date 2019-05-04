'use strict'


const models = require('../models');
const database = models.database;
const Billet_Utilisateur = models.Billet_Utilisateur;

class billet_utilisateurController{


    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/

    async addBU(newBU){
        try{
            const res = await database.connection.execute('INSERT INTO billet_utilisateur ( Utilisateur_id, Billet_id,' +
            'dateAchat, dateDebut, dateFin, nbEntreeDispo) VALUES (?, ?, ?, ?, ?, ?)'
            , [newBU.Utilisateur_id, newBU.Billet_id, newBU.dateAchat, newBU.dateDebut, newBU.dateFin, newBU.nbEntreeDispo]);

            console.log(res)
            return res;

        }
        catch{
            return undefined;
        }
        
    }

    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getBUByUtilisateur(idUser){

        try{
            const res = await database.connection.query('SELECT * FROM billet_utilisateur WHERE Utilisateur_id = ?', [idUser]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows.map((row) => new Billet_Utilisateur(row.id, row.Utilisateur_id, 
                    row.Billet_id, row.dateAchat, row.dateDebut, row.dateFin, row.nbEntreeDispo));
            }
        }
        catch{
            return undefined;
        }
        
    }

    async getBUById(idBillet){

        try{
            const res = await database.connection.query('SELECT * FROM billet_utilisateur WHERE id = ?', [idBillet]);
            return res[0];

        }
        catch{
            return undefined;
        }
        
    }




    async getAllBUs(){

        try{
            const res = await database.connection.query('SELECT * FROM billet_utilisateur');
            return res[0].map((row) => new Billet_Utilisateur(row.id, row.Utilisateur_id, 
                row.Billet_id, row.dateAchat, row.dateDebut, row.dateFin, row.nbEntreeDispo));
        }
        catch{
            return undefined;
        }
        
    }

    //date de debut et de fin de validité
    async getBUsWithDateFilter(idUtilisateur, from, to){

        try{
            const res = await database.connection.query('SELECT * FROM billet_utilisateur WHERE Utilisateur_id = ? AND dateDebut >= DATE ? AND dateFin <= ?', [idUtilisateur, from, to]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows.map((row) => new Billet_Utilisateur( row.id, row.Utilisateur_id, 
                    row.Billet_id, row.dateAchat, row.dateDebut, row.dateFin, row.nbEntreeDispo));
            }
        }
        catch{
            return undefined;
        }
        
    }

    //date d'achat
    async getBUsWithDateAchat(idUtilisateur, date){

        try{
            const res = await database.connection.query('SELECT * FROM billet_utilisateur WHERE Utilisateur_id = ? AND dateAchat = DATE ?', [idUtilisateur, date]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows.map((row) => new Billet_Utilisateur( row.id, row.Utilisateur_id, 
                    row.Billet_id, row.dateAchat, row.dateDebut, row.dateFin, row.nbEntreeDispo ));
            }
        }
        catch{
            return undefined;
        }
        
    }



    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/
    async updateBU(BU){


        try{
            const res = await database.connection.execute('UPDATE billet_utilisateur SET Utilisateur_id = ?, Billet_id = ?,' +
            ' dateAchat = ?,  dateDebut = ?,  dateFin = ?,  nbEntreeDispo = ? WHERE id = ?'
            , [BU.Utilisateur_id, BU.Billet_id, BU.dateAchat, BU.dateDebut, BU.dateFin, BU.nbEntreeDispo, BU.id]);

            return res;
        }
        catch{
            return undefined;
        }
        
    }

    /***********************************************************************************/
    /**                                  DELETE FUNCTIONS                             **/
    /***********************************************************************************/
}

module.exports = new billet_utilisateurController();