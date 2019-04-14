'use strict'

class Billet_Utilisateur{
    constructor(Utilisateur_id, Billet_id, dateAchat, dateDebut, dateFin){
        
        this.Utilisateur_id = Utilisateur_id;
        this.Billet_id = Billet_id;
        this.dateAchat = dateAchat;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        
    }

}

module.exports = Billet_Utilisateur;