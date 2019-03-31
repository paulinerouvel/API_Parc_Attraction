'use strict'

class Attraction{
    constructor(id, nom, description, type, capacite, duree, horaire_ouverture, acces_handicape, acces_avec_adulte, en_maintenance, Parc_id){
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.type = type;
        this.capacite = capacite;
        this.duree = duree;
        this.horaire_ouverture = horaire_ouverture;
        this.acces_handicape = acces_handicape;
        this.acces_avec_adulte = acces_avec_adulte;
        this.en_maintenance = en_maintenance;
        this.Parc_id = Parc_id;
    }

}

module.exports = Attraction;