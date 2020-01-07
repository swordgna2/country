/**
 * Статистика.
 *
 * @class Statistics
 * @constructor
 */
let Statistics = function () {
};

/**
 * Методы класса Statistics.
 */
Statistics.prototype = {

    /**
     * Установить начальные параметры.
     *
     * @param {Object} parameters
     */
    setInitialParameters: function (parameters) {
        functions.checkParametersIntegrity(parameters, {
            $statistics: 'object'
        });

        this.$statistics = parameters.$statistics;
    },

    /**
     * Схема отображения статистики.
     */
    statisticsScheme: {
        geo: {
            caption: 'География',
            dimension: 'га',
            sub: {
                plain: 'Равнины',
                woods: 'Леса',
                mountains: 'Горы',
                sea: { caption: 'Выход к морю', type: 'Boolean' }
            }
        },
        people: {
            caption: 'Население',
            dimension: 'чел',
            sub: {
                peasants: 'Крестьяне',
                workers: 'Рабочие',
                warriors: 'Воины',
                priests: 'Священники'
            },
            help: 'not-ready'
        },
        stocks: {
            caption: 'Запасы',
            sub: {
                money: { caption: 'Деньги', dimension: 'у.е.' },
                gold: { caption: 'Золото', dimension: 'кг' },
                corn: { caption: 'Зерно', dimension: 'тонн' },
                wood: { caption: 'Лес', dimension: 'кубов' },
                minerals: { caption: 'Полезные ископаемые', dimension: 'тонн' }
            }
        },
        mood: {
            caption: 'Довольство',
            dimension: '%',
            sub: {
                peasants: { caption: 'Крестьяне', type: 'kToPercent', colored: true },
                workers: { caption: 'Рабочие', type: 'kToPercent', colored: true },
                warriors: { caption: 'Воины', type: 'kToPercent', colored: true },
                priests: { caption: 'Священники', type: 'kToPercent', colored: true }
            },
            help: 'about-mood'
        }
    },

    /**
     * Обновить статистику.
     */
    refreshStatistics () {
        this.removeStatisticsLayout();
        this.createStatisticsLayout({
            $container: this.$statistics,
            scheme: this.statisticsScheme,
            data: this.parent.myCountry,
            dimension: undefined
        });
    },

    /**
     * Удалить элементы статистики.
     */
    removeStatisticsLayout: function () {
        this.$statistics.find('.group-caption, .group-data, .list-row').remove();
    },

    /**
     * Создать вёрстку для статистики.
     */
    createStatisticsLayout (parameters) {
        functions.checkParametersIntegrity(parameters, {
            $container: 'object',
            scheme: 'object'
        });

        for (let schemeKey in parameters.scheme) {
            if (parameters.scheme.hasOwnProperty(schemeKey)) {
                let schemeElement = parameters.scheme[schemeKey];

                if (typeof schemeElement === 'object' && schemeElement !== null) {
                    if (schemeElement.hasOwnProperty('sub')) {
                        this.checkDataConsistency(parameters.data, parameters.scheme, schemeKey);
                        let $groupElementsContainer = this.addStatisticsGroup(parameters.$container, schemeElement);
                        this.createStatisticsLayout({
                            $container: $groupElementsContainer,
                            scheme: schemeElement['sub'],
                            data: parameters.data[schemeKey],
                            dimension: schemeElement.dimension || parameters.dimension
                        });
                        continue;
                    }
                } else {
                    schemeElement = {
                        caption: schemeElement
                    };
                }

                this.addStatisticsElement(parameters.$container, $.extend(true, {
                    key: schemeKey,
                    // caption: schemeElement.caption,
                    value: parameters.data[schemeKey],
                    dimension: schemeElement.dimension || parameters.dimension//,
                    // type: schemeElement.type
                }, schemeElement));
            }
        }
    },

    /**
     * Проверить соответствие данных схеме.
     *
     * @param {Object} data
     * @param {Object} scheme
     * @param {string} key
     */
    checkDataConsistency: function (data, scheme, key) {
        try {
            data.hasOwnProperty(key);
        } catch (e) {
            console.log('Данные:', data, 'Схема:', scheme);
            throw 'Построение статистики: данные не соответствуют схеме.';
        }
    },

    /**
     * Добавить группу.
     * Возвращает контейнер для дочерних элементов группы.
     *
     * @param {Object} $container
     * @param {Object} schemeElement
     * @return {JQuery<HTMLElement> | jQuery | HTMLElement}
     */
    addStatisticsGroup ($container, schemeElement) {
        let $group = $('<div/>');
        $group.appendTo($container);
        $group.addClass('group');

        let $caption = $('<div/>');
        $caption.appendTo($group);
        $caption.addClass('group-caption');
        $caption.append('<i class="fa fa-minus collapse"></i>&nbsp;');
        $caption.append(schemeElement.caption);
        if (schemeElement.help) {
            $caption.append('&nbsp;&nbsp;&nbsp;');
            $caption.append(this.parent.help.getHelpIcon({
                helpId: schemeElement.help
            }));
        }
        $caption.on('click', this.toggleGroup.bind(this));

        let $childContainer = $('<div/>');
        $childContainer.appendTo($group);
        $childContainer.addClass('group-data');

        return $childContainer;
    },

    /**
     * Переключить группу.
     *
     * @param {k.Event} event
     */
    toggleGroup: function (event) {
        let $groupHeader = $(event.currentTarget);
        let $groupIcon = $groupHeader.find('.fa');
        let $groupData = $groupHeader.next();
        let visible = $groupIcon.hasClass('fa-minus');
        $groupIcon.removeClass('fa-plus fa-minus');
        if (visible) {
            $groupIcon.addClass('fa-plus');
            $groupData.slideUp('fast');
        } else {
            $groupIcon.addClass('fa-minus');
            $groupData.slideDown();
        }
    },

    /**
     * Добавить элемент статистики.
     *
     * @param {Object} $container
     * @param {Object} schemeElement
     */
    addStatisticsElement ($container, schemeElement) {
        let $row = $('<div/>');
        $row.appendTo($container);
        $row.addClass('list-row');
        $row.addClass(schemeElement.key);

        let $caption = $('<div/>');
        $caption.appendTo($row);
        $caption.addClass('list-caption');
        $caption.html(schemeElement.caption);

        if (schemeElement.type === 'Boolean') {
            schemeElement.value = schemeElement.value ? '<i class="fa fa-check-square-o"></i>&nbsp;да' : '<i class="fa fa-times-circle"></i>&nbsp;нет';
            schemeElement.dimension = '';
        }
        if (schemeElement.type === 'kToPercent') {
            schemeElement.value = functions.convertKToPercent(schemeElement.value, 0);
            if (schemeElement.colored) {
                schemeElement.value = functions.colorPercentValue(schemeElement.value);
            }
        }

        let $value = $('<div/>');
        $value.appendTo($row);
        $value.addClass('list-value');
        $value.html(schemeElement.value);

        let $dimension = $('<div/>');
        $dimension.appendTo($row);
        $dimension.addClass('list-dimension');
        $dimension.html(schemeElement.dimension);
    },

    /**
     * Уничтожить зависимости.
     */
    destroy: function () {
        delete this.$statistics;
    }

};