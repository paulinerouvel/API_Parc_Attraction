'use strict'

const models = require('../models');
const database = models.database;
const Pass = models.Pass;
const Attraction = models.Attraction;

class attractionsControllers{

    async addAttraction(newAttr) {
        let parcId = 1;

        const res = await database.connection.execute('INSERT INTO Attraction (nom, description, type, capacite, duree, ' +
            'horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        , [newAttr.nom, newAttr.description, newAttr.type, newAttr.capacite, newAttr.duree, newAttr.horaire_ouverture, newAttr.acces_handicape,
                newAttr.acces_avec_adulte, newAttr.en_maintenance, newAttr.Parc_id]);
        return true;

    }

    async getAttractionById(id){
        const res = await database.connection.query('SELECT * FROM Attraction WHERE id = ?', [id]);


        const rows = res[0];
        if(rows.length > 0) {
            return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite, 
                rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].en_maintenance);
        }
        return undefined;
    }

    async getAllAttraction(){
        const res = await database.connection.query('SELECT * FROM Attraction');
        return results[0].map((row) => new Attraction(row.id, row.nom, row.description, row.type, row.capacite, 
            row.duree, row.horaire_ouverture, row.acces_handicape, row.acces_avec_adulte, row.en_maintenance));
    }


    async getAttractionByPass(passId) {
        const res = await database.connection.query('SELECT * FROM Billet_Attraction WHERE Billet_id = ?', [passId]);
        return res[0].map((row) => new Attraction(row.id, row.nom, row.description, row.type, row.capacite,
            row.duree, row.horaire_ouverture, row.acces_handicape, row.acces_avec_adulte, row.en_maintenance));

    }




    async updateAttraction(attr){
        await database.connection.execute('UPDATE Attraction SET nom = \'?\', description = \'?\', type = \'?\', capacite = \'?\', ' +
            'duree = \'?\', horaire_ouverture = \'?\', acces_handicape = \'?\', acces_avec_adulte = \'?\', en_maintenance = \'?\',' +
            ' Parc_id = \'?\' WHERE id = ?',
            [attr.name, attr.description, attr.type, attr.capacite, attr.duree, attr.horaire_ouverture, attr.acces_handicape,
            attr.acces_avec_adulte, attr.en_maintenance, attr.Parc_id]);
    }



    //get Frequentationby attre =>faire un count 
    
    //get renovation by attraction => le faire dans une classe renovation ?
    /*async getRenovation(id){

    }*/

    //delete
    async deleteAttraction(id){
        await database.connection.execute('DELETE FROM Attraction WHERE id = ?', [id]);
    }


}


module.exports = new attractionsControllers();