spike.core.Watchers.watchers['templates_input_new_test_html'] = function (scope, $this) {
  var t = '';
  var __w = [];
  var __a0 = ['', ''];
  __a0[0] = 'watcher-0';
  __a0[1] = '';
  __a0[1] += '<form sp-watch="watcher-0" id="id-6">';
  __a0[1] += (spike.core.Templates.includeTemplate('$rolesList', scope));
  __a0[1] += '<div class="form-group" id="id-7">';
  function closure0(event) {
    scope.newRoleName = event.target.value;
  };
  var linkId = spike.core.Events.linkEvent(closure0);
  __a0[1] += '<input type="text" id="id-8" spike-event-keyup="scope.newRoleName=event.target.value;" spike-event-keyup-link="' + (linkId) + '" spike-unbinded="">';
  function closure1(event) {
    scope.addRole()
  };
  var linkId = spike.core.Events.linkEvent(closure1);
  __a0[1] += '<button type=\"button\" class=\"btn btn-primary btn-block\" id=\"id-9\" spike-unbinded=\"\" spike-event-click=\"scope.addRole()\" spike-event-click-link=\"' + (linkId) + '\">Add role<\/button>';
  __a0[1] += '<\/div>';
  __a0[1] += '<\/form>';
  __w.push(__a0);

  t += '' + (spike.core.Templates.includeTemplate('$rolesList', scope)) + '';
  function closure0(event) {
    scope.newRoleName = event.target.value;
  };
  var linkId = spike.core.Events.linkEvent(closure0);

  function closure1(event) {
    scope.addRole()
  };
  var linkId = spike.core.Events.linkEvent(closure1);
  var __a1 = ['', ''];
  __a1[0] = 'watcher-1';
  __a1[1] = '';
  __a1[1] += '<div class="modal-content col-xs-9 ' + ( scope.currentRole ? '' : 'hide' ) + '" sp-watch="watcher-1" id="id-10">';
  if (scope.currentRole) {
    __a1[1] += '<form id=\"id-11\">';
    __a1[1] += '<div class=\"col-xs-12\" id=\"id-12\">';
    __a1[1] += '<div class=\"modal-content-headline\" id=\"id-13\">';
    __a1[1] += 'Role name';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"row\" id=\"id-14\">';
    __a1[1] += '<div class=\"col-xs-6\" id=\"id-15\">';
    __a1[1] += '<div class=\"form-group\" id=\"id-16\">';
    __a1[1] += '<input type=\"text\" class=\"form-control input-block\" value=\"' + (scope.currentRole.name) + '\" id=\"id-17\">';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"form-group\" id=\"id-18\">';
    __a1[1] += '<label class="btn btn-primary" id="id-19">copy privilages from</label>';
    __a1[1] += (spike.core.Templates.includeTemplate('$rolesSelect', scope));
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"col-xs-6 text-xs-right\" id=\"id-20\">';
    __a1[1] += '<div class="block" id="id-21">';
    function closure2(event) {
      scope.openGeneralExcludes()
    };
    var linkId = spike.core.Events.linkEvent(closure2);
    __a1[1] += '<button class=\"btn btn-primary\" type=\"button\" disabled id=\"id-22\" spike-unbinded=\"\" spike-event-click=\"scope.openGeneralExcludes()\" spike-event-click-link=\"' + (linkId) + '\">General Excludes<\/button>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"col-xs-12\" id=\"id-23\">';
    __a1[1] += '<div class=\"row\" id=\"id-24\">';
    __a1[1] += '<div class=\"col-xs-6\" id=\"id-25\">';
    __a1[1] += '<div class=\"modal-content-headline\" id=\"id-26\">';
    __a1[1] += 'Users in role';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"box box-small\" id=\"id-27\">';
    __a1[1] += '<div class=\"box-header\" id=\"id-28\">';
    __a1[1] += 'Users in role';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"col-xs-6\" id=\"id-29\">';
    __a1[1] += '<div class=\"modal-content-headline\" id=\"id-30\">';
    __a1[1] += 'Search user';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"box box-small\" id=\"id-31\">';
    __a1[1] += '<div class=\"row box-toolbar\" id=\"id-32\">';
    __a1[1] += '<div class=\"col-xs-6\" id=\"id-33\">';
    __a1[1] += '<div class=\"form-group\" id=\"id-34\">';
    __a1[1] += '<label for=\"search-by-name\" id=\"id-35\">Search by name<\/label>';
    __a1[1] += '<div class=\"form-group\" id=\"id-36\">';
    __a1[1] += '<input type=\"text\" class=\"form-control\" id=\"search-by-name\">';
    __a1[1] += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-37\"><i class=\"fa fa-search\" id=\"id-38\"><\/i><\/button>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"col-xs-6\" id=\"id-39\">';
    __a1[1] += '<div class=\"form-group\" id=\"id-40\">';
    __a1[1] += '<label for=\"search-by-id\" id=\"id-41\">Search by ID<\/label>';
    __a1[1] += '<div class=\"form-group\" id=\"id-42\">';
    __a1[1] += '<input type=\"text\" class=\"form-control\" id=\"search-by-id\">';
    __a1[1] += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-43\"> <i class=\"fa fa-search\" id=\"id-44\"><\/i> <\/button>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"box-header\" id=\"id-45\">';
    __a1[1] += '<div class=\"col-xs-6 text-xs-left\" id=\"id-46\">';
    __a1[1] += '<div class=\"block\" id=\"id-47\">';
    __a1[1] += 'Name';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<div class=\"col-xs-6 text-xs-right\" id=\"id-48\">';
    __a1[1] += '<div class=\"block\" id=\"id-49\">';
    __a1[1] += 'ID';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<ul class=\"search-users-list\" id=\"id-50\">';
    __a1[1] += '<li id=\"id-51\"><label for=\"search-user-id1\" id=\"id-52\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-53\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-54\">10<\/span> <\/label> <\/li>';
    __a1[1] += '<li id=\"id-55\"><label for=\"search-user-id2\" id=\"id-56\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-57\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-58\">20<\/span> <\/label> <\/li>';
    __a1[1] += '<li id=\"id-59\"><label for=\"search-user-id3\" id=\"id-60\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-61\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-62\">30<\/span> <\/label> <\/li>';
    __a1[1] += '<li id=\"id-63\"><label for=\"search-user-id4\" id=\"id-64\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-65\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-66\">40<\/span> <\/label> <\/li>';
    __a1[1] += '<li id=\"id-67\"><label for=\"search-user-id5\" id=\"id-68\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-69\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-70\">50<\/span> <\/label> <\/li>';
    __a1[1] += '<\/ul>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '<\/div>';
    __a1[1] += '</form>';
  }
  __a1[1] += '<div class=\"col-xs-12\" id=\"id-71\">';
  __a1[1] += '[text]';
  __a1[1] += '<\/div>';
  __a1[1] += '<\/div>';
  __w.push(__a1);

  if (scope.currentRole) {
    t += '' + (spike.core.Templates.includeTemplate('$rolesSelect', scope)) + '';
    function closure2(event) {
      scope.openGeneralExcludes()
    };
    var linkId = spike.core.Events.linkEvent(closure2);
  }
  return __w;
};