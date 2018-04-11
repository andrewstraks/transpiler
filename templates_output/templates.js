spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_test_html'] = function (scope) {
    var t = '';
    t += '<div class="loginController" id="id-1">';

    function closure0(event) {
        scope.selectRole(role)
    };var linkId = spike.core.Events.linkEvent(closure0);
    for (var index0 = 0; index0 < scope.roles.length; index0++) {
        var role = scope.roles[index0];
        (function (role) {
            t += '<div class=\"form-group\" id=\"id-2\" spike-unbinded=\"\" spike-event-click=\"scope.selectRole(role)\" spike-event-click-link=\"' + (linkId) + '\">';
            t += '<input id=\"role-' + (role.id) + '\" sp-keep-id name=\"role-' + (role.id) + '\" class=\"form-control\" type=\"radio\" hidden sp-name=\"role-' + (role.id) + '\">';
            t += '<label for=\"role-' + (role.id) + '\" id=\"id-3\">' + (role.name) + '<\/label>';
            t += '</div>';
        }(role));
    }
    t += '<\/div>';
    t += '<div class="testBindingController" id="id-4">';

    function closure1(event) {
        scope.name = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure1);
    t += '<input type="text" id="id-5" spike-event-keyup="scope.name=event.target.value;" spike-event-keyup-link="' + (linkId) + '" spike-unbinded="">';

    function closure2(event) {
        scope.age = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure2);
    t += '<select id="id-6" spike-event-change="scope.age=event.target.value;" spike-event-change-link="' + (linkId) + '" spike-unbinded="">';
    for (var index1 = 0; index1 < scope.ageList.length; index1++) {
        var age = scope.ageList[index1];
        (function (age) {
            t += '<option value="' + (age) + '" id="id-7">' + (age) + '</option>';
        }(age));
    }
    t += '</select>';
    for (var __prop1 in scope.objectList) {
        if (scope.objectList.hasOwnProperty(__prop1)) {
            var objectType = scope.objectList[__prop1];
            (function (objectType) {
                t += '<div id="id-8">';

                function closure3(event) {
                    objectType.type = event.target.value;
                };var linkId = spike.core.Events.linkEvent(closure3);
                t += '<input type=\"text\" id=\"id-9\" spike-event-keyup=\"objectType.type=event.target.value;\" spike-event-keyup-link=\"' + (linkId) + '\" spike-unbinded=\"\">';
                t += '</div>';
            }(objectType));
        }
    }
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_controller_custom_custom_html'] = function (scope) {
    var t = '';
    t += '<div class=\"customController\" id=\"id-10\">';
    t += '<div class="col-xs-9" id="id-11">';
    t += '' + (scope.include(new app.module.cms.element.filter.custom.Filter(scope, {}))) + '';
    t += '' + (scope.include(new app.module.cms.element.edit.Edit(scope, {}))) + '';
    t += '' + (scope.include(new app.module.cms.element.modify.Modify(scope, {}))) + '';
    t += '<\/div>';
    t += '<div class="col-xs-3" id="id-12">';
    t += '' + (scope.include(new app.module.cms.element.properties.Properties(scope, {}))) + '';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_menu_menu_html'] = function (scope) {
    var t = '';
    t += '<div class=\"menuGlobalElement\" id=\"id-13\">';
    t += '<div class="search" id="id-14">';

    function closure4(event) {
        scope.search(event)
    };var linkId = spike.core.Events.linkEvent(closure4);
    t += '<form autocomplete="off" id="id-15" spike-unbinded="" spike-event-submit="scope.search(event)" spike-event-submit-link="' + (linkId) + '">';

    function closure5(event) {
        scope.searchText = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure5);
    t += '<input type=\"text\" id=\"id-16\" spike-event-keyup=\"scope.searchText=event.target.value;\" spike-event-keyup-link=\"' + (linkId) + '\" spike-unbinded=\"\">';
    t += '<\/form>';
    t += '</div>';
    t += '' + (scope.addTriggerTemplate('app.module.common.element.menu.menuList', 'menuList', 'menuList100000')) + '';
    t += '<div id=\"menuList100000\" class=\"\"><\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_table_tableList_html'] = function (scope) {
    var t = '';
    t += '<div class="tableListTemplate" id="id-17">';
    for (var elementIndex = 0; elementIndex < scope.data.length; elementIndex++) {
        var element = scope.data[elementIndex];
        (function (element) {
            t += '<div class="table-row" id="id-18">';
            for (var optionKey in scope.options.columns) {
                if (scope.options.columns.hasOwnProperty(optionKey)) {
                    var option = scope.options.columns[optionKey];
                    (function (option) {
                        t += '<div class="table-column ' + (option.clazz) + '" style="width: ' + (option.width) + '%" id="id-19">';
                        switch (option.type) {
                            case 'buttons' :
                                for (var index2 = 0; index2 < option.buttons.length; index2++) {
                                    var button = option.buttons[index2];
                                    (function (button) {
                                        function closure6(event) {
                                            scope.delegateEvent(button, this)
                                        };var linkId = spike.core.Events.linkEvent(closure6);
                                        t += '<button class=\"' + (button.clazz) + '\" id=\"id-20\" spike-unbinded=\"\" spike-event-click=\"scope.delegateEvent(button, this)\" spike-event-click-link=\"' + (linkId) + '\">' + (optionKey) + '<\/button>';
                                    }(button));
                                }
                                break;
                            case 'date' :
                                t += '' + (element[optionKey] ? app.service.common.Utils.formatDate(element[optionKey], option.format, false) : '&nbsp;') + '';
                                break;
                            case 'select' :

                            function closure7(event) {
                                scope.delegateEvent(option, this)
                            };var linkId = spike.core.Events.linkEvent(closure7);
                                t += '<select id="id-21" spike-unbinded="" spike-event-change="scope.delegateEvent(option, this)" spike-event-change-link="' + (linkId) + '">';
                                for (var argumentKey in option.arguments) {
                                    if (option.arguments.hasOwnProperty(argumentKey)) {
                                        var argument = option.arguments[argumentKey];
                                        (function (argument) {
                                            t += '<option spike value="' + (argumentKey) + '" id="id-22">' + (argument) + '</option>';
                                        }(argument));
                                    }
                                }
                                t += '</select>';
                                break;
                            case 'checkbox' :
                                t += '<input type=\"checkbox\" id=\"id-23\">';
                                t += '<input id=\"id-24\">';
                                break;
                            case 'href' :
                                t += '<a href=\"' + (option.link(element)) + '\" target=\"' + (option.target) + '\" id=\"id-25\">' + (optionKey) + '<\/a>';
                                break;
                            case 'filter' :
                                t += '' + (option.filter(element)) + '';
                                break;
                            default :
                                t += '' + (element[optionKey] ? element[optionKey] : '&nbsp;') + '';
                        }
                        t += '<\/div>';
                    }(option));
                }
            }
            t += '<\/div>';
        }(element));
    }
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_modal_addRole_rolesSelect_html'] = function (scope) {
    var t = '';
    t += '<select class="form-control" id="id-26">';
    for (var index3 = 0; index3 < scope.roles.length; index3++) {
        var role = scope.roles[index3];
        (function (role) {
            t += '<option value="' + (role.id) + '" id="id-27">' + (role.name) + '</option>';
        }(role));
    }
    t += '</select>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_table_table_html'] = function (scope) {
    var t = '';
    t += '<div class="tableCommonElement" id="id-28">';
    t += '' + (scope.addTriggerTemplate('app.module.common.element.table.tableFilter', 'tableFilter', 'tableFilter100001')) + '';
    t += '<div id="tableFilter100001" class=""></div>';
    t += '' + (scope.addTriggerTemplate('app.module.common.element.table.tableHeader', 'tableHeader', 'tableHeader100002')) + '';
    t += '<div id="tableHeader100002" class=""></div>';
    t += '' + (scope.addTriggerTemplate('app.module.common.element.table.tableList', 'tableList', 'tableList100003')) + '';
    t += '<div id="tableList100003" class=""></div>';
    t += '' + (scope.addTriggerTemplate('app.module.common.element.table.tablePagination', 'tablePagination', 'tablePagination100004')) + '';
    t += '<div id=\"tablePagination100004\" class=\"\"><\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_maintenance_controller_maintenance_maintenance_html'] = function (scope) {
    var t = '';
    t += '<div class=\"maintenanceController\" id=\"id-29\">';
    t += '<div class=\"box\" id=\"id-30\">';
    t += '<div class=\"title\" id=\"id-31\">';
    t += '' + (spike.core.Message.get('maintenance_dict_status')) + '';
    t += '<\/div>';
    t += '<div class="content" id="id-32">';
    for (var groupName in scope.dictionaries) {
        if (scope.dictionaries.hasOwnProperty(groupName)) {
            var dictionaryGroup = scope.dictionaries[groupName];
            (function (dictionaryGroup) {
                t += '<ul id=\"id-33\">';
                t += '<span class="group" id="id-34">' + (groupName) + '</span>';
                for (var dictionaryName in dictionaryGroup) {
                    if (dictionaryGroup.hasOwnProperty(dictionaryName)) {
                        var dictionary = dictionaryGroup[dictionaryName];
                        (function (dictionary) {
                            t += '<li id="id-35">';
                            if (dictionaryName !== 'dictionariesList' && dictionaryName !== 'isClass') {
                                t += '<span class="name" id="id-36">' + (dictionaryName) + '</span>';
                                if (dictionary) {
                                    t += '<span class="status ok" id="id-37">' + (spike.core.Message.get('maintenance_dict_status_ok')) + '</span>';
                                } else {
                                    t += '<span class="status error" id="id-38">' + (spike.core.Message.get('maintenance_dict_status_not_loaded')) + '</span>';
                                }
                            }
                            t += '</li>';
                        }(dictionary));
                    }
                }
                t += '</ul>';
            }(dictionaryGroup));
        }
    }
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_table_tablePagination_html'] = function (scope) {
    var t = '';
    t += '<div class=\"tableListPagination\" id=\"id-39\"><\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_controls_controller_controls_controls_html'] = function (scope) {
    var t = '';
    t += '<div class=\"controlsController\" id=\"id-40\">';
    t += '<div class=\"row\" id=\"id-41\">';
    t += '<div class=\"controlsSidebar col-xs-3\" id=\"id-42\">';
    t += '<div class=\"controlsListName\" id=\"id-43\">';
    t += 'List of layout elements';
    t += '<\/div>';
    t += '<ul class=\"controlsMenu\" id=\"id-44\">';
    t += '<li href=\"#alertsControl\" id=\"id-45\">Alerts<\/li>';
    t += '<li href=\"buttons\" id=\"id-46\">Buttons<\/li>';
    t += '<li href=\"dropdowns\" id=\"id-47\">Dropdowns<\/li>';
    t += '<li href=\"forms\" id=\"id-48\">Forms<\/li>';
    t += '<li href=\"labels\" id=\"id-49\">Labels<\/li>';
    t += '<li href=\"#links\" id=\"id-50\">Links<\/li>';
    t += '<\/ul>';
    t += '<\/div>';
    t += '<div class=\"controlsContent col-xs-9\" id=\"id-51\">';
    t += '<div class=\"row\" id=\"id-52\">';
    t += '<div class=\"col-xs-12 singleControl alertsControl\" style=\"display: none;\" id=\"id-53\">';
    t += '<div class=\"controlTitle\" id=\"id-54\">';
    t += 'Alerts';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-55\"> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages. <\/p>';
    t += '<div class=\"controlContent\" id=\"id-56\">';
    t += '<div class=\"controlSubtitle\" id=\"id-57\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-58\"> Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the eight required contextual classes. <\/p>';
    t += '<div class=\"controlExample\" id=\"id-59\">';
    t += '<div class=\"alert alert-primary\" id=\"id-60\">';
    t += 'This is a primary alert with&nbsp;';
    t += '<a href=\"#\" class=\"alert-link\" id=\"id-61\">an example link<\/a>. Give it a click if you like.';
    t += '<\/div>';
    t += '<div class=\"alert alert-secondary\" id=\"id-62\">';
    t += 'This is a secondary alert with&nbsp;';
    t += '<a href=\"#\" class=\"alert-link\" id=\"id-63\">an example link<\/a>. Give it a click if you like.';
    t += '<\/div>';
    t += '<div class=\"alert alert-success\" id=\"id-64\">';
    t += 'This is a success alert with&nbsp;';
    t += '<a href=\"#\" class=\"alert-link\" id=\"id-65\">an example link<\/a>. Give it a click if you like.';
    t += '<\/div>';
    t += '<div class=\"alert alert-danger\" id=\"id-66\">';
    t += 'This is a danger alert with&nbsp;';
    t += '<a href=\"#\" class=\"alert-link\" id=\"id-67\">an example link<\/a>. Give it a click if you like.';
    t += '<\/div>';
    t += '<div class=\"alert alert-warning\" id=\"id-68\">';
    t += 'This is a warning alert with&nbsp;';
    t += '<a href=\"#\" class=\"alert-link\" id=\"id-69\">an example link<\/a>. Give it a click if you like.';
    t += '<\/div>';
    t += '<div class=\"alert alert-info\" id=\"id-70\">';
    t += 'This is a info alert with&nbsp;';
    t += '<a href=\"#\" class=\"alert-link\" id=\"id-71\">an example link<\/a>. Give it a click if you like.';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-72\">';
    t += '<pre id=\"id-73\">';
    t += '<code class=\"language-markup\" id=\"id-74\">';
    t += '<script type=\"prism-html-markup\" id=\"id-75\">';
    t += '<div>ok<\/div>';
    t += '<\/script>';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<i class=\"ion ion-ios-close\" style=\"font-size: 2rem;\" id=\"id-76\"><\/i>';
    t += '<i class=\"fa fa-3x fa-edit\" id=\"id-77\"><\/i>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 singleControl buttonsControl\" style=\"display: none;\" id=\"id-78\">';
    t += '<div class=\"controlTitle\" id=\"id-79\">';
    t += 'Buttons';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-80\"> Use AdminConsole\'s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more . <\/p>';
    t += '<div class=\"controlContent\" id=\"id-81\">';
    t += '<div class=\"controlSubtitle\" id=\"id-82\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-83\"> AdminConsole includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control. <\/p>';
    t += '<div class=\"controlExample\" id=\"id-84\">';
    t += '<button type=\"button\" class=\"btn btn-primary\" id=\"id-85\">Primary<\/button>';
    t += '<button type=\"button\" class=\"btn btn-secondary\" id=\"id-86\">Secondary<\/button>';
    t += '<button type=\"button\" class=\"btn btn-success\" id=\"id-87\">Success<\/button>';
    t += '<button type=\"button\" class=\"btn btn-danger\" id=\"id-88\">Danger<\/button>';
    t += '<button type=\"button\" class=\"btn btn-warning\" id=\"id-89\">Warning<\/button>';
    t += '<button type=\"button\" class=\"btn btn-info\" id=\"id-90\">Info<\/button>';
    t += '<button type=\"button\" class=\"btn btn-light\" id=\"id-91\">Light<\/button>';
    t += '<button type=\"button\" class=\"btn btn-dark\" id=\"id-92\">Dark<\/button>';
    t += '<button type=\"button\" class=\"btn btn-link\" id=\"id-93\">Link<\/button>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-94\">';
    t += '<pre id=\"id-95\">';
    t += '<code class=\"language-markup\" id=\"id-96\">';
    t += '<script type=\"prism-html-markup\" id=\"id-97\">';
    t += '<div>ok<\/div>';
    t += '<\/script>';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<div class=\"controlSubtitle\" id=\"id-98\">';
    t += 'Button tags';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-99\"><\/p>';
    t += '<div class=\"controlExample\" id=\"id-100\">';
    t += '<a class=\"btn btn-primary\" href=\"#\" role=\"button\" id=\"id-101\">Link<\/a>';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-102\">Button<\/button>';
    t += '<input class=\"btn btn-primary\" type=\"button\" value=\"Input\" id=\"id-103\">';
    t += '<input class=\"btn btn-primary\" type=\"submit\" value=\"Submit\" id=\"id-104\">';
    t += '<input class=\"btn btn-primary\" type=\"reset\" value=\"Reset\" id=\"id-105\">';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-106\">';
    t += '<pre id=\"id-107\">';
    t += '<code class=\"language-html\" data-lang=\"html\" id=\"id-108\">';
    t += '[Miejsce na kod]';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 singleControl formsControl\" style=\"display: none;\" id=\"id-109\">';
    t += '<div class=\"controlTitle\" id=\"id-110\">';
    t += 'Forms';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-111\"> Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms. <\/p>';
    t += '<div class=\"controlContent\" id=\"id-112\">';
    t += '<div class=\"controlSubtitle\" id=\"id-113\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-114\"> co\u015B <\/p>';
    t += '<div class=\"controlExample\" id=\"id-115\">';
    t += '<form id=\"id-116\">';
    t += '<div class=\"form-group\" id=\"id-117\">';
    t += '<label for=\"exampleFormControlInput1\" id=\"id-118\">Example input<\/label>';
    t += '<input type=\"email\" class=\"form-control\" id=\"exampleFormControlInput1\" placeholder=\"name@example.com\">';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-119\">';
    t += '<label for=\"exampleFormControlSelect1\" id=\"id-120\">Example select<\/label>';
    t += '<select class=\"form-control\" id=\"exampleFormControlSelect1\"> <option id=\"id-121\">1<\/option> <option id=\"id-122\">2<\/option> <option id=\"id-123\">3<\/option> <option id=\"id-124\">4<\/option> <option id=\"id-125\">5<\/option> <\/select>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-126\">';
    t += '<label for=\"exampleFormControlSelect2\" id=\"id-127\">Example multiple select<\/label>';
    t += '<select multiple class=\"form-control\" id=\"exampleFormControlSelect2\"> <option id=\"id-128\">1<\/option> <option id=\"id-129\">2<\/option> <option id=\"id-130\">3<\/option> <option id=\"id-131\">4<\/option> <option id=\"id-132\">5<\/option> <\/select>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-133\">';
    t += '<label for=\"exampleFormControlTextarea1\" id=\"id-134\">Example textarea<\/label>';
    t += '<textarea class=\"form-control\" id=\"exampleFormControlTextarea1\" rows=\"3\"><\/textarea>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-135\">';
    t += '<label for=\"exampleFormControlTextarea1\" id=\"id-136\">Example textarea<\/label>';
    t += '<textarea class=\"form-control\" id=\"exampleFormControlTextarea1\" rows=\"3\"><\/textarea>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-137\">';
    t += '<pre id=\"id-138\">';
    t += '<code class=\"language-html\" data-lang=\"html\" id=\"id-139\">';
    t += '[Miejsce na kod]';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 singleControl paginationControl\" style=\"display: none;\" id=\"id-140\">';
    t += '<div class=\"controlTitle\" id=\"id-141\">';
    t += 'Pagination';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-142\"> Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages. <\/p>';
    t += '<div class=\"controlContent\" id=\"id-143\">';
    t += '<div class=\"controlSubtitle\" id=\"id-144\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-145\"> We use a large block of connected links for our pagination, making links hard to miss and easily scalable-all while providing large hit areas. <\/p>';
    t += '<div class=\"controlExample\" id=\"id-146\">';
    t += '<nav class=\"pagination\" aria-label=\" Page navigation example\" id=\"id-147\">';
    t += '<ul class=\"pagination\" id=\"id-148\">';
    t += '<li class=\"page-item\" id=\"id-149\"> <a class=\"page-link page-prev\" href=\"#\" id=\"id-150\"><\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-151\"> <a class=\"page-link\" href=\"#\" id=\"id-152\">1<\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-153\"> <a class=\"page-link\" href=\"#\" id=\"id-154\">2<\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-155\"> <a class=\"page-link\" href=\"#\" id=\"id-156\">3<\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-157\"> <a class=\"page-link page-next\" href=\"#\" id=\"id-158\"><\/a> <\/li>';
    t += '<\/ul>';
    t += '<\/nav>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-159\">';
    t += '<pre id=\"id-160\">';
    t += '<code class=\"language-html\" data-lang=\"html\" id=\"id-161\">';
    t += '[Miejsce na kod]';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<div class=\"controlSubtitle\" id=\"id-162\">';
    t += 'Disabled and active states';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-163\"> Pagination links are customizable for different circumstances. Use .disabled for links that appear un-clickable and .active to indicate the current page. <\/p>';
    t += '<div class=\"controlExample\" id=\"id-164\">';
    t += '<nav class=\"pagination\" aria-label=\" Page navigation example\" id=\"id-165\">';
    t += '<ul class=\"pagination\" id=\"id-166\">';
    t += '<li class=\"page-item disabled\" id=\"id-167\"> <a class=\"page-link page-prev\" href=\"#\" id=\"id-168\"><\/a> <\/li>';
    t += '<li class=\"page-item active\" id=\"id-169\"> <a class=\"page-link\" href=\"#\" id=\"id-170\">1<\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-171\"> <a class=\"page-link\" href=\"#\" id=\"id-172\">2<\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-173\"> <a class=\"page-link\" href=\"#\" id=\"id-174\">3<\/a> <\/li>';
    t += '<li class=\"page-item\" id=\"id-175\"> <a class=\"page-link page-next\" href=\"#\" id=\"id-176\"><\/a> <\/li>';
    t += '<\/ul>';
    t += '<\/nav>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-177\">';
    t += '<pre id=\"id-178\">';
    t += '<code class=\"language-html\" data-lang=\"html\" id=\"id-179\">';
    t += '[Miejsce na kod]';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 singleControl containersControl\" style=\"display: none;\" id=\"id-180\">';
    t += '<div class=\"controlTitle\" id=\"id-181\">';
    t += 'Containers';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-182\"> Examples <\/p>';
    t += '<div class=\"controlContent\" id=\"id-183\">';
    t += '<div class=\"controlSubtitle\" id=\"id-184\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-185\"> Podtsawowy z niebieska ramka <\/p>';
    t += '<div class=\"controlExample\" id=\"id-186\">';
    t += '<div class=\"box box-primary\" id=\"id-187\">';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-188\">';
    t += '<pre id=\"id-189\">';
    t += '<code class=\"language-html\" data-lang=\"html\" id=\"id-190\">';
    t += '[Miejsce na kod]';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 singleControl tablesControl\" style=\"display: none;\" id=\"id-191\">';
    t += '<div class=\"controlTitle\" id=\"id-192\">';
    t += 'Tables';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-193\">Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms.<\/p>';
    t += '<div class=\"controlContent\" id=\"id-194\">';
    t += '<div class=\"controlSubtitle\" id=\"id-195\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-196\"> <\/p>';
    t += '<div class=\"controlExample\" id=\"id-197\">';
    t += '<div class=\"tableCommonElement\" id=\"id-198\">';
    t += '<div id=\"tableHeader\">';
    t += '<div class=\"tableHeaderTemplate\" id=\"id-199\">';
    t += '<div class=\"table-row\" id=\"id-200\">';
    t += '<div class=\"table-header\" style=\"width: 20%\" id=\"id-201\">';
    t += 'Header';
    t += '<\/div>';
    t += '<div class=\"table-header unset\" style=\"width: 20%\" id=\"id-202\">';
    t += 'Header with';
    t += '<a href=\"#\" id=\"id-203\">link<\/a>';
    t += '<\/div>';
    t += '<div class=\"table-header flex-left\" style=\"width: 20%\" id=\"id-204\">';
    t += 'Header align left';
    t += '<\/div>';
    t += '<div class=\"table-header flex-right\" style=\"width: 20%\" id=\"id-205\">';
    t += 'Header align right';
    t += '<\/div>';
    t += '<div class=\"table-header overflow\" style=\"width: 20%\" id=\"id-206\">';
    t += 'Header with super extra long text with hidden overflow';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div id=\"tableList\">';
    t += '<div class=\"tableListTemplate\" id=\"id-207\">';
    t += '<div class=\"table-row\" id=\"id-208\">';
    t += '<div class=\"table-column\" style=\"width: 20%\" id=\"id-209\">';
    t += '1';
    t += '<\/div>';
    t += '<div class=\"table-column unset\" style=\"width: 20%\" id=\"id-210\">';
    t += 'random text';
    t += '<a href=\"#\" id=\"id-211\">link<\/a>';
    t += '<\/div>';
    t += '<div class=\"table-column flex-left\" style=\"width: 20%\" id=\"id-212\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column flex-right\" style=\"width: 20%\" id=\"id-213\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column overflow\" style=\"width: 20%\" id=\"id-214\">';
    t += 'super extra long random text with hidden overflow';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"table-row\" id=\"id-215\">';
    t += '<div class=\"table-column\" style=\"width: 20%\" id=\"id-216\">';
    t += '2';
    t += '<\/div>';
    t += '<div class=\"table-column unset\" style=\"width: 20%\" id=\"id-217\">';
    t += 'random text';
    t += '<button class=\"btn btn-primary btn-sm\" id=\"id-218\">buttons<\/button>';
    t += '<\/div>';
    t += '<div class=\"table-column flex-left\" style=\"width: 20%\" id=\"id-219\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column flex-right\" style=\"width: 20%\" id=\"id-220\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column overflow\" style=\"width: 20%\" id=\"id-221\">';
    t += 'super extra long random text with hidden overflow';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"table-row\" id=\"id-222\">';
    t += '<div class=\"table-column\" style=\"width: 20%\" id=\"id-223\">';
    t += '3';
    t += '<\/div>';
    t += '<div class=\"table-column unset\" style=\"width: 20%\" id=\"id-224\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column flex-left\" style=\"width: 20%\" id=\"id-225\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column flex-right\" style=\"width: 20%\" id=\"id-226\">';
    t += 'random text';
    t += '<\/div>';
    t += '<div class=\"table-column overflow\" style=\"width: 20%\" id=\"id-227\">';
    t += 'super extra long random text with hidden overflow';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div id=\"tablePagination\">';
    t += '<div class=\"tableListPagination\" id=\"id-228\"><\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-229\">';
    t += '<div class=\"controlSubtitle\" id=\"id-230\">';
    t += 'Code';
    t += '<\/div>';
    t += '<pre id=\"id-231\">';
    t += '<code class=\"language-markup\" id=\"id-232\">';
    t += '<script type=\"prism-html-markup\" id=\"id-233\">';
    t += '<div class=\"tableCommonElement\">';
    t += '<div id=\"tableHeader\">';
    t += '<div class=\"tableHeaderTemplate\">';
    t += '<div class=\"table-row\">';
    t += '<div class=\"table-header\" style=\"width: 20%\">Header<\/div>';
    t += '<div class=\"table-header unset\" style=\"width: 20%\">Header with <a href=\"#\">link<\/a><\/div>';
    t += '<div class=\"table-header flex-left\" style=\"width: 20%\">Header align left<\/div>';
    t += '<div class=\"table-header flex-right\" style=\"width: 20%\">Header align right<\/div>';
    t += '<div class=\"table-header overflow\" style=\"width: 20%\">Header with super extra long text with hidden overflow<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div id=\"tableList\">';
    t += '<div class=\"tableListTemplate\">';
    t += '<div class=\"table-row\">';
    t += '<div class=\"table-column\" style=\"width: 20%\">1<\/div>';
    t += '<div class=\"table-column unset\" style=\"width: 20%\">random text <a href=\"#\">link<\/a><\/div>';
    t += '<div class=\"table-column flex-left\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column flex-right\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column overflow\" style=\"width: 20%\">super extra long random text with hidden overflow<\/div>';
    t += '<\/div>';
    t += '<div class=\"table-row\">';
    t += '<div class=\"table-column\" style=\"width: 20%\">2<\/div>';
    t += '<div class=\"table-column unset\" style=\"width: 20%\">random text <button class=\"btn btn-primary btn-sm\">buttons<\/button><\/div>';
    t += '<div class=\"table-column flex-left\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column flex-right\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column overflow\" style=\"width: 20%\">super extra long random text with hidden overflow<\/div>';
    t += '<\/div>';
    t += '<div class=\"table-row\">';
    t += '<div class=\"table-column\" style=\"width: 20%\">3<\/div>';
    t += '<div class=\"table-column unset\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column flex-left\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column flex-right\" style=\"width: 20%\">random text<\/div>';
    t += '<div class=\"table-column overflow\" style=\"width: 20%\">super extra long random text with hidden overflow<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div id=\"tablePagination\">';
    t += '<div class=\"tableListPagination\"><\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/script>';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 singleControl modalsControl\" id=\"id-234\">';
    t += '<div class=\"controlTitle\" id=\"id-235\">';
    t += 'Modals';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-236\"> <\/p>';
    t += '<div class=\"controlContent\" id=\"id-237\">';
    t += '<div class=\"controlSubtitle\" id=\"id-238\">';
    t += 'Examples';
    t += '<\/div>';
    t += '<p class=\"controlDescription\" id=\"id-239\"> <\/p>';
    t += '<div class=\"controlExample\" id=\"id-240\">';
    t += '<\/div>';
    t += '<div class=\"controlHighlight\" id=\"id-241\">';
    t += '<div class=\"controlSubtitle\" id=\"id-242\">';
    t += 'Code';
    t += '<\/div>';
    t += '<pre id=\"id-243\">';
    t += '<code class=\"language-markup\" id=\"id-244\">';
    t += '<script type=\"prism-html-markup\" id=\"id-245\">';
    t += '<\/script>';
    t += '<\/code>';
    t += '<\/pre>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_controller_privileges_privileges_html'] = function (scope) {
    var t = '';
    t += '<div class=\"privilegesController\" id=\"id-246\">';
    t += '<div class=\"dark\" style=\"display: none;\" id=\"id-247\">';
    t += '<div class=\"modal modal-large\" id=\"id-248\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-249\">';
    t += 'Add role';
    t += '<\/div>';
    t += '<div class=\"modal-aside col-xs-3\" id=\"id-250\">';
    t += '<div class=\"modal-aside-content row\" id=\"id-251\">';
    t += '<div class=\"modal-headline\" id=\"id-252\">';
    t += 'Roles:';
    t += '<\/div>';
    t += '<form id=\"id-253\">';
    t += '<div class=\"form-group\" id=\"id-254\">';
    t += '<input id=\"role-sbadmin\" name=\"role-sbadmin\" class=\"form-control\" type=\"radio\" hidden sp-name=\"role-sbadmin\">';
    t += '<label for=\"role-sbadmin\" id=\"id-255\">SB Admin<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-256\">';
    t += '<input id=\"role-superadmin\" name=\"role-sbadmin\" class=\"form-control\" type=\"radio\" hidden sp-name=\"role-sbadmin\">';
    t += '<label for=\"role-superadmin\" id=\"id-257\">Super admin<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-258\">';
    t += '<input id=\"role-menager\" name=\"role-menager\" class=\"hidden\" type=\"radio\" sp-name=\"role-menager\">';
    t += '<label for=\"role-menager\" id=\"id-259\">Menager<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-260\">';
    t += '<input id=\"role-editor\" name=\"role-editor\" class=\"hidden\" type=\"radio\" sp-name=\"role-editor\">';
    t += '<label for=\"role-editor\" id=\"id-261\">Editor<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-262\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-263\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-264\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-265\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-266\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-267\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-268\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-269\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-270\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-271\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-272\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-273\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-274\">';
    t += '<button id=\"role-addnew\" type=\"button\" class=\"btn btn-primary btn-block\">Add role<\/button>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"modal-content col-xs-9\" id=\"id-275\">';
    t += '<form id=\"id-276\">';
    t += '<div class=\"col-xs-12\" id=\"id-277\">';
    t += '<div class=\"modal-content-headline\" id=\"id-278\">';
    t += 'Role name';
    t += '<\/div>';
    t += '<div class=\"row\" id=\"id-279\">';
    t += '<div class=\"col-xs-6\" id=\"id-280\">';
    t += '<div class=\"form-group\" id=\"id-281\">';
    t += '<input type=\"text\" class=\"form-control input-block\" id=\"x\" value=\"Admin2\">';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-282\">';
    t += '<label class=\"btn btn-primary\" for=\"copy-privilages-from\" id=\"id-283\">copy privilages from<\/label>';
    t += '<select class=\"form-control\" id=\"copy-privilages-from\"> <option id=\"id-284\">1<\/option> <option id=\"id-285\">2<\/option> <option id=\"id-286\">3<\/option> <option id=\"id-287\">4<\/option> <option id=\"id-288\">5<\/option> <\/select>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-289\">';
    t += '<div class=\"block\" id=\"id-290\">';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-291\">Genaral Excludes<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-292\">';
    t += '<div class=\"row\" id=\"id-293\">';
    t += '<div class=\"col-xs-6\" id=\"id-294\">';
    t += '<div class=\"modal-content-headline\" id=\"id-295\">';
    t += 'Users in role';
    t += '<\/div>';
    t += '<div class=\"box box-small\" id=\"id-296\">';
    t += '<div class=\"box-header\" id=\"id-297\">';
    t += 'Users in role';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-298\">';
    t += '<div class=\"modal-content-headline\" id=\"id-299\">';
    t += 'Search user';
    t += '<\/div>';
    t += '<div class=\"box box-small\" id=\"id-300\">';
    t += '<div class=\"box-header\" id=\"id-301\">';
    t += 'Name';
    t += '<\/div> [text]';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-302\">';
    t += '[text]';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<br id=\"id-303\">';
    t += '<br id=\"id-304\">';
    t += '<br id=\"id-305\">';
    t += '<br id=\"id-306\">';
    t += '<div class=\"modal modal-small\" id=\"id-307\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-308\">';
    t += 'Page priviliges';
    t += '<\/div>';
    t += '<div class=\"modal-aside col-xs-4\" id=\"id-309\">';
    t += '<div class=\"modal-aside-content row\" id=\"id-310\">';
    t += '<div class=\"modal-headline\" id=\"id-311\">';
    t += 'Have permissions:';
    t += '<\/div>';
    t += '<form id=\"id-312\">';
    t += '<div class=\"form-group\" id=\"id-313\">';
    t += '<input id=\"permissions-menager\" name=\"permissions-menager\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-menager\">';
    t += '<label for=\"permissions-menager\" id=\"id-314\">Menager<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-315\">';
    t += '<input id=\"permissions-editor\" name=\"permissions-editor\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-editor\">';
    t += '<label for=\"permissions-editor\" id=\"id-316\">Editor<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-317\">';
    t += '<input id=\"permissions-customname\" name=\"permissions-customname\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-customname\">';
    t += '<label for=\"permissions-customname\" id=\"id-318\">Custom name<\/label>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"modal-content col-xs-8\" id=\"id-319\">';
    t += '<div class=\"box box-small\" id=\"id-320\">';
    t += '<form id=\"id-321\">';
    t += '<div class=\"row box-toolbar\" id=\"id-322\">';
    t += '<div class=\"col-xs-6\" id=\"id-323\">';
    t += '<div class=\"form-group\" id=\"id-324\">';
    t += '<label for=\"search-by-name\" id=\"id-325\">Search by name<\/label>';
    t += '<div class=\"form-group\" id=\"id-326\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-name\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-327\"><i class=\"fa fa-search\" id=\"id-328\"><\/i><\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-329\">';
    t += '<div class=\"form-group\" id=\"id-330\">';
    t += '<label for=\"search-by-id\" id=\"id-331\">Search by ID<\/label>';
    t += '<div class=\"form-group\" id=\"id-332\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-id\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-333\"> <i class=\"fa fa-search\" id=\"id-334\"><\/i> <\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-header\" id=\"id-335\">';
    t += '<div class=\"col-xs-6 text-xs-left\" id=\"id-336\">';
    t += '<div class=\"block\" id=\"id-337\">';
    t += 'Name';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-338\">';
    t += '<div class=\"block\" id=\"id-339\">';
    t += 'ID';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<ul class=\"search-users-list\" id=\"id-340\">';
    t += '<li id=\"id-341\"><label for=\"search-user-id1\" id=\"id-342\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-343\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-344\">10<\/span> <\/label> <\/li>';
    t += '<li id=\"id-345\"><label for=\"search-user-id2\" id=\"id-346\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-347\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-348\">20<\/span> <\/label> <\/li>';
    t += '<li id=\"id-349\"><label for=\"search-user-id3\" id=\"id-350\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-351\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-352\">30<\/span> <\/label> <\/li>';
    t += '<li id=\"id-353\"><label for=\"search-user-id4\" id=\"id-354\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-355\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-356\">40<\/span> <\/label> <\/li>';
    t += '<li id=\"id-357\"><label for=\"search-user-id5\" id=\"id-358\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-359\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-360\">50<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<br id=\"id-361\">';
    t += '<br id=\"id-362\">';
    t += '<br id=\"id-363\">';
    t += '<br id=\"id-364\">';
    t += '<\/div>';
    t += '<div class=\"box box-primary\" id=\"id-365\">';
    t += '<div class=\"box-header col-xs-12 between-xs\" id=\"id-366\">';
    t += '<div class=\"block\" id=\"id-367\">';
    t += 'Hi';
    t += '<span class=\"username highlight\" id=\"id-368\">UserName<\/span> your role is';
    t += '<span class=\"userrole highlight\" id=\"id-369\">SB Admin<\/span>';
    t += '<\/div>';
    t += '<div class="block" id="id-370">';

    function closure8(event) {
        scope.openRoleEditor()
    };var linkId = spike.core.Events.linkEvent(closure8);
    t += '<button type=\"button\" class=\"btn btn-primary\" id=\"id-371\" spike-unbinded=\"\" spike-event-click=\"scope.openRoleEditor()\" spike-event-click-link=\"' + (linkId) + '\">Role editor<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-aside col-xs-2\" id=\"id-372\">';
    t += '<div class=\"box-headline row\" id=\"id-373\">';
    t += 'Admin Roles';
    t += '<\/div>';
    t += '<div class=\"box-aside-content row\" id=\"id-374\">';
    t += '<form id="id-375">';
    t += '' + (scope.addTriggerTemplate('app.module.privileges.rolesList', 'rolesList', 'rolesList100005')) + '';
    t += '<div id=\"rolesList100005\" class=\"\"><\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-content col-xs-10\" id=\"viewsContent\" style=\"visibility: hidden\">';
    t += '<form id="id-376">';
    t += '' + (scope.addTriggerTemplate('$viewsList', 'viewsList', 'viewsList100006')) + '';
    t += '<div id=\"viewsList100006\" class=\"\"><\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_element_filter_custom_filter_html'] = function (scope) {
    var t = '';
    t += '<div class=\"filterElement\" id=\"id-377\">';
    t += '<div class=\"view-types col-xs-12\" id=\"id-378\">';
    t += '<div class=\"template-name\" id=\"id-379\">';
    t += 'Template name';
    t += '<\/div>';
    t += '<select class=\"form-control\" onchange=\"$customPages.actionChangeView(this)\" id=\"id-380\"> <\/select>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_element_filter_news_filter_html'] = function (scope) {
    var t = '';
    t += '<div class=\"filterElement\" id=\"id-381\">';
    t += '<div class=\"view-types col-xs-12\" id=\"id-382\">';
    t += '<div class=\"template-name\" id=\"id-383\">';
    t += 'Template name';
    t += '<\/div>';
    t += '<select class=\"form-control\" onchange=\"$customPages.actionChangeView(this)\" id=\"id-384\"> <\/select>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_footer_footer_html'] = function (scope) {
    var t = '';
    t += '<div class=\"footerGlobalElement\" id=\"id-385\">';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_table_tableHeader_html'] = function (scope) {
    var t = '';
    t += '<div class=\"tableHeaderTemplate\" id=\"id-386\">';
    t += '<div class="table-row" id="id-387">';
    for (var optionKey in scope.options.columns) {
        if (scope.options.columns.hasOwnProperty(optionKey)) {
            var option = scope.options.columns[optionKey];
            (function (option) {
                t += '<div class=\"table-header ' + (option.clazz) + '\" style=\"width: ' + (option.width) + '%\" id=\"id-388\">';
                t += '<span id="id-389">' + (option.header) + '</span>';
                if (option.sort) {
                    function closure9(event) {
                        scope.sortEvent(this, option)
                    };var linkId = spike.core.Events.linkEvent(closure9);
                    t += '<i id="id-390" spike-unbinded="" spike-event-click="scope.sortEvent(this, option)" spike-event-click-link="' + (linkId) + '"></i>';
                }
                t += '<\/div>';
            }(option));
        }
    }
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_pageNotFound_controller_pageNotFound_pageNotFound_html'] = function (scope) {
    var t = '';
    t += '<div class=\"pageNotFoundController\" id=\"id-391\">';
    t += '<h1 id=\"id-392\">Not found<\/h1>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_element_properties_properties_html'] = function (scope) {
    var t = '';
    t += '<div class=\"propertiesElement\" id=\"id-393\">';
    t += '<div class=\"properties-wrapper\" id=\"id-394\">';
    t += '<div class=\"title\" id=\"id-395\">';
    t += 'Properties';
    t += '<\/div>';
    t += '<div class=\"properties-container col-all-12\" id=\"id-396\">';
    t += '<div class=\"col-xs-12\" id=\"id-397\">';
    t += '<label class=\"for-label\" id=\"id-398\">Page title<\/label>';
    t += '<input type=\"text\" value=\"\" class=\"form-control\" id=\"id-399\">';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-400\">';
    t += '<label class=\"for-label date-picker\" id=\"id-401\">Visibility range <label class=\"for-label small\" id=\"id-402\">';
    t += '<div class=\"date-label\" id=\"id-403\">';
    t += 'From';
    t += '<\/div> <input type=\"date\" class=\"form-control\" value=\"\" id=\"id-404\"> <\/label> <label class=\"for-label small\" id=\"id-405\">';
    t += '<div class=\"date-label\" id=\"id-406\">';
    t += 'To';
    t += '<\/div> <input type=\"date\" class=\"form-control\" value=\"\" id=\"id-407\"> <\/label> <\/label>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-408\">';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-409\">Draft<\/button>';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-410\">Publish<\/button>';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-411\">Preview<\/button>';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-412\">Delete<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"properties-wrapper\" id=\"id-413\">';
    t += '<div class=\"title\" id=\"id-414\">';
    t += 'SEO';
    t += '<\/div>';
    t += '<div class=\"properties-container col-xs-12\" id=\"id-415\">';
    t += '<div class=\"col-xs-12\" id=\"id-416\">';
    t += '<label class=\"for-label\" id=\"id-417\">Tags<\/label>';
    t += '<input type=\"text\" class=\"form-control\" id=\"id-418\">';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-419\">';
    t += '<label class=\"for-label\" id=\"id-420\">Meta description<\/label>';
    t += '<textarea class=\"form-control\" id=\"id-421\"><\/textarea>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"properties-wrapper\" id=\"id-422\">';
    t += '<div class=\"title\" id=\"id-423\">';
    t += 'Page Tumb Image';
    t += '<\/div>';
    t += '<div class=\"properties-container\" id=\"id-424\">';
    t += '<button class=\"btn btn-primary\" type=\"submit\" id=\"id-425\">Edit<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_menu_menuList_html'] = function (scope) {
    var t = '';
    t += '<div class="menuListTemplate" id="id-426">';
    if (scope.menuTree) {
        for (var index4 = 0; index4 < scope.menuTree.length; index4++) {
            var item = scope.menuTree[index4];
            (function (item) {
                t += '<div class="item" id="id-427">';
                if (item.statMode) {
                } else {
                    t += '<div class=\"item-content\" id=\"id-428\">';
                    t += '<img src=\"' + (item.icon) + '\" id=\"id-429\">';
                    t += '<span id=\"id-430\">' + (item.label) + '<\/span>';
                    t += '</div>';
                    if (item.sublist) {
                        t += '<div class="submenu" id="id-431">';
                        for (var index5 = 0; index5 < item.sublist.length; index5++) {
                            var subitem = item.sublist[index5];
                            (function (subitem) {
                                t += '<div class=\"subitem\" id=\"id-432\">';
                                t += '<div class=\"item-content\" id=\"id-433\">';
                                t += '<img src=\"' + (subitem.icon) + '\" id=\"id-434\">';
                                t += '<span id=\"id-435\">' + (subitem.label) + '<\/span>';
                                t += '</div>';
                                if (subitem.sublist) {
                                    t += '<div class="submenu2" id="id-436">';
                                    for (var index6 = 0; index6 < subitem.sublist.length; index6++) {
                                        var subitem2 = subitem.sublist[index6];
                                        (function (subitem2) {
                                            t += '<div class=\"subitem2\" id=\"id-437\">';
                                            t += '<div class=\"item-content\" id=\"id-438\">';
                                            t += '<img src=\"' + (subitem2.icon) + '\" id=\"id-439\">';
                                            t += '<span id=\"id-440\">' + (subitem2.label) + '<\/span>';
                                            t += '<\/div>';
                                            t += '</div>';
                                        }(subitem2));
                                    }
                                    t += '</div>';
                                }
                                t += '</div>';
                            }(subitem));
                        }
                        t += '</div>';
                    }
                }
                t += '</div>';
            }(item));
        }
    }
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_controller_table_table_html'] = function (scope) {
    var t = '';
    t += '<div class=\"tableController\" id=\"id-441\">';
    t += '<div id="tableReady0" class=""></div>';
    t += '' + (scope.addTriggerElement('app.module.common.element.table.Table', 'tableReady', 'tableReady0')) + '';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_controller_news_news_html'] = function (scope) {
    var t = '';
    t += '<div class="newsController" id="id-442">';
    t += '' + (scope.include(new app.module.cms.element.filter.news.Filter(scope, {}))) + '';
    t += '' + (scope.include(new app.module.cms.element.edit.Edit(scope, {}))) + '';
    t += '' + (scope.include(new app.module.cms.element.modify.Modify(scope, {}))) + '';
    t += '' + (scope.include(new app.module.cms.element.properties.Properties(scope, {}))) + '';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_element_modify_modify_html'] = function (scope) {
    var t = '';
    t += '<div class=\"modifyElement\" id=\"id-443\">';
    t += '<div id=\"CodeMirror\" class=\"col-all-12\"><\/div>';
    t += '<div class=\"col-all-12\" id=\"id-444\">';
    t += '<div class=\"btn-group\" id=\"id-445\">';
    t += '<button class=\"btn btn-primary\" onclick=\"$customPages.actionDeleteTemplate()\" id=\"id-446\">Delete<\/button>';
    t += '<button class=\"btn btn-primary\" onclick=\"$customPages.renderSaveCustomTemplate()\" id=\"id-447\">Save as custom<\/button>';
    t += '<button class=\"btn btn-primary\" onclick=\"$customPages.actionUpdateCustomTemplate()\" id=\"id-448\">Update<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_rolesList_html'] = function (scope) {
    var t = '';

    function closure10(event) {
        scope.selectRole(role)
    };var linkId = spike.core.Events.linkEvent(closure10);
    for (var index7 = 0; index7 < scope.roles.length; index7++) {
        var role = scope.roles[index7];
        (function (role) {
            t += '<div class=\"form-group\" id=\"id-449\" spike-unbinded=\"\" spike-event-click=\"scope.selectRole(role)\" spike-event-click-link=\"' + (linkId) + '\">';
            t += '<input id=\"role-' + (role.id) + '\" sp-keep-id name=\"role-' + (role.id) + '\" class=\"form-control\" type=\"radio\" hidden sp-name=\"role-' + (role.id) + '\">';
            t += '<label for=\"role-' + (role.id) + '\" id=\"id-450\">' + (role.name) + '<\/label>';
            t += '</div>';
        }(role));
    }
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_modal_addRole_addRole_html'] = function (scope) {
    var t = '';
    t += '<div class=\"addRoleModal modal modal-large\" id=\"id-451\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-452\">';
    t += 'Add role';
    t += '<\/div>';
    t += '<div class=\"modal-aside col-xs-3\" id=\"id-453\">';
    t += '<div class=\"modal-aside-content row\" id=\"id-454\">';
    t += '<div class=\"modal-headline\" id=\"id-455\">';
    t += 'Roles:';
    t += '<\/div>';
    t += '<form id="id-456">';
    t += '' + (scope.addTriggerTemplate('app.module.privileges..rolesList', 'rolesList', 'rolesList100007')) + '';
    t += '<div id=\"rolesList100007\" class=\"\"><\/div>';
    t += '<div class="form-group" id="id-457">';

    function closure11(event) {
        scope.newRoleName = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure11);
    t += '<input type=\"text\" id=\"id-458\" spike-event-keyup=\"scope.newRoleName=event.target.value;\" spike-event-keyup-link=\"' + (linkId) + '\" spike-unbinded=\"\">';
    t += '<button type=\"button\" class=\"btn btn-primary btn-block\" id=\"id-459\">Add role<\/button>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"modal-content col-xs-9\" id=\"modalContent\" style=\"visibility: hidden;\">';
    t += '<form id=\"id-460\">';
    t += '<div class=\"col-xs-12\" id=\"id-461\">';
    t += '<div class=\"modal-content-headline\" id=\"id-462\">';
    t += 'Role name';
    t += '<\/div>';
    t += '<div class=\"row\" id=\"id-463\">';
    t += '<div class=\"col-xs-6\" id=\"id-464\">';
    t += '<div class=\"form-group\" id=\"id-465\">';
    t += '<input type=\"text\" class=\"form-control input-block\" value=\"Admin2\" id=\"id-466\">';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-467\">';
    t += '<label class="btn btn-primary" id="id-468">copy privilages from</label>';
    t += '' + (scope.addTriggerTemplate('app.module.privileges.modal.addRole.rolesSelect', 'rolesSelect', 'rolesSelect100008')) + '';
    t += '<div id=\"rolesSelect100008\" class=\"\"><\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-469\">';
    t += '<div class="block" id="id-470">';

    function closure12(event) {
        scope.openGeneralExcludes()
    };var linkId = spike.core.Events.linkEvent(closure12);
    t += '<button class=\"btn btn-primary\" type=\"button\" id=\"id-471\" spike-unbinded=\"\" spike-event-click=\"scope.openGeneralExcludes()\" spike-event-click-link=\"' + (linkId) + '\">General Excludes<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-472\">';
    t += '<div class=\"row\" id=\"id-473\">';
    t += '<div class=\"col-xs-6\" id=\"id-474\">';
    t += '<div class=\"modal-content-headline\" id=\"id-475\">';
    t += 'Users in role';
    t += '<\/div>';
    t += '<div class=\"box box-small\" id=\"id-476\">';
    t += '<div class=\"box-header\" id=\"id-477\">';
    t += 'Users in role';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-478\">';
    t += '<div class=\"modal-content-headline\" id=\"id-479\">';
    t += 'Search user';
    t += '<\/div>';
    t += '<div class=\"box box-small\" id=\"id-480\">';
    t += '<div class=\"row box-toolbar\" id=\"id-481\">';
    t += '<div class=\"col-xs-6\" id=\"id-482\">';
    t += '<div class=\"form-group\" id=\"id-483\">';
    t += '<label for=\"search-by-name\" id=\"id-484\">Search by name<\/label>';
    t += '<div class=\"form-group\" id=\"id-485\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-name\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-486\"><i class=\"fa fa-search\" id=\"id-487\"><\/i><\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-488\">';
    t += '<div class=\"form-group\" id=\"id-489\">';
    t += '<label for=\"search-by-id\" id=\"id-490\">Search by ID<\/label>';
    t += '<div class=\"form-group\" id=\"id-491\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-id\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-492\"> <i class=\"fa fa-search\" id=\"id-493\"><\/i> <\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-header\" id=\"id-494\">';
    t += '<div class=\"col-xs-6 text-xs-left\" id=\"id-495\">';
    t += '<div class=\"block\" id=\"id-496\">';
    t += 'Name';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-497\">';
    t += '<div class=\"block\" id=\"id-498\">';
    t += 'ID';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<ul class=\"search-users-list\" id=\"id-499\">';
    t += '<li id=\"id-500\"><label for=\"search-user-id1\" id=\"id-501\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-502\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-503\">10<\/span> <\/label> <\/li>';
    t += '<li id=\"id-504\"><label for=\"search-user-id2\" id=\"id-505\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-506\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-507\">20<\/span> <\/label> <\/li>';
    t += '<li id=\"id-508\"><label for=\"search-user-id3\" id=\"id-509\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-510\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-511\">30<\/span> <\/label> <\/li>';
    t += '<li id=\"id-512\"><label for=\"search-user-id4\" id=\"id-513\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-514\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-515\">40<\/span> <\/label> <\/li>';
    t += '<li id=\"id-516\"><label for=\"search-user-id5\" id=\"id-517\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-518\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-519\">50<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<div class=\"col-xs-12\" id=\"id-520\">';
    t += '[text]';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_modal_generalExcludes_generalExcludes_html'] = function (scope) {
    var t = '';
    t += '<div class=\"generalExcludesModal\" id=\"id-521\">';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_common_element_table_tableFilter_html'] = function (scope) {
    var t = '';
    t += '';
    t += '<div class="tableFilterTemplate" sp-watch id="id-522">';
    t += '' + (scope.addTriggerTemplate('Test', 'asdas', 'asdas100009')) + '';
    t += '<div id="asdas100009" class=""></div>';
    for (var index8 = 0; index8 < scope.options.filters.length; index8++) {
        var filter = scope.options.filters[index8];
        (function (filter) {
            switch (filter.type) {
                case 'buttons' :
                    for (var index9 = 0; index9 < filter.buttons.length; index9++) {
                        var button = filter.buttons[index9];
                        (function (button) {
                            function closure13(event) {
                                scope.delegateEvent(button, this)
                            };var linkId = spike.core.Events.linkEvent(closure13);
                            t += '<button class=\"' + (button.clazz) + '\" id=\"id-523\" spike-unbinded=\"\" spike-event-click=\"scope.delegateEvent(button, this)\" spike-event-click-link=\"' + (linkId) + '\">' + (button.label) + '<\/button>';
                        }(button));
                    }
                    break;
                case 'select' :
                    t += '<label id="id-524">' + (filter.label) + '</label>';

                function closure14(event) {
                    scope.delegateEvent(filter, this)
                };var linkId = spike.core.Events.linkEvent(closure14);
                    t += '<select id="id-525" spike-unbinded="" spike-event-change="scope.delegateEvent(filter, this)" spike-event-change-link="' + (linkId) + '">';
                    for (var argumentKey in filter.arguments) {
                        if (filter.arguments.hasOwnProperty(argumentKey)) {
                            var argument = filter.arguments[argumentKey];
                            (function (argument) {
                                t += '<option spike value="' + (argumentKey) + '" id="id-526">' + (argument) + '</option>';
                            }(argument));
                        }
                    }
                    t += '</select>';
                    break;
                case 'checkbox' :
                    t += '<input type=\"checkbox\" id=\"id-527\">';
                    t += '<input id=\"id-528\">';
                    break;
                case 'href' :
                    break;
                case 'filter' :
                    t += '' + (filter.filter(element)) + '';
                    break;
            }
        }(filter));
    }
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_home_controller_home_home_html'] = function (scope) {
    var t = '';
    t += '<div class=\"homeController\" id=\"id-529\">';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_modal_pagePrivileges_pagePrivileges_html'] = function (scope) {
    var t = '';
    t += '<div class=\"pagePrivilegesModal modal modal-small\" id=\"id-530\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-531\">';
    t += 'Page priviliges';
    t += '<\/div>';
    t += '<div class=\"modal-aside col-xs-4\" id=\"id-532\">';
    t += '<div class=\"modal-aside-content row\" id=\"id-533\">';
    t += '<div class=\"modal-headline\" id=\"id-534\">';
    t += 'Have permissions:';
    t += '<\/div>';
    t += '<form id=\"id-535\">';
    t += '<div class=\"form-group\" id=\"id-536\">';
    t += '<input id=\"permissions-menager\" name=\"permissions-menager\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-menager\">';
    t += '<label for=\"permissions-menager\" id=\"id-537\">Menager<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-538\">';
    t += '<input id=\"permissions-editor\" name=\"permissions-editor\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-editor\">';
    t += '<label for=\"permissions-editor\" id=\"id-539\">Editor<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-540\">';
    t += '<input id=\"permissions-customname\" name=\"permissions-customname\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-customname\">';
    t += '<label for=\"permissions-customname\" id=\"id-541\">Custom name<\/label>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"modal-content col-xs-8\" id=\"id-542\">';
    t += '<div class=\"box box-small\" id=\"id-543\">';
    t += '<form id=\"id-544\">';
    t += '<div class=\"row box-toolbar\" id=\"id-545\">';
    t += '<div class=\"col-xs-6\" id=\"id-546\">';
    t += '<div class=\"form-group\" id=\"id-547\">';
    t += '<label for=\"search-by-name\" id=\"id-548\">Search by name<\/label>';
    t += '<div class=\"form-group\" id=\"id-549\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-name\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-550\"><i class=\"fa fa-search\" id=\"id-551\"><\/i><\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-552\">';
    t += '<div class=\"form-group\" id=\"id-553\">';
    t += '<label for=\"search-by-id\" id=\"id-554\">Search by ID<\/label>';
    t += '<div class=\"form-group\" id=\"id-555\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-id\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-556\"> <i class=\"fa fa-search\" id=\"id-557\"><\/i> <\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-header\" id=\"id-558\">';
    t += '<div class=\"col-xs-6 text-xs-left\" id=\"id-559\">';
    t += '<div class=\"block\" id=\"id-560\">';
    t += 'Name';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-561\">';
    t += '<div class=\"block\" id=\"id-562\">';
    t += 'ID';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<ul class=\"search-users-list\" id=\"id-563\">';
    t += '<li id=\"id-564\"><label for=\"search-user-id1\" id=\"id-565\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-566\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-567\">10<\/span> <\/label> <\/li>';
    t += '<li id=\"id-568\"><label for=\"search-user-id2\" id=\"id-569\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-570\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-571\">20<\/span> <\/label> <\/li>';
    t += '<li id=\"id-572\"><label for=\"search-user-id3\" id=\"id-573\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-574\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-575\">30<\/span> <\/label> <\/li>';
    t += '<li id=\"id-576\"><label for=\"search-user-id4\" id=\"id-577\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-578\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-579\">40<\/span> <\/label> <\/li>';
    t += '<li id=\"id-580\"><label for=\"search-user-id5\" id=\"id-581\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-582\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-583\">50<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_cms_element_edit_edit_html'] = function (scope) {
    var t = '';
    t += '<div class=\"editElement\" id=\"id-584\">';
    t += '<div class=\"block col-all-12\" id=\"id-585\">';
    t += '<div class=\"title\" id=\"id-586\">';
    t += '' + (name) + '';
    t += '<\/div>';
    t += '<i class=\"trash pull-right\" id=\"id-587\"><\/i>';
    t += '<\/div>';
    t += '<div class=\"no-result col-all-12\" id=\"id-588\">';
    t += 'NO COMPONENTS ARE AVAILABLE';
    t += '<\/div>';
    t += '<div class=\"col-all-12\" id=\"id-589\">';
    t += '<button class=\"btn btn-primary col-all-12\" onclick=\"$customPages.actionAddComponentBase()\" type=\"submit\" id=\"id-590\">Add Component<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_controller_inne_inne_html'] = function (scope) {
    var t = '';
    t += '<div class=\"inneController\" id=\"id-591\">';
    t += '<h6 id=\"id-592\">Widok: ADD ROLE<\/h6>';
    t += '<div class=\"modal modal-large\" id=\"id-593\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-594\">';
    t += 'Add role';
    t += '<\/div>';
    t += '<div class=\"modal-aside col-xs-3\" id=\"id-595\">';
    t += '<div class=\"modal-aside-content row\" id=\"id-596\">';
    t += '<div class=\"modal-headline\" id=\"id-597\">';
    t += 'Roles:';
    t += '<\/div>';
    t += '<form id=\"id-598\">';
    t += '<div class=\"form-group\" id=\"id-599\">';
    t += '<input id=\"role-sbadmin\" name=\"role-sbadmin\" class=\"form-control\" type=\"radio\" hidden sp-name=\"role-sbadmin\">';
    t += '<label for=\"role-sbadmin\" id=\"id-600\">SB Admin<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-601\">';
    t += '<input id=\"role-superadmin\" name=\"role-sbadmin\" class=\"form-control\" type=\"radio\" hidden sp-name=\"role-sbadmin\">';
    t += '<label for=\"role-superadmin\" id=\"id-602\">Super admin<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-603\">';
    t += '<input id=\"role-menager\" name=\"role-menager\" class=\"hidden\" type=\"radio\" sp-name=\"role-menager\">';
    t += '<label for=\"role-menager\" id=\"id-604\">Menager<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-605\">';
    t += '<input id=\"role-editor\" name=\"role-editor\" class=\"hidden\" type=\"radio\" sp-name=\"role-editor\">';
    t += '<label for=\"role-editor\" id=\"id-606\">Editor<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-607\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-608\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-609\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-610\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-611\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-612\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-613\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-614\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-615\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-616\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-617\">';
    t += '<input id=\"role-customname\" name=\"role-customname\" class=\"hidden\" type=\"radio\" sp-name=\"role-customname\">';
    t += '<label for=\"role-customname\" id=\"id-618\">Custom name<\/label>';
    t += '<\/div>';
    t += '<div class="form-group form-group-bg" id="id-619">';

    function closure15(event) {
        scope.newRoleName = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure15);
    t += '<input type=\"text\" placeholder=\"Role name\" id=\"id-620\" spike-event-keyup=\"scope.newRoleName=event.target.value;\" spike-event-keyup-link=\"' + (linkId) + '\" spike-unbinded=\"\">';
    t += '<button type=\"button\" class=\"btn btn-primary\" id=\"id-621\">Add role<\/button>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"modal-content col-xs-9\" id=\"modalContent\">';
    t += '<form id=\"id-622\">';
    t += '<div class=\"col-xs-12\" id=\"id-623\">';
    t += '<div class=\"modal-content-headline\" id=\"id-624\">';
    t += 'Role name';
    t += '<\/div>';
    t += '<div class=\"row\" id=\"id-625\">';
    t += '<div class=\"col-xs-6\" id=\"id-626\">';
    t += '<div class=\"form-group\" id=\"id-627\">';
    t += '<input type=\"text\" class=\"form-control input-block\" value=\"Admin2\" id=\"id-628\">';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-629\">';
    t += '<label class="btn btn-primary" id="id-630">copy privilages from</label>';
    t += '' + (scope.addTriggerTemplate('$rolesSelect', 'rolesSelect', 'rolesSelect100010')) + '';
    t += '<div id=\"rolesSelect100010\" class=\"\"><\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-631\">';
    t += '<div class="block" id="id-632">';

    function closure16(event) {
        scope.openGeneralExcludes()
    };var linkId = spike.core.Events.linkEvent(closure16);
    t += '<button class=\"btn btn-primary\" type=\"button\" id=\"id-633\" spike-unbinded=\"\" spike-event-click=\"scope.openGeneralExcludes()\" spike-event-click-link=\"' + (linkId) + '\">General Excludes<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12\" id=\"id-634\">';
    t += '<div class=\"row\" id=\"id-635\">';
    t += '<div class=\"col-xs-6\" id=\"id-636\">';
    t += '<div class=\"modal-content-headline\" id=\"id-637\">';
    t += 'Users in role';
    t += '<\/div>';
    t += '<div class=\"box box-small max-height\" id=\"id-638\">';
    t += '<div class=\"box-header\" id=\"id-639\">';
    t += '<div class=\"col-xs-6 text-xs-left\" id=\"id-640\">';
    t += '<div class=\"block\" id=\"id-641\">';
    t += 'Name';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-642\">';
    t += '<div class=\"block\" id=\"id-643\">';
    t += 'ID';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<ul class=\"search-users-list\" id=\"addRoleUsersInRole\">';
    t += '<li id=\"id-644\"><label for=\"search-user-id1\" id=\"id-645\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-646\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-647\">10<\/span> <\/label> <\/li>';
    t += '<li id=\"id-648\"><label for=\"search-user-id2\" id=\"id-649\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-650\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-651\">20<\/span> <\/label> <\/li>';
    t += '<li id=\"id-652\"><label for=\"search-user-id3\" id=\"id-653\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-654\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-655\">30<\/span> <\/label> <\/li>';
    t += '<li id=\"id-656\"><label for=\"search-user-id4\" id=\"id-657\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-658\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-659\">40<\/span> <\/label> <\/li>';
    t += '<li id=\"id-660\"><label for=\"search-user-id5\" id=\"id-661\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-662\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-663\">50<\/span> <\/label> <\/li>';
    t += '<li id=\"id-664\"> <label for=\"search-user-id5\" id=\"id-665\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-666\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-667\">60<\/span> <\/label> <\/li>';
    t += '<li id=\"id-668\"> <label for=\"search-user-id5\" id=\"id-669\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-670\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-671\">70<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<div class=\"box-footer\" id=\"id-672\">';
    t += '<div class=\"row\" id=\"id-673\">';
    t += '<div class=\"col-xs-4\" id=\"id-674\">';
    t += '<div class=\"form-group\" id=\"id-675\">';
    t += '<button type=\"button\" class=\"btn btn-primary min-width\" id=\"id-676\">Select all<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-8\" id=\"id-677\">';
    t += '<label class=\"btn btn-primary\" id=\"id-678\">Move to<\/label>';
    t += '<select class=\"form-control\" id=\"id-679\"> <option value=\"1\" id=\"id-680\">1<\/option> <option value=\"2\" id=\"id-681\">2<\/option> <\/select>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-682\">';
    t += '<div class=\"modal-content-headline\" id=\"id-683\">';
    t += 'Search user';
    t += '<\/div>';
    t += '<div class=\"box box-small max-height\" id=\"id-684\">';
    t += '<div class=\"row box-toolbar\" id=\"id-685\">';
    t += '<div class=\"col-xs-6\" id=\"id-686\">';
    t += '<div class=\"form-group\" id=\"id-687\">';
    t += '<label for=\"search-by-name\" id=\"id-688\">Search by name<\/label>';
    t += '<div class=\"form-group form-inline\" id=\"id-689\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-name\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-690\"><i class=\"fa fa-search\" id=\"id-691\"><\/i><\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-692\">';
    t += '<div class=\"form-group\" id=\"id-693\">';
    t += '<label for=\"search-by-id\" id=\"id-694\">Search by ID<\/label>';
    t += '<div class=\"form-group form-inline\" id=\"id-695\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-id\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-696\"> <i class=\"fa fa-search\" id=\"id-697\"><\/i> <\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-header\" id=\"id-698\">';
    t += '<div class=\"col-xs-6 text-xs-left\" id=\"id-699\">';
    t += '<div class=\"block\" id=\"id-700\">';
    t += 'Name';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-701\">';
    t += '<div class=\"block\" id=\"id-702\">';
    t += 'ID';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<ul class=\"search-users-list\" id=\"addRoleSearchUser\">';
    t += '<li id=\"id-703\"> <label for=\"search-user-id1\" id=\"id-704\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-705\">UserName <i class=\"search-userrole\" id=\"id-706\">SB admin<\/i> <\/span> <span class=\"search-userid text-xs-right\" id=\"id-707\">10<\/span> <\/label> <\/li>';
    t += '<li id=\"id-708\"> <label for=\"search-user-id2\" id=\"id-709\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-710\">UserName <i class=\"search-userrole\" id=\"id-711\">Editor<\/i> <\/span> <span class=\"search-userid text-xs-right\" id=\"id-712\">20<\/span> <\/label> <\/li>';
    t += '<li id=\"id-713\"> <label for=\"search-user-id3\" id=\"id-714\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-715\">UserName <i class=\"search-userrole\" id=\"id-716\">Admin<\/i> <\/span> <span class=\"search-userid text-xs-right\" id=\"id-717\">30<\/span> <\/label> <\/li>';
    t += '<li id=\"id-718\"> <label for=\"search-user-id4\" id=\"id-719\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-720\">UserName <i class=\"search-userrole\" id=\"id-721\">no role<\/i> <\/span> <span class=\"search-userid text-xs-right\" id=\"id-722\">40<\/span> <\/label> <\/li>';
    t += '<li id=\"id-723\"> <label for=\"search-user-id5\" id=\"id-724\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-725\">UserName <i class=\"search-userrole\" id=\"id-726\">no role<\/i> <\/span> <span class=\"search-userid text-xs-right\" id=\"id-727\">50<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<div class=\"box-footer end-xs\" id=\"id-728\">';
    t += '<div class=\"form-group\" id=\"id-729\">';
    t += '<button type=\"button\" class=\"btn btn-primary min-width\" id=\"id-730\">Select all<\/button>';
    t += '<button type=\"button\" class=\"btn btn-primary min-width\" id=\"id-731\">Add<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 end-xs modal-footer\" id=\"id-732\">';
    t += '<div class=\"form-group\" id=\"id-733\">';
    t += '<button type=\"button\" class=\"btn btn-primary btn-lg min-width\" id=\"id-734\">Cancel<\/button>';
    t += '<button type=\"button\" class=\"btn btn-primary btn-lg min-width\" id=\"id-735\">Save<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<br id=\"id-736\">';
    t += '<br id=\"id-737\">';
    t += '<br id=\"id-738\">';
    t += '<br id=\"id-739\">';
    t += '<br id=\"id-740\">';
    t += '<h6 id=\"id-741\">Widok: Page priviliges<\/h6>';
    t += '<div class=\"modal modal-small\" id=\"id-742\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-743\">';
    t += 'Page priviliges';
    t += '<\/div>';
    t += '<div class=\"modal-aside col-xs-4\" id=\"id-744\">';
    t += '<div class=\"modal-aside-content row\" id=\"id-745\">';
    t += '<div class=\"modal-headline\" id=\"id-746\">';
    t += 'Have permissions:';
    t += '<\/div>';
    t += '<form id=\"id-747\">';
    t += '<div class=\"form-group\" id=\"id-748\">';
    t += '<input id=\"permissions-menager\" name=\"permissions-menager\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-menager\">';
    t += '<label for=\"permissions-menager\" id=\"id-749\">Menager<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-750\">';
    t += '<input id=\"permissions-editor\" name=\"permissions-editor\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-editor\">';
    t += '<label for=\"permissions-editor\" id=\"id-751\">Editor<\/label>';
    t += '<\/div>';
    t += '<div class=\"form-group\" id=\"id-752\">';
    t += '<input id=\"permissions-customname\" name=\"permissions-customname\" class=\"form-control\" type=\"checkbox\" hidden sp-name=\"permissions-customname\">';
    t += '<label for=\"permissions-customname\" id=\"id-753\">Custom name<\/label>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"modal-content col-xs-8\" id=\"id-754\">';
    t += '<div class=\"box box-small\" id=\"id-755\">';
    t += '<form id=\"id-756\">';
    t += '<div class=\"row box-toolbar\" id=\"id-757\">';
    t += '<div class=\"col-xs-6\" id=\"id-758\">';
    t += '<div class=\"form-group\" id=\"id-759\">';
    t += '<label for=\"search-by-name\" id=\"id-760\">Search by name<\/label>';
    t += '<div class=\"form-group\" id=\"id-761\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-name\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-762\"> <i class=\"fa fa-search\" id=\"id-763\"><\/i> <\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6\" id=\"id-764\">';
    t += '<div class=\"form-group\" id=\"id-765\">';
    t += '<label for=\"search-by-id\" id=\"id-766\">Search by ID<\/label>';
    t += '<div class=\"form-group\" id=\"id-767\">';
    t += '<input type=\"text\" class=\"form-control\" id=\"search-by-id\">';
    t += '<button class=\"btn btn-primary btn-icon\" type=\"submit\" id=\"id-768\"> <i class=\"fa fa-search\" id=\"id-769\"><\/i> <\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"box-header\" id=\"id-770\">';
    t += '<div class=\"col-xs-6 text-xs-left\" id=\"id-771\">';
    t += '<div class=\"block\" id=\"id-772\">';
    t += 'Name';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-6 text-xs-right\" id=\"id-773\">';
    t += '<div class=\"block\" id=\"id-774\">';
    t += 'ID';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<ul class=\"search-users-list\" id=\"id-775\">';
    t += '<li id=\"id-776\"> <label for=\"search-user-id1\" id=\"id-777\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id1\"> <span class=\"search-username\" id=\"id-778\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-779\">10<\/span> <\/label> <\/li>';
    t += '<li id=\"id-780\"> <label for=\"search-user-id2\" id=\"id-781\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id2\"> <span class=\"search-username\" id=\"id-782\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-783\">20<\/span> <\/label> <\/li>';
    t += '<li id=\"id-784\"> <label for=\"search-user-id3\" id=\"id-785\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id3\"> <span class=\"search-username\" id=\"id-786\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-787\">30<\/span> <\/label> <\/li>';
    t += '<li id=\"id-788\"> <label for=\"search-user-id4\" id=\"id-789\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id4\"> <span class=\"search-username\" id=\"id-790\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-791\">40<\/span> <\/label> <\/li>';
    t += '<li id=\"id-792\"> <label for=\"search-user-id5\" id=\"id-793\"> <input type=\"checkbox\" class=\"form-control\" id=\"search-user-id5\"> <span class=\"search-username\" id=\"id-794\">UserName<\/span> <span class=\"search-userid text-xs-right\" id=\"id-795\">50<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<div class=\"box-footer\" id=\"id-796\">';
    t += '<div class=\"row\" id=\"id-797\">';
    t += '<div class=\"col-xs-4\" id=\"id-798\">';
    t += '<div class=\"form-group\" id=\"id-799\">';
    t += '<button type=\"button\" class=\"btn btn-primary min-width\" id=\"id-800\">Select all<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<div class=\"col-xs-8\" id=\"id-801\">';
    t += '<label class=\"btn btn-primary\" id=\"id-802\">Move to<\/label>';
    t += '<select class=\"form-control\" id=\"id-803\"> <option value=\"1\" id=\"id-804\">1<\/option> <option value=\"2\" id=\"id-805\">2<\/option> <\/select>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<br id=\"id-806\">';
    t += '<br id=\"id-807\">';
    t += '<br id=\"id-808\">';
    t += '<br id=\"id-809\">';
    t += '<br id=\"id-810\">';
    t += '<h6 id=\"id-811\">Widok: General exludes<\/h6>';
    t += '<div class=\"modal modal-mini\" id=\"id-812\">';
    t += '<div class=\"modal-header col-xs-12 between-xs\" id=\"id-813\">';
    t += 'General exludes';
    t += '<\/div>';
    t += '<form id=\"id-814\">';
    t += '<div class=\"modal-content col-xs-12\" id=\"id-815\">';
    t += '<ul class=\"general-exludes-list row\" id=\"id-816\">';
    t += '<li class=\"col-xs-6\" id=\"id-817\"> <label for=\"general-exlude-id1\" id=\"id-818\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id1\"> <span class=\"general-exlude-rname\" id=\"id-819\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-820\"> <label for=\"general-exlude-id2\" id=\"id-821\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id2\"> <span class=\"general-exlude-rname\" id=\"id-822\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-823\"> <label for=\"general-exlude-id3\" id=\"id-824\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id3\"> <span class=\"general-exlude-rname\" id=\"id-825\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-826\"> <label for=\"general-exlude-id4\" id=\"id-827\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id4\"> <span class=\"general-exlude-rname\" id=\"id-828\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-829\"> <label for=\"general-exlude-id5\" id=\"id-830\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id5\"> <span class=\"general-exlude-rname\" id=\"id-831\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-832\"> <label for=\"general-exlude-id6\" id=\"id-833\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id6\"> <span class=\"general-exlude-rname\" id=\"id-834\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-835\"> <label for=\"general-exlude-id7\" id=\"id-836\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id7\"> <span class=\"general-exlude-rname\" id=\"id-837\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-838\"> <label for=\"general-exlude-id8\" id=\"id-839\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id8\"> <span class=\"general-exlude-rname\" id=\"id-840\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-841\"> <label for=\"general-exlude-id9\" id=\"id-842\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id9\"> <span class=\"general-exlude-rname\" id=\"id-843\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-844\"> <label for=\"general-exlude-id10\" id=\"id-845\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id10\"> <span class=\"general-exlude-rname\" id=\"id-846\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-847\"> <label for=\"general-exlude-id11\" id=\"id-848\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id11\"> <span class=\"general-exlude-rname\" id=\"id-849\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<li class=\"col-xs-6\" id=\"id-850\"> <label for=\"general-exlude-id12\" id=\"id-851\"> <input type=\"checkbox\" class=\"form-control\" id=\"general-exlude-id12\"> <span class=\"general-exlude-rname\" id=\"id-852\">View bestlip number<\/span> <\/label> <\/li>';
    t += '<\/ul>';
    t += '<\/div>';
    t += '<div class=\"col-xs-12 end-xs modal-footer\" id=\"id-853\">';
    t += '<div class=\"form-group\" id=\"id-854\">';
    t += '<button type=\"button\" class=\"btn btn-primary btn-lg min-width\" id=\"id-855\">Cancel<\/button>';
    t += '<button type=\"button\" class=\"btn btn-primary btn-lg min-width\" id=\"id-856\">Save<\/button>';
    t += '<\/div>';
    t += '<\/div>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_privileges_controller_privileges_viewsList_html'] = function (scope) {
    var t = '';
    t += '<ul class="superpowers powers-lev1" id="id-857">';

    function closure17(event) {
        scope.toggleList(this)
    };var linkId = spike.core.Events.linkEvent(closure17);
    for (var index10 = 0; index10 < scope.views.length; index10++) {
        var view = scope.views[index10];
        (function (view) {
            t += '<li id=\"id-858\" spike-unbinded=\"\" spike-event-click=\"scope.toggleList(this)\" spike-event-click-link=\"' + (linkId) + '\">';
            t += '<div class=\"power\" id=\"id-859\">';
            t += '<span class=\"power-name\" id=\"id-860\">' + (view.label) + '<\/span>';
            t += '</div>';
            if (view.sublist) {
                t += '<ul class="powers-lev2" id="id-861">';

                function closure18(event) {
                    scope.toggleList(this)
                };var linkId = spike.core.Events.linkEvent(closure18);
                for (var index11 = 0; index11 < view.sublist.length; index11++) {
                    var subview = view.sublist[index11];
                    (function (subview) {
                        t += '<li id=\"id-862\" spike-unbinded=\"\" spike-event-click=\"scope.toggleList(this)\" spike-event-click-link=\"' + (linkId) + '\">';
                        t += '<div class=\"power\" id=\"id-863\">';
                        t += '<label title=\"Permission to see and edit\" id=\"id-864\"><i class=\"fa fa-pencil-square-o\" id=\"id-865\"><\/i><input type=\"checkbox\" class=\"cansee\" id=\"id-866\"><\/label>';
                        t += '<label title=\"Permission only to see\" id=\"id-867\"><i class=\"fa fa-eye\" id=\"id-868\"><\/i><input type=\"checkbox\" class=\"canedit\" id=\"id-869\"><\/label>';
                        t += '<span class=\"power-name\" id=\"id-870\">Menage events<\/span>';
                        t += '<label title=\"More settings\" id=\"id-871\"><i class=\"fa fa-cog\" id=\"id-872\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-873\"><\/label>';
                        t += '</div> </li>';
                    }(subview));
                }
                t += '<li id=\"id-874\">';
                t += '<div class=\"power\" id=\"id-875\">';
                t += '<label id=\"id-876\"><i class=\"fa fa-pencil-square-o\" id=\"id-877\"><\/i><input type=\"checkbox\" class=\"cansee\" id=\"id-878\"><\/label>';
                t += '<label id=\"id-879\"><i class=\"fa fa-eye\" id=\"id-880\"><\/i><input type=\"checkbox\" class=\"canedit\" id=\"id-881\"><\/label>';
                t += '<span class=\"power-name\" id=\"id-882\">Add games<\/span>';
                t += '<label id=\"id-883\"><i class=\"fa fa-cog\" id=\"id-884\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-885\"><\/label>';
                t += '<\/div>';
                t += '<ul class=\"powers-lev3\" id=\"id-886\">';
                t += '<\/ul> <\/li>';
                t += '<li class=\"active\" id=\"id-887\">';
                t += '<div class=\"power\" id=\"id-888\">';
                t += '<label id=\"id-889\"><i class=\"fa fa-pencil-square-o\" id=\"id-890\"><\/i><input type=\"checkbox\" class=\"cansee\" id=\"id-891\"><\/label>';
                t += '<label id=\"id-892\"><i class=\"fa fa-eye\" id=\"id-893\"><\/i><input type=\"checkbox\" class=\"canedit\" id=\"id-894\"><\/label>';
                t += '<span class=\"power-name\" id=\"id-895\">Register<\/span>';
                t += '<label id=\"id-896\"><i class=\"fa fa-cog\" id=\"id-897\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-898\"><\/label>';
                t += '<\/div>';
                t += '<ul class=\"powers-lev3\" id=\"id-899\">';
                t += '<li id=\"id-900\">';
                t += '<div class=\"power\" id=\"id-901\">';
                t += '<label id=\"id-902\"><i class=\"fa fa-pencil-square-o\" id=\"id-903\"><\/i><input type=\"checkbox\" class=\"cansee\" id=\"id-904\"><\/label>';
                t += '<label id=\"id-905\"><i class=\"fa fa-eye\" id=\"id-906\"><\/i><input type=\"checkbox\" class=\"canedit\" id=\"id-907\"><\/label>';
                t += '<span class=\"power-name\" id=\"id-908\">Single<\/span>';
                t += '<label id=\"id-909\"><i class=\"fa fa-cog\" id=\"id-910\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-911\"><\/label>';
                t += '<\/div> <\/li>';
                t += '<li class=\"active\" id=\"id-912\">';
                t += '<div class=\"power\" id=\"id-913\">';
                t += '<label id=\"id-914\"><i class=\"fa fa-pencil-square-o\" id=\"id-915\"><\/i><input type=\"checkbox\" class=\"cansee\" id=\"id-916\"><\/label>';
                t += '<label id=\"id-917\"><i class=\"fa fa-eye\" id=\"id-918\"><\/i><input type=\"checkbox\" class=\"canedit\" id=\"id-919\"><\/label>';
                t += '<span class=\"power-name\" id=\"id-920\">Multi<\/span>';
                t += '<label id=\"id-921\"><i class=\"fa fa-cog\" id=\"id-922\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-923\"><\/label>';
                t += '<\/div>';
                t += '<ul class=\"powers-lev4\" id=\"id-924\">';
                t += '<li id=\"id-925\">';
                t += '<div class=\"power\" id=\"id-926\">';
                t += '<span class=\"power-name\" id=\"id-927\">Betslip edit<\/span>';
                t += '<label id=\"id-928\"><i class=\"fa fa-cog\" id=\"id-929\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-930\"><\/label>';
                t += '<\/div> <\/li>';
                t += '<li id=\"id-931\">';
                t += '<div class=\"power\" id=\"id-932\">';
                t += '<span class=\"power-name\" id=\"id-933\">Betslip edit<\/span>';
                t += '<label id=\"id-934\"><i class=\"fa fa-cog\" id=\"id-935\"><\/i><input type=\"checkbox\" class=\"canconfig\" id=\"id-936\"><\/label>';
                t += '<\/div> <\/li>';
                t += '<\/ul> <\/li>';
                t += '<\/ul> <\/li>';
                t += '</ul>';
            }
            t += '</li>';
        }(view));
    }
    t += '<\/ul>';
    return t;
};
spike.core.Assembler.sourcePath = 'templates_input';
spike.core.Templates.templates['templates_input_new_module_auth_controller_login_login_html'] = function (scope) {
    var t = '';
    t += '<div class=\"loginController\" id=\"id-937\">';
    t += '<div class=\"box\" id=\"id-938\">';
    t += '<div class="logo" id="id-939"></div>';

    function closure19(event) {
        scope.login(event)
    };var linkId = spike.core.Events.linkEvent(closure19);
    t += '';
    t += '<form autocomplete="off" sp-watch id="id-940" spike-unbinded="" spike-event-submit="scope.login(event)" spike-event-submit-link="' + (linkId) + '">';

    function closure20(event) {
        scope.model.loginName = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure20);
    t += '<input type="text" name="loginName" placeholder="' + (spike.core.Message.get('login_placeholder')) + '" id="id-941" spike-event-keyup="scope.model.loginName=event.target.value;" spike-event-keyup-link="' + (linkId) + '" spike-unbinded="" sp-name="loginName">';

    function closure21(event) {
        scope.model.password = event.target.value;
    };var linkId = spike.core.Events.linkEvent(closure21);
    t += '<input type=\"password\" name=\"password\" placeholder=\"' + (spike.core.Message.get('password_placeholder')) + '\" id=\"id-942\" spike-event-keyup=\"scope.model.password=event.target.value;\" spike-event-keyup-link=\"' + (linkId) + '\" spike-unbinded=\"\" sp-name=\"password\">';
    t += '<button type=\"submit\" class=\"default\" id=\"id-943\">' + (spike.core.Message.get('login_button')) + '<\/button>';
    t += '<p class=\"error ' + (scope.model.error === true ? 'show' : 'hide') + '\" id=\"id-944\">' + (spike.core.Message.get('login_error')) + '<\/p>';
    t += '<\/form>';
    t += '<\/div>';
    t += '<div class=\"footer\" id=\"id-945\">';
    t += '' + (spike.core.Message.get('ac_version')) + '';
    t += '<\/div>';
    t += '<\/div>';
    return t;
};