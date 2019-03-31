'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const AttractionController = require('../controllers').AttractionsController;

const models = require('../models');
const Attraction = models.Attraction;

const router = express.Router();
router.use(bodyParser.json());


//add an attraction 
router.post('/', async (req, res) => {
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
    res.json(201).end();
});


//get by id 
router.get('/:id', async (req, res) => {
   const a = await AttractionController.getAttractionById(req.params.id);
   if(a) {
       console.log(a);
       return res.json(a);
   }
   res.status(404).end();

});

module.exports = router;