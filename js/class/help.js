/**
 * Помощь.
 *
 * @class Help
 * @constructor
 */
let Help = function () {
};

/**
 * Методы класса Help.
 */
Help.prototype = {

    helpData: {
        'not-ready': {
            $html: 'Раздел не готов.'
        },
        'about-mood': {
            $header: 'Уровень довольства',
            $html:
                '<p class="list-item">' +
                '   Уровень довольства означает, насколько успешно население страны.' +
                '</p>' +
                '<p class="list-item">' +
                '   Если довольство ниже 50%, то население выполняет свои функции менее эффективно.<br/>' +
                '   Высокий уровень довольства означает более эффективное исполнение обязанностей.' +
                '</p>' +
                '<p class="list-item">' +
                '   Довольство на уровне 0% означает половину эффективности работы населения.<br>' +
                '   Уровень 100% означает, что население в полтора раза эффективнее нормы.' +
                '</p>',
            css: {
                width: 670
            }
        }
    },

    /**
     * Получить вёрстку для иконки помощи.
     *
     * @param {Object} parameters
     */
    getHelpIcon (parameters) {
        functions.checkParametersIntegrity(parameters, {
            helpId: 'string'
        });
        let helpData = this.helpData[parameters.helpId];
        if (helpData === undefined) {
            throw 'Раздел помощи ' + parameters.helpId + ' не существует.';
        }

        helpData = $.extend(true, helpData, parameters);

        let $icon = $('<i/>');
        $icon.addClass('fa fa-info help-icon');
        $icon.attr('title', 'Нажите для получения справки.');
        $icon.on('click', function (event) {
            event.stopPropagation();
            this.showHelpWindow(helpData);
        }.bind(this));

        return $icon;
    },

    /**
     * Отобразить окно с информацией.
     *
     * @param {Object} parameters
     */
    showHelpWindow (parameters) {
        let $html = $('<div/>');
        if (parameters.css) {
            $html.css(parameters.css);
        }

        if (parameters.$header) {
            let $header = $('<header/>');
            $header.appendTo($html);
            $header.append('<i class="fa fa-info header-help-icon"/>');
            $header.append(parameters.$header);
        }

        $html.append(parameters.$html);

        functions.inform({
            message: $html,
            $container: parameters.$container || this.layer.$dialog
        });
    }

};
