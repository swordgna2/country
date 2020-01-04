let Main = function () {
    this.layer = new Layer();
    this.layer.createLayer();

    this.myCountry = new Country();

    this.header = new Header({
        $header: this.layer.$header,
        country: this.myCountry
    });
    this.header.refreshHeader();

    this.footer = new Footer({
        $footer: this.layer.$footer,
        country: this.myCountry
    });
    this.footer.refreshFooter();
    this.footer.listenFooterMenuForElementClicks({
        'statistics': this.showStatistics.bind(this),
        'help': this.showHelp.bind(this)
    });

    this.showDialog(this.dialogData['select-my-country'], this.startWithSettings.bind(this));
};

Main.prototype = {

    dialogData: {
        'select-my-country': {
            $header: 'Выбор страны',
            $content:
                '<p>Выберите страну, за которую играете</p>' +
                '<p><select name="country"/> <button name="refresh"><i class="fa fa-refresh"></i> случайная</button></p>',
            $footer: '<button class="proceed">Продолжить</button>',
            form: {
                country: {
                    type: 'select',
                    options: function () {
                        return this.myCountry.names;
                    },
                    addEmptyOption: 'Выберите страну'
                }
            },
            buttons: {
                refresh: function () {
                    debugger;
                }
            },
            check: function () {
                return this.checkWindowSelect('country');
            }
        }
    },

    /**
     * Отобразить статистику.
     */
    showStatistics () {
        new Modal({
            $html: 'Todo: отобразить статистику.'
        });
    },

    /**
     * Отобразить помощь.
     */
    showHelp () {
        new Modal({
            $html: 'Todo: отобразить помощь.'
        });
    },

    /**
     * Отобразить диалог.
     *
     * @param {Object} dialogData
     * @param {function} promise
     */
    showDialog(dialogData, promise) {
        let $html = this.createDialogHtml(dialogData);
        let modal = new Modal({
            $html: $html,
            modal: true,
            closeIcon: false,
            windowClass: 'modal-dialog'
        });
        this.$currentDialogWindow = modal.$window;
        this.currentDialogData = dialogData;
        if (typeof this.currentDialogData.form !== 'object' || this.currentDialogData.form === null) {
            this.currentDialogData.form = {};
        }
        try {
            this.currentDialogData.buttons.length;
        } catch (e) {
            this.currentDialogData.buttons = [];
        }
        if (typeof this.currentDialogData.check !== 'function') {
            this.currentDialogData.check = function () {
                return true;
            };
        }

        this.currentDialogPromise = (typeof promise === 'function') ? promise : function () {};

        this.setFormData();
        this.listenDialogButtons();
    },

    /**
     * Создать вёрстку диалога.
     *
     * @param {Object} dialogData - данные диалога
     * @return {string}
     */
    createDialogHtml(dialogData) {
        if (typeof dialogData === 'object' && dialogData !== null) {
            return dialogData.$content;
        }
        throw 'Ошибка в параметре dialogData.';
    },

    /**
     * Установить данные формы.
     */
    setFormData: function () {
        for (let elementName in this.currentDialogData.form) {
            if (this.currentDialogData.form.hasOwnProperty(elementName)) {
                let element = this.currentDialogData.form[elementName];
                let elementType = element.type;
                switch (elementType) {
                    case 'select':
                        let $select = this.$currentDialogWindow.find('[name="' + elementName + '"]');
                        let selectOptions = $select.prop('options');
                        let options = element.options;
                        if (typeof element.options === 'function') {
                            options = element.options.bind(this)();
                        }
                        if (element.addEmptyOption) {
                            selectOptions[0] = new Option(element.addEmptyOption);
                        }
                        if (typeof options === 'object' && options !== null && options.length) {
                            for (let i = 0; i < options.length; i++) {
                                selectOptions[selectOptions.length] = new Option(options[i], i.toString());
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    },

    /**
     * Установить отслеживание нажатий по кнопкам диалога.
     */
    listenDialogButtons() {
        for (let buttonName in this.currentDialogData.buttons) {
            if (this.currentDialogData.buttons.hasOwnProperty(buttonName)) {
                let promise = this.currentDialogData.buttons[buttonName];
                this.$currentDialogWindow.find('[name="' + buttonName + '"]').on('click', promise);
            }
        }
        this.$currentDialogWindow.find('.proceed').on('click', function () {
            if (this.currentDialogData.check()) {
                this.currentDialogPromise();
            }
        }.bind(this));
    },

    /**
     * Проверить совместимость параметров.
     *
     * @param {Object} parameters
     * @param {Object} checks
     * @private
     */
    _checkParametersIntegrity (parameters, checks) {
        if (typeof parameters !== 'object' || parameters === null) {
            throw 'Ошибка проверки целостности! Ожидается объект с параметрами.';
        }
        if (typeof checks !== 'object' || checks === null) {
            throw 'Ошибка проверки целостности! Ожидается объект с проверками.';
        }

        let callerName = parameters.callerName;
        if (!callerName) {
            callerName = (new Error()).stack.replace(/^Error\s+/, ''); // Sanitize Chrome
            callerName = callerName.split("\n")[1]; // 1st item is this, 2nd item is caller
            callerName = callerName.replace(/^\s+at Object./, '') // Sanitize Chrome
                .replace(/ \(.+\)$/, '') // Sanitize Chrome
                .replace(/\@.+/, '') // Sanitize Firefox
                .replace(/at /, '')
                .trim();
        }

        for (let parameterKey in checks) {
            if (checks.hasOwnProperty(parameterKey)) {
                let type = checks[parameterKey];
                if (typeof type === 'object') {
                    let subParameters = $.extend(true, {}, parameters[parameterKey]);
                    subParameters.callerName = callerName;
                    this._checkParametersIntegrity(subParameters, type);
                } else {
                    let typeList = type.split('|');
                    if (typeList.indexOf(typeof parameters[parameterKey]) === -1) {
                        throw 'Функция ' + callerName + ' не передала ' + this.integrityTypeNames[type] + ' ' + parameterKey + '.';
                    }
                }
            }
        }
    },

    /**
     * Проверить выпадающий список текущего диалога.
     */
    checkWindowSelect (elementName) {
        return Boolean(this.$currentDialogWindow.find('[name="' + elementName + '"]').val());
    },

    /**
     * Расшифровка типов.
     */
    integrityTypeNames: {
        boolean: 'булево значение',
        string: 'строка',
        object: 'объект',
        function: 'функция'
    },

    /**
     * Начать игру с настройками.
     *
     * @param {Object} settings
     */
    startWithSettings (settings) {
        debugger;
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        this.footer.destroy();
        delete this.footer;

        this.header.destroy();
        delete this.header;

        this.myCountry.destroy();
        delete this.myCountry;

        this.layer.destroy();
        delete this.layer;
    }

};

$(function () {
    let application = new Main();
    application.destroy();
});
