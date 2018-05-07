spike.core.Watchers.watchers['templates_input_new_test_html']=function(scope){ var t = ''; var __w = []; var __a0 = ['','']; __a0[0] = 'watcher-0'; __a0[1] = '';__a0[1]+='<div class=\"filterElement\" sp-watch=\"watcher-0\" sp-id=\"watcher-0\">';
__a0[1]+='<div class=\"view-types col-xs-12\">';
__a0[1]+='<div class=\"template-name\">';
__a0[1]+='Template name';
__a0[1]+='<\/div>';
__a0[1]+='<select class="form-control" spike-unbinded="" spike-event-change="scope.parentElement.VIEW_TYPE=event.target.value;scope.changeView()" spike-event-change-link="'+(spike.core.Events.linkEvent(0,function(event){scope.parentElement.VIEW_TYPE=event.target.value;scope.changeView()}))+'">';
for(var argumentKey in scope.parentElement.VIEW_TYPES){if(scope.parentElement.VIEW_TYPES.hasOwnProperty( argumentKey)){ var argument = scope.parentElement.VIEW_TYPES[ argumentKey];(function(argument, argumentKey) {
__a0[1]+='<option sp-value="'+(argumentKey)+'" '+(((scope.parentElement.VIEW_TYPE === argument) ? 'selected' : ''))+'>'+(argument)+'</option>';
}(argument, argumentKey));}}
__a0[1]+='</select>';
__a0[1]+='<\/div>';
__a0[1]+='<input type=\"text\" name=\"loginName\" placeholder=\"'+( Message.get('login_placeholder') )+'\" spike-event-keyup=\"scope.model.loginName=event.target.value;\" spike-event-keyup-link=\"'+(spike.core.Events.linkEvent(1,function(event){scope.model.loginName=event.target.value;}))+'\" spike-unbinded=\"\" sp-name=\"loginName\">';
__a0[1]+='<input type=\"password\" name=\"password\" placeholder=\"'+( Message.get('password_placeholder') )+'\" spike-event-keyup=\"scope.model.password=event.target.value;\" spike-event-keyup-link=\"'+(spike.core.Events.linkEvent(2,function(event){scope.model.password=event.target.value;}))+'\" spike-unbinded=\"\" sp-name=\"password\">';
__a0[1]+='<\/div>';
__w.push(__a0);

for(var argumentKey in scope.parentElement.VIEW_TYPES){if(scope.parentElement.VIEW_TYPES.hasOwnProperty( argumentKey)){ var argument = scope.parentElement.VIEW_TYPES[ argumentKey];(function(argument, argumentKey) {
}(argument, argumentKey));}}
 return __w;};