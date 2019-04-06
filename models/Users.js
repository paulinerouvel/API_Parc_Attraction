'use strict';

class User {
    constructor(name, lastName, birthDate, phone, mail, address, postalCode, city, userType) {
        this.id
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.phone = phone;
        this.mail = mail;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.userType = userType;
    }

}

module.exports = User;