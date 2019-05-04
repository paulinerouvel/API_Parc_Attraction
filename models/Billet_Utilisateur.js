'use strict'

class Billet_Utilisateur{
    constructor(id, Utilisateur_id, Billet_id, dateAchat, dateDebut, dateFin, nbEntreeDispo){
        
        this.id = id;
        this.Utilisateur_id = Utilisateur_id;
        this.Billet_id = Billet_id;
        this.dateAchat = dateAchat;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.nbEntreeDispo = nbEntreeDispo;
        
    }

}

module.exports = Billet_Utilisateur;