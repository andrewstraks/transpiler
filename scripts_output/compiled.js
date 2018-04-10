spike.core.Assembler.resetNamespaces(40, 'app');
spike.core.Assembler.createStaticClass('app', 'Config', 'spike.core.Config', function () {
  return {

    domainUrl: '/ac-api/',
    cookies: {
      session: 'X-AC-SESSION'
    }, languageFilePath: "i18/{lang}.json", html5Mode: true, isClass: true, apiUrl: function () {
      var $this = this;
      return this.domainUrl + 'rest/'
    }, apiUrlDemo: function () {
      var $this = this;
      return 'https://demo.sb-betting.com/ac-api/rest/'
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
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
  app.Events.prototype.onAuth = function () {
    var $this = this;

    var isLogged = app.service.auth.Auth.isLogged();

    if (isLogged === true) {
      app.service.dictionaries.DictionariesManager.loadDictionaries();
    }

  };
  app.Events.prototype.onReady = function () {
    var $this = this;
    spike.core.Log.log('App onReady event');

    spike.core.Broadcaster.register('onAuth');
    spike.core.Broadcaster.listen('onAuth', this.onAuth);
    app.service.auth.Auth.getSession();

  };
  app.Events.prototype.onRender = function () {
    var $this = this;
    spike.core.Log.log('App onRender event');

    var viewData = spike.core.Router.getViewData();

    if (viewData.routingParams.onlyForLogged && app.service.auth.Auth.isLogged() === false) {
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
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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

    spike.core.System.setXhrInterface(new app.Xhr());
    spike.core.System.setRouting(new app.Routing());
    spike.core.System.setEventsInterface(new app.Events());
    spike.core.System.setModalInterface(new app.Modal());

    spike.core.Log.log('Load application done');

    spike.core.Rest.interceptor("Request", function (response, promise) {
      spike.core.Log.log('Invoke Request interceptor');
    }, true);

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
spike.core.Assembler.defineNamespace('app.Modal', function () {
  app.Modal = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.Modal with arguments count: ' + __args.length);
    }
  };
  app.Modal.prototype.Modal = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.Modal with arguments count: ' + arguments.length);
    }
  };
  app.Modal.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.Modal.prototype.isClass = true;
  app.Modal.prototype.onRender = function (modal) {
    var $this = this;
    this.super().onRender(modal);

    modal.rootSelector().addEventListener('click', function (e) {

      if (e.target.id === modal.elementId) {
        modal.hide();
      }

    });

  };
  app.Modal.prototype.onShow = function (modal) {
    var $this = this;

    modal.rootSelector().style = '';

    setTimeout(function () {
      modal.rootSelector().classList.add('fade-in');
    }, 100);

  };
  app.Modal.prototype.onHide = function (modal) {
    var $this = this;
    modal.rootSelector().classList.remove('fade-in');

    setTimeout(function () {
      modal.hide();
      modal.rootSelector().style = 'display: none;'
    }, 100);

  };
  app.Modal.prototype.onConstruct = function (modalElement) {
    var $this = this;
    modalElement.classList.add('modal-wrapper');

    return modalElement;
  };
  app.Modal.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.ModalInterface';
  };
  app.Modal.prototype.getClass = function () {
    var $this = this;
    return 'app.Modal';
  };
});
spike.core.Assembler.defineNamespace('app.Routing', function () {
  app.Routing = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      controller: 'app.module.home.controller.home.Home',
      routingParams: {
        onlyForLogged: true
      }
    });

    router.path('/controls', {
      controller: 'app.module.controls.controller.controls.Controls',
    });

    router.path('/login', {
      controller: 'app.module.auth.controller.login.Login',
    });

    router.path('/privileges', {
      controller: 'app.module.privileges.controller.privileges.Privileges',
    });

    router.path('/maintenance', {
      controller: 'app.module.maintenance.controller.maintenance.Maintenance',
    });

    router.path('/not-found', {
      controller: 'app.module.pageNotFound.controller.pageNotFound.PageNotFound',
    });

    router.path('/cms/:type', {
      controller: 'app.module.cms.controller.table.Table',
    });

    router.path('/cms/:type/:id', {
      controller: 'app.module.cms.controller.manager.Manager',
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
spike.core.Assembler.defineNamespace('app.Xhr', function () {
  app.Xhr = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.Xhr with arguments count: ' + __args.length);
    }
  };
  app.Xhr.prototype.Xhr = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.Xhr with arguments count: ' + arguments.length);
    }
  };
  app.Xhr.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.Xhr.prototype.isClass = true;
  app.Xhr.prototype.onCatch = function (xhr, status, thrownError) {
    var $this = this;

    if (status === 401) {
      app.service.auth.Auth.logout();
    }

  };
  app.Xhr.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.XhrInterface';
  };
  app.Xhr.prototype.getClass = function () {
    var $this = this;
    return 'app.Xhr';
  };
});
spike.core.Assembler.createStaticClass('app.enums.api', 'Cms', null, function () {
  return {

    get: {
      getPages: app.Config.apiUrl() + 'cms/pages',
      getPageById: app.Config.apiUrl() + 'cms/pages/{id}',
      getPageTypes: app.Config.apiUrl() + 'cms/pages/types',
      getPublishedPages: app.Config.apiUrl() + 'cms/pages/published',
      getPageContentById: app.Config.apiUrl() + 'cms/pages/{id}/content',

      getComponents: app.Config.apiUrl() + 'cms/components/all',
      getComponentById: app.Config.apiUrl() + 'cms/components/{id}',
      getComponentByHtmlTag: app.Config.apiUrl() + 'cms/components/{id}',

      getTemplateById: app.Config.apiUrl() + 'cms/pages/templates/{id}',
      getTemplates: app.Config.apiUrl() + 'cms/pages/templates',
      getTemplatesSimple: app.Config.apiUrl() + 'cms/pages/templates/simple',

      getPreviewPage: app.Config.apiUrl() + 'cms/pages/preview/{id}/content',

      getPageByBrand: app.Config.apiUrl() + 'cms/pages/custom'
    },

    post: {
      createPage: app.Config.apiUrl() + 'cms/pages',
      changePageTypeToPublish: app.Config.apiUrl() + 'cms/pages/{id}/publish',
      changePageTypeToDraft: app.Config.apiUrl() + 'cms/pages/{id}/draft',

      createComponent: app.Config.apiUrl() + 'cms/components',

      createTemplate: app.Config.apiUrl() + 'cms/pages/templates',

      createPreviewPage: app.Config.apiUrl() + 'cms/pages/preview',

      uploadFile: app.Config.apiUrl() + 'cms/upload'
    },

    put: {
      updatePageById: app.Config.apiUrl() + 'cms/pages/{id}',

      updateTemplateById: app.Config.apiUrl() + 'cms/pages/templates/{id}',

      updateComponentById: app.Config.apiUrl() + 'cms/components/{id}'
    },

    delete: {
      deletePageById: app.Config.apiUrl() + 'cms/pages/{id}',

      deleteComponentById: app.Config.apiUrl() + 'cms/components/{id}',

      deleteTemplateById: app.Config.apiUrl() + 'cms/pages/templates/{id}'
    }
  }
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
spike.core.Assembler.createStaticClass('app.enums.api', 'PrivilegesApi', null, function () {
  return {

    get: {
      urlIds: app.Config.apiUrl() + 'support/privileges/rest',
      roles: app.Config.apiUrl() + 'support/privileges/rest/roles',
      rolesByUrlId: app.Config.apiUrl() + 'support/privileges/rest/roles/{urlId}',
      users: app.Config.apiUrl() + 'support/privileges/rest/users',
      usersByUrlId: app.Config.apiUrl() + 'support/privileges/rest/users/{urlId}',
      adminrole: app.Config.apiUrlDemo() + 'admin-role',
      views: app.Config.apiUrlDemo() + 'admin-role/views',
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
      menu: '/i18/menu.json',
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
spike.core.Assembler.createStaticClass('app.enums', 'TableElementTypes', null, function () {
  return {


    BUTTONS: {
      header: '',
      buttons: []
    },
    BUTTON: {
      label: '',
      click: null
    },
    DATE: {
      header: '',
      format: 'dd-MM-yyyy',
    },
    SELECT: {
      arguments: {},

    },
    CHECKBOX: {},
    LINK: {
      href: null,
      name: '',
      target: '_self'
    },
    FILTER: {
      filter: null
    },
    INPUT: {}

  }
});
spike.core.Assembler.defineNamespace('app.module.auth.controller.login.Login', function () {
  app.module.auth.controller.login.Login = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.model = {
      loginName: '',
      password: '',
      error: false
    };
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.module.auth.controller.login.Login with arguments count: ' + __args.length);
    }
  };
  app.module.auth.controller.login.Login.prototype.Login = function () {
    this.model = {
      loginName: '',
      password: '',
      error: false
    };
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.auth.controller.login.Login with arguments count: ' + arguments.length);
    }
  };
  app.module.auth.controller.login.Login.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.module.auth.controller.login.Login.prototype.model = {
    loginName: '',
    password: '',
    error: false
  };
  app.module.auth.controller.login.Login.prototype.isClass = true;
  app.module.auth.controller.login.Login.prototype.checkErrors = function () {
    var $this = this;
    ($this.model.loginName.length === 0 || $this.model.password.length === 0) ? $this.model.error = true : $this.model.error = false;
  };
  app.module.auth.controller.login.Login.prototype.login = function (e) {
    var $this = this;
    e.preventDefault();

    if ($this.model.error === false) {

      app.service.auth.Auth.login({
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
  app.module.auth.controller.login.Login.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.auth.controller.login.Login.prototype.getClass = function () {
    var $this = this;
    return 'app.module.auth.controller.login.Login';
  };
});
spike.core.Assembler.defineNamespace('app.module.auth.LoginData', function () {
  app.module.auth.LoginData = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.adminId = null;
    this.allowedViews = [];
    this.firstName = null;
    this.lastName = null;
    this.loginName = null;
    this.serverTimeMillis = null;
    this.loginTime = null;
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.module.auth.LoginData with arguments count: ' + __args.length);
    }
  };
  app.module.auth.LoginData.prototype.LoginData = function () {
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
      throw new Error('Spike: No matching constructor found app.module.auth.LoginData with arguments count: ' + arguments.length);
    }
  };
  app.module.auth.LoginData.prototype.constructor_7 = function (adminId, allowedViews, firstName, lastName, loginName, serverTimeMillis, loginTime) {
    var $this = this;
    this.adminId = adminId;
    this.allowedViews = allowedViews;
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginName = loginName;
    this.serverTimeMillis = serverTimeMillis;
    this.loginTime = loginTime;
  };
  app.module.auth.LoginData.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.module.auth.LoginData.prototype.adminId = null;
  app.module.auth.LoginData.prototype.allowedViews = [];
  app.module.auth.LoginData.prototype.firstName = null;
  app.module.auth.LoginData.prototype.lastName = null;
  app.module.auth.LoginData.prototype.loginName = null;
  app.module.auth.LoginData.prototype.serverTimeMillis = null;
  app.module.auth.LoginData.prototype.loginTime = null;
  app.module.auth.LoginData.prototype.isClass = true;
  app.module.auth.LoginData.prototype.getSuper = function () {
    var $this = this;
    return 'null';
  };
  app.module.auth.LoginData.prototype.getClass = function () {
    var $this = this;
    return 'app.module.auth.LoginData';
  };
});
spike.core.Assembler.defineNamespace('app.module.cms.common.manager.Manager', function () {
  app.module.cms.common.manager.Manager = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.cms.common.manager.Manager with arguments count: ' + __args.length);
    }
  };
  app.module.cms.common.manager.Manager.prototype.Manager = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.cms.common.manager.Manager with arguments count: ' + arguments.length);
    }
  };
  app.module.cms.common.manager.Manager.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.module.cms.common.manager.Manager.prototype.isClass = true;
  app.module.cms.common.manager.Manager.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.cms.common.manager.Manager.prototype.getClass = function () {
    var $this = this;
    return 'app.module.cms.common.manager.Manager';
  };
});
spike.core.Assembler.defineNamespace('app.module.cms.controller.custom.Custom', function () {
  app.module.cms.controller.custom.Custom = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.cms.controller.custom.Custom with arguments count: ' + __args.length);
    }
  };
  app.module.cms.controller.custom.Custom.prototype.Custom = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.cms.controller.custom.Custom with arguments count: ' + arguments.length);
    }
  };
  app.module.cms.controller.custom.Custom.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.cms.controller.custom.Custom.prototype.isClass = true;
  app.module.cms.controller.custom.Custom.prototype.getSuper = function () {
    var $this = this;
    return 'app.module.cms.common.manager.Manager';
  };
  app.module.cms.controller.custom.Custom.prototype.getClass = function () {
    var $this = this;
    return 'app.module.cms.controller.custom.Custom';
  };
});
spike.core.Assembler.defineNamespace('app.module.cms.controller.news.News', function () {
  app.module.cms.controller.news.News = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.cms.controller.news.News with arguments count: ' + __args.length);
    }
  };
  app.module.cms.controller.news.News.prototype.News = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.cms.controller.news.News with arguments count: ' + arguments.length);
    }
  };
  app.module.cms.controller.news.News.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.cms.controller.news.News.prototype.isClass = true;
  app.module.cms.controller.news.News.prototype.getSuper = function () {
    var $this = this;
    return 'app.module.cms.common.manager.Manager';
  };
  app.module.cms.controller.news.News.prototype.getClass = function () {
    var $this = this;
    return 'app.module.cms.controller.news.News';
  };
});
spike.core.Assembler.defineNamespace('app.module.cms.controller.table.Table', function () {
  app.module.cms.controller.table.Table = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.options = {
      request: app.service.cms.Cms.getPages,
      urlParams: {
        type: 'CUSTOM_PAGE',
        sort: 'id%2Cdesc',
        limit: 10,
        offset: 0
      },
      columns: {
        id: {
          header: 'Id',
          width: 5,
          sort: 'id,asc',
          clazz: ''
        },
        title: {
          header: 'Page Title',
          width: 10,
          sort: 'title,asc',
          clazz: 'flex-left'
        },
        type: {
          header: 'Type',
          width: 15,
          sort: 'type,asc',
          clazz: ''
        },
        creationDate: {
          header: 'Create Time',
          width: 20,
          sort: 'creationDate,asc',
          format: 'dd-MM-yyyy',
          type: 'date',
          clazz: ''
        },
        published: {
          header: 'Created by',
          width: 15,
          sort: 'publishedBy,asc',
          clazz: ''
        },
        brand: {
          header: 'Brand',
          width: 5,
          sort: 'brand,asc',
          clazz: ''
        },
        country: {
          header: 'Country',
          width: 5,
          sort: 'country,asc',
          clazz: ''
        },
        language: {
          header: 'Language',
          width: 5,
          sort: 'language,asc',
          clazz: ''
        },
        status: {
          header: 'Status',
          width: 5,
          sort: 'status,asc',
          type: 'select',
          clazz: 'flex-left',
          arguments: {
            DRAFT: 'DRAFT',
            PUBLISHED: 'PUBLISHED'
          },
          change: function (element, rowData, context) {

          }
        },
        visibility: {
          header: 'Visibility',
          width: 1,
          type: 'filter',
          clazz: '',
          filter: function (rowData) {
            return (rowData.visibilityFrom ? app.service.common.Utils.formatDate(rowData.visibilityFrom, 'dd-MM-yyyy') : '') + ' - ' + (rowData.visibilityTo ? app.service.common.Utils.formatDate(rowData.visibilityTo, 'dd-MM-yyyy') : '');
          }
        },
        modification: {
          header: 'Modify',
          width: 5,
          type: 'href',
          link: function (rowData) {
            return '/cms/custom/' + rowData.id;
          },
          target: '_self',
          clazz: ''
        },
        buttons: {
          header: 'Modify',
          width: 9,
          type: 'buttons',
          buttons: [
            {
              label: 'add',
              click: function (element, rowData) {
              }
            },
            {
              label: 'delete',
              click: function (element, rowData) {
              }
            }

          ]

        }

      }
    };
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.module.cms.controller.table.Table with arguments count: ' + __args.length);
    }
  };
  app.module.cms.controller.table.Table.prototype.Table = function () {
    this.options = {
      request: app.service.cms.Cms.getPages,
      urlParams: {
        type: 'CUSTOM_PAGE',
        sort: 'id%2Cdesc',
        limit: 10,
        offset: 0
      },
      columns: {
        id: {
          header: 'Id',
          width: 5,
          sort: 'id,asc',
          clazz: ''
        },
        title: {
          header: 'Page Title',
          width: 10,
          sort: 'title,asc',
          clazz: 'flex-left'
        },
        type: {
          header: 'Type',
          width: 15,
          sort: 'type,asc',
          clazz: ''
        },
        creationDate: {
          header: 'Create Time',
          width: 20,
          sort: 'creationDate,asc',
          format: 'dd-MM-yyyy',
          type: 'date',
          clazz: ''
        },
        published: {
          header: 'Created by',
          width: 15,
          sort: 'publishedBy,asc',
          clazz: ''
        },
        brand: {
          header: 'Brand',
          width: 5,
          sort: 'brand,asc',
          clazz: ''
        },
        country: {
          header: 'Country',
          width: 5,
          sort: 'country,asc',
          clazz: ''
        },
        language: {
          header: 'Language',
          width: 5,
          sort: 'language,asc',
          clazz: ''
        },
        status: {
          header: 'Status',
          width: 5,
          sort: 'status,asc',
          type: 'select',
          clazz: 'flex-left',
          arguments: {
            DRAFT: 'DRAFT',
            PUBLISHED: 'PUBLISHED'
          },
          change: function (element, rowData, context) {

          }
        },
        visibility: {
          header: 'Visibility',
          width: 1,
          type: 'filter',
          clazz: '',
          filter: function (rowData) {
            return (rowData.visibilityFrom ? app.service.common.Utils.formatDate(rowData.visibilityFrom, 'dd-MM-yyyy') : '') + ' - ' + (rowData.visibilityTo ? app.service.common.Utils.formatDate(rowData.visibilityTo, 'dd-MM-yyyy') : '');
          }
        },
        modification: {
          header: 'Modify',
          width: 5,
          type: 'href',
          link: function (rowData) {
            return '/cms/custom/' + rowData.id;
          },
          target: '_self',
          clazz: ''
        },
        buttons: {
          header: 'Modify',
          width: 9,
          type: 'buttons',
          buttons: [
            {
              label: 'add',
              click: function (element, rowData) {
              }
            },
            {
              label: 'delete',
              click: function (element, rowData) {
              }
            }

          ]

        }

      }
    };
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.cms.controller.table.Table with arguments count: ' + arguments.length);
    }
  };
  app.module.cms.controller.table.Table.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.module.cms.controller.table.Table.prototype.options = {
    request: app.service.cms.Cms.getPages,
    urlParams: {
      type: 'CUSTOM_PAGE',
      sort: 'id%2Cdesc',
      limit: 10,
      offset: 0
    },
    columns: {
      id: {
        header: 'Id',
        width: 5,
        sort: 'id,asc',
        clazz: ''
      },
      title: {
        header: 'Page Title',
        width: 10,
        sort: 'title,asc',
        clazz: 'flex-left'
      },
      type: {
        header: 'Type',
        width: 15,
        sort: 'type,asc',
        clazz: ''
      },
      creationDate: {
        header: 'Create Time',
        width: 20,
        sort: 'creationDate,asc',
        format: 'dd-MM-yyyy',
        type: 'date',
        clazz: ''
      },
      published: {
        header: 'Created by',
        width: 15,
        sort: 'publishedBy,asc',
        clazz: ''
      },
      brand: {
        header: 'Brand',
        width: 5,
        sort: 'brand,asc',
        clazz: ''
      },
      country: {
        header: 'Country',
        width: 5,
        sort: 'country,asc',
        clazz: ''
      },
      language: {
        header: 'Language',
        width: 5,
        sort: 'language,asc',
        clazz: ''
      },
      status: {
        header: 'Status',
        width: 5,
        sort: 'status,asc',
        type: 'select',
        clazz: 'flex-left',
        arguments: {
          DRAFT: 'DRAFT',
          PUBLISHED: 'PUBLISHED'
        },
        change: function (element, rowData, context) {

        }
      },
      visibility: {
        header: 'Visibility',
        width: 1,
        type: 'filter',
        clazz: '',
        filter: function (rowData) {
          return (rowData.visibilityFrom ? app.service.common.Utils.formatDate(rowData.visibilityFrom, 'dd-MM-yyyy') : '') + ' - ' + (rowData.visibilityTo ? app.service.common.Utils.formatDate(rowData.visibilityTo, 'dd-MM-yyyy') : '');
        }
      },
      modification: {
        header: 'Modify',
        width: 5,
        type: 'href',
        link: function (rowData) {
          return '/cms/custom/' + rowData.id;
        },
        target: '_self',
        clazz: ''
      },
      buttons: {
        header: 'Modify',
        width: 9,
        type: 'buttons',
        buttons: [
          {
            label: 'add',
            click: function (element, rowData) {
            }
          },
          {
            label: 'delete',
            click: function (element, rowData) {
            }
          }

        ]

      }

    }
  };
  app.module.cms.controller.table.Table.prototype.isClass = true;
  app.module.cms.controller.table.Table.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.cms.controller.table.Table.prototype.getClass = function () {
    var $this = this;
    return 'app.module.cms.controller.table.Table';
  };
});
spike.core.Assembler.defineNamespace('app.module.common.element.footer.Footer', function () {
  app.module.common.element.footer.Footer = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.common.element.footer.Footer with arguments count: ' + __args.length);
    }
  };
  app.module.common.element.footer.Footer.prototype.Footer = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.common.element.footer.Footer with arguments count: ' + arguments.length);
    }
  };
  app.module.common.element.footer.Footer.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.common.element.footer.Footer.prototype.isClass = true;
  app.module.common.element.footer.Footer.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.GlobalElement';
  };
  app.module.common.element.footer.Footer.prototype.getClass = function () {
    var $this = this;
    return 'app.module.common.element.footer.Footer';
  };
});
spike.core.Assembler.defineNamespace('app.module.common.element.menu.Menu', function () {
  app.module.common.element.menu.Menu = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.menuTree = null;
    this.searchText = null;
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.module.common.element.menu.Menu with arguments count: ' + __args.length);
    }
  };
  app.module.common.element.menu.Menu.prototype.Menu = function () {
    this.menuTree = null;
    this.searchText = null;
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.common.element.menu.Menu with arguments count: ' + arguments.length);
    }
  };
  app.module.common.element.menu.Menu.prototype.constructor_0 = function () {
    var $this = this;

    spike.core.Rest.get(app.enums.api.Session.get.menu)
      .then(function (response) {

        $this.menuTree = response;
        $this.refresh();

      });


  };
  app.module.common.element.menu.Menu.prototype.menuTree = null;
  app.module.common.element.menu.Menu.prototype.searchText = null;
  app.module.common.element.menu.Menu.prototype.isClass = true;
  app.module.common.element.menu.Menu.prototype.postConstruct = function () {
    var $this = this;

    $this.refresh();

  };
  app.module.common.element.menu.Menu.prototype.refresh = function () {
    var $this = this;

    console.log($this);

    $this.trigger("menuList", {
      menuTree: $this.menuTree
    });

  };
  app.module.common.element.menu.Menu.prototype.search = function (e) {
    var $this = this;
    e.preventDefault();

  };
  app.module.common.element.menu.Menu.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.GlobalElement';
  };
  app.module.common.element.menu.Menu.prototype.getClass = function () {
    var $this = this;
    return 'app.module.common.element.menu.Menu';
  };
});
spike.core.Assembler.defineNamespace('app.module.common.element.table.Table', function () {
  app.module.common.element.table.Table = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.data = null;
    this.options = null;
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.module.common.element.table.Table with arguments count: ' + __args.length);
    }
  };
  app.module.common.element.table.Table.prototype.Table = function () {
    this.data = null;
    this.options = null;
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.common.element.table.Table with arguments count: ' + arguments.length);
    }
  };
  app.module.common.element.table.Table.prototype.constructor_0 = function () {
    var $this = this;
  };
  app.module.common.element.table.Table.prototype.data = null;
  app.module.common.element.table.Table.prototype.options = null;
  app.module.common.element.table.Table.prototype.isClass = true;
  app.module.common.element.table.Table.prototype.postConstruct = function () {
    var $this = this;
    $this.prepareOptions();
    $this.initTableHeader();
    $this.initTableList();
    $this.initTablePagination();

    console.log($this);
  };
  app.module.common.element.table.Table.prototype.prepareOptions = function () {
    var $this = this;

  };
  app.module.common.element.table.Table.prototype.initTableHeader = function () {
    var $this = this;
    $this.trigger("tableHeader");
  };
  app.module.common.element.table.Table.prototype.initTableList = function () {
    var $this = this;
    $this.options.request($this.options.urlParams).then(function (response) {
      $this.data = response;

      $this.trigger("tableList");

    });
  };
  app.module.common.element.table.Table.prototype.initTablePagination = function () {
    var $this = this;
    $this.trigger("tablePagination");
  };
  app.module.common.element.table.Table.prototype.delegateEvent = function (eventFn, element, context) {
    var $this = this;
    console.log(eventFn);
    console.log(element);
    console.log(context);
  };
  app.module.common.element.table.Table.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Element';
  };
  app.module.common.element.table.Table.prototype.getClass = function () {
    var $this = this;
    return 'app.module.common.element.table.Table';
  };
});
spike.core.Assembler.defineNamespace('app.module.controls.controller.controls.Controls', function () {
  app.module.controls.controller.controls.Controls = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.controls.controller.controls.Controls with arguments count: ' + __args.length);
    }
  };
  app.module.controls.controller.controls.Controls.prototype.Controls = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.controls.controller.controls.Controls with arguments count: ' + arguments.length);
    }
  };
  app.module.controls.controller.controls.Controls.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.controls.controller.controls.Controls.prototype.isClass = true;
  app.module.controls.controller.controls.Controls.prototype.postConstruct = function () {
    var $this = this;

    Prism.highlightAll();

  };
  app.module.controls.controller.controls.Controls.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.controls.controller.controls.Controls.prototype.getClass = function () {
    var $this = this;
    return 'app.module.controls.controller.controls.Controls';
  };
});
spike.core.Assembler.defineNamespace('app.module.home.controller.home.Home', function () {
  app.module.home.controller.home.Home = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.home.controller.home.Home with arguments count: ' + __args.length);
    }
  };
  app.module.home.controller.home.Home.prototype.Home = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.home.controller.home.Home with arguments count: ' + arguments.length);
    }
  };
  app.module.home.controller.home.Home.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.home.controller.home.Home.prototype.isClass = true;
  app.module.home.controller.home.Home.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.home.controller.home.Home.prototype.getClass = function () {
    var $this = this;
    return 'app.module.home.controller.home.Home';
  };
});
spike.core.Assembler.defineNamespace('app.module.maintenance.controller.maintenance.Maintenance', function () {
  app.module.maintenance.controller.maintenance.Maintenance = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.maintenance.controller.maintenance.Maintenance with arguments count: ' + __args.length);
    }
  };
  app.module.maintenance.controller.maintenance.Maintenance.prototype.Maintenance = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.maintenance.controller.maintenance.Maintenance with arguments count: ' + arguments.length);
    }
  };
  app.module.maintenance.controller.maintenance.Maintenance.prototype.constructor_0 = function () {
    var $this = this;
    $this.dictionaries = app.service.dictionaries.DictionariesManager.dictionaries;
  };
  app.module.maintenance.controller.maintenance.Maintenance.prototype.isClass = true;
  app.module.maintenance.controller.maintenance.Maintenance.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.maintenance.controller.maintenance.Maintenance.prototype.getClass = function () {
    var $this = this;
    return 'app.module.maintenance.controller.maintenance.Maintenance';
  };
});
spike.core.Assembler.defineNamespace('app.module.maintenance.controller.maintenance.PageNotFound', function () {
  app.module.maintenance.controller.maintenance.PageNotFound = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.maintenance.controller.maintenance.PageNotFound with arguments count: ' + __args.length);
    }
  };
  app.module.maintenance.controller.maintenance.PageNotFound.prototype.PageNotFound = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.maintenance.controller.maintenance.PageNotFound with arguments count: ' + arguments.length);
    }
  };
  app.module.maintenance.controller.maintenance.PageNotFound.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.maintenance.controller.maintenance.PageNotFound.prototype.isClass = true;
  app.module.maintenance.controller.maintenance.PageNotFound.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.maintenance.controller.maintenance.PageNotFound.prototype.getClass = function () {
    var $this = this;
    return 'app.module.maintenance.controller.maintenance.PageNotFound';
  };
});
spike.core.Assembler.defineNamespace('app.module.privileges.controller.privileges.Privileges', function () {
  app.module.privileges.controller.privileges.Privileges = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.privileges.controller.privileges.Privileges with arguments count: ' + __args.length);
    }
  };
  app.module.privileges.controller.privileges.Privileges.prototype.Privileges = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.privileges.controller.privileges.Privileges with arguments count: ' + arguments.length);
    }
  };
  app.module.privileges.controller.privileges.Privileges.prototype.constructor_0 = function () {
    var $this = this;
    spike.core.Rest.get(app.enums.api.PrivilegesApi.get.adminrole)
      .then(function (response) {
        var divRolesList = document.querySelector('.roles-list');

        var roles = response.items;
        var items = [];
        roles.forEach(function (val, key) {
          var id = val.id;
          var level = val.level;
          var name = val.name;
          var privileges = [];
          items.push("<div class='form-group'><input id='role-" + id + "' name='role-" + id + "' class='form-control' type='radio' hidden/><label for='role-" + id + "' title='id: " + id + " | level: " + level + "'>" + name + "</label>" + privileges + "</div>");
        });

        var formRolesList = document.createElement('form');
        formRolesList.innerHTML = items.join("");
        divRolesList.appendChild(formRolesList);
      });


    spike.core.Rest.get(app.enums.api.PrivilegesApi.get.views)
      .then(function (response) {
        acViews = response.items;
        var divViewsList = document.querySelector('.views-list');
        var views = response.items;
        var items = [];
        items.push('<ul class="superpowers powers-lev1">');

        views.forEach(function (val, key) {
          var label = val.label;
          var children = "";
          var grandchildren = "";

          if (val.sublist != "null") {

            children += "<ul class='powers-lev2'>";
            val.sublist.forEach(function (val2, key2) {
              var label2 = val2.label;
              var id2 = val2.viewId;

              if (val2.sublist != "null") {
                grandchildren += "<ul class='powers-lev3'>";
                val.sublist.forEach(function (val3, key3) {
                  var label3 = val3.label;
                  var id3 = val3.viewId;
                  grandchildren += "<li><div class='power'><label for='canedit-" + id3 + "' title='Permission to see and edit'><i class='fa fa-pencil-square-o'></i><input id='canedit-" + id3 + "' type='checkbox' class='canedit'></label><label for='cansee-" + id3 + "' title='Permission only to see'><i class='fa fa-eye'></i><input type='checkbox' id='cansee-" + id3 + "' class='cansee'></label><span class='power-name'>" + label3 + "</span><label title='More settings'><i class='fa fa-cog'></i><input type='checkbox' class='canconfig'></label></div></li>";
                });
                grandchildren += "</ul>";
              }

              children += "<li class='active'><div class='power'><label for='canedit-" + id2 + "' title='Permission to see and edit'><i class='fa fa-pencil-square-o'></i><input id='canedit-" + id2 + "' type='checkbox' class='canedit'></label><label for='cansee-" + id2 + "' title='Permission only to see'><i class='fa fa-eye'></i><input type='checkbox' id='cansee-" + id2 + "' class='cansee'></label><span class='power-name'>" + label2 + "</span><label title='More settings'><i class='fa fa-cog'></i><input type='checkbox' class='canconfig'></label></div>" + grandchildren + "</li>";
            });
            children += "</ul>";
          }
          items.push("<li class='active'><div class='power'><span class='power-name'>" + label + "</span></div>" + children + "</li>");
        });
        items.push('</ul>');

        var formViewsList = document.createElement('form');
        formViewsList.innerHTML = items.join("");
        divViewsList.appendChild(formViewsList);
      });
  };
  app.module.privileges.controller.privileges.Privileges.prototype.isClass = true;
  app.module.privileges.controller.privileges.Privileges.prototype.postConstruct = function () {
    var $this = this;
    var rolesList = document.querySelector('.roles-list');
    var viewsList = document.querySelector('.views-list');

    var rolesListLabels = document.querySelectorAll('.roles-list label');


    $('.roles-list').on('click', 'label', function handler() {
      event.preventDefault();
      var radio = $(this).parent('.form-group').find('input[type="radio"]');
      if (radio.prop('checked')) {
        $('.roles-list input[type="radio"]').prop('checked', false);
      }
      else {
        $('.roles-list input[type="radio"]').prop('checked', false);
        radio.prop('checked', true);
      }
    });

    $('.views-list').on('click', '.power:not(:only-child)', function handler() {
      var li = $(this).parent('li');
      var parents = $(this).parents('li');

      if (li.hasClass('active')) {
        li.removeClass('active');
      } else {
        $('.superpowers li').removeClass('active');
        parents.addClass('active');
      }
    });


    $('.views-list').on('click', 'label', function handler() {
      event.preventDefault();
      var label = $(this);
      var checkbox = label.find('input');
      var inputclass = checkbox.attr('class');
      var cansee = label.parent('div').find('input.cansee');
      var labelcansee = cansee.parent('label');
      var canedit = label.parent('div').find('input.canedit');
      var labelcanedit = canedit.parent('label');

      if (checkbox.prop('checked')) {
        if (inputclass == 'cansee') { // i jest okiem
          labelcansee.removeClass('active');
          labelcanedit.removeClass('active');
          cansee.prop('checked', false);
          canedit.prop('checked', false);
        } else { // i jest długopisem
          labelcanedit.removeClass('active');
          canedit.prop('checked', false);
        }

      } else {
        if (inputclass == 'canedit') { // i jest długopisem
          labelcanedit.addClass('active');
          labelcansee.addClass('active');
          canedit.prop('checked', true);
          cansee.prop('checked', true);
        } else { // i jest okiem
          labelcansee.addClass('active');
          cansee.prop('checked', true);
        }
      }
    });
    spike.core.Log.log('AZ: Koniec!');
  };
  app.module.privileges.controller.privileges.Privileges.prototype.showRoleEditor = function (event) {
    var $this = this;
    event.preventDefault();

    var addRoleModal = new app.module.privileges.modal.addRole.AddRole();
    addRoleModal.show();

  };
  app.module.privileges.controller.privileges.Privileges.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Controller';
  };
  app.module.privileges.controller.privileges.Privileges.prototype.getClass = function () {
    var $this = this;
    return 'app.module.privileges.controller.privileges.Privileges';
  };
});
spike.core.Assembler.defineNamespace('app.module.privileges.modal.addRole.AddRole', function () {
  app.module.privileges.modal.addRole.AddRole = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.roles = [];
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.module.privileges.modal.addRole.AddRole with arguments count: ' + __args.length);
    }
  };
  app.module.privileges.modal.addRole.AddRole.prototype.AddRole = function () {
    this.roles = [];
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.privileges.modal.addRole.AddRole with arguments count: ' + arguments.length);
    }
  };
  app.module.privileges.modal.addRole.AddRole.prototype.constructor_0 = function () {
    var $this = this;
    this.super().constructor_0.apply(this, []);
    this.listRoles();
  };
  app.module.privileges.modal.addRole.AddRole.prototype.roles = [];
  app.module.privileges.modal.addRole.AddRole.prototype.isClass = true;
  app.module.privileges.modal.addRole.AddRole.prototype.listRoles = function () {
    var $this = this;

    spike.core.Rest.get(app.enums.api.PrivilegesApi.get.adminrole)
      .then(function (response) {
        $this.roles = response.items;

        console.log($this);

      });

  };
  app.module.privileges.modal.addRole.AddRole.prototype.postConstruct = function () {
    var $this = this;

  };
  app.module.privileges.modal.addRole.AddRole.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Modal';
  };
  app.module.privileges.modal.addRole.AddRole.prototype.getClass = function () {
    var $this = this;
    return 'app.module.privileges.modal.addRole.AddRole';
  };
});
spike.core.Assembler.defineNamespace('app.module.privileges.modal.generalExcludes.GeneralExcludes', function () {
  app.module.privileges.modal.generalExcludes.GeneralExcludes = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.privileges.modal.generalExcludes.GeneralExcludes with arguments count: ' + __args.length);
    }
  };
  app.module.privileges.modal.generalExcludes.GeneralExcludes.prototype.GeneralExcludes = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.privileges.modal.generalExcludes.GeneralExcludes with arguments count: ' + arguments.length);
    }
  };
  app.module.privileges.modal.generalExcludes.GeneralExcludes.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.privileges.modal.generalExcludes.GeneralExcludes.prototype.isClass = true;
  app.module.privileges.modal.generalExcludes.GeneralExcludes.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Modal';
  };
  app.module.privileges.modal.generalExcludes.GeneralExcludes.prototype.getClass = function () {
    var $this = this;
    return 'app.module.privileges.modal.generalExcludes.GeneralExcludes';
  };
});
spike.core.Assembler.defineNamespace('app.module.privileges.modal.pagePrivileges.PagePrivileges', function () {
  app.module.privileges.modal.pagePrivileges.PagePrivileges = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
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
      throw new Error('Spike: No matching constructor found app.module.privileges.modal.pagePrivileges.PagePrivileges with arguments count: ' + __args.length);
    }
  };
  app.module.privileges.modal.pagePrivileges.PagePrivileges.prototype.PagePrivileges = function () {
    this.isClass = true;
    if (this['constructor_' + arguments.length] !== undefined) {
      this['constructor_' + arguments.length].apply(this, arguments);
    } else {
      throw new Error('Spike: No matching constructor found app.module.privileges.modal.pagePrivileges.PagePrivileges with arguments count: ' + arguments.length);
    }
  };
  app.module.privileges.modal.pagePrivileges.PagePrivileges.prototype.constructor_0 = function () {
    var $this = this;

  };
  app.module.privileges.modal.pagePrivileges.PagePrivileges.prototype.isClass = true;
  app.module.privileges.modal.pagePrivileges.PagePrivileges.prototype.getSuper = function () {
    var $this = this;
    return 'spike.core.Modal';
  };
  app.module.privileges.modal.pagePrivileges.PagePrivileges.prototype.getClass = function () {
    var $this = this;
    return 'app.module.privileges.modal.pagePrivileges.PagePrivileges';
  };
});
spike.core.Assembler.createStaticClass('app.service.auth', 'Auth', 'null', function () {
  return {
    customerData: null, storageSessionData: 'session_data', isClass: true, isLogged: function () {
      var $this = this;
      return !!this.customerData;
    }, saveSessionCache: function () {
      var $this = this;

      var sessionData = app.service.common.Storage.get($this.storageSessionData);
      if (sessionData) {
        sessionData.loginTime = new Date().getTime();
      }

      app.service.common.Storage.set($this.storageSessionData, $this.customerData);

    }, logout: function () {
      var $this = this;

      $this.customerData = false;
      app.service.common.Storage.remove($this.storageSessionData);
      spike.core.Router.redirect('/login');

    }, loginSuccess: function (response) {
      var $this = this;

      $this.customerData = new app.module.auth.LoginData(
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

      var sessionData = app.service.common.Storage.get($this.storageSessionData);
      if (sessionData && new Date().getTime() - sessionData.loginTime < 300000) {
        $this.loginSuccess(sessionData);
      } else {
        spike.core.Rest.get(app.enums.api.Session.get.session).then($this.loginSuccess.bind($this));
      }

    }, login: function (loginRequest) {
      var $this = this;
      return spike.core.Rest.post(app.enums.api.Session.post.login, loginRequest).then($this.loginSuccess.bind($this));
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
      return 'app.service.auth.Auth';
    },
  }
});
spike.core.Assembler.createStaticClass('app.service.cms', 'Cms', 'null', function () {
  return {
    isClass: true, getComponents: function () {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getComponents).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getComponentById: function (id) {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getComponentById, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getComponentByHtmlTag: function (htmlTag) {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getComponentByHtmlTag, {
        urlParams: {
          htmlTag: htmlTag
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, createComponent: function (component) {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.createComponent, component).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, updateComponentById: function (id) {
      var $this = this;
      return put(app.enums.api.Cms.put.updateComponent, $this.MODULES.COMPONENT, {
        pathParams: {
          id: id
        }
      }).then(function (data) {
        return data;
      }).catch(function (err) {
        throw err;
      });
    }, deleteComponentById: function (id) {
      var $this = this;
    }, getTemplateById: function (id) {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getTemplateById, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, createTemplate: function (template) {
      var $this = this;
      return spike.core.Rest.post(app.enums.api.Cms.post.createTemplate, template).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, updateTemplateById: function (id, page) {
      var $this = this;
      return put(app.enums.api.Cms.put.updateTemplateById, page, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getTemplates: function () {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getTemplates).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getSimpleTemplates: function () {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getTemplatesSimple).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, deleteTemplateById: function (id) {
      var $this = this;
      return remove(paths.cms.DELETE.deleteTemplateById, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, createPage: function (page) {
      var $this = this;
      return spike.core.Rest.post(app.enums.api.Cms.post.createPage, page).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, updatePageById: function (id, page) {
      var $this = this;
      return put(app.enums.api.Cms.put.updatePageById, page, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getPageById: function (id) {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getPageById, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getPageTypes: function () {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getPageTypes).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getPublishedPages: function () {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getPublishedPages).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getPublishedById: function (id) {
      var $this = this;
      return spike.core.Rest.get(app.enums.api.Cms.get.getPageContentById, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });
    }, getPages: function (urlParams) {
      var $this = this;
      return new Promise(function (resolve) {
        resolve([{
          "id": 238,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "test",
          "creationDate": 1521638558509,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": 1,
          "language": "EN",
          "country": "GH"
        }, {
          "id": 25,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521721574174,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": null,
          "language": null,
          "country": null
        }, {
          "id": 24,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715956617,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": null,
          "language": null,
          "country": null
        }, {
          "id": 23,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715874681,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": null,
          "language": null,
          "country": null
        }, {
          "id": 22,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715823466,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": null,
          "language": null,
          "country": null
        }, {
          "id": 21,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715780658,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": null,
          "language": null,
          "country": null
        }, {
          "id": 20,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715749659,
          "visibilityFrom": 1521715749659,
          "visibilityTo": 1521715749659,
          "publishDate": null,
          "brand": 2,
          "language": null,
          "country": "NG"
        }, {
          "id": 19,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715736346,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": 2,
          "language": "EN",
          "country": "NG"
        }, {
          "id": 18,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715704546,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": 1,
          "language": "EN",
          "country": "GH"
        }, {
          "id": 17,
          "type": "CUSTOM_PAGE",
          "status": "DRAFT",
          "publishedBy": null,
          "title": "qwerty",
          "creationDate": 1521715684257,
          "visibilityFrom": null,
          "visibilityTo": null,
          "publishDate": null,
          "brand": null,
          "language": null,
          "country": null
        }]);
      });
    }, deletePageById: function (id) {
      var $this = this;

      return remove(paths.cms.DELETE.deletePageById, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });

    }, changeStatusToDraft: function (id) {
      var $this = this;

      return spike.core.Rest.post(app.enums.api.Cms.post.changePageTypeToDraft, {
        pathParams: {
          id: id
        }
      }).then(function (response) {
        return response;
      }).catch(function (err) {
        throw err;
      });

    }, getSuper: function () {
      var $this = this;
      return 'null';
    }, getClass: function () {
      var $this = this;
      return 'app.service.cms.Cms';
    },
  }
});
spike.core.Assembler.createStaticClass('app.service.common', 'Storage', 'null', function () {
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
      return 'app.service.common.Storage';
    },
  }
});
spike.core.Assembler.createStaticClass('app.service.common', 'Utils', 'null', function () {
  return {
    isClass: true, formatDate: function (date, format, allowNumsWithoutZero) {
      var $this = this;

      if (typeof date == 'number') {
        date = new Date(date);
      }

      var minutes = (date.getMinutes() < 10 && !allowNumsWithoutZero ? '0' : '') + date.getMinutes();
      var seconds = (date.getSeconds() < 10 && !allowNumsWithoutZero ? '0' : '') + date.getSeconds();
      var hours = (date.getHours() < 10 && !allowNumsWithoutZero ? '0' : '') + date.getHours();
      var day = (date.getDate() < 10 && !allowNumsWithoutZero ? '0' : '') + date.getDate();
      var month = (date.getMonth() < 9 && !allowNumsWithoutZero ? '0' : '') + (date.getMonth() + 1);
      var year = (1900 + date.getYear());

      format = format.replace('dd', day);
      format = format.replace('MM', month);
      format = format.replace('yyyy', year);
      format = format.replace('HH', hours);
      format = format.replace('mm', minutes);
      format = format.replace('ss', seconds);

      return format;
    }, formatNumber: function (number, format) {
      var $this = this;

      var isDecimal = format.indexOf('#.') > -1;

      if (typeof number == 'string') {
        number = parseFloat(number);
      }

      if (isDecimal) {
        var decimalPlaces = format.substring(format.indexOf('.') + 1, format.length).length;

        number = number.toFixed(decimalPlaces);

      } else {
        number = Math.round(number);
      }

      return number;

    }, getSuper: function () {
      var $this = this;
      return 'null';
    }, getClass: function () {
      var $this = this;
      return 'app.service.common.Utils';
    },
  }
});
spike.core.Assembler.defineNamespace('app.service.dictionaries.DictionariesLoader', function () {
  app.service.dictionaries.DictionariesLoader = function (args) {
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.ready = false;
    this.dictionariesList = [];
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.DictionariesLoader with arguments count: ' + __args.length);
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
        app.service.common.Storage.set('__dictionary_' + dictionaryName, $this.dictionaries[dictionaryName]);
      }

    }, loadDictionariesFromCache: function () {
      var $this = this;

      var counter = 0;
      for (var dictionaryName in $this.dictionaries) {

        var dictionaries = app.service.common.Storage.get('__dictionary_' + dictionaryName);
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
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
    this.cmsCommentsStatuses = null;
    this.dictionariesList = {
      cmsCommentsStatuses: app.enums.api.Dictionaries.get.cmsCommentsStatuses
    };
    this.isClass = true;
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.CmsDictionaries with arguments count: ' + __args.length);
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
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
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
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.GeneralDictionaries with arguments count: ' + __args.length);
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
    var __args = [];
    if (args && arguments.length == 1) {
      if (args instanceof Array) {
        if (arguments.length == 1 && arguments[0] instanceof Array) {
          __args = args.length == 0 ? arguments : [args];
        } else {
          __args = args.length == 0 ? arguments : args;
        }
      } else {
        __args = [args];
      }
    } else {
      __args = arguments;
    }
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
    if (this['constructor_' + __args.length] !== undefined) {
      this['constructor_' + __args.length].apply(this, __args);
    } else {
      throw new Error('Spike: No matching constructor found app.service.dictionaries.loaders.OffersDictionaries with arguments count: ' + __args.length);
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
spike.core.Assembler.dependencies(function () {
  spike.core.Assembler.extend(spike.core.XhrInterface.prototype, app.Xhr.prototype);
  spike.core.Assembler.extend(spike.core.Config.prototype, app.Config.prototype);
  spike.core.Assembler.extend(spike.core.Element.prototype, app.module.common.element.table.Table.prototype);
  spike.core.Assembler.extend(spike.core.LoaderInterface.prototype, app.Loader.prototype);
  spike.core.Assembler.extend(spike.core.EventsInterface.prototype, app.Events.prototype);
  spike.core.Assembler.extend(spike.core.Modal.prototype, app.module.privileges.modal.addRole.AddRole.prototype);
  spike.core.Assembler.extend(spike.core.Modal.prototype, app.module.privileges.modal.generalExcludes.GeneralExcludes.prototype);
  spike.core.Assembler.extend(spike.core.Modal.prototype, app.module.privileges.modal.pagePrivileges.PagePrivileges.prototype);
  spike.core.Assembler.extend(spike.core.ModalInterface.prototype, app.Modal.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.auth.controller.login.Login.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.cms.common.manager.Manager.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.cms.controller.table.Table.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.controls.controller.controls.Controls.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.home.controller.home.Home.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.maintenance.controller.maintenance.Maintenance.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.maintenance.controller.maintenance.PageNotFound.prototype);
  spike.core.Assembler.extend(spike.core.Controller.prototype, app.module.privileges.controller.privileges.Privileges.prototype);
  spike.core.Assembler.extend(spike.core.RoutingInterface.prototype, app.Routing.prototype);
  spike.core.Assembler.extend(spike.core.GlobalElement.prototype, app.module.common.element.footer.Footer.prototype);
  spike.core.Assembler.extend(spike.core.GlobalElement.prototype, app.module.common.element.menu.Menu.prototype);
  spike.core.Assembler.extend(app.module.cms.common.manager.Manager.prototype, app.module.cms.controller.custom.Custom.prototype);
  spike.core.Assembler.extend(app.module.cms.common.manager.Manager.prototype, app.module.cms.controller.news.News.prototype);
  spike.core.Assembler.extend(app.service.dictionaries.DictionariesLoader.prototype, app.service.dictionaries.loaders.CmsDictionaries.prototype);
  spike.core.Assembler.extend(app.service.dictionaries.DictionariesLoader.prototype, app.service.dictionaries.loaders.GeneralDictionaries.prototype);
  spike.core.Assembler.extend(app.service.dictionaries.DictionariesLoader.prototype, app.service.dictionaries.loaders.OffersDictionaries.prototype);
});