spike.core.Assembler.resetNamespaces(12, 'app');
spike.core.Assembler.createStaticClass('app', 'Config', 'spike.core.Config', function () {
    return {
        languageFilePath: "i18/{lang}.json", html5Mode: true, isClass: true, getSuper: function () {
            var $this = this;
            return 'spike.core.Config';
        }, getClass: function () {
            var $this = this;
            return 'app.Config';
        },
    }
});
spike.core.Assembler.defineNamespace('app.Events', function () {
    app.Events = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.Events with arguments count: ' + __args.length);
        }
    };
    app.Events.prototype.Events = function () {
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.Events with arguments count: ' + arguments.length);
        }
    };
    app.Events.prototype.constructor_0 = function () {
        var $this = this;
    };
    app.Events.prototype.isClass = true;
    app.Events.prototype.onRender = function () {
        var $this = this;

        spike.core.Log.log('Application renders controller or modal');

    };
    app.Events.prototype.onReady = function () {
        var $this = this;

        spike.core.Log.log('Application ready');

    };
    app.Events.prototype.getSuper = function () {
        var $this = this;
        return 'spike.core.EventsInterface';
    };
    app.Events.prototype.getClass = function () {
        var $this = this;
        return 'app.Events';
    };
});
spike.core.Assembler.defineNamespace('app.Loader', function () {
    app.Loader = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.Loader with arguments count: ' + __args.length);
        }
    };
    app.Loader.prototype.Loader = function () {
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.Loader with arguments count: ' + arguments.length);
        }
    };
    app.Loader.prototype.constructor_0 = function () {
        var $this = this;
    };
    app.Loader.prototype.isClass = true;
    app.Loader.prototype.loadApplication = function () {
        var $this = this;

        spike.core.System.setRouting(new app.Routing());
        spike.core.System.setEventsInterface(new app.Events());

    };
    app.Loader.prototype.getSuper = function () {
        var $this = this;
        return 'spike.core.LoaderInterface';
    };
    app.Loader.prototype.getClass = function () {
        var $this = this;
        return 'app.Loader';
    };
});
spike.core.Assembler.defineNamespace('app.Routing', function () {
    app.Routing = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.Routing with arguments count: ' + __args.length);
        }
    };
    app.Routing.prototype.Routing = function () {
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.Routing with arguments count: ' + arguments.length);
        }
    };
    app.Routing.prototype.constructor_0 = function () {
        var $this = this;
    };
    app.Routing.prototype.isClass = true;
    app.Routing.prototype.create = function (router) {
        var $this = this;

        router.path('/', {
            controller: 'app.controller.home.Home'
        });

        router.path('/home', {
            controller: 'app.controller.home.Home',
            routingParams: {
                page: 'HOME'
            }
        });

        router.other('/');

    };
    app.Routing.prototype.getSuper = function () {
        var $this = this;
        return 'spike.core.RoutingInterface';
    };
    app.Routing.prototype.getClass = function () {
        var $this = this;
        return 'app.Routing';
    };
});
spike.core.Assembler.defineNamespace('app.controller.home.Home', function () {
    app.controller.home.Home = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.controller.home.Home with arguments count: ' + __args.length);
        }
    };
    app.controller.home.Home.prototype.Home = function () {
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.controller.home.Home with arguments count: ' + arguments.length);
        }
    };
    app.controller.home.Home.prototype.constructor_0 = function () {
        var $this = this;

        var person = new app.model.Person(2, 25, 'Szczecin');

        console.log(person);

    };
    app.controller.home.Home.prototype.isClass = true;
    app.controller.home.Home.prototype.getSuper = function () {
        var $this = this;
        return 'spike.core.Controller';
    };
    app.controller.home.Home.prototype.getClass = function () {
        var $this = this;
        return 'app.controller.home.Home';
    };
});
spike.core.Assembler.defineNamespace('app.elements.list.ListItem', function () {
    app.elements.list.ListItem = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.elements.list.ListItem with arguments count: ' + __args.length);
        }
    };
    app.elements.list.ListItem.prototype.ListItem = function () {
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.elements.list.ListItem with arguments count: ' + arguments.length);
        }
    };
    app.elements.list.ListItem.prototype.constructor_0 = function () {
        var $this = this;
    };
    app.elements.list.ListItem.prototype.isClass = true;
    app.elements.list.ListItem.prototype.getSuper = function () {
        var $this = this;
        return 'spike.core.Element';
    };
    app.elements.list.ListItem.prototype.getClass = function () {
        var $this = this;
        return 'app.elements.list.ListItem';
    };
});
spike.core.Assembler.defineNamespace('app.model.Car', function () {
    app.model.Car = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.model.Car with arguments count: ' + __args.length);
        }
    };
    app.model.Car.prototype.Car = function () {
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.model.Car with arguments count: ' + arguments.length);
        }
    };
    app.model.Car.prototype.constructor_0 = function () {
        var $this = this;

    };
    app.model.Car.prototype.isClass = true;
    app.model.Car.prototype.getSuper = function () {
        var $this = this;
        return 'null';
    };
    app.model.Car.prototype.getClass = function () {
        var $this = this;
        return 'app.model.Car';
    };
});
spike.core.Assembler.defineNamespace('app.model.Developer', function () {
    app.model.Developer = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.status = null;
        this.data = null;
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.model.Developer with arguments count: ' + __args.length);
        }
    };
    app.model.Developer.prototype.Developer = function () {
        this.status = null;
        this.data = null;
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.model.Developer with arguments count: ' + arguments.length);
        }
    };
    app.model.Developer.prototype.constructor_0 = function () {
        var $this = this;
        this.status = app.model.Status1000.NO_CONTENT;
    };
    app.model.Developer.prototype.status = null;
    app.model.Developer.prototype.data = null;
    app.model.Developer.prototype.isClass = true;
    app.model.Developer.prototype.getSuper = function () {
        var $this = this;
        return 'null';
    };
    app.model.Developer.prototype.getClass = function () {
        var $this = this;
        return 'app.model.Developer';
    };
});
spike.core.Assembler.createStaticClass('app.model', 'app.model.Status1000', null, function () {
    return {

        OK: 200,
        NO_CONTENT: 201

    }
});
spike.core.Assembler.defineNamespace('app.model.Person', function () {
    app.model.Person = function (args) {
        var __args = [];
        if (args && arguments.length == 1) {
            if (args instanceof Array) {
                __args = args.length == 0 ? arguments : args;
            } else {
                __args = [args];
            }
        } else {
            __args = arguments;
        }
        this.educationYears = null;
        this.age = null;
        this.city = null;
        this.isClass = true;
        if (this['constructor_' + __args.length] !== undefined) {
            this['constructor_' + __args.length].apply(this, __args);
        } else {
            throw new Error('Spike: No matching constructor found app.model.Person with arguments count: ' + __args.length);
        }
    };
    app.model.Person.prototype.Person = function () {
        this.educationYears = null;
        this.age = null;
        this.city = null;
        this.isClass = true;
        if (this['constructor_' + arguments.length] !== undefined) {
            this['constructor_' + arguments.length].apply(this, arguments);
        } else {
            throw new Error('Spike: No matching constructor found app.model.Person with arguments count: ' + arguments.length);
        }
    };
    app.model.Person.prototype.constructor_3 = function (educationYears, age, city) {
        var $this = this;
        this.educationYears = educationYears;
        this.age = age;
        this.city = city;

        this.proposedSalary = app.model.PersonUtils100.calculateSalary(this);
    };
    app.model.Person.prototype.constructor_0 = function () {
        var $this = this;
    };
    app.model.Person.prototype.educationYears = null;
    app.model.Person.prototype.age = null;
    app.model.Person.prototype.city = null;
    app.model.Person.prototype.isClass = true;
    app.model.Person.prototype.getSuper = function () {
        var $this = this;
        return 'null';
    };
    app.model.Person.prototype.getClass = function () {
        var $this = this;
        return 'app.model.Person';
    };
});
spike.core.Assembler.createStaticClass('app.model', 'app.model.PersonUtils100', 'null', function () {
    return {
        isClass: true, calculateSalary: function (person) {
            var $this = this;
            return person.age * person.educationYears;
        }, getSuper: function () {
            var $this = this;
            return 'null';
        }, getClass: function () {
            var $this = this;
            return 'app.model.app.model.PersonUtils100';
        },
    }
});
spike.core.Assembler.createStaticClass('app.model', 'Status', null, function () {
    return {

        OK: 200,
        NO_CONTENT: 201

    }
});
spike.core.Assembler.dependencies(function () {
    spike.core.Assembler.extend(spike.core.Config.prototype, app.Config.prototype);
    spike.core.Assembler.extend(spike.core.Element.prototype, app.elements.list.ListItem.prototype);
    spike.core.Assembler.extend(spike.core.LoaderInterface.prototype, app.Loader.prototype);
    spike.core.Assembler.extend(spike.core.EventsInterface.prototype, app.Events.prototype);
    spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.home.Home.prototype);
    spike.core.Assembler.extend(spike.core.RoutingInterface.prototype, app.Routing.prototype);
});