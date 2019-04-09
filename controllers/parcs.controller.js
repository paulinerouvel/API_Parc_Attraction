'use strict'

const models = require('../models');
const database = models.database;
const Parc = models.Parc;

class parcsControllers{

    async addParc(newParc){

        // const res = await database.connection.execute('INSERT INTO Billet (type, description, prix) VALUES (?, ?, ?)'
        // , [newPass.type, newPass.description, newPass.prix]);

    }

    async getParcById(id){

    }

    async getFrequentationParc(id){
        
    }


}


module.exports = new parcsControllers();
