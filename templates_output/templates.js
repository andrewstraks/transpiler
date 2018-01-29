Templates.templates['templates_input_iiner_techDemo_partial_html'] = function (scope) {
  var t = '';
  t += '<div class="testClass">   ' + scope.person.name;
  t += '<div>';
  t += scope.person.name;
  t += '</div>';
  t += '<div>';
  t += scope.person.name;
  t += '</div> ' + app.component.Menu.getCategories(scope.pageTitle);
  t += '<div>';
  t += app.message.get('test_translation');
  t += '</div>';
  t += '<div>';
  t += app.message.get('test_translation_with_params', [scope.person.id, scope.person.name]);
  t += '</div>';
  t += '<div>';
  t += app.message.get('' + $message.get('test_translation') + '');
  t += '</div>';
  t += '<div>';
  t += app.message.get('test_placeholder');
  t += '</div>';
  t += '<div>';
  t += app.message.get('test_placeholder', [scope.person.id, scope.person.name]);
  t += '</div>';
  t += '<input placeholder="' + $message.get('test_placeholder') + '">';
  if (scope.user.id > 10) {
    if (scope.user.id > 11) {
      t += '<span>Show me if user id > 11</span>';
    }
    t += 'Show me if user id > 10';
    t += '<div>';
    t += 'Some inner child 1';
    t += '</div>';
    t += '<div>';
    t += 'Some inner child 2';
    t += '</div>';
  }
  if (scope.user.id < 10) {
    t += '<div>';
    t += 'Remove me if user id > 10';
    t += '<div>';
    t += 'Some inner child 1';
    t += '</div>';
    t += '<div>';
    t += 'Some inner child 2';
    t += '</div>';
    t += '</div>';
  }
  if (scope.user.id > 10) {
    t += 'Show me if user id > 10';
  } else {
    t += 'Show me if first statement false';
  }
  if (scope.user.id > 10) {
    t += 'Show me if user id > 10';
    t += '<div id="dsd"></div>';
  } else if (scope.user.id < 5) {
    t += 'Show me if user id < 5';
  } else {
    t += 'Show me if first statement false';
  }
  switch (scope.status) {
    case 200 :
      t += '<div class="success">';
      t += 'OK';
      t += '</div>';
      break;
    case 'error' :
    case 404 :
      t += '<div class="error">';
      t += 'ERROR';
      t += '</div>';
      defaultt += '<div class="error">';
      t += 'ERROR';
      t += '</div>';
  }
  for (var index = 0; i < scope.names.length; index++) {
    t += '<p>Name: ' + user.name + '</p>';
  }
  for (var index = 0; i < scope.names.length; index++) {
    t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
  }
  for (var index = 0; i < scope.names.length; index++) {
    t += '<div>';
    t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
    t += '</div>';
  }
  var __index1 = 0;
  for (var __prop1 in scope.names) {
    var user = scope.names[__prop1];
    t += '<p>Name: ' + user.name + '</p>';
    __index1++;
  }
  var index = 0;
  for (var __prop2 in scope.names) {
    var user = scope.names[__prop2];
    t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
    index++;
  }
  var index = 0;
  for (var __prop2 in scope.names) {
    var user = scope.names[__prop2];
    t += '<div>';
    t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
    t += '</div>';
    index++;
  }
  t += 'while(scope.count < 10){';
  scope.count++
  t += '}';
  t += '<button spike-unbinded="" spike-event-click="app.router.location(' + "'" + '/post/1' + "'" + ')" id="spike-event-1">Click me</button>';
  t += '<select spike-unbinded="" spike-event-change="app.component.Menu.changeOption(event)" id="spike-event-2"> <option value="1">Test</option> </select>  @template(templateName)  ' + app.partial.include($somePartial, {user: scope.user}) + ' ' + app.partial.include($somePartial, {});
  var demo = 'test'
  var declareObject = {name: "Ok", id: 5,};
  var x = 'kk';
  var c = "OK";
  t += '<a spike-href="some.html">Some link</a>';
  t += '</div>';
  return t;
}