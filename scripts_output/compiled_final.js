
SpikeAssembler.createClass('app.model',['Person', 'Person_name_surname', 'Person_name_surname_age'], 'public', [], function(){

    app.model.Manager = function() {
        app.model.Person.apply(this, []);
        this.isManager = true;
    };
    app.model.Manager.prototype.getIsManager = function(){
        return this.isManager;
    };
    app.model.Manager.prototype.getClass = function(){
        return 'Manager';
    };
    app.model.Manager.prototype.getSuper = function(){
        return ['Person'];
    };

    app.model.Manager_isManager = function Manager(isManager){
        app.model.Person.apply(this, []);
        this.isManager = true;
        this.isManager = isManager;
    };
    app.model.Manager_isManager.prototype.getIsManager = function(){
        return this.isManager;
    };
    app.model.Manager_isManager.prototype.getClass = function(){
        return 'Manager';
    };
    app.model.Manager_isManager.prototype.getSuper = function(){
        return ['Person'];
    };

    app.model.Manager_name_surname = function (name, surname){
        app.model.Person_name_surname.apply(this, [name, surname]);
        this.isManager = true;
        this.name = name;
        this.surname = surname;
    };
    app.model.Manager_name_surname.prototype.getIsManager = function(){
        return this.isManager;
    };
    app.model.Manager_name_surname.prototype.getClass = function(){
        return 'Manager';
    };
    app.model.Manager_name_surname.prototype.getSuper = function(){
        return ['Person'];
    };

    app.model.Person = function Person(){
        this.name = null;
        this.surname = null;
        this.age = null;
    };
    app.model.Person.prototype.setName = function(name){
        this.name = name;
    };
    app.model.Person.prototype.getClass = function(){
        return 'Person';
    };

    app.model.Person_name_surname = function(name, surname){
        this.name = name;
        this.surname = surname;
        this.age = null;
    };
    app.model.Person_name_surname.prototype.setName = function(name){
        this.name = name;
    };
    app.model.Person_name_surname.prototype.getClass = function(){
        return 'Person';
    };

    app.model.Person_name_surname_age = function(name, surname, age){
        this.name = name;
        this.surname = surname;
        this.age = age;
    };
    app.model.Person_name_surname_age.prototype.setName = function(name){
        this.name = name;
    };
    app.model.Person_name_surname_age.prototype.getClass = function(){
        return 'Person';
    };

});
