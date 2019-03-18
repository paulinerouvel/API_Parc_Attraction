#!/bin/bash

if systemctl start ParcAttractionAPI ; then
	echo "--- API du Parc d'Attraction lancée ---"
else
	echo "!!! API du Parc d'Attraction ne s'est pas lancée !!!"
fi

systemctl status ParcAttractionAPI
