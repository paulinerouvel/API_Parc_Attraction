'use strict'

const models = require('../models');
const database = models.database;
const Attraction = models.Attraction;

class attractionController{

    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/

    async addAttraction(newAttr) {

        try{
            const res = await database.connection.execute('INSERT INTO attraction (nom, description, type, capacite, duree, ' +
                'horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                , [newAttr.nom, newAttr.description, newAttr.type, newAttr.capacite, newAttr.duree, newAttr.horaire_ouverture, newAttr.acces_handicape,
                    newAttr.acces_avec_adulte, newAttr.en_maintenance, newAttr.Parc_id]);

            return res;
        }
        catch{
            return undefined;
        }

    }

    async addImage(idAttraction, url){

        try{
            const res = await database.connection.execute('INSERT INTO image (url, Attraction_id) VALUES (?, ?)'
                , [url, idAttraction]);

            return res;
        }
        catch{
            return undefined;
        }
    }


    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getAttractionById(id){

        try{
            const res = await database.connection.query('SELECT * FROM attraction WHERE id = ?', [id]);

            const rows = res[0];
            if(rows.length > 0) {
                return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite,
                    rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].en_maintenance);
            }
        }
        catch{
            return undefined;
        }
    }


    async getAttractionByName(name) {

        try{
            const res = await database.connection.query('SELECT * FROM attraction WHERE nom = ?', [name]);

            const rows = res[0];
            if (rows.length > 0) {
                return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite,
                    rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].en_maintenance);
            }
        }
        catch{
            return undefined;
        }
    }


    async getAllAttractions(){
        try{
            const res = await database.connection.query('SELECT * FROM attraction');
            return res[0].map((row) => new Attraction(row.id, row.nom, row.description, row.type, row.capacite,
                row.duree, row.horaire_ouverture, row.acces_handicape, row.acces_avec_adulte, row.en_maintenance));
        }
        catch{
            return undefined;
        }
    }


    async getAttractionByPass(passId) {
        try{
            const res = await database.connection.query('SELECT * FROM `attraction`, billet_attraction WHERE billet_attraction.Attraction_id = id AND billet_attraction.Billet_id = ?', [passId]);
            return res[0];
        }
        catch{
            return undefined;
        }
    }

    async getFrequentationByAttraction(idAttraction){
        try{
            const res = await database.connection.query('SELECT COUNT(*) as nb FROM acces_attraction WHERE Attraction_id = ?', [idAttraction]);

            return res[0];
        }
        catch{
            return undefined;
        }
    }

    async getFrequentationByMonthAndYear(idAttraction){

        try{
            const res = await database.connection.query('SELECT COUNT(*) as nb, date FROM acces_attraction WHERE Attraction_id = ? GROUP BY YEAR(date), MONTH(date)', [idAttraction]);

            const rows = res;
            if(rows.length > 0) {
                return rows[0];
            }
        }
        catch{
            return undefined;
        }
    }

    async getFrequentationByAttractionAndDate(idAttraction, from, to){
        try{
            const res = await database.connection.query('SELECT COUNT(*) as nb FROM acces_attraction WHERE Attraction_id = ? AND '+
            ' date >= DATE ? AND date <= DATE ?', [idAttraction, from, to]);
            return res[0];
        }
        catch{
            return undefined;
        }
    }


    async getAllImages(){
        try{

            const res = await database.connection.query('SELECT * FROM image');
            return res[0];
            
        }
        catch{
            return undefined;
        }

    }

    async getImagesByAttraction(idAttraction){
        try{
            const res = await database.connection.query('SELECT * FROM image WHERE Attraction_id = ?', [idAttraction]);
            return res[0];
        }
        catch{
            return undefined;
        }
        
    }


    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/

    async updateAttraction(attr){
        try{
            const res = await database.connection.execute('UPDATE attraction SET nom = ?, description = ?, type = ?, capacite = ?, duree = ?, horaire_ouverture = ?, acces_handicape = ?, acces_avec_adulte = ?, en_maintenance = ?, Parc_id = ? WHERE id = ?',
            [attr.nom, attr.description, attr.type, attr.capacite, attr.duree, attr.horaire_ouverture, attr.acces_handicape,
                attr.acces_avec_adulte, attr.en_maintenance, attr.Parc_id, attr.id]);

            return res;
        }
        catch{
            return undefined;
        }
    }

    /***********************************************************************************/
    /**                                     DELETE FUNCTIONS                          **/
    /***********************************************************************************/



    async deleteAttraction(id) {

        try{
            let res = await database.connection.execute('DELETE FROM attraction WHERE id = ?', [id]);
            return res;
        }
        catch{
            return undefined;
        }
        
    }


    async deleteImage(idImage){
        try{
            let res = await database.connection.execute('DELETE FROM image WHERE id = ?', [idImage]);
            return res;
        }
        catch{
            return undefined;
        }
        

    }




}


module.exports = new attractionController();