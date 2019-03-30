'use strict'

const models = require('../models');
const database = models.database;
const Pass = models.Pass;
const Attraction = models.Attraction;

class attractionsControllers{

    async addAttraction(newAttr) {
        let parcId = 1;

        const res = await database.connection.execute('INSERT INTO Attraction (nom, description, type, capacite, duree, horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        , [newAttr.name, newAttr.description, newAttr.type, newAttr.capacity, newAttr.duration, newAttr.openingHours, newAttr.handicapAccess, newAttr.withAdulteAccess, newAttr.maintenance, parcId]);
        return true;
        
        //images à ajouter 
    }

    //get attraction by id
    async getAttractionById(id){
        const res = await database.connection.query('SELECT * FROM Attraction WHERE id = ?', [id]);

        const rows = res[0];
        if(rows.length > 0) {
            return new Attraction(rows[0].id, rows[0].name)

            name, description, type, capacity, duration, openingHours, handicapAccess, withAdulteAccess, maintenance, images
        }
        return undefined;
    }

    //get attraction all
    //get attraction by id
    //get attraction by pass



}


module.exports = new attractionsControllers();