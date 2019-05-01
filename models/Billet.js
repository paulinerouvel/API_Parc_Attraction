'use strict'

class Billet{
    // a voir si on met l'utilisateur ici 
    constructor(id, type, description, prix, dureeValidite){
        this.id = id;
        this.type = type;
        this.description = description;
        this.prix = prix;
        this.dureeValidite = dureeValidite;
    }

}

module.exports = Billet;