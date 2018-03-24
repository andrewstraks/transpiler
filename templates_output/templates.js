spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_test_html'] = function (scope) {
    var t = '';
    t += '<body id=\"id-1\">';
    t += '<div class="homeController" id="id-2">';
    scope.items = [{name: 'Jack'}, {name: 'Bob'}];
    t += '<div id=\"whenTest0\">';
    t += '' + (spike.core.Templates.includeTemplate('app.elements.common.spinner', scope)) + '';
    t += '<\/div>' + (spike.core.Watchers.addTrigger('app.elements.test.Test', scope, 'whenTest', 'whenTest0')) + '';
    t += '<\/div>';
    return t;
};