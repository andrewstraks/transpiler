spike.core.Watchers.watchers['templates_input_new_module_common_element_table_tableFilter_html']=function(scope, $this){var __w = []; var __a0 = ['','']; __a0[0] = ''; __a0[1] = '';__a0[1]+='<div class="tableFilterTemplate" sp-watch id="id-522">';
__a0[1]+=(scope.addTriggerTemplate('Test', 'asdas','asdas100009'));
__a0[1]+='<div id="asdas100009" class=""></div>';
for(var index8 = 0; index8 < scope.options.filters.length; index8++){var filter = scope.options.filters[index8];(function(filter) {

switch(filter.type){

case 'buttons' :

for(var index9 = 0; index9 < filter.buttons.length; index9++){var button = filter.buttons[index9];(function(button) {

function closure13(event){scope.delegateEvent(button, this)};var linkId = spike.core.Events.linkEvent(closure13);
__a0[1]+='<button class="'+(button.clazz)+'" id="id-523" spike-unbinded="" spike-event-click="scope.delegateEvent(button, this)" spike-event-click-link="'+(linkId)+'">'+(button.label)+'</button>';

}(button));}

break;

case 'select' :

__a0[1]+='<label id="id-524">'+(filter.label)+'</label>';
function closure14(event){scope.delegateEvent(filter, this)};var linkId = spike.core.Events.linkEvent(closure14);
__a0[1]+='<select id="id-525" spike-unbinded="" spike-event-change="scope.delegateEvent(filter, this)" spike-event-change-link="'+(linkId)+'">';
for(var argumentKey in filter.arguments){if(filter.arguments.hasOwnProperty( argumentKey)){ var argument = filter.arguments[ argumentKey];(function(argument) {
__a0[1]+='<option spike value="'+(argumentKey)+'" id="id-526">'+(argument)+'</option>';
}(argument));}}
__a0[1]+='</select>';

break;

case 'checkbox' :

__a0[1]+='<input type="checkbox" id="id-527">';
__a0[1]+='<input id="id-528">';

break;

case 'href' :


break;

case 'filter' :

__a0[1]+=(filter.filter(element));

break;


}

}(filter));}
__a0[1]+='</div>';
__w.push(__a0);

t+=''+(scope.addTriggerTemplate('Test', 'asdas','asdas100009'))+'';
for(var index8 = 0; index8 < scope.options.filters.length; index8++){var filter = scope.options.filters[index8];(function(filter) {
switch(filter.type){
case 'buttons' :
for(var index9 = 0; index9 < filter.buttons.length; index9++){var button = filter.buttons[index9];(function(button) {
function closure13(event){scope.delegateEvent(button, this)};var linkId = spike.core.Events.linkEvent(closure13);
}(button));}
break;
case 'select' :
function closure14(event){scope.delegateEvent(filter, this)};var linkId = spike.core.Events.linkEvent(closure14);
for(var argumentKey in filter.arguments){if(filter.arguments.hasOwnProperty( argumentKey)){ var argument = filter.arguments[ argumentKey];(function(argument) {
}(argument));}}
break;
case 'checkbox' :
break;
case 'href' :
break;
case 'filter' :
break;
}
}(filter));}
 return __w;};spike.core.Watchers.watchers['templates_input_new_module_home_controller_home_home_html']=function(scope, $this){var __w = [];  return __w;};spike.core.Watchers.watchers['templates_input_new_module_privileges_modal_pagePrivileges_pagePrivileges_html']=function(scope, $this){var __w = [];  return __w;};spike.core.Watchers.watchers['templates_input_new_module_cms_element_edit_edit_html']=function(scope, $this){var __w = [];  return __w;};spike.core.Watchers.watchers['templates_input_new_module_privileges_controller_inne_inne_html']=function(scope, $this){var __w = []; function closure15(event){scope.newRoleName=event.target.value;};var linkId = spike.core.Events.linkEvent(closure15);
t+=''+(scope.addTriggerTemplate('$rolesSelect', 'rolesSelect','rolesSelect100010'))+'';
function closure16(event){scope.openGeneralExcludes()};var linkId = spike.core.Events.linkEvent(closure16);
 return __w;};spike.core.Watchers.watchers['templates_input_new_module_privileges_controller_privileges_viewsList_html']=function(scope, $this){var __w = []; function closure17(event){scope.toggleList(this)};var linkId = spike.core.Events.linkEvent(closure17);
for(var index10 = 0; index10 < scope.views.length; index10++){var view = scope.views[index10];(function(view) {
if(view.sublist){
function closure18(event){scope.toggleList(this)};var linkId = spike.core.Events.linkEvent(closure18);
for(var index11 = 0; index11 < view.sublist.length; index11++){var subview = view.sublist[index11];(function(subview) {
}(subview));}
}
}(view));}
 return __w;};spike.core.Watchers.watchers['templates_input_new_module_auth_controller_login_login_html']=function(scope, $this){var __w = []; function closure19(event){scope.login(event)};var linkId = spike.core.Events.linkEvent(closure19);
var __a6 = ['','']; __a6[0] = ''; __a6[1] = '';__a6[1]+='<form autocomplete="off" sp-watch id="id-940" spike-unbinded="" spike-event-submit="scope.login(event)" spike-event-submit-link="'+(linkId)+'">';
function closure20(event){scope.model.loginName=event.target.value;};var linkId = spike.core.Events.linkEvent(closure20);
__a6[1]+='<input type="text" name="loginName" placeholder="'+( spike.core.Message.get('login_placeholder') )+'" id="id-941" spike-event-keyup="scope.model.loginName=event.target.value;" spike-event-keyup-link="'+(linkId)+'" spike-unbinded="" sp-name="loginName">';
function closure21(event){scope.model.password=event.target.value;};var linkId = spike.core.Events.linkEvent(closure21);
__a6[1]+='<input type="password" name="password" placeholder="'+( spike.core.Message.get('password_placeholder') )+'" id="id-942" spike-event-keyup="scope.model.password=event.target.value;" spike-event-keyup-link="'+(linkId)+'" spike-unbinded="" sp-name="password">';
__a6[1]+='<button type="submit" class="default" id="id-943">'+(spike.core.Message.get('login_button'))+'</button>';
__a6[1]+='<p class="error '+( scope.model.error === true ? 'show' : 'hide' )+'" id="id-944">'+(spike.core.Message.get('login_error'))+'</p>';
__a6[1]+='</form>';
__w.push(__a6);

function closure20(event){scope.model.loginName=event.target.value;};var linkId = spike.core.Events.linkEvent(closure20);
function closure21(event){scope.model.password=event.target.value;};var linkId = spike.core.Events.linkEvent(closure21);
 return __w;};