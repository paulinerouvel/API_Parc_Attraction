'use strict'
const verifyToken = require('../utils/jwt.utils').verifyToken;
const express = require('express');
const bodyParser = require('body-parser');
const AttractionController = require('../controllers').AttractionController;

const models = require('../models');
const Attraction = models.Attraction;

const router = express.Router();
router.use(bodyParser.json());


/***********************************************************************************/
/**                                     POST REQUESTS                             **/
/***********************************************************************************/
//add an attraction 
router.post('/', verifyToken, async (req, res) => {

    if(req.body.nom !== undefined && req.body.type !== undefined && req.body.description !== undefined && req.body.capacite !== undefined
        && req.body.duree !== undefined && req.body.horaire_ouverture !== undefined && req.body.acces_handicape !== undefined &&
        req.body.acces_avec_adulte !== undefined && req.body.en_maintenance !== undefined && req.body.Parc_id !== undefined ){
        const id = -1;
        const nom = req.body.nom;
        const description = req.body.description;
        const type = req.body.type;
        const capacite = req.body.capacite;
        const duree = req.body.duree;
        const horaire_ouverture = req.body.horaire_ouverture;
        const acces_handicape = req.body.acces_handicape;
        const acces_avec_adulte = req.body.acces_avec_adulte;
        const en_maintenance = req.body.en_maintenance;
        const Parc_id = req.body.Parc_id;


        const newAttraction = new Attraction(id, nom, description, type, capacite, duree, horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id);

        const isAdd = await AttractionController.addAttraction(newAttraction);
        if(!isAdd){
            return res.status(408).end();
        }
        return res.status(201).end();

    }
    return res.status(400).end();

});

//addimage to attraction
router.post('/image', verifyToken, async (req, res) => {
    if(req.body.idAttraction !== undefined && req.body.url !== undefined ){
        const isAdd = await AttractionController.addImage(req.body.idAttraction, req.body.url);
        if(!isAdd){
            return res.status(408).end();
        }
        return res.status(201).end();

    }
    return res.status(400).end();

});



/***********************************************************************************/
/**                                     GET REQUESTS                             **/
/***********************************************************************************/

//get attraction by id
router.get('/:id', async (req, res, next) => {
   const a = await AttractionController.getAttractionById(req.params.id);
   if(a) {
       return res.json(a);
   }
   next();
});

//get attraction by name /by pass/  get all attraction
router.get('/', async (req, res) => {

    if(req.query.name !== undefined){
        const a = await AttractionController.getAttractionByName(req.query.name);
        if(a) {
            return res.json(a);
        }
        res.status(404).end();
    }
    else if(req.query.passId !== undefined){
        const a = await AttractionController.getAttractionByPass(req.query.passId);
        if(a) {
            return res.json(a);
        }
        res.status(404).end();
    }
    else {
        const attrs = await AttractionController.getAllAttractions();
        if(attrs){
            return res.json(attrs);
        }
        res.status(404).end();
    }

});

//get frequentation by id attraction 
router.get('/frequentation/:id', async (req, res, next) => {
    const a = await AttractionController.getFrequentationByAttraction(req.params.id);
    if(a) {
        return res.json(a);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    next();

});

//get frequentation by id attraction and date
router.get('/frequentation', async (req, res) => {
    if(req.query.idAttraction !== undefined && req.query.from !== undefined && req.query.to !== undefined){
        const a = await AttractionController.getFrequentationByAttractionAndDate(req.query.idAttraction, req.query.from, req.query.to);
        if(a) {
            return res.json(a);
        }
        res.status(408).end();
    }
    else {
        res.status(404).end();
    }
});


router.get('/image/:id', async (req, res) => {
    
    if(req.params.id){
        const a = await AttractionController.getImagesByAttraction(req.params.id);
        if(a) {
            return res.json(a);
        } 
    }
    else{
        const a = await AttractionController.getAllImages();
        if(a) {
            return res.json(a);
        } 
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    res.status(404).end();
});

/***********************************************************************************/
/**                                     PUT REQUESTS                             **/
/***********************************************************************************/

//update attraction
router.put('/', verifyToken, async (req, res) => {
    if(req.body.nom !== undefined && req.body.type !== undefined && req.body.description !== undefined && req.body.capacite !== undefined
        && req.body.duree !== undefined && req.body.horaire_ouverture !== undefined && req.body.acces_handicape !== undefined &&
        req.body.acces_avec_adulte !== undefined && req.body.en_maintenance !== undefined && req.body.Parc_id !== undefined ){
        const id = req.body.id;
        const nom = req.body.nom;
        const description = req.body.description;
        const type = req.body.type;
        const capacite = req.body.capacite;
        const duree = req.body.duree;
        const horaire_ouverture = req.body.horaire_ouverture;
        const acces_handicape = req.body.acces_handicape;
        const acces_avec_adulte = req.body.acces_avec_adulte;
        const en_maintenance = req.body.en_maintenance;
        const Parc_id = req.body.Parc_id;


        const attraction = new Attraction(id, nom, description, type, capacite, duree, horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id);
        const isUp = await AttractionController.updateAttraction(attraction);
        if(!isUp){
            return res.status(408).end();
        }
        return res.status(202).end();

    }
    return res.status(400).end();
});

/***********************************************************************************/
/**                                   DELETE REQUESTS                             **/
/***********************************************************************************/


//delete attraction
router.delete('/:id', verifyToken, async (req, res) => {
    if(req.params.id !== undefined){
        let a = await AttractionController.deleteAttraction(req.params.id);
        if(a){
            return res.status(200).end();
        }
        return res.status(408).end();
    }
    res.status(400).end();
});

//delete image 
router.delete('/image/:id', verifyToken, async (req, res) => {
    if(req.params.id !== undefined){
        let a = await AttractionController.deleteImage(req.params.id);
        if(a){
            return res.status(200).end();
        }
        return res.status(408).end();
    }
    res.status(400).end();
});

module.exports = router;