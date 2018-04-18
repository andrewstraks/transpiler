spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_test_html'] = function (scope) {
  var t = '';
  t += '';
  t += '<div sp-watch=\"watcher-0\" sp-id=\"watcher-0\">';
  t += '<div class="form-group">';
  function closure0(event) {
    scope.copyPrivileges()
  };
  var linkId = spike.core.Events.linkEvent(closure0);
  t += '<button type="button" class="btn btn-primary" spike-unbinded="" spike-event-click="scope.copyPrivileges()" spike-event-click-link="' + (linkId) + '" sp-id="spike-event-1">copy privilages from</button>';
  function closure1(event) {
    scope.selectRoleIdForCopy = event.target.value;
  };
  var linkId = spike.core.Events.linkEvent(closure1);
  t += '<select class="form-control" spike-event-change="scope.selectRoleIdForCopy=event.target.value;" spike-event-change-link="' + (linkId) + '" spike-unbinded="">';
  var roles1 = scope.roles;
  roles1.sort(function (item1, item2) {
    return scope.sortFunction(item1, item2);
  });
  for (var __prop1 in roles1) {
    if (roles1.hasOwnProperty(__prop1)) {
      var role = roles1[__prop1];
      (function (role, __prop1) {
        t += '<option>' + (role.name) + '</option>';
      }(role, __prop1));
    }
  }
  t += '</select>';
  t += '<\/div>';
  t += '<div class="form-group">';
  function closure2(event) {
    scope.copyPrivileges()
  };
  var linkId = spike.core.Events.linkEvent(closure2);
  t += '<button type="button" class="btn btn-primary" spike-unbinded="" spike-event-click="scope.copyPrivileges()" spike-event-click-link="' + (linkId) + '" sp-id="spike-event-2">copy privilages from</button>';
  function closure3(event) {
    scope.selectRoleIdForCopy = event.target.value;
  };
  var linkId = spike.core.Events.linkEvent(closure3);
  t += '<select class="form-control" spike-event-change="scope.selectRoleIdForCopy=event.target.value;" spike-event-change-link="' + (linkId) + '" spike-unbinded="">';
  var roles2 = scope.roles;
  roles2.sort(function (item1, item2) {
    return item1['name'] > item2['name'] ? 1 : 0;
  });
  for (var __prop1 in roles2) {
    if (roles2.hasOwnProperty(__prop1)) {
      var role = roles2[__prop1];
      (function (role, __prop1) {
        t += '<option>' + (role.name) + '</option>';
      }(role, __prop1));
    }
  }
  t += '</select>';
  t += '<\/div>';
  t += '<div class="form-group">';
  function closure4(event) {
    scope.copyPrivileges()
  };
  var linkId = spike.core.Events.linkEvent(closure4);
  t += '<button type="button" class="btn btn-primary" spike-unbinded="" spike-event-click="scope.copyPrivileges()" spike-event-click-link="' + (linkId) + '" sp-id="spike-event-3">copy privilages from</button>';
  function closure5(event) {
    scope.selectRoleIdForCopy = event.target.value;
  };
  var linkId = spike.core.Events.linkEvent(closure5);
  t += '<select class="form-control" spike-event-change="scope.selectRoleIdForCopy=event.target.value;" spike-event-change-link="' + (linkId) + '" spike-unbinded="">';
  var roles3 = scope.roles;
  roles3.sort(function (item1, item2) {
    return item1.role > item2.role ? 1 : 0;
  });
  for (var __prop1 in roles3) {
    if (roles3.hasOwnProperty(__prop1)) {
      var role = roles3[__prop1];
      (function (role, __prop1) {
        t += '<option>' + (role.name) + '</option>';
      }(role, __prop1));
    }
  }
  t += '</select>';
  t += '<\/div>';
  t += '<\/div>';
  return t;
};