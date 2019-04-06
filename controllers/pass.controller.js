'use strict'

const models = require('../models');
const Pass = models.Pass;
const database = models.database;
const P = models.Attraction;

class passController{

    async addPass(newPass){

        const res = await database.connection.execute('INSERT INTO Billet (type, description, prix) VALUES (?, ?, ?)'
        , [newPass.type, newPass.description, newPass.prix]);

    }

    async addAttractonToPass(idAttr, idPass, order){
        const res = await database.connection.execute('INSERT INTO Billet_Attraction (Attraction_id, Billet_id, order) VALUES (?, ?, ?)', [idAttr, idPass, order]);
        
    }

    async getAllPass(){
        const res = await database.connection.query('SELECT * FROM Billet');
        return res[0].map((row) => new Pass(row.id, row.type, row.description, row.prix));
    }

    

    async getPassById(id){
        const res = await database.connection.query('SELECT * FROM Billet WHERE id = ?', [id]);

        const rows = res[0];
        if(rows.length > 0) {
            return new Pass(rows[0].id, rows[0].type, rows[0].description, rows[0].prix);
        }
        return undefined;
        
    }

    async updatePass(newPass){
        await database.connection.execute('UPDATE Billet SET type = \'?\', description = \'?\', prix = \'?\' WHERE id = ?',
        [newPass.type, newPass.description, newPass.prix, newPass.id]);
    }


    async deletePass(passId){
        //delete aussi les billets Attraction 
        await database.connection.execute('DELETE Billet  WHERE id = ?',
        [passId]);
    }


}

module.exports = new passController();

