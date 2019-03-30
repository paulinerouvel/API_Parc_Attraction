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
            return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite, 
                rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].maintenance, rows[0].images);
        }
        return undefined;
    }

    //get attraction all
    async getAllAttraction(){
        const res = await database.connection.query('SELECT * FROM Attraction');
        return results[0].map((row) => new Attraction(row.id, row.nom, row.description, row.type, row.capacite, 
            row.duree, row.horaire_ouverture, row.acces_handicape, row.acces_avec_adulte, row.maintenance, row.images));
    }


    //get attraction by pass
    /* get pass by name (id)
    select * from Billet_Attraction where Billet_id = pass.id;
    return une map 




    // async getAttractionByPass(pass){
    //     const res = await database.connection.query('SELECT * FROM  WHERE id = ?', [id]);

    //     const rows = res[0];
    //     if(rows.length > 0) {
    //         return new Attraction(rows[0].id, rows[0].nom, rows[0].description, rows[0].type, rows[0].capacite, 
    //             rows[0].duree, rows[0].horaire_ouverture, rows[0].acces_handicape, rows[0].acces_avec_adulte, rows[0].maintenance, row[0].images);
    //     }
    //     return undefined;
    // }


    //update attraction

    //get Frequentationby attre =>faire un count 
    
    //get renovation

    //delete 

}


module.exports = new attractionsControllers();