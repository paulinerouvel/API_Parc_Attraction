'use strict'

class Renovation{
    constructor(id, Attraction_id, Utilisateur_id, dateDebut, dateFin, cout, description){
        this.id = id;
        this.Attraction_id = Attraction_id;
        this.Utilisateur_id = Utilisateur_id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.cout = cout;
        this.description = description;
    }

}

module.exports = Renovation;