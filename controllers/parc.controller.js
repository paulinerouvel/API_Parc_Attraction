'use strict'

const models = require('../models');
const database = models.database;
const Parc = models.Parc;

class parcController{

    /***********************************************************************************/
    /**                                     GET FUNCTIONS                             **/
    /***********************************************************************************/

    async getParcById(id){
        try{
            const res = await database.connection.query('SELECT * FROM parc WHERE id = ?', [id]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows[0];
            }
        }
        catch{
            return undefined;
        }
        
    }

    async getFrequentationParc(id){
        try{
            
            const res = await database.connection.query('SELECT COUNT(*) FROM acces_parc WHERE Parc_id = ?', [id]);
            const rows = res[0];
            if(rows.length > 0) {
                return rows[0];
            }
        }
        catch{
            return undefined;
        }
        
    }

    async getFrequentationByParcAndDate(idParc, from, to){

        try{
            const res = await database.connection.query('SELECT COUNT(*) FROM acces_parc WHERE Parc_id = ? AND '+
            ' date >= DATE ? AND date <= DATE ?', [idParc, from, to]);

            const rows = res[0];
            if(rows.length > 0) {
                return rows[0];
            }
        }
        catch{
            return undefined;
        }
    }
    /***********************************************************************************/
    /**                                  UPDATE FUNCTIONS                             **/
    /***********************************************************************************/

    async updateParc(UpParc){
        try{
            let res = await database.connection.execute('UPDATE Parc SET nom = ?, description = ?, adresse = ?, cp = ?, ville = ?, tel = ?, mail = ?, benefice = ?, est_ouvert = ?  WHERE id = ?',
            [UpParc.nom, UpParc.description, UpParc.adresse, UpParc.cp, UpParc.ville, UpParc.tel, UpParc.mail, UpParc.benefice, UpParc.est_ouvert, UpParc.id]);
            return res;
        }
        catch{
            return undefined;
        }
   }









}


module.exports = new parcController();
