spike.core.Watchers.watchers['templates_input_new_module_common_element_table_tableFilter_html'] = function (scope, $this) {
  var __w = [];
  var __a0 = ['', ''];
  __a0[0] = '';
  __a0[1] = '';
  __a0[1] += '<div class="tableFilterTemplate" sp-watch id="id-516">';
  for (var index7 = 0; index7 < scope.options.filters.length; index7++) {
    var filter = scope.options.filters[index7];
    __a0[1] += '';
    switch (filter.type) {
      __a0
        [1] += '';
      case 'buttons' :
        __a0[1] += '';
        for (var index8 = 0; index8 < filter.buttons.length; index8++) {
          var button = filter.buttons[index8];
          __a0[1] += '';
          var scope = (scope === undefined ? undefined : scope);
          var button = (button === undefined ? undefined : button);
          var linkId = spike.core.Util.hash();
          spike.core.Events.__linkReferences[linkId] = {};
          spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "button", "scope.delegateEvent(button, this)");
          spike.core.Events.__linkReferences[linkId].args = [scope, button];
          __a0[1] += '<button class="' + (button.clazz) + '" id="id-517" spike-unbinded="" spike-event-click="scope.delegateEvent(button, this)" spike-event-click-link="' + (linkId) + '">' + (button.label) + '</button>     ';
        }
        __a0[1] += '';
        break;
        __a0[1] += '';
      case 'select' :
        __a0[1] += '     <label id="id-518">' + (filter.label) + '</label>';
        var scope = (scope === undefined ? undefined : scope);
        var filter = (filter === undefined ? undefined : filter);
        var linkId = spike.core.Util.hash();
        spike.core.Events.__linkReferences[linkId] = {};
        spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "filter", "scope.delegateEvent(filter, this)");
        spike.core.Events.__linkReferences[linkId].args = [scope, filter];
        __a0[1] += '<select id="id-519" spike-unbinded="" spike-event-change="scope.delegateEvent(filter, this)" spike-event-change-link="' + (linkId) + '">';
        for (var argumentKey in filter.arguments) {
          if (filter.arguments.hasOwnProperty(argumentKey)) {
            var argument = filter.arguments[argumentKey];
            __a0[1] += '<option spike value="' + (argumentKey) + '" id="id-520">' + (argument) + '</option>';
          }
        }
        __a0[1] += '</select>     ';
        break;
        __a0[1] += '';
      case 'checkbox' :
        __a0[1] += '     <input type="checkbox" id="id-521">    <input id="id-522">     ';
        break;
        __a0[1] += '';
      case 'href' :
        __a0[1] += '     ';
        break;
        __a0[1] += '';
      case 'filter' :
        __a0[1] += '     ' + (filter.filter(element)) + '     ';
        break;
        __a0[1] += '   ';
    }
    __a0[1] += '';
  }
  __a0[1] += '</div>';
  __w.push(__a0);
  for (var index7 = 0; index7 < scope.options.filters.length; index7++) {
    var filter = scope.options.filters[index7];
    switch (filter.type) {
      case 'buttons' :
        for (var index8 = 0; index8 < filter.buttons.length; index8++) {
          var button = filter.buttons[index8];
          var scope = (scope === undefined ? undefined : scope);
          var button = (button === undefined ? undefined : button);
          var linkId = spike.core.Util.hash();
          spike.core.Events.__linkReferences[linkId] = {};
          spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "button", "scope.delegateEvent(button, this)");
          spike.core.Events.__linkReferences[linkId].args = [scope, button];
        }
        break;
      case 'select' :
        var scope = (scope === undefined ? undefined : scope);
        var filter = (filter === undefined ? undefined : filter);
        var linkId = spike.core.Util.hash();
        spike.core.Events.__linkReferences[linkId] = {};
        spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "filter", "scope.delegateEvent(filter, this)");
        spike.core.Events.__linkReferences[linkId].args = [scope, filter];
        for (var argumentKey in filter.arguments) {
          if (filter.arguments.hasOwnProperty(argumentKey)) {
            var argument = filter.arguments[argumentKey];
          }
        }
        break;
      case 'checkbox' :
        break;
      case 'href' :
        break;
      case 'filter' :
        break;
    }
  }
  return __w;
};
spike.core.Watchers.watchers['templates_input_new_module_home_controller_home_home_html'] = function (scope, $this) {
  var __w = [];
  return __w;
};
spike.core.Watchers.watchers['templates_input_new_module_privileges_modal_pagePrivileges_pagePrivileges_html'] = function (scope, $this) {
  var __w = [];
  return __w;
};
spike.core.Watchers.watchers['templates_input_new_module_cms_element_edit_edit_html'] = function (scope, $this) {
  var __w = [];
  return __w;
};
spike.core.Watchers.watchers['templates_input_new_module_privileges_controller_inne_inne_html'] = function (scope, $this) {
  var __w = [];
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.newRoleName=event.target.value;");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  '+(scope.addTriggerTemplate('
  $rolesSelect
  ', '
  rolesSelect
  ','
  rolesSelect100009
  '))+'
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.openGeneralExcludes()");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  return __w;
};
spike.core.Watchers.watchers['templates_input_new_module_privileges_controller_privileges_viewsList_html'] = function (scope, $this) {
  var __w = [];
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.toggleList(this)");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  for (var index9 = 0; index9 < scope.views.length; index9++) {
    var view = scope.views[index9];
    if (view.sublist) {
      var scope = (scope === undefined ? undefined : scope);
      var linkId = spike.core.Util.hash();
      spike.core.Events.__linkReferences[linkId] = {};
      spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.toggleList(this)");
      spike.core.Events.__linkReferences[linkId].args = [scope];
      for (var index10 = 0; index10 < view.sublist.length; index10++) {
        var subview = view.sublist[index10];
      }
    }
  }
  return __w;
};
spike.core.Watchers.watchers['templates_input_new_module_auth_controller_login_login_html'] = function (scope, $this) {
  var __w = [];
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.login(event)");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  var __a6 = ['', ''];
  __a6[0] = '';
  __a6[1] = '';
  __a6[1] += '<form autocomplete="off" sp-watch id="id-934" spike-unbinded="" spike-event-submit="scope.login(event)" spike-event-submit-link="' + (linkId) + '">';
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.model.loginName=event.target.value;");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  __a6[1] += '<input type="text" name="loginName" placeholder="' + ( spike.core.Message.get('login_placeholder') ) + '" id="id-935" spike-event-keyup="scope.model.loginName=event.target.value;" spike-event-keyup-link="' + (linkId) + '" spike-unbinded="" sp-name="loginName">';
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.model.password=event.target.value;");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  __a6[1] += '<input type="password" name="password" placeholder="' + ( spike.core.Message.get('password_placeholder') ) + '" id="id-936" spike-event-keyup="scope.model.password=event.target.value;" spike-event-keyup-link="' + (linkId) + '" spike-unbinded="" sp-name="password">  <button type="submit" class="default" id="id-937">' + (spike.core.Message.get('login_button')) + '</button>  <p class="error ' + ( scope.model.error === true ? 'show' : 'hide' ) + '" id="id-938">' + (spike.core.Message.get('login_error')) + '</p> </form>';
  __w.push(__a6);
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.model.loginName=event.target.value;");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  var scope = (scope === undefined ? undefined : scope);
  var linkId = spike.core.Util.hash();
  spike.core.Events.__linkReferences[linkId] = {};
  spike.core.Events.__linkReferences[linkId].fn = new Function("scope", "scope.model.password=event.target.value;");
  spike.core.Events.__linkReferences[linkId].args = [scope];
  return __w;
};