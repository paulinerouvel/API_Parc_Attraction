
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const ParcController = require('../controllers').ParcController;

const models = require('../models');
const Parc = models.Parc;

const router = express.Router();
router.use(bodyParser.json());

//add an parc
router.post('/', async (req, res) => {

});