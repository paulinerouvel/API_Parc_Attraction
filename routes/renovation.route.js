'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const RenovationController = require('../controllers').RenovationController;
const verifyToken = require('../utils/jwt.utils').verifyToken;

const models = require('../models');
const Renovation = models.Renovation;

const router = express.Router();
router.use(bodyParser.json());




/***********************************************************************************/
/**                                    POST FUNCTIONS                             **/
/***********************************************************************************/

router.post('/', verifyToken, async (req, res) => {


    const id = -1;
    const Attraction_id = req.body.Attraction_id;
    const Utilisateur_id = req.body.Utilisateur_id;
    const dateDebut = req.body.dateDebut;
    const dateFin = req.body.dateFin;
    const cout = req.body.cout;
    const description = req.body.description;



    if(Attraction_id !== undefined && Utilisateur_id !== undefined && dateDebut !== undefined &&
        dateFin !== undefined && cout !== undefined && description !== undefined ){
    
        const newRenov = new Renovation(id, Attraction_id, Utilisateur_id, dateDebut, dateFin, cout, description);

        const isAdd = await RenovationController.addRenovation(newRenov);
        if(!isAdd){
            return res.status(408).end();
        }

        return res.status(201).end();
    }

    return res.status(400).end();
});

/***********************************************************************************/
/**                                     GET FUNCTIONS                             **/
/***********************************************************************************/

//get renovation by id
router.get('/:id', async (req, res, next) => {
    if(req.params.id)
    {
        const a = await RenovationController.getRenovationByAttraction(req.params.id);
        if(a) {
            return res.json(a);
        }
        return res.status(408).end();
    }    
    next();
 });
 
 //get renovation by date filter / by user / get all attraction
 router.get('/', async (req, res) => {
 
     if(req.query.idUtilisateur !== undefined){
         const a = await RenovationController.getRenovationByUtilisateur(req.query.idUtilisateur);
         if(a) {
             return res.json(a);
         }
         res.status(404).end();
     }
     else if(req.query.idAttraction !== undefined && req.query.from !== undefined && req.query.to !== undefined){
         console.log('la')
        const a = await RenovationController.getRenovationsWithDateFilter(req.query.idAttraction, req.query.from, req.query.to);
        if(a) {
            return res.json(a);
        }
        res.status(404).end();
     }
     else {
         const rens = await RenovationController.getAllRenovations();
         if(rens){
             return res.json(rens);
         }
         res.status(404).end();
     }
 
 });





module.exports = router;