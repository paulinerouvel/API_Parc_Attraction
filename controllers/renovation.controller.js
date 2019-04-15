'use strict'


const models = require('../models');
const database = models.database;
const Renovation = models.Renovation;

class renovationController{


    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/

    async addRenovation(newRenov){
        try{
            const res = await database.connection.execute('INSERT INTO renovation (Attraction_id, Utilisateur_id,' +
            ' dateDebut, cout, dateFin, description) VALUES (?, ?, ?, ?, ?, ?)'
            , [newRenov.Attraction_id, newRenov.Utilisateur_id, newRenov.dateDebut, newRenov.cout, newRenov.dateFin, newRenov.description]);

            return res;
        }
        catch{
            return undefined;
        }
        
    }

    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getRenovationByAttraction(idAttraction){

        try{
            const res = await database.connection.query('SELECT * FROM renovation WHERE Attraction_id = ?', [idAttraction]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows.map((row) => new Renovation(row.id, row.Attraction_id, 
                    row.Utilisateur_id, row.dateDebut, row.dateFin, row.cout, row.description));
            }
        }
        catch{
            return undefined;
        }
        
    }


    async getAllRenovations(){

        try{
            const res = await database.connection.query('SELECT * FROM renovation');
            return res[0].map((row) => new Renovation(row.id, row.Attraction_id, 
                row.Utilisateur_id, row.dateDebut, row.dateFin, row.cout, row.description));
        }
        catch{
            return undefined;
        }
        
    }

    async getRenovationsWithDateFilter(idAttraction, from, to){

        try{
            const res = await database.connection.query('SELECT * FROM renovation WHERE Attraction_id = ? AND dateDebut >= DATE ? AND dateFin <= ?', [idAttraction, from, to]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows.map((row) => new Renovation(row.id, row.Attraction_id, 
                    row.Utilisateur_id, row.dateDebut, row.dateFin, row.cout, row.description));
            }
        }
        catch{
            return undefined;
        }
        
    }


    async getRenovationByUtilisateur(idUtilisateur){

        try{
            const res = await database.connection.query('SELECT * FROM renovation WHERE Utilisateur_id = ?', [idUtilisateur]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows.map((row) => new Renovation(row.id, row.Attraction_id, 
                    row.Utilisateur_id, row.dateDebut, row.dateFin, row.cout, row.description));
            }
        }
        catch{
            return undefined;
        }
        
    }




}

module.exports = new renovationController();