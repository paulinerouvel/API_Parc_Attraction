'use strict'
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const verifyToken = require('../utils/jwt.utils').verifyToken;
const Utilisateur = require('../models/Utilisateur');
const UtilisateurController = require('../controllers').UtilisateurController;

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());


/***********************************************************************************/
/**                                    POST FUNCTIONS                             **/
/***********************************************************************************/

//register
router.post('/register', async (req, res) => {
    
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date_de_naissance = req.body.date_de_naissance;
    let tel = req.body.tel;
    let mail = req.body.mail;
    let adresse = req.body.adresse;
    let cp = req.body.cp;
    let ville = req.body.ville;
    let type = req.body.type;
    let mot_de_passe = req.body.mot_de_passe;

    if(nom !== undefined && prenom !== undefined && date_de_naissance !== undefined
        &&  mail !== undefined && adresse !== undefined &&
        cp !== undefined && ville !== undefined && type !== undefined && mot_de_passe !== undefined){

        let userFound = await UtilisateurController.getUserByEmail(mail);

        if(userFound == undefined){
            let cryptedPass = await bcrypt.hashSync(mot_de_passe, 5);

            mot_de_passe = cryptedPass;
            
            if(cryptedPass){
                
                let newUser = new Utilisateur(-1, nom, prenom, date_de_naissance, tel, mail, adresse, cp, ville, type, mot_de_passe);
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

//add acces parc 
router.post('/accesParc', verifyToken, async (req, res) => {
    if(req.body.idParc !== undefined && req.body.idUser !== undefined ){
        const isAdd = await UtilisateurController.addAccesParc(req.body.idParc, req.body.idUser);
        if(!isAdd){
            return res.status(408).end();
        }
        return res.status(201).end();

    }
    return res.status(400).end();
});

//add sortie parc 
router.post('/sortieParc', verifyToken, async (req, res) => {
    if(req.body.idParc !== undefined && req.body.idUser !== undefined ){
        const isAdd = await UtilisateurController.addSortieParc( req.body.idUser, req.body.idParc,);
        if(!isAdd){
            return res.status(408).end();
        }
        return res.status(201).end();

    }
    return res.status(400).end();
});

//add acces attraction
router.post('/accesAttraction', verifyToken, async (req, res) => {
    if(req.body.idUser !== undefined && req.body.idAttraction !== undefined ){
        const isAdd = await UtilisateurController.addAccesAttraction(req.body.idUser, req.body.idAttraction);
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

    //get user by id
    if(req.query.id)
    {
        const a = await UtilisateurController.getUserById(req.query.id);
        if(a) {
            return res.json(a);
        }
        return res.status(204).end();
    }
 
    //get user by mail
    else if(req.body.mail !== undefined){
         const a = await UtilisateurController.getUserByEmail(req.body.mail);
         if(a) {
             return res.json(a);
         }
         return res.status(204).end();
     }

     //get all users
     else {
         const users = await UtilisateurController.getAllUsers();
         if(users){
             return res.json(users);
         }
         return res.status(204).end();
     }
 
 });


 //get acces parc 
router.get('/accesParc', verifyToken, async (req, res) => {
    if(req.query.idUtilisateur !== undefined){
        const acces = await UtilisateurController.getAccesParcByUser(req.query.idUtilisateur);
        if(acces){
            return res.json(acces);
        }
        return res.status(204).end();

    }
    return res.status(400).end();
});

//get sortie parc 
router.get('/sortieParc', verifyToken, async (req, res) => {
    if(req.query.idUtilisateur !== undefined ){
        const acces = await UtilisateurController.getSortieParcByUser(req.query.idUtilisateur);
        if(acces){
            return res.json(acces);
        }
        return res.status(204).end();

    }
    return res.status(400).end();
});

//get acces attraction
router.get('/accesAttraction', verifyToken, async (req, res) => {
    if(req.query.idUtilisateur !== undefined && req.query.idAttraction !== undefined ){
        const acces = await UtilisateurController.getAccesAttractionByUserAndAttr(req.query.idUtilisateur, req.query.idAttraction);
        if(acces){
            return res.json(acces);
        }
        return res.status(204).end();

    }
    return res.status(400).end();
});




/***********************************************************************************/
/**                                     PUT FUNCTIONS                             **/
/***********************************************************************************/
//update utilisateur
router.put('/', verifyToken, async (req, res) => {
    const id = req.body.id;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date_de_naissance = req.body.date_de_naissance;
    let tel = req.body.tel;
    let mail = req.body.mail;
    let adresse = req.body.adresse;
    let cp = req.body.cp;
    let ville = req.body.ville;
    let type = req.body.type;
    let mot_de_passe = req.body.mot_de_passe;


    if(id !== undefined && nom !== undefined && prenom !== undefined && date_de_naissance !== undefined
        &&  mail !== undefined && adresse !== undefined &&
        cp !== undefined && ville !== undefined && type !== undefined && mot_de_passe !== undefined){

        let cryptedPass = await bcrypt.hashSync(mot_de_passe, 5);

        mot_de_passe = cryptedPass;

        const newUser = new Utilisateur(id, nom, prenom, date_de_naissance, tel,
            mail, adresse, cp, ville, type, mot_de_passe)

        const isUp = await UtilisateurController.updateUser(newUser);
        if(isUp){
            return res.status(200).end();
            
        }

        return res.status(408).end();
    }

    return res.status(400).end();
});

/***********************************************************************************/
/**                                 DELETE FUNCTIONS                              **/
/***********************************************************************************/


//delete utilisateur
router.delete('/:id', verifyToken, async (req, res) => {
    if(req.params.id !== undefined){
        let a = await UtilisateurController.deleteUser(req.params.id);
        if(a){
            return res.status(200).end();
        }
        return res.status(408).end();
    }
    res.status(400).end();
});

module.exports = router;