'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const PassController = require('../controllers').PassController;

const models = require('../models');
const Pass = models.Pass;

const router = express.Router();
router.use(bodyParser.json());


//add a pass
router.post('/', async (req, res) => {
    let id = -1;
    const type = req.body.type;
    const description = req.body.description;
    const price = req.body.price;
    

    const newPass = new Pass(id, type, description, price);

    const isAdd = await PassController.addPass(newPass);
    if(!isAdd){
        return res.status(408).end();
    }
    res.json(201).end();
});


//get by id 
router.get('/:id', async (req, res) => {
   const a = await PassController.getPassById(req.params.id);
   if(a) {
       console.log(a);
       return res.json(a);
   }
   res.status(404).end();

});

module.exports = router;