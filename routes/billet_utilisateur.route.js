'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const Billet_UtilisateurController = require('../controllers').Billet_UtilisateurController;
const verifyToken = require('../utils/jwt.utils').verifyToken;

const models = require('../models');
const Billet_Utilisateur = models.Billet_Utilisateur;

const router = express.Router();
router.use(bodyParser.json());




/***********************************************************************************/
/**                                    POST FUNCTIONS                             **/
/***********************************************************************************/
//add a billet utilisateur 
router.post('/', verifyToken, async (req, res) => {

    
    const Billet_id = req.body.Billet_id;
    const Utilisateur_id = req.body.Utilisateur_id;
    const dateDebut = req.body.dateDebut;
    const dateFin = req.body.dateFin;
    const dateAchat = req.body.dateAchat;
    const nbEntreeDispo = req.body.nbEntreeDispo;



    if(Billet_id !== undefined && Utilisateur_id !== undefined && dateDebut !== undefined &&
        dateFin !== undefined && dateAchat !== undefined  ){
    
        const newBU = new Billet_Utilisateur(Utilisateur_id, Billet_id, dateAchat, dateDebut, dateFin, nbEntreeDispo);

        const isAdd = await Billet_UtilisateurController.addBU(newBU);
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

 
 router.get('/', verifyToken, async (req, res) => {

    // get billet_utilisateur by id utilisateur
    if(req.query.id)
    {
        const a = await Billet_UtilisateurController.getBUByUtilisateur(req.query.id);
        if(a) {
            return res.json(a);
        }
        return res.json({}).end();
    }  

    // get billet_utilisateur by id utilisateur and purchases dates 
    else if(req.query.idUtilisateur !== undefined && req.query.date !== undefined){
        const a = await Billet_UtilisateurController.getBUsWithDateAchat(req.query.idUtilisateur, req.query.date);
        if(a) {
            return res.json(a);
        }
        return res.json({}).end();
    }

    //get billet_utilisateur by id utilisateur and validity dates 
    else if(req.query.idUtilisateur !== undefined && req.query.from !== undefined && req.query.to !== undefined){

    const a = await Billet_UtilisateurController.getBUsWithDateFilter(req.query.idUtilisateur, req.query.from, req.query.to);
        if(a) {
            return res.json(a);
        }
        return res.json({}).end();
    }

    //get all billet_utilisateur 
    else {
        const bus = await Billet_UtilisateurController.getAllBUs();
        if(bus){
            return res.json(bus);
        }
        return res.json({}).end();
    }
 
 });





module.exports = router;