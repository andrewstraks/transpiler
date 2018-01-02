window.__st[''] = function ($local) {
    var t = '';
    t += '<div class="testClass">   ' + $local.person.name;
    t += '<div>';
    t += $local.person.name;
    t += '</div>';
    t += '<div>';
    t += $local.person.name;
    t += '</div> ' + app.component.Menu.getCategories($local.pageTitle);
    t += '<div>';
    t += app.message.get('test_translation');
    t += '</div>';
    t += '<div>';
    t += app.message.get('test_translation_with_params', [$local.person.id, $local.person.name]);
    t += '</div>';
    t += '<div>';
    t += app.message.get('' + $message.get('test_translation') + '');
    t += '</div>';
    t += '<div>';
    t += app.message.get('test_placeholder');
    t += '</div>';
    t += '<div>';
    t += app.message.get('test_placeholder', [$local.person.id, $local.person.name]);
    t += '</div>';
    t += '<input placeholder="' + $message.get('test_placeholder') + '">';
    if ($local.user.id &gt; 10) {
        if ($local.user.id &gt; 11) {
            t += '<span>Show me if user id &gt; 11</span>';
        }
        t += 'Show me if user id &gt; 10';
        t += '<div>';
        t += 'Some inner child 1';
        t += '</div>';
        t += '<div>';
        t += 'Some inner child 2';
        t += '</div>';
    }
    if ($local.user.id &lt; 10) {
        t += '<div>';
        t += 'Remove me if user id &gt; 10';
        t += '<div>';
        t += 'Some inner child 1';
        t += '</div>';
        t += '<div>';
        t += 'Some inner child 2';
        t += '</div>';
        t += '</div>';
    }
    if ($local.user.id &gt; 10) {
        t += 'Show me if user id &gt; 10';
    } else {
        t += 'Show me if first statement false';
    }
    if ($local.user.id &gt; 10) {
        t += 'Show me if user id &gt; 10';
        t += '<div id="dsd"></div>';
    } else if ($local.user.id &lt; 5) {
        t += 'Show me if user id &lt; 5';
    } else {
        t += 'Show me if first statement false';
    }
    switch ($local.status) {
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
    for (var index = 0; i &lt; $local.names.length; index++) {
        t += '<p>Name: ' + user.name + '</p>';
    }
    for (var index = 0; i &lt; $local.names.length; index++) {
        t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
    }
    for (var index = 0; i &lt; $local.names.length; index++) {
        t += '<div>';
        t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
        t += '</div>';
    }
    var __index1 = 0;
    for (var __prop1 in $local.names) {
        var user = $local.names[__prop1];
        t += '<p>Name: ' + user.name + '</p>';
        __index1++;
    }
    var index = 0;
    for (var __prop2 in $local.names) {
        var user = $local.names[__prop2];
        t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
        index++;
    }
    var index = 0;
    for (var __prop2 in $local.names) {
        var user = $local.names[__prop2];
        t += '<div>';
        t += '<p>Index: ' + index + '; Name: ' + user.name + '</p>';
        t += '</div>';
        index++;
    }
    t += 'while($local.count &lt; 10){';
    $local.count++
    t += '}';
    t += '<button spike-unbinded="" spike-event-click="app.router.location(' + "'" + '/post/1' + "'" + ')">Click me</button>';
    t += '<select spike-unbinded="" spike-event-change="app.component.Menu.changeOption(event)"> <option value="1">Test</option> </select>  @template(templateName)  ' + app.partial.include($somePartial, {user: $local.user}) + ' ' + app.partial.include($somePartial, {});
    var demo = 'test'
    var declareObject = {name: "Ok", id: 5,};
    var x = 'kk';
    var c = "OK";
    t += '</div>';
    return t;
}
