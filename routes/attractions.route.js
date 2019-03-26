'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const AttractionController = require('../controllers').AttractionsController;

const router = express.Router();
router.use(bodyParser.json());


//add an attraction 
//name, description, type, capacity, duration, openingHours, handicapAccess, withAdulteAccess, maintenance, images
router.post('/', async (req, res) => {
    const content = req.body.content;
    const projectId = req.body.projectId;

    const project = await ProjectController.getProject(projectId);
    if(!project){
        return res.status(400).end();
    }

    const task = await TaskController.addTask(content, project);

    res.json(task);
});

router.get('/:id', async (req, res) => {
   const p = await ProjectController.getProject(req.params.id);
   if(p) {
       return res.json(p);
   }
   res.status(404).end();

});

module.exports = router;