
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
router.get('/:id', async (req, res, next)=>{
    if(req.params.id){
        const parc = await ParcController.getParcById(req.params.id);
        if(parc){
            return res.json(parc);
        }
     }

    next();
});


//get frequentation parc
router.get('/frequentation/:id', async (req, res, next)=>{
    if(req.params.id){
        const parc = await ParcController.getFrequentationParc(req.params.id);
        if(parc){
            return res.json(parc);
        }
    }
    next();
});

//get frequentation by date filter and parc
router.get('/frequentation', async (req, res) => {
    if(req.query.idParc !== undefined && req.query.from !== undefined && req.query.to !== undefined){

        const a = await ParcController.getFrequentationByParcAndDate(req.query.idParc, req.query.from, req.query.to);
        if(a) {
            return res.json(a);
        }
        res.status(408).end();
    }
    res.status(404).end();
    
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

