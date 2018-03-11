spike.core.Watchers.watchers['templates_input_new_test_html'] = function (scope) {
    var __w = [];
    scope.items = [{name: 'Jack'}, {name: 'Bob'}];
    var __a0 = ['', ''];
    __a0[0] = 'watcher-0';
    __a0[1] = '';
    __a0[1] += '<div sp-watch=\"watcher-0\" id=\"id-3\">';
    __a0[1] += '<button type="button" id="id-4" spike-unbinded="" spike-event-click="scope.change()">change</button>';
    for (var index0 = 0; index0 < scope.items.length; index0++) {
        var item = scope.items[index0];
        __a0[1] += '';
        __a0[1] += (item.name);
        __a0[1] += '';
    }
    __a0[1] += '<\/div>';
    __w.push(__a0);
    for (var index0 = 0; index0 < scope.items.length; index0++) {
        var item = scope.items[index0];
    }
    return __w;
};