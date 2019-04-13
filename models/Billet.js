'use strict'

class Billet{
    // a voir si on met l'utilisateur ici 
    constructor(id, type, description, prix){
        this.id = id;
        this.type = type;
        this.description = description;
        this.prix = prix;
    }

}

module.exports = Billet;