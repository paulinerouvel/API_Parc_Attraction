'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const BilletController = require('../controllers').BilletController;
const verifyToken = require('../utils/jwt.utils').verifyToken;

const models = require('../models');
const Billet = models.Billet;

const router = express.Router();
router.use(bodyParser.json());



/***********************************************************************************/
/**                                     POST REQUESTS                             **/
/***********************************************************************************/

//add a pass 
router.post('/', verifyToken, async (req, res) => {
    let id = -1;
    const type = req.body.type;
    const description = req.body.description;
    const prix = req.body.prix;

    const idAttraction = req.body.idAttraction;
    const idBillet = req.body.idBillet;
    const ordre = req.body.ordre;

    if(type !== undefined && description !== undefined && prix !== undefined){
    
        const newPass = new Billet(id, type, description, prix);

        const isAdd = await BilletController.addPass(newPass);
        if(!isAdd){
            return res.status(408).end();
        }

        return res.status(201).end();
    }

    // add attraction to pass
    else if(idAttraction !== undefined && idBillet !== undefined && ordre !== undefined){
        const isAdd = await BilletController.addAttractonToPass(idAttraction, idBillet, ordre);
        if(!isAdd){
            return res.status(408).end();
        }

        return res.status(201).end();
    }

    return res.status(400).end();
});


/***********************************************************************************/
/**                                     GET REQUESTS                              **/
/***********************************************************************************/


//get a pass by id 
router.get('/:id', async (req, res) => {

    if(req.params.id !== undefined){
        const a = await BilletController.getPassById(req.params.id);
        if(a) {
            return res.json(a);
        }
        return res.json({}).end();
    }

   return res.status(400).end();

});

//get all pass
router.get('/', async (req, res) => {
    const pass = await BilletController.getAllPass();
    if(pass){
        return res.json(pass);
    }
    return res.json({}).end();
});

/***********************************************************************************/
/**                                     PUT REQUESTS                              **/
/***********************************************************************************/
//update billet
router.put('/', verifyToken, async (req, res) => {
    let id = req.body.id;
    const type = req.body.type;
    const description = req.body.description;
    const prix = req.body.prix;

    if(id !== undefined && type !== undefined && description !== undefined && prix !== undefined){
    
        const newPass = new Billet(id, type, description, prix);

        const isUp = await BilletController.updatePass(newPass);
        if(isUp){
            return res.status(200).end();
            
        }

        return res.status(408).end();
    }

    return res.status(400).end();
});

/***********************************************************************************/
/**                                   DELETE REQUESTS                             **/
/***********************************************************************************/


//delete pass
router.delete('/:id', verifyToken, async (req, res) => {
    if(req.params.id !== undefined){
        let a = await BilletController.deletePass(req.params.id);
        if(a){
            return res.status(200).end();
        }
        return res.status(408).end();
    }
    return res.status(400).end();
});

module.exports = router;