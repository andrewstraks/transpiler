spike.core.Assembler.resetNamespaces(23, 'app');
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
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.Events with arguments count: ' + args.length);
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
  app.Events.prototype.onAuth = function () {
    var $this = this;

    var isLogged = app.service.customer.Auth.isLogged();

    if (isLogged === true) {
      app.service.dictionaries.DictionariesManager.loadDictionaries();
    }

  };
  app.Events.prototype.onReady = function () {
    var $this = this;
    spike.core.Log.log('App onReady event');

    app.service.customer.Auth.getSession();
    spike.core.Broadcaster.register('onAuth');
    spike.core.Broadcaster.listen('onAuth', this.onAuth);

  };
  app.Events.prototype.onRender = function () {
    var $this = this;
    spike.core.Log.log('App onRender event');

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
    this.isClass = true;

    if(args){
        if(args instanceof Array){
            args = args.length == 0 ? arguments : [args];
        }else{
            args = [args];
        }
    }else{
      args = arguments
    }

    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.Loader with arguments count: ' + args.length);
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
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.Routing with arguments count: ' + args.length);
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
      controller: 'app.controller.general.home.Home',
      routingParams: {
        onlyForLogged: true
      }
    });

    router.path('/login', {
      controller: 'app.controller.general.login.Login'
    });

    router.path('/maintenance', {
      controller: 'app.controller.general.maintenance.Maintenance'
    });

    router.path('/not-found', {
      controller: 'app.controller.general.pageNotFound.PageNotFound'
    });

    router.other('/not-found');

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
spike.core.Assembler.defineNamespace('app.controller.general.home.Home', function () {
  app.controller.general.home.Home = function (args) {
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.home.Home with arguments count: ' + args.length);
    }
  };
  app.controller.general.home.Home.prototype.Home = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.home.Home with arguments count: ' + arguments.length);
    }
  };
  app.controller.general.home.Home.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.controller.general.home.Home.prototype.isClass = true;
  app.controller.general.home.Home.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.controller.general.home.Home.prototype.getClass = function () {
    var $this = this;
    return 'app.controller.general.home.Home';
  };
});
spike.core.Assembler.defineNamespace('app.controller.general.login.Login', function () {
  app.controller.general.login.Login = function (args) {
    this.model = {
      loginName: '',
      password: '',
      error: false
    };
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.login.Login with arguments count: ' + args.length);
    }
  };
  app.controller.general.login.Login.prototype.Login = function () {
    this.model = {
      loginName: '',
      password: '',
      error: false
    };
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.login.Login with arguments count: ' + arguments.length);
    }
  };
  app.controller.general.login.Login.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.controller.general.login.Login.prototype.model = {
    loginName: '',
    password: '',
    error: false
  };
  app.controller.general.login.Login.prototype.isClass = true;
  app.controller.general.login.Login.prototype.checkErrors = function () {
    var $this = this;
    ($this.model.loginName.length === 0 || $this.model.password.length === 0) ? $this.model.error = true : $this.model.error = false;
  };
  app.controller.general.login.Login.prototype.login = function (e) {
    var $this = this;
    e.preventDefault();

    if ($this.model.error === false) {

      app.service.customer.Auth.login({
        loginName: $this.model.loginName,
        password: $this.model.password
      })
        .then(function (data) {
          spike.core.Router.redirect('/');
        })
        .catch(function () {
          $this.model.error = true;
        });

    }

  };
  app.controller.general.login.Login.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.controller.general.login.Login.prototype.getClass = function () {
    var $this = this;
    return 'app.controller.general.login.Login';
  };
});
spike.core.Assembler.defineNamespace('app.controller.general.maintenance.Maintenance', function () {
  app.controller.general.maintenance.Maintenance = function (args) {
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.maintenance.Maintenance with arguments count: ' + args.length);
    }
  };
  app.controller.general.maintenance.Maintenance.prototype.Maintenance = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.maintenance.Maintenance with arguments count: ' + arguments.length);
    }
  };
  app.controller.general.maintenance.Maintenance.prototype.constructor_0 = function () {
    var $this = this;


    $this.dictionaries = app.service.dictionaries.DictionariesManager.dictionaries;

    console.log($this.dictionaries);

  };
  app.controller.general.maintenance.Maintenance.prototype.isClass = true;
  app.controller.general.maintenance.Maintenance.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.controller.general.maintenance.Maintenance.prototype.getClass = function () {
    var $this = this;
    return 'app.controller.general.maintenance.Maintenance';
  };
});
spike.core.Assembler.defineNamespace('app.controller.general.pageNotFound.PageNotFound', function () {
  app.controller.general.pageNotFound.PageNotFound = function (args) {
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.pageNotFound.PageNotFound with arguments count: ' + args.length);
    }
  };
  app.controller.general.pageNotFound.PageNotFound.prototype.PageNotFound = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.controller.general.pageNotFound.PageNotFound with arguments count: ' + arguments.length);
    }
  };
  app.controller.general.pageNotFound.PageNotFound.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.controller.general.pageNotFound.PageNotFound.prototype.isClass = true;
  app.controller.general.pageNotFound.PageNotFound.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.controller.general.pageNotFound.PageNotFound.prototype.getClass = function () {
    var $this = this;
    return 'app.controller.general.pageNotFound.PageNotFound';
  };
});
spike.core.Assembler.defineNamespace('app.element.global.navigation.footer.Footer', function () {
  app.element.global.navigation.footer.Footer = function (args) {
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.element.global.navigation.footer.Footer with arguments count: ' + args.length);
    }
  };
  app.element.global.navigation.footer.Footer.prototype.Footer = function () {
    this.isClass = true;
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
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.element.global.navigation.menu.Menu with arguments count: ' + args.length);
    }
  };
  app.element.global.navigation.menu.Menu.prototype.Menu = function () {
    this.isClass = true;
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

    get: {

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

  }
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Privileges', null, function () {
  return {

    get: {
      urlIds: app.Config.apiUrl() + 'support/privileges/rest',
      roles: app.Config.apiUrl() + 'support/privileges/rest/roles',
      rolesByUrlId: app.Config.apiUrl() + 'support/privileges/rest/roles/{urlId}',
      users: app.Config.apiUrl() + 'support/privileges/rest/users',
      usersByUrlId: app.Config.apiUrl() + 'support/privileges/rest/users/{urlId}',
    },

    put: {
      createRole: app.Config.apiUrl() + 'support/privileges/rest/roles',
      createAdminRole: app.Config.apiUrl() + 'support/privileges/rest/users',
    },

    post: {
      updateRole: app.Config.apiUrl() + 'support/privileges/rest/roles/{urlId}',
      updateAdminRole: app.Config.apiUrl() + 'support/privileges/rest/users/{urlId}',
    }

  }
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Queries', null, function () {
  return {

    get: {
      get: app.Config.apiUrl() + 'queries/{hash}',
      getAll: app.Config.apiUrl() + 'queries'
    },

    delete: {
      remove: app.Config.apiUrl() + 'queries/{hash}'
    }

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

    get: {
      exposureEstimate: app.Config.apiUrl() + 'statistics/exposure-estimate'
    }

  }
});
spike.core.Assembler.defineNamespace('app.model.customer.LoginData', function () {
  app.model.customer.LoginData = function (args) {
    this.adminId = null;
    this.allowedViews = [];
    this.firstName = null;
    this.lastName = null;
    this.loginName = null;
    this.serverTimeMillis = null;
    this.loginTime = null;
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.model.customer.LoginData with arguments count: ' + args.length);
    }
  };
  app.model.customer.LoginData.prototype.LoginData = function () {
    this.adminId = null;
    this.allowedViews = [];
    this.firstName = null;
    this.lastName = null;
    this.loginName = null;
    this.serverTimeMillis = null;
    this.loginTime = null;
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.model.customer.LoginData with arguments count: ' + arguments.length);
    }
  };
  app.model.customer.LoginData.prototype.constructor_7 = function (adminId, allowedViews, firstName, lastName, loginName, serverTimeMillis, loginTime) {
    var $this = this;
    this.adminId = adminId;
    this.allowedViews = allowedViews;
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginName = loginName;
    this.serverTimeMillis = serverTimeMillis;
    this.loginTime = loginTime;
  };
  app.model.customer.LoginData.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.model.customer.LoginData.prototype.adminId = null;
  app.model.customer.LoginData.prototype.allowedViews = [];
  app.model.customer.LoginData.prototype.firstName = null;
  app.model.customer.LoginData.prototype.lastName = null;
  app.model.customer.LoginData.prototype.loginName = null;
  app.model.customer.LoginData.prototype.serverTimeMillis = null;
  app.model.customer.LoginData.prototype.loginTime = null;
  app.model.customer.LoginData.prototype.isClass = true;
  app.model.customer.LoginData.prototype.getSuper = function () {
    var $this = this;
    return 'null';
  };
  app.model.customer.LoginData.prototype.getClass = function () {
    var $this = this;
    return 'app.model.customer.LoginData';
  };
});
spike.core.Assembler.createStaticClass('app.service.customer', 'Auth', 'null', function () {
  return {
    customerData: null, isClass: true, isLogged: function () {
      var $this = this;
      return !!this.customerData;
    }, saveSessionCache: function () {
      var $this = this;

      var sessionData = Storage.get('__session_data');
      if (!sessionData) {
        Storage.set('__session_data', $this.customerData);
      }

    }, loginSuccess: function (response) {
      var $this = this;

      $this.customerData = new app.model.customer.LoginData(
        response.adminId,
        response.allowedViews,
        response.firstName,
        response.lastName,
        response.loginName,
        response.serverTimeMillis,
        new Date().getTime()
      );

      $this.saveSessionCache();
      spike.core.Broadcaster.broadcast('onAuth');


    }, getSession: function () {
      var $this = this;

      var sessionData = Storage.get('__session_data');
      if (sessionData && new Date().getTime() - sessionData.loginTime < 300000) {
        $this.loginSuccess(sessionData);
      } else {
        spike.core.Rest.get(app.enums.api.Session.get.session).then($this.loginSuccess);
      }

    }, login: function (loginRequest) {
      var $this = this;
      return spike.core.Rest.post(app.enums.api.Session.post.login, loginRequest).then($this.loginSuccess);
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
spike.core.Assembler.defineNamespace('app.service.dictionaries.DictionariesLoader', function () {
  app.service.dictionaries.DictionariesLoader = function (args) {
    this.ready = false;
    this.dictionariesList = [];
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.DictionariesLoader with arguments count: ' + args.length);
    }
  };
  app.service.dictionaries.DictionariesLoader.prototype.DictionariesLoader = function () {
    this.ready = false;
    this.dictionariesList = [];
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.DictionariesLoader with arguments count: ' + arguments.length);
    }
  };
  app.service.dictionaries.DictionariesLoader.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.service.dictionaries.DictionariesLoader.prototype.ready = false;
  app.service.dictionaries.DictionariesLoader.prototype.dictionariesList = [];
  app.service.dictionaries.DictionariesLoader.prototype.isClass = true;
  app.service.dictionaries.DictionariesLoader.prototype.load = function () {
    var $this = this;

    var loadersList = [];

    for (var dictionaryName in $this.dictionariesList) {

      if ($this.dictionariesList[dictionaryName] === undefined) {
        throw new Error($this.getClass() + ' Dictionary path not declared');
      }

      loadersList.push(spike.core.Rest.get($this.dictionariesList[dictionaryName], {
        alias: dictionaryName
      }));

    }

    return new spike.core.MultiRequest(loadersList).always(function (responses) {

      for (var i = 0; i < responses.length; i++) {

        $this[responses[i].alias] = responses[i].responseJSON ? responses[i].responseJSON : null;

      }

    });

  };
  app.service.dictionaries.DictionariesLoader.prototype.getSuper = function () {
    var $this = this;
    return 'null';
  };
  app.service.dictionaries.DictionariesLoader.prototype.getClass = function () {
    var $this = this;
    return 'app.service.dictionaries.DictionariesLoader';
  };
});
spike.core.Assembler.createStaticClass('app.service.dictionaries', 'DictionariesManager', 'null', function () {
  return {
    dictionariesLoaded: false, dictionaries: {
      generalDictionaries: null,
      cmsDictionaries: null,
      offersDictionaries: null
    }, isClass: true, saveDictionaries: function () {
      var $this = this;

      for (var dictionaryName in $this.dictionaries) {
        app.service.storage.Storage.set('__dictionary_' + dictionaryName, $this.dictionaries[dictionaryName]);
      }

    }, loadDictionariesFromCache: function () {
      var $this = this;

      var counter = 0;
      for (var dictionaryName in $this.dictionaries) {

        var dictionaries = app.service.storage.Storage.get('__dictionary_' + dictionaryName);
        if (dictionaries == null) {
          break;
        } else {
          $this.dictionaries[dictionaryName] = dictionaries;
          counter++;
        }

      }

      if (counter === Object.keys($this.dictionaries).length) {
        $this.dictionariesLoaded = true;
      }

    }, loadDictionaries: function () {
      var $this = this;

      $this.dictionaries.generalDictionaries = new app.service.dictionaries.loaders.GeneralDictionaries();
      $this.dictionaries.cmsDictionaries = new app.service.dictionaries.loaders.CmsDictionaries();
      $this.dictionaries.offersDictionaries = new app.service.dictionaries.loaders.OffersDictionaries();

      $this.loadDictionariesFromCache();

      if ($this.dictionariesLoaded === false) {

        var loadersPromises = [
          $this.dictionaries.generalDictionaries.load(),
          $this.dictionaries.cmsDictionaries.load(),
          $this.dictionaries.offersDictionaries.load()
        ];

        new spike.core.MultiRequest(loadersPromises).always(function (responses) {
          $this.saveDictionaries();
          $this.dictionariesLoaded = true;
        });

      }


    }, getSuper: function () {
      var $this = this;
      return 'null';
    }, getClass: function () {
      var $this = this;
      return 'app.service.dictionaries.DictionariesManager';
    },
  }
});
spike.core.Assembler.defineNamespace('app.service.dictionaries.loaders.CmsDictionaries', function () {
  app.service.dictionaries.loaders.CmsDictionaries = function (args) {
    this.cmsCommentsStatuses = null;
    this.dictionariesList = {
      cmsCommentsStatuses: app.enums.api.Dictionaries.get.cmsCommentsStatuses
    };
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.CmsDictionaries with arguments count: ' + args.length);
    }
  };
  app.service.dictionaries.loaders.CmsDictionaries.prototype.CmsDictionaries = function () {
    this.cmsCommentsStatuses = null;
    this.dictionariesList = {
      cmsCommentsStatuses: app.enums.api.Dictionaries.get.cmsCommentsStatuses
    };
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.CmsDictionaries with arguments count: ' + arguments.length);
    }
  };
  app.service.dictionaries.loaders.CmsDictionaries.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.service.dictionaries.loaders.CmsDictionaries.prototype.cmsCommentsStatuses = null;
  app.service.dictionaries.loaders.CmsDictionaries.prototype.dictionariesList = {
    cmsCommentsStatuses: app.enums.api.Dictionaries.get.cmsCommentsStatuses
  };
  app.service.dictionaries.loaders.CmsDictionaries.prototype.isClass = true;
  app.service.dictionaries.loaders.CmsDictionaries.prototype.getSuper = function () {
    var $this = this;
    return 'app.service.dictionaries.DictionariesLoader';
  };
  app.service.dictionaries.loaders.CmsDictionaries.prototype.getClass = function () {
    var $this = this;
    return 'app.service.dictionaries.loaders.CmsDictionaries';
  };
});
spike.core.Assembler.defineNamespace('app.service.dictionaries.loaders.GeneralDictionaries', function () {
  app.service.dictionaries.loaders.GeneralDictionaries = function (args) {
    this.adminRoles = null;
    this.privilegeStatuses = null;
    this.queryStatuses = null;
    this.betSlipCombinationStatuses = null;
    this.betSlipRegMethods = null;
    this.eventsTypes = null;
    this.transactionsTypes = null;
    this.transactionsTypeSwitches = null;
    this.dictionariesList = {
      adminRoles: app.enums.api.Dictionaries.get.adminRoles,
      privilegeStatuses: app.enums.api.Dictionaries.get.privilegeStatuses,
      queryStatuses: app.enums.api.Dictionaries.get.queryStatuses,
      betSlipCombinationStatuses: app.enums.api.Dictionaries.get.betSlipCombinationStatuses,
      betSlipRegMethods: app.enums.api.Dictionaries.get.betSlipRegMethods,
      eventsTypes: app.enums.api.Dictionaries.get.eventsTypes,
      transactionsTypes: app.enums.api.Dictionaries.get.transactionsTypes,
      transactionsTypeSwitches: app.enums.api.Dictionaries.get.transactionsTypeSwitches
    };
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.GeneralDictionaries with arguments count: ' + args.length);
    }
  };
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.GeneralDictionaries = function () {
    this.adminRoles = null;
    this.privilegeStatuses = null;
    this.queryStatuses = null;
    this.betSlipCombinationStatuses = null;
    this.betSlipRegMethods = null;
    this.eventsTypes = null;
    this.transactionsTypes = null;
    this.transactionsTypeSwitches = null;
    this.dictionariesList = {
      adminRoles: app.enums.api.Dictionaries.get.adminRoles,
      privilegeStatuses: app.enums.api.Dictionaries.get.privilegeStatuses,
      queryStatuses: app.enums.api.Dictionaries.get.queryStatuses,
      betSlipCombinationStatuses: app.enums.api.Dictionaries.get.betSlipCombinationStatuses,
      betSlipRegMethods: app.enums.api.Dictionaries.get.betSlipRegMethods,
      eventsTypes: app.enums.api.Dictionaries.get.eventsTypes,
      transactionsTypes: app.enums.api.Dictionaries.get.transactionsTypes,
      transactionsTypeSwitches: app.enums.api.Dictionaries.get.transactionsTypeSwitches
    };
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.GeneralDictionaries with arguments count: ' + arguments.length);
    }
  };
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.adminRoles = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.privilegeStatuses = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.queryStatuses = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.betSlipCombinationStatuses = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.betSlipRegMethods = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.eventsTypes = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.transactionsTypes = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.transactionsTypeSwitches = null;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.dictionariesList = {
    adminRoles: app.enums.api.Dictionaries.get.adminRoles,
    privilegeStatuses: app.enums.api.Dictionaries.get.privilegeStatuses,
    queryStatuses: app.enums.api.Dictionaries.get.queryStatuses,
    betSlipCombinationStatuses: app.enums.api.Dictionaries.get.betSlipCombinationStatuses,
    betSlipRegMethods: app.enums.api.Dictionaries.get.betSlipRegMethods,
    eventsTypes: app.enums.api.Dictionaries.get.eventsTypes,
    transactionsTypes: app.enums.api.Dictionaries.get.transactionsTypes,
    transactionsTypeSwitches: app.enums.api.Dictionaries.get.transactionsTypeSwitches
  };
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.isClass = true;
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.getSuper = function () {
    var $this = this;
    return 'app.service.dictionaries.DictionariesLoader';
  };
  app.service.dictionaries.loaders.GeneralDictionaries.prototype.getClass = function () {
    var $this = this;
    return 'app.service.dictionaries.loaders.GeneralDictionaries';
  };
});
spike.core.Assembler.defineNamespace('app.service.dictionaries.loaders.OffersDictionaries', function () {
  app.service.dictionaries.loaders.OffersDictionaries = function (args) {
    this.offerDefinitionStatuses = null;
    this.offerTypes = null;
    this.offerAssignConditions = null;
    this.offerWithdrawLockTypes = null;
    this.offerCachbackCalculationTypes = null;
    this.offerCachbackProgressiveCachbackTypes = null;
    this.dictionariesList = {
      offerDefinitionStatuses: app.enums.api.Dictionaries.get.offerDefinitionStatuses,
      offerTypes: app.enums.api.Dictionaries.get.offerTypes,
      offerAssignConditions: app.enums.api.Dictionaries.get.offerAssignConditions,
      offerWithdrawLockTypes: app.enums.api.Dictionaries.get.offerWithdrawLockTypes,
      offerCachbackCalculationTypes: app.enums.api.Dictionaries.get.offerCachbackCalculationTypes,
      offerCachbackProgressiveCachbackTypes: app.enums.api.Dictionaries.get.offerCachbackProgressiveCachbackTypes,
    };
    this.isClass = true;
    if (this['constructor_' + args.length] !== undefined) {
      this['constructor_' + args.length].apply(this, args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.OffersDictionaries with arguments count: ' + args.length);
    }
  };
  app.service.dictionaries.loaders.OffersDictionaries.prototype.OffersDictionaries = function () {
    this.offerDefinitionStatuses = null;
    this.offerTypes = null;
    this.offerAssignConditions = null;
    this.offerWithdrawLockTypes = null;
    this.offerCachbackCalculationTypes = null;
    this.offerCachbackProgressiveCachbackTypes = null;
    this.dictionariesList = {
      offerDefinitionStatuses: app.enums.api.Dictionaries.get.offerDefinitionStatuses,
      offerTypes: app.enums.api.Dictionaries.get.offerTypes,
      offerAssignConditions: app.enums.api.Dictionaries.get.offerAssignConditions,
      offerWithdrawLockTypes: app.enums.api.Dictionaries.get.offerWithdrawLockTypes,
      offerCachbackCalculationTypes: app.enums.api.Dictionaries.get.offerCachbackCalculationTypes,
      offerCachbackProgressiveCachbackTypes: app.enums.api.Dictionaries.get.offerCachbackProgressiveCachbackTypes,
    };
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.OffersDictionaries with arguments count: ' + arguments.length);
    }
  };
  app.service.dictionaries.loaders.OffersDictionaries.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.service.dictionaries.loaders.OffersDictionaries.prototype.offerDefinitionStatuses = null;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.offerTypes = null;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.offerAssignConditions = null;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.offerWithdrawLockTypes = null;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.offerCachbackCalculationTypes = null;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.offerCachbackProgressiveCachbackTypes = null;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.dictionariesList = {
    offerDefinitionStatuses: app.enums.api.Dictionaries.get.offerDefinitionStatuses,
    offerTypes: app.enums.api.Dictionaries.get.offerTypes,
    offerAssignConditions: app.enums.api.Dictionaries.get.offerAssignConditions,
    offerWithdrawLockTypes: app.enums.api.Dictionaries.get.offerWithdrawLockTypes,
    offerCachbackCalculationTypes: app.enums.api.Dictionaries.get.offerCachbackCalculationTypes,
    offerCachbackProgressiveCachbackTypes: app.enums.api.Dictionaries.get.offerCachbackProgressiveCachbackTypes,
  };
  app.service.dictionaries.loaders.OffersDictionaries.prototype.isClass = true;
  app.service.dictionaries.loaders.OffersDictionaries.prototype.getSuper = function () {
    var $this = this;
    return 'app.service.dictionaries.DictionariesLoader';
  };
  app.service.dictionaries.loaders.OffersDictionaries.prototype.getClass = function () {
    var $this = this;
    return 'app.service.dictionaries.loaders.OffersDictionaries';
  };
});
spike.core.Assembler.createStaticClass('app.service.storage', 'Storage', 'null', function () {
  return {
    isClass: true, set: function (paramName, paramObject) {
      var $this = this;

      if (paramObject && (paramObject instanceof Array || typeof paramObject === 'object')) {
        paramObject = JSON.stringify(paramObject);
      }

      localStorage.setItem(paramName, paramObject);

    }, get: function (paramName) {
      var $this = this;

      var value = localStorage.getItem(paramName);

      if (!spike.core.Util.isEmpty(value)) {

        value = value.trim();

        if (value[0] == '{' || value[0] == '[') {
          value = JSON.parse(value);
        } else if (value == 'true') {
          value = true;
        } else if (value == 'false') {
          value = false;
        }

        return value;

      }

      return null;

    }, remove: function (paramName) {
      var $this = this;
      localStorage.removeItem(paramName);
    }, getSuper: function () {
      var $this = this;
      return 'null';
    }, getClass: function () {
      var $this = this;
      return 'app.service.storage.Storage';
    },
  }
});
spike.core.Assembler.dependencies(function () {
  spike.core.Assembler.extend(spike.core.Config.prototype, app.Config.prototype);
  spike.core.Assembler.extend(spike.core.LoaderInterface.prototype, app.Loader.prototype);
  spike.core.Assembler.extend(spike.core.EventsInterface.prototype, app.Events.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.general.home.Home.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.general.login.Login.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.general.maintenance.Maintenance.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.controller.general.pageNotFound.PageNotFound.prototype);
  spike.core.Assembler.extend(spike.core.RoutingInterface.prototype, app.Routing.prototype);
  spike.core.Assembler.extend(spike.core.GlobalElement.prototype, app.element.global.navigation.footer.Footer.prototype);
  spike.core.Assembler.extend(spike.core.GlobalElement.prototype, app.element.global.navigation.menu.Menu.prototype);
  spike.core.Assembler.extend(app.service.dictionaries.DictionariesLoader.prototype, app.service.dictionaries.loaders.CmsDictionaries.prototype);
  spike.core.Assembler.extend(app.service.dictionaries.DictionariesLoader.prototype, app.service.dictionaries.loaders.GeneralDictionaries.prototype);
  spike.core.Assembler.extend(app.service.dictionaries.DictionariesLoader.prototype, app.service.dictionaries.loaders.OffersDictionaries.prototype);
});