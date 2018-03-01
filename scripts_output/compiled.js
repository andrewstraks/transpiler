spike.core.Assembler.resetNamespaces(14, 'app');
spike.core.Assembler.createStaticClass('app', 'Config', 'spike.core.Config', function () {
  return {

    domainUrl: '/ac-api/',
    cookies: {
      cacheTimestamp: '_ac_ct',
      lang: '_ac_l',
      session: 'X-AC-SESSION'
    }, languageFilePath: "i18/{lang}.json", html5Mode: true, isClass: true, apiUrl: function () {
      var $this = this;
      return this.domainUrl + 'rest/'
    }, getSuper: function () {
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
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.Events with arguments count: ' + args.length);
    }
  };
  app.Events.prototype.Events = function () {
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
    spike.core.Log.log('App onRender event');

    app.service.customer.Auth.loginFromAC1();

    var viewData = spike.core.Router.getViewData();

    if (viewData.routingParams.onlyForLogged && app.service.customer.Auth.isLogged() === false) {
      spike.core.Router.redirect('/login');
    }

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
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.Loader with arguments count: ' + args.length);
    }
  };
  app.Loader.prototype.Loader = function () {
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

    spike.core.System.setRouting(new app.Routing([]));
    spike.core.System.setEventsInterface(new app.Events([]));

    spike.core.Log.log('Load application done');

    spike.core.Rest.interceptor("Request", function (response, promise) {
      spike.core.Log.log('Invoke Request interceptor');
    });

    spike.core.Broadcaster.register('SomeEvent');

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
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.Routing with arguments count: ' + args.length);
    }
  };
  app.Routing.prototype.Routing = function () {
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
      controller: 'app.controller.home.Home',
      routingParams: {
        onlyForLogged: true
      }
    });

    router.path('/login', {
      controller: 'app.controller.login.Login'
    });

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
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.home.Home with arguments count: ' + args.length);
    }
  };
  app.controller.home.Home.prototype.Home = function () {
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.home.Home with arguments count: ' + arguments.length);
    }
  };
  app.controller.home.Home.prototype.constructor_0 = function () {
    var $this = this;

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
spike.core.Assembler.defineNamespace('app.controller.login.Login', function () {
  app.controller.login.Login = function (args) {
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.login.Login with arguments count: ' + args.length);
    }
  };
  app.controller.login.Login.prototype.Login = function () {
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.login.Login with arguments count: ' + arguments.length);
    }
  };
  app.controller.login.Login.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.controller.login.Login.prototype.model = {
    loginName: '',
    password: '',
    error: true
  };
  app.controller.login.Login.prototype.isClass = true;
  app.controller.login.Login.prototype.checkErrors = function () {
    var $this = this;
    ($this.model.loginName.length === 0 || $this.model.password.length === 0) ? $this.model.error = true : $this.model.error = false;
  };
  app.controller.login.Login.prototype.login = function (e) {
    var $this = this;
    e.preventDefault();

    if ($this.model.error === true) {

      spike.core.Rest.post(app.enums.api.Session.get.session, {
        loginName: $this.model.loginName,
        password: $this.model.password
      })
        .then(function () {
          spike.core.Router.redirect('/');
        })
        .catch(function () {
          $this.model.error = true;
        });

    }

  };
  app.controller.login.Login.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.controller.login.Login.prototype.getClass = function () {
    var $this = this;
    return 'app.controller.login.Login';
  };
});
spike.core.Assembler.defineNamespace('app.element.global.navigation.footer.Footer', function () {
  app.element.global.navigation.footer.Footer = function (args) {
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.element.global.navigation.footer.Footer with arguments count: ' + args.length);
    }
  };
  app.element.global.navigation.footer.Footer.prototype.Footer = function () {
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.element.global.navigation.footer.Footer with arguments count: ' + arguments.length);
    }
  };
  app.element.global.navigation.footer.Footer.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.element.global.navigation.footer.Footer.prototype.isClass = true;
  app.element.global.navigation.footer.Footer.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.GlobalElement';
  };
  app.element.global.navigation.footer.Footer.prototype.getClass = function () {
    var $this = this;
    return 'app.element.global.navigation.footer.Footer';
  };
});
spike.core.Assembler.defineNamespace('app.element.global.navigation.menu.Menu', function () {
  app.element.global.navigation.menu.Menu = function (args) {
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.element.global.navigation.menu.Menu with arguments count: ' + args.length);
    }
  };
  app.element.global.navigation.menu.Menu.prototype.Menu = function () {
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.element.global.navigation.menu.Menu with arguments count: ' + arguments.length);
    }
  };
  app.element.global.navigation.menu.Menu.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.element.global.navigation.menu.Menu.prototype.isClass = true;
  app.element.global.navigation.menu.Menu.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.GlobalElement';
  };
  app.element.global.navigation.menu.Menu.prototype.getClass = function () {
    var $this = this;
    return 'app.element.global.navigation.menu.Menu';
  };
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Dictionaries', null, function () {
  return {

    adminRoles: app.Config.apiUrl() + 'dictionaries/admin/roles',
    offerTypes: app.Config.apiUrl() + 'dictionaries/offer-definition/types',
    privilegeStatuses: app.Config.apiUrl() + 'dictionaries/privilege/statuses',
    queryStatuses: app.Config.apiUrl() + 'dictionaries/query/statuses',
    betSlipCombinationStatuses: app.Config.apiUrl() + 'dictionaries/bet-slip/combination/statuses',
    betSlipRegMethods: app.Config.apiUrl() + 'dictionaries/bet-slip/reg-methods',

    eventsTypes: app.Config.apiUrl() + 'dictionaries/events/types',
    transactionsTypes: app.Config.apiUrl() + 'dictionaries/transaction/types',
    transactionsTypeSwitches: app.Config.apiUrl() + 'dictionaries/transaction/type-switches',

    offerDefinitionStatuses: app.Config.apiUrl() + 'dictionaries/offer-definition/statuses',
    offerAssignConditions: app.Config.apiUrl() + 'dictionaries/offer-definition/assign-conditions/{offerType}',
    offerWithdrawLockTypes: app.Config.apiUrl() + 'dictionaries/offer-definition/withdraw-lock-types',
    offerCachbackCalculationTypes: app.Config.apiUrl() + 'dictionaries/offer-definition/cachback-calculation-types/{offerType}',
    offerCachbackProgressiveCachbackTypes: app.Config.apiUrl() + 'dictionaries/offer-definition/progressive-cachback-types',

    cmsCommentsStatuses: app.Config.apiUrl() + 'cms/comments/publication-statuses'

  }
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Privileges', null, function () {
  return {

    urlIds: app.Config.apiUrl() + 'support/privileges/rest',

    roles: app.Config.apiUrl() + 'support/privileges/rest/roles',
    rolesByUrlId: app.Config.apiUrl() + 'support/privileges/rest/roles/{urlId}',
    createRole: app.Config.apiUrl() + 'support/privileges/rest/roles',
    updateRole: app.Config.apiUrl() + 'support/privileges/rest/roles/{urlId}',

    users: app.Config.apiUrl() + 'support/privileges/rest/users',
    usersByUrlId: app.Config.apiUrl() + 'support/privileges/rest/users/{urlId}',
    createAdminRole: app.Config.apiUrl() + 'support/privileges/rest/users',
    updateAdminRole: app.Config.apiUrl() + 'support/privileges/rest/users/{urlId}',

  }
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Queries', null, function () {
  return {

    get: app.Config.apiUrl() + 'queries/{hash}',
    remove: app.Config.apiUrl() + 'queries/{hash}',
    getAll: app.Config.apiUrl() + 'queries'

  }
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Session', null, function () {
  return {

    get: {
      session: app.Config.apiUrl() + 'session',
      logout: app.Config.apiUrl() + 'session/login',
      redirectionAC: app.Config.apiUrl() + 'redirections/ac-api/{path}',
    },

    post: {
      login: app.Config.apiUrl() + 'session/login',
      loginUsingToken: app.Config.apiUrl() + 'session/login/token'
    }

  }
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Statistics', null, function () {
  return {

    exposureEstimate: app.Config.apiUrl() + 'statistics/exposure-estimate'

  }
});
spike.core.Assembler.createStaticClass('app.service.customer', 'Auth', 'null', function () {
  return {
    customerData: null, isClass: true, isLogged: function () {
      var $this = this;
      return !!this.customerData;
    }, loginFromAC1: function () {
      var $this = this;

      var urlParams = spike.core.Router.getURLParams();

      if (urlParams.token && urlParams.path && urlParams.id && urlParams.createdTime) {

        var request = {
          token: urlParams.token,
          adminId: urlParams.id,
          createdTime: urlParams.createdTime
        };

        spike.core.Rest.post(app.enums.api.Session.loginUsingToken, request)
          .then(function (response) {
            window.location.href = urlParams.path;
          });

      }

    }, getSuper: function () {
      var $this = this;
      return 'null';
    }, getClass: function () {
      var $this = this;
      return 'app.service.customer.Auth';
    },
  }
});
spike.core.Assembler.dependencies(function () {
  spike.core.Assembler.extend(spike.core.Config.prototype, app.Config.prototype);
  spike.core.Assembler.extend(spike.core.LoaderInterface.prototype, app.Loader.prototype);
  spike.core.Assembler.extend(spike.core.EventsInterface.prototype, app.Events.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.home.Home.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.login.Login.prototype);
  spike.core.Assembler.extend(spike.core.RoutingInterface.prototype, app.Routing.prototype);
  spike.core.Assembler.extend(spike.core.GlobalElement.prototype, app.element.global.navigation.footer.Footer.prototype);
  spike.core.Assembler.extend(spike.core.GlobalElement.prototype, app.element.global.navigation.menu.Menu.prototype);
});