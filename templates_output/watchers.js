spike.core.Watchers.watchers['templates_input_new_test_html']=function(scope, $this){var t = ''; var __w = []; var __a0 = ['','']; __a0[0] = 'watcher-0'; __a0[1] = '';__a0[1]+='<div sp-watch=\"watcher-0\" sp-id=\"watcher-0\">';
__a0[1]+='<div class="form-group">';
function closure0(event){scope.copyPrivileges()};var linkId = spike.core.Events.linkEvent(closure0);
__a0[1]+='<button type="button" class="btn btn-primary" spike-unbinded="" spike-event-click="scope.copyPrivileges()" spike-event-click-link="'+(linkId)+'" sp-id="spike-event-1">copy privilages from</button>';
function closure1(event){scope.selectRoleIdForCopy=event.target.value;};var linkId = spike.core.Events.linkEvent(closure1);
__a0[1]+='<select class="form-control" spike-event-change="scope.selectRoleIdForCopy=event.target.value;" spike-event-change-link="'+(linkId)+'" spike-unbinded="">';
var roles1=scope.roles;roles1.sort(function(item1, item2){return scope.sortFunction(item1,item2);});for(var __prop1 in roles1){if(roles1.hasOwnProperty(__prop1)){ var role = roles1[__prop1];(function(role, __prop1) {
__a0[1]+='<option>'+(role.name)+'</option>';
}(role, __prop1));}}
__a0[1]+='</select>';
__a0[1]+='<\/div>';
__a0[1]+='<div class="form-group">';
function closure2(event){scope.copyPrivileges()};var linkId = spike.core.Events.linkEvent(closure2);
__a0[1]+='<button type="button" class="btn btn-primary" spike-unbinded="" spike-event-click="scope.copyPrivileges()" spike-event-click-link="'+(linkId)+'" sp-id="spike-event-2">copy privilages from</button>';
function closure3(event){scope.selectRoleIdForCopy=event.target.value;};var linkId = spike.core.Events.linkEvent(closure3);
__a0[1]+='<select class="form-control" spike-event-change="scope.selectRoleIdForCopy=event.target.value;" spike-event-change-link="'+(linkId)+'" spike-unbinded="">';
var roles2=scope.roles;roles2.sort(function(item1, item2){return item1['name'] > item2['name'] ? 1 : 0;});for(var __prop1 in roles2){if(roles2.hasOwnProperty(__prop1)){ var role = roles2[__prop1];(function(role, __prop1) {
__a0[1]+='<option>'+(role.name)+'</option>';
}(role, __prop1));}}
__a0[1]+='</select>';
__a0[1]+='<\/div>';
__a0[1]+='<div class="form-group">';
function closure4(event){scope.copyPrivileges()};var linkId = spike.core.Events.linkEvent(closure4);
__a0[1]+='<button type="button" class="btn btn-primary" spike-unbinded="" spike-event-click="scope.copyPrivileges()" spike-event-click-link="'+(linkId)+'" sp-id="spike-event-3">copy privilages from</button>';
function closure5(event){scope.selectRoleIdForCopy=event.target.value;};var linkId = spike.core.Events.linkEvent(closure5);
__a0[1]+='<select class="form-control" spike-event-change="scope.selectRoleIdForCopy=event.target.value;" spike-event-change-link="'+(linkId)+'" spike-unbinded="">';
var roles3=scope.roles;roles3.sort(function(item1, item2){return item1.role > item2.role ? 1 : 0;});for(var __prop1 in roles3){if(roles3.hasOwnProperty(__prop1)){ var role = roles3[__prop1];(function(role, __prop1) {
__a0[1]+='<option>'+(role.name)+'</option>';
}(role, __prop1));}}
__a0[1]+='</select>';
__a0[1]+='<\/div>';
__a0[1]+='<\/div>';
__w.push(__a0);

function closure0(event){scope.copyPrivileges()};var linkId = spike.core.Events.linkEvent(closure0);
function closure1(event){scope.selectRoleIdForCopy=event.target.value;};var linkId = spike.core.Events.linkEvent(closure1);
var roles1=scope.roles;roles1.sort(function(item1, item2){return scope.sortFunction(item1,item2);});for(var __prop1 in roles1){if(roles1.hasOwnProperty(__prop1)){ var role = roles1[__prop1];(function(role, __prop1) {
}(role, __prop1));}}
function closure2(event){scope.copyPrivileges()};var linkId = spike.core.Events.linkEvent(closure2);
function closure3(event){scope.selectRoleIdForCopy=event.target.value;};var linkId = spike.core.Events.linkEvent(closure3);
var roles2=scope.roles;roles2.sort(function(item1, item2){return item1['name'] > item2['name'] ? 1 : 0;});for(var __prop1 in roles2){if(roles2.hasOwnProperty(__prop1)){ var role = roles2[__prop1];(function(role, __prop1) {
}(role, __prop1));}}
function closure4(event){scope.copyPrivileges()};var linkId = spike.core.Events.linkEvent(closure4);
function closure5(event){scope.selectRoleIdForCopy=event.target.value;};var linkId = spike.core.Events.linkEvent(closure5);
var roles3=scope.roles;roles3.sort(function(item1, item2){return item1.role > item2.role ? 1 : 0;});for(var __prop1 in roles3){if(roles3.hasOwnProperty(__prop1)){ var role = roles3[__prop1];(function(role, __prop1) {
}(role, __prop1));}}
 return __w;};