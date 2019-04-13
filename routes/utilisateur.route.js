'use strict'
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const Utilisateur = require('../models/Utilisateur');
const UtilisateurController = require('../controllers').UtilisateurController;

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
//router.use(bodyParser.urlencoded({ extended: true})); // parse des object inclus dans d'autre
router.use(bodyParser.json());

//register
router.post('/register', async (req, res) => {
    
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date_naissance = req.body.date_de_naissance;
    let tel = req.body.tel;
    let mail = req.body.mail;
    let adresse = req.body.adresse;
    let cp = req.body.cp;
    let ville = req.body.ville;
    let type = req.body.type;
    let mot_de_passe = req.body.mot_de_passe;

    if(nom !== undefined && prenom !== undefined && date_naissance !== undefined
        &&  mail !== undefined && adresse !== undefined &&
        cp !== undefined && ville !== undefined && type !== undefined && mot_de_passe !== undefined){

        let userFound = await UtilisateurController.getUserByEmail(mail);

        if(userFound == undefined){
            let cryptedPass = await bcrypt.hashSync(mot_de_passe, 5);

            mot_de_passe = cryptedPass;
            
            if(cryptedPass){
                
                let newUser = new Utilisateur(-1, nom, prenom, date_naissance, tel, mail, adresse, cp, ville, type, mot_de_passe);
                const isAdd = await UtilisateurController.addUser(newUser);
                if(isAdd){
                    return res.status(201).json({
                        'id' : newUser.id,
                        'token' : jwtUtils.generateToken(newUser)
                    });
                }
                return res.status(400);
            }


        }
        return res.status(400);
    }
    return res.status(400);

    

});

//login
router.post('/login', async (req, res) => {
    

    let mail = req.body.mail;
    let mot_de_passe = req.body.mot_de_passe;

    if(mail != undefined && mot_de_passe != undefined){

        let userFound = await UtilisateurController.getUserByEmail(mail);
    
        if(userFound != undefined){

            bcrypt.compare(mot_de_passe, userFound.mot_de_passe, function(errBycrypt, resBycrypt){
                if(resBycrypt){
                    return res.status(200).json({
                        'userId' : userFound.id,
                        'token' : jwtUtils.generateToken(userFound)
                    });
                }
                else{
                    return res.status(400).json({                  
                        'error' : errBycrypt
                    });
                }
            });
        }
    }

    res.status(404);
});



// Billet aura date début , date fin, plus id_billet (type du billet 1, 2, 3, 4)
module.exports = router;