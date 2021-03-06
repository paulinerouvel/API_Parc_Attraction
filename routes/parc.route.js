
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const ParcController = require('../controllers').ParcController;

const verifyToken = require('../utils/jwt.utils').verifyToken;

const models = require('../models');
const Parc = models.Parc;

const router = express.Router();
router.use(bodyParser.json());



/***********************************************************************************/
/**                                     GET FUNCTIONS                             **/
/***********************************************************************************/

//get parc by id
router.get('/', async (req, res)=>{
    if(req.query.id){
        const parc = await ParcController.getParcById(req.query.id);
        if(parc){
            return res.json(parc);
        }
        return res.status(204).end();
     }
     return res.status(400);
});




router.get('/frequentation', verifyToken, async (req, res) => {

    //get frequentation by id 
    if(req.query.id){
        const parc = await ParcController.getFrequentationParc(req.query.id);
        if(parc){
            return res.json(parc);
        }
        return res.status(204).end();
    }

    //get frequentation by id and date filter
    else if(req.query.idParc !== undefined && req.query.from !== undefined && req.query.to !== undefined){

        const a = await ParcController.getFrequentationByParcAndDate(req.query.idParc, req.query.from, req.query.to);
        if(a) {
            return res.json(a);
        }
        return res.status(204).end();
    }
    return res.status(400).end();
    
});

//get frequentation temps reel
router.get('/frequentationTR', verifyToken, async (req, res) => {
    if(req.query.id){
        const parc = await ParcController.getFrequentationTempsReel(req.query.id);
        if(parc){
            return res.json(parc);
        }
        return res.status(204).end();
    }
    return res.status(404).end();
});

//get frequentation by month and year
router.get('/frequentationStats', verifyToken, async (req, res) => {
    if(req.query.id){
        const parc = await ParcController.getFrequentationByMonthAndYear(req.query.id);
        if(parc){
            return res.json(parc);
        }
        return res.status(204).end();
    }
    return res.status(404).end();
});




/***********************************************************************************/
/**                                  UPDATE FUNCTIONS                             **/
/***********************************************************************************/

//update parc
router.put('/', verifyToken, async (req, res) => {
    const id = req.body.id;
    const nom = req.body.nom;
    const description = req.body.description;
    const adresse = req.body.adresse;
    const cp = req.body.cp;
    const ville = req.body.ville;
    const tel = req.body.tel;
    const mail = req.body.mail;
    const benefice = req.body.benefice;
    const est_ouvert = req.body.est_ouvert;


    if(id !== undefined && nom !== undefined && description !== undefined && adresse !== undefined &&
        cp !== undefined && ville !== undefined && tel !== undefined && mail !== undefined &&
        benefice !== undefined && est_ouvert !== undefined){
    
        const upParc = new Parc(id, nom, description, adresse, cp, ville, tel, mail, benefice, est_ouvert);

        const isUp = await ParcController.updateParc(upParc);
        if(isUp){
            return res.status(200).end();
            
        }

        return res.status(408).end();
    }

    return res.status(400).end();
});


module.exports = router;

