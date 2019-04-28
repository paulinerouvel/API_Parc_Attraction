'use strict';

class Utilisateur {
    constructor(id, nom, prenom, date_de_naissance, numero, mail, adresse, codePostal, ville, typeUtilisateur, motDePasse) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.date_de_naissance = date_de_naissance;
        this.tel = numero;
        this.mail = mail;
        this.adresse = adresse;
        this.cp = codePostal;
        this.ville = ville;
        this.type = typeUtilisateur;
        this.mot_de_passe = motDePasse;

    }

}

module.exports = Utilisateur;