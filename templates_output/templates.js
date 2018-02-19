window['_spike_templates'] = {};
;window['_spike_templates']['templates_input/plain/test.partial.html'] = function (model) {
  var t = '';
  t += '<div id=\"topMenu\" class=\"topMenuComponent container-fluid col-all-12\">';
  t += '<div class=\"col-all-12 main-row\">';
  t += '<div class=\"header-logo col-all-2\" spike-unbinded=\"\" spike-event-click=\"app.router.redirect(\'\/\');\" id=\"spike-event-1\"><\/div>  ' + app.partial.include(app.partial.TopMenuLoggedPanel, {}) + ' ' + app.partial.include(app.partial.TopMenuUnloggedPanel, {}) + '';
  t += '<\/div>';
  t += '<div class=\"col-all-12 menu-items\">';
  t += '<partial id=\"topMenuItems\"><\/partial>';
  t += '<\/div>';
  t += '<\/div>';
  return t;
};
;window['_spike_templates']['templates_input/plain/plain.partial.html'] = function (model) {
  var t = '';
  t += '<div class=\"testClass\">   ' + scope.person.name + '';
  t += '<div>';
  t += '' + scope.person.name + '';
  t += '<\/div>';
  t += '<div>';
  t += '' + scope.person.name + '';
  t += '<\/div> ' + app.component.Menu.getCategories(scope.pageTitle) + '';
  t += '<div>';
  t += '' + app.message.get('test_translation') + '';
  t += '<\/div>';
  t += '<div>';
  t += '' + app.message.get('test_translation_with_params', [scope.person.id, scope.person.name]) + '';
  t += '<\/div>';
  t += '<div>';
  t += '' + app.message.get('test_placeholder') + '';
  t += '<\/div>';
  t += '<div>';
  t += '' + app.message.get('test_placeholder', [scope.person.id, scope.person.name]) + '';
  t += '<\/div>';
  t += '<input placeholder="' + $message.get('test_placeholder') + '">';
  if (scope.user.id > 10) {
    if (scope.user.id > 11) {
      t += '<span>Show me if user id > 11</span>';
    }
    t += 'Show me if user id > 10';
    t += '<div>';
    t += 'Some inner child 1';
    t += '<\/div>';
    t += '<div>';
    t += 'Some inner child 2';
    t += '<\/div>';
  }
  if (scope.user.id < 10) {
    t += '<div>';
    t += 'Remove me if user id > 10';
    t += '<div>';
    t += 'Some inner child 1';
    t += '<\/div>';
    t += '<div>';
    t += 'Some inner child 2';
    t += '<\/div>';
    t += '</div>';
  }
  if (scope.user.id > 10) {
    t += 'Show me if user id > 10';
  } else {
    t += 'Show me if first statement false';
  }
  if (scope.user.id > 10) {
    t += 'Show me if user id > 10';
    t += '<div id=\"dsd\"><\/div>';
  } else if (scope.user.id < 5) {
    t += 'Show me if user id < 5';
  } else {
    t += 'Show me if first statement false';
  }
  switch (scope.status) {
    case 200 :
      t += '<div class=\"success\">';
      t += 'OK';
      t += '<\/div>';
      break;
    case 'error' :
    case 404 :
      t += '<div class=\"error\">';
      t += 'ERROR';
      t += '<\/div>';
      break;
    default :
      t += '<div class=\"error\">';
      t += 'ERROR';
      t += '<\/div>';
  }
  for (var index = 1; index < scope.names.length; i++) {
    t += '<p>Name: ' + user.name + '<\/p>';
  }
  for (var index = 0; index < scope.names.length; index++) {
    t += '<p>Name: ' + user.name + '<\/p>';
  }
  for (var index = 0; index < scope.names.length; index++) {
    t += '<p>Index: ' + index + '; Name: ' + user.name + '<\/p>';
  }
  for (var index = 0; index < scope.names.length; index++) {
    t += '<div>';
    t += '<p>Index: ' + index + '; Name: ' + user.name + '<\/p>';
    t += '</div>';
  }
  var __index1 = 0;
  for (var __prop1 in scope.names) {
    var user = scope.names[__prop1];
    t += '<p>Name: ' + user.name + '<\/p>';
    __index1++;
  }
  var index = 0;
  for (var __prop2 in scope.names) {
    var user = scope.names[__prop2];
    t += '<p>Index: ' + index + '; Name: ' + user.name + '<\/p>';
    index++;
  }
  var index = 0;
  for (var __prop2 in scope.names) {
    var user = scope.names[__prop2];
    t += '<div>';
    t += '<p>Index: ' + index + '; Name: ' + user.name + '<\/p>';
    t += '</div>';
    index++;
  }
  while (scope.count < 10) {
    scope.count++;
  }
  t += '<button spike-unbinded=\"\" spike-event-click=\"app.router.location(\'\/post\/1\')\" id=\"spike-event-2\">Click me<\/button>';
  t += '<select spike-unbinded="" spike-event-change="app.component.Menu.changeOption(event)" id="spike-event-4"> <option value="1">Test</option> </select>  @template(templateName)  ' + app.partial.include($somePartial, {user: scope.user}) + ' ' + app.partial.include($somePartial, {}) + '';
  var demo = 'test';
  var declareObject = {name: "Ok", id: 5,};
  var x = 'kk';
  var c = "OK";
  t += '<a sp-href=\"some.html\" id=\"spike-href-1\" href=\"\">Some link GOOGLE\'<\/a>';
  t += '<span class=\"amount\">' + freebet.freebetValue + ' ' + currency + ' ' + $messages.get('freebet_offer_name_' + freebet.offerCode) + '<\/span>';
  t += '<div class=\"td wallet-status ' + $this.getActiveClass('statusCode') + '\" spike-unbinded=\"\" spike-event-click=\"$this.changeOrder(' + 'statusCode' + ')\" id=\"spike-event-3\">';
  t += '' + app.message.get('transfers_status') + '';
  t += '<\/div>';
  t += '<p> ' + $timeUtils.formatDateFromTimestamp(model.event.eventStart, 'sm MM - HH:mm') + ' <a href=\"' + $router.createLink('\/sports\/events\/' + model.event.category1Id) + '\">' + model.event.category1Name + '<\/a> <i class=\"ion ion-ios-arrow-right\"><\/i> <a href=\"' + $router.createLink('\/sports\/events\/' + model.event.category2Id) + '\">' + model.event.category2Name + '<\/a> <i class=\"ion ion-ios-arrow-right\"><\/i> <a href=\"' + $router.createLink('\/sports\/events\/' + model.event.category3Id) + '\">' + model.event.category3Name + '<\/a> <\/p>';
  t += '<\/div>';
  return t;
};