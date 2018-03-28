spike.core.Watchers.watchers['templates_input_new_test_html'] = function (scope, $this) {
  var __w = [];
  var __a0 = ['', ''];
  __a0[0] = 'tableList';
  __a0[1] = '';
  __a0[1] += '<div class="tableListTemplate" sp-watch="tableList" sp-watch-manual id="id-1">';
  if (scope.data) {
    for (var elementIndex = 0; elementIndex < scope.data.length; elementIndex++) {
      var element = scope.data[elementIndex];
      __a0[1] += '<div class="table-row" id="id-2">';
      for (var optionKey in scope.options.columns) {
        if (scope.options.columns.hasOwnProperty(optionKey)) {
          var option = scope.options.columns[optionKey];
          __a0[1] += '<div class="table-column" style="width: ' + (option.width) + '%" id="id-3">';
          switch (option.type) {
            case 'button' :
              __a0[1] += '<button data-key=\"' + (element[option.key]) + '\" onclick=\"(' + (option.action) + ')(this)\" id=\"id-4\">' + (optionKey) + '<\/button>';
              __a0[1] += '';
              break;
            case 'date' :
              __a0[1] += (element[optionKey] ? app.service.helpers.Common.formatDate(element[optionKey], option.format, false) : '&nbsp;');
              __a0[1] += '';
              break;
            case 'select' :
              __a0[1] += '';
              break;
            case 'checkbox' :
              __a0[1] += '';
              break;
            case 'href' :
              __a0[1] += '<a href=\"' + (option.link + '\/' + element[option.key]) + '\" target=\"' + (option.target) + '\" id=\"id-5\">' + (optionKey) + '<\/a>';
              __a0[1] += '';
              break;
            case 'filter' :
              __a0[1] += '';
              break;
            default :
              __a0[1] += (element[optionKey] ? element[optionKey] : '&nbsp;');
              __a0[1] += '<\/spike>';
              __a0[1] += '';
          }
          __a0[1] += '<\/div>';
          __a0[1] += '';
        }
      }
      __a0[1] += '<\/div>';
      __a0[1] += '';
    }
    __a0[1] += '<div class=\"pagination\" id=\"id-6\">';
    __a0[1] += '<div class=\"first\" id=\"id-7\">';
    __a0[1] += 'first';
    __a0[1] += '<\/div>';
    __a0[1] += '<div class=\"prev\" id=\"id-8\">';
    __a0[1] += 'prev';
    __a0[1] += '<\/div>';
    __a0[1] += '<div class=\"next\" id=\"id-9\">';
    __a0[1] += 'next';
    __a0[1] += '<\/div>';
    __a0[1] += '<div class=\"last\" id=\"id-10\">';
    __a0[1] += 'last';
    __a0[1] += '<\/div>';
    __a0[1] += '<\/div>';
    __a0[1] += '';
  }
  __a0[1] += '<\/div>';
  __w.push(__a0);
  if (scope.data) {
    for (var elementIndex = 0; elementIndex < scope.data.length; elementIndex++) {
      var element = scope.data[elementIndex];
      for (var optionKey in scope.options.columns) {
        if (scope.options.columns.hasOwnProperty(optionKey)) {
          var option = scope.options.columns[optionKey];
          switch (option.type) {
            case 'button' :
              break;
            case 'date' :
              break;
            case 'select' :
              break;
            case 'checkbox' :
              break;
            case 'href' :
              break;
            case 'filter' :
              break;
            default :
          }
        }
      }
    }
  }
  return __w;
};