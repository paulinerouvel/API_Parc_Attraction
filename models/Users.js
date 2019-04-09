'use strict';

class User {
    constructor(nom, prenom, dateNaissance, numero, mail, adresse, codePostal, ville, typeUtilisateur) {
        this.id
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.numero = numero;
        this.mail = mail;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
        this.typeUtilisateur = typeUtilisateur;
    }

}

module.exports = User;