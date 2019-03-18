#!/usr/bin/env node
'use strict';

const express = require('express');
const RouterBuilder = require('./routes');
const app = express();


app.get('/courgettes', (req, res, next) => {
	res.send("Success!");
	res.status(201).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
