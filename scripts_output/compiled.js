SpikeAssembler.defineNamespace('app.model.abstract', ['Person_name_surname', 'Person_name_surname_age', 'Person'], function () {
    app.model.abstract.Person_name_surname = function (name, surname) {
        app.model.abstract.Person.apply(this, []);
        this.name = name;
        this.surname = surname;
    };
    app.model.abstract.Person_name_surname.prototype.name = null;
    app.model.abstract.Person_name_surname.prototype.surname = {
        name: null,
        surname: null
    };
    app.model.abstract.Person_name_surname.prototype.age = null;
    app.model.abstract.Person_name_surname.prototype.setName = function (name) {
        this.name = name;
    };
    app.model.abstract.Person_name_surname.prototype.getSuper = function () {
        return 'app.model.abstract.Person';
    };
    app.model.abstract.Person_name_surname.prototype.getClass = function () {
        return 'app.model.abstract.Person';
    };
    app.model.abstract.Person_name_surname_age = function (name, surname, age) {
        app.model.abstract.Person.apply(this, []);
        this.name = name;
        this.surname = surname;
        this.age = age;
    };
    app.model.abstract.Person_name_surname.prototype.name = null;
    app.model.abstract.Person_name_surname_age.prototype.name = null;
    app.model.abstract.Person_name_surname.prototype.surname = {
        name: null,
        surname: null
    };
    app.model.abstract.Person_name_surname_age.prototype.surname = {
        name: null,
        surname: null
    };
    app.model.abstract.Person_name_surname.prototype.age = null;
    app.model.abstract.Person_name_surname_age.prototype.age = null;
    app.model.abstract.Person_name_surname.prototype.setName = function (name) {
        this.name = name;
    };
    app.model.abstract.Person_name_surname_age.prototype.setName = function (name) {
        this.name = name;
    };
    app.model.abstract.Person_name_surname_age.prototype.getSuper = function () {
        return 'app.model.abstract.Person';
    };
    app.model.abstract.Person_name_surname_age.prototype.getClass = function () {
        return 'app.model.abstract.Person';
    };
    app.model.abstract.Person = function () {
    };
    app.model.abstract.Person_name_surname.prototype.name = null;
    app.model.abstract.Person_name_surname_age.prototype.name = null;
    app.model.abstract.Person.prototype.name = null;
    app.model.abstract.Person_name_surname.prototype.surname = {
        name: null,
        surname: null
    };
    app.model.abstract.Person_name_surname_age.prototype.surname = {
        name: null,
        surname: null
    };
    app.model.abstract.Person.prototype.surname = {
        name: null,
        surname: null
    };
    app.model.abstract.Person_name_surname.prototype.age = null;
    app.model.abstract.Person_name_surname_age.prototype.age = null;
    app.model.abstract.Person.prototype.age = null;
    app.model.abstract.Person_name_surname.prototype.setName = function (name) {
        this.name = name;
    };
    app.model.abstract.Person_name_surname_age.prototype.setName = function (name) {
        this.name = name;
    };
    app.model.abstract.Person.prototype.setName = function (name) {
        this.name = name;
    };
    app.model.abstract.Person.prototype.getSuper = function () {
        return 'app.model.abstract.Person';
    };
    app.model.abstract.Person.prototype.getClass = function () {
        return 'app.model.abstract.Person';
    };
});
SpikeAssembler.defineNamespace('app.model.abstract', ['Helper__100'], function () {
    app.model.abstract.Helper__100 = function () {
    };
    app.model.abstract.Helper__100.prototype.getInfo = function () {
        return "this is private class";
    };
    app.model.abstract.Helper__100.prototype.getSuper = function () {
        return 'app.model.abstract.Helper__100';
    };
    app.model.abstract.Helper__100.prototype.getClass = function () {
        return 'app.model.abstract.Helper__100';
    };
});
SpikeAssembler.defineNamespace('app.model', ['Manager_name_surname', 'Manager_isManager', 'Manager'], function () {
    app.model.Manager_name_surname = function (name, surname) {
        app.model.Manager.apply(this, []);
        this.name = name;
        this.surname = surname;

        this.person = new app.model.abstract.Person();

        var person2 = new app.model.abstract.Person("surname", "name");

    };
    app.model.Manager_name_surname.prototype.isManager = true;
    app.model.Manager_name_surname.prototype.person = null;
    app.model.Manager_name_surname.prototype.getIsManager = function () {
        return this.isManager;
    };
    app.model.Manager_name_surname.prototype.getSuper = function () {
        return 'app.model.abstract.Person';
    };
    app.model.Manager_name_surname.prototype.getClass = function () {
        return 'app.model.Manager';
    };
    app.model.Manager_isManager = function (isManager) {
        app.model.Manager.apply(this, []);
        this.isManager = isManager;
    };
    app.model.Manager_name_surname.prototype.isManager = true;
    app.model.Manager_isManager.prototype.isManager = true;
    app.model.Manager_name_surname.prototype.person = null;
    app.model.Manager_isManager.prototype.person = null;
    app.model.Manager_name_surname.prototype.getIsManager = function () {
        return this.isManager;
    };
    app.model.Manager_isManager.prototype.getIsManager = function () {
        return this.isManager;
    };
    app.model.Manager_isManager.prototype.getSuper = function () {
        return 'app.model.abstract.Person';
    };
    app.model.Manager_isManager.prototype.getClass = function () {
        return 'app.model.Manager';
    };
    app.model.Manager = function () {
        app.model.Manager.app.model.abstract.Person.apply(this, []);
    };
    app.model.Manager_name_surname.prototype.isManager = true;
    app.model.Manager_isManager.prototype.isManager = true;
    app.model.Manager.prototype.isManager = true;
    app.model.Manager_name_surname.prototype.person = null;
    app.model.Manager_isManager.prototype.person = null;
    app.model.Manager.prototype.person = null;
    app.model.Manager_name_surname.prototype.getIsManager = function () {
        return this.isManager;
    };
    app.model.Manager_isManager.prototype.getIsManager = function () {
        return this.isManager;
    };
    app.model.Manager.prototype.getIsManager = function () {
        return this.isManager;
    };
    app.model.Manager.prototype.getSuper = function () {
        return 'app.model.abstract.Person';
    };
    app.model.Manager.prototype.getClass = function () {
        return 'app.model.Manager';
    };
});
SpikeAssembler.createStaticClass('app.services', 'Documents', 'app.services.Service', {
    documents: [], getDocuments: function () {
        return this.documents;
    }

});
SpikeAssembler.createStaticClass('app.services', 'Service', null, {
    serviceMethod: function () {
        return "OK";
    }

});