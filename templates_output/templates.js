spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_test_html'] = function (scope, $this) {
  var t = '';
  t += '<body id=\"id-1\">';
  t += '<div class="homeController" id="id-2">';
  scope.items = [{name: 'Jack'}, {name: 'Bob'}];
  t += '<div id=\"whenTest0\" class=\"\">';
  t += '' + (spike.core.Templates.includeTemplate('app.elements.common.spinner', scope, $this)) + '';
  t += '<\/div>' + ($this.addTriggerElement('app.elements.test.Test', 'whenTest', 'whenTest0')) + '';
  t += '<div id=\"whenSpinner100000\" class=\"\"><\/div>' + ($this.addTriggerTemplate('app.elements.common.spinner', 'whenSpinner', 'whenSpinner100000')) + '';
  t += '<input type=\"text\" name=\"username\" id=\"id-3\" sp-name=\"username\">';
  t += '<input type=\"password\" name=\"password\" id=\"id-4\" sp-name=\"password\">';
  t += '<\/div>';
  return t;
};