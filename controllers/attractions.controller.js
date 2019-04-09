'use strict'

const models = require('../models');
const Pass = models.Pass;
const database = models.database;
const Attraction = models.Attraction;

class attractionsControllers{

    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/

    async addAttraction(newAttr) {

        const res = await database.connection.execute('INSERT INTO attraction (nom, description, type, capacite, duree, ' +
            'horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            , [newAttr.nom, newAttr.description, newAttr.type, newAttr.capacite, newAttr.duree, newAttr.horaire_ouverture, newAttr.acces_handicape,
                newAttr.acces_avec_adulte, newAttr.en_maintenance, newAttr.Parc_id]);

        return res;

    }

    async addImage(idAttraction, url){

        const res = await database.connection.execute('INSERT INTO image (url, Attraction_id) VALUES (?, ?)'
            , [url, idAttraction]);

        return res;
    }

    async addRenovation(admin, attraction, dateDebut, cout, dateFin, message){
        // attraction.maintenance = 1;

        // const res = await database.connection.execute('INSERT INTO Renovation (Attraction_id, Utilisateur_id,' +
        //     ' dateDebut, cout, dateFin, description) VALUES (?, ?, ?, ?, ?, ?)'
        //     , [attraction.id, admin.id, dateDebut, cout, dateFin, message]);
        // return true;
    }


    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getAttractionById(id){
        const res = await database.connection.query('SELECT * FROM attraction WHERE id = ?', [id]);

        const rows = res[0];
        if(rows.length > 0) {
            return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite,
                rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].en_maintenance);
        }
        return undefined;
    }


    async getAttractionByName(name) {

        const res = await database.connection.query('SELECT * FROM attraction WHERE nom = ?', [name]);

        const rows = res[0];
        if (rows.length > 0) {
            return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite,
                rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].en_maintenance);
        }

        return undefined;
    }


    async getAllAttractions(){
        const res = await database.connection.query('SELECT * FROM attraction');
        return res[0].map((row) => new Attraction(row.id, row.nom, row.description, row.type, row.capacite,
            row.duree, row.horaire_ouverture, row.acces_handicape, row.acces_avec_adulte, row.en_maintenance));
    }


    async getAttractionByPass(passId) {
        const res = await database.connection.query('SELECT * FROM billet_attraction WHERE Billet_id = ?', [passId]);
        return res[0].map((row) => new Attraction(row.id, row.nom, row.description, row.type, row.capacite,
            row.duree, row.horaire_ouverture, row.acces_handicape, row.acces_avec_adulte, row.en_maintenance));

    }

    async getFrequentationByAttraction(idAttraction){
        const res = await database.connection.query('SELECT COUNT(*) FROM acces_attraction WHERE Attraction_id = ?', [idAttraction]);
        return res[0];
    }


    async getRenovationByAttraction(idAttraction){
        const res = await database.connection.query('SELECT * FROM renovation WHERE Attraction_id = ?', [idAttraction]);
        return res[0];
    }

    async getAllRenovations(){
        const res = await database.connection.query('SELECT * FROM renovation');
        return res[0];
    }

    async getRenovationsWithDateFilter(from, to){

    }


    async getAllImages(idAttraction){

    }

    async getImagesByAttraction(idAttraction){

    }


    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/

    async updateAttraction(attr){
        await database.connection.execute('UPDATE attraction SET nom = \'?\', description = \'?\', type = \'?\', capacite = \'?\', ' +
            'duree = \'?\', horaire_ouverture = \'?\', acces_handicape = \'?\', acces_avec_adulte = \'?\', en_maintenance = \'?\',' +
            ' Parc_id = \'?\' WHERE id = ?',
            [attr.name, attr.description, attr.type, attr.capacite, attr.duree, attr.horaire_ouverture, attr.acces_handicape,
                attr.acces_avec_adulte, attr.en_maintenance, attr.Parc_id]);
    }

    /***********************************************************************************/
    /**                                     DELETE FUNCTIONS                          **/
    /***********************************************************************************/



    async deleteAttraction(id) {
        await database.connection.execute('DELETE FROM attraction WHERE id = ?', [id]);
    }


    async deleteImage(idImage){

    }




}


module.exports = new attractionsControllers();