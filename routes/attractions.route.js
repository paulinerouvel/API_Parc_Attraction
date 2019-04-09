'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const AttractionController = require('../controllers').AttractionsController;

const models = require('../models');
const Attraction = models.Attraction;

const router = express.Router();
router.use(bodyParser.json());


/***********************************************************************************/
/**                                     POST REQUESTS                             **/
/***********************************************************************************/
//add an attraction 
router.post('/', async (req, res) => {

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
router.post('/image', async (req, res) => {
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
router.get('/:id', async (req, res) => {

   const a = await AttractionController.getAttractionById(req.params.id);
   if(a) {
       return res.json(a);
   }
   res.status(404).end();

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


//get frequentation by id
router.get('/frequentation/:id', async (req, res) => {

    const a = await AttractionController.getFrequentationByAttraction(req.params.id);
    if(a) {
        return res.json(a);
    }
    res.status(404).end();

});

//get all renovation
router.get('/renovatison', async (req, res) => {

    console.log("la");
    const a = await AttractionController.getAllRenovations();
    if(a) {
        return res.json(a);
    }
    res.status(404).end();

});

//get renovation by id
router.get('/renovation/:id', async (req, res) => {

    const a = await AttractionController.getRenovationByAttraction(req.params.id);
    if(a) {
        return res.json(a);
    }
    res.status(404).end();

});

module.exports = router;