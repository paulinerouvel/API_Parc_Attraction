'use strict'

const models = require('../models');
const Billet = models.Billet;
const database = models.database;

class billetController{

    /***********************************************************************************/
    /**                                     ADD FUNCTIONS                             **/
    /***********************************************************************************/

    async addPass(newPass){

        try{
            const res = await database.connection.execute('INSERT INTO billet (type, description, prix) VALUES (?, ?, ?)'
            , [newPass.type, newPass.description, newPass.prix]);
            return res;
        }
        catch{
            return undefined;
        }

    }

    async addAttractonToPass(idAttr, idPass, ordre){
        try{
            const res = await database.connection.execute('INSERT INTO billet_attraction (Attraction_id, Billet_id, `order`) VALUES (?, ?, ?)', [idAttr, idPass, ordre]);
            return res;
        }
        catch{
            return undefined;
        }
        
    }

    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getAllPass(){
        try{

            const res = await database.connection.query('SELECT * FROM billet');
            return res[0].map((row) => new Billet(row.id, row.type, row.description, row.prix));
        }
        catch{
            return undefined;
        }
        
    }

    async getPassById(id){
        try{
            const res = await database.connection.query('SELECT * FROM billet WHERE id = ?', [id]);

            const rows = res[0];
            if(rows.length > 0) {
                return new Billet(rows[0].id, rows[0].type, rows[0].description, rows[0].prix);
            }
        }
        catch{
            return undefined;
        }
        
        
    }

    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/
    async updatePass(newPass){
        try{
            let res = await database.connection.execute('UPDATE billet SET type = ?, description = ?, prix = ? WHERE id = ?',
            [newPass.type, newPass.description, newPass.prix, newPass.id]);
            return res;
        }
        catch{
            return undefined;
        }
        
    }

    /***********************************************************************************/
    /**                                     DELETE FUNCTIONS                          **/
    /***********************************************************************************/


    async deletePass(passId){
        try{
            let res = await database.connection.execute('DELETE FROM billet_attraction WHERE billet_id = ?',
            [passId]);
            await database.connection.execute('DELETE FROM billet WHERE id = ?',
            [passId]);
            return res;
        }
        catch{
            return undefined;
        }
    }




}

module.exports = new billetController();

