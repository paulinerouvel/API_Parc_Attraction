#!/bin/bash

if systemctl stop ParcAttractionAPI.service ; then
	echo "--- API du Parc d'Attraction arrêté ---"
else
	echo "!!! API du Parc d'Attraction ne s'est pas arrêté !!!"
fi

systemctl status ParcAttractionAPI.service
