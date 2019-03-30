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
    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const capacity = req.body.capacity;
    const duration = req.body.duration;
    const openingHours = req.body.openingHours;
    const handicapAccess = req.body.handicapAccess;
    const withAdulteAccess = req.body.withAdulteAccess;
    const images = req.body.images;
    const maintenance = req.body.maintenance;

    const newAttraction = new Attraction(name, description, type, capacity, duration, openingHours, handicapAccess, withAdulteAccess, maintenance);

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
       return res.json(a);
   }
   res.status(404).end();

});

module.exports = router;