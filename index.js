#!/usr/bin/env node
'use strict';

//to use the env variable define in the .env file
require('dotenv').config();

//express to create a web server 
const express = require('express');

//request logger
const morgan = require('morgan');

//get our routes
const RouterBuilder = require('./routes');

const app = express();
app.use(morgan('dev'));

RouterBuilder.build(app);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
