//Plik musi zaczynać się o deklaracji paczki
// 1. Sprawdzenie czy w pliku używa się "class", jeżeli tak package jest wymagane

//node 1
//name package
package app.model;

//node 2
//name import
import WebConfig from app.spike.WebConfig;

class Person {

    name: null,
    surname: null,
    age: null,

    Person: function(name, surname){
        this.name = name;
        this.surname = surname;
    }

    Person: function(name, surname, age){
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    setName: function(name){
        this.name = name;
    }

}

class Manager extends Person {

    isManager: true,

    Manager: function(name, surname){
        this.name = name;
        this.surname = surname;
    }

    Manager: function(isManager){
        this.isManager = isManager;
    },

    getIsManager: function(){
        return this.isManager;
    }

}