/**
 * Диалог.
 *
 * @class Dialog
 * @constructor
 */
let Dialog = function () {
};

/**
 * Методы класса Dialog
 */
Dialog.prototype = {

    /**
     * Данные диалогов.
     */
    dialogData: {
        'select-my-country': {
            $header: 'Начало игры',
            $content:
                '<p>Выберите страну, за которую играете:</p>' +
                '<p><i class="fa fa-globe"></i>&nbsp;<select name="country"/>&nbsp;<button name="random"><i class="fa fa-refresh"></i> случайная</button></p>' +
                '<p>Выберите сложность:</p>' +
                '<p><i class="fa fa-graduation-cap"></i>&nbsp;<select name="difficulty"/></p>',
            $footer: '<button name="proceed">Продолжить</button>',
            form: {
                country: {
                    type: 'select',
                    addEmptyOption: 'Выберите страну',
                    options: function () {
                        return this.parent.myCountry.names;
                    }
                },
                difficulty: {
                    type: 'select',
                    options: {
                        easy: 'легко',
                        normal: 'нормально',
                        difficult: 'сложно'
                    },
                    default: 'normal'
                }
            },
            buttons: {
                random () {
                    let $countries = this.modal.$window.find('[name="country"]');
                    let randomCountry = functions.getIntegerRandom(1, $countries.prop('options').length);
                    $countries.val(randomCountry);
                }
            },
            check () {
                this.tempStorage.countryCode = this.validateWindowSelect('country', 'Выберите страну.');
                return Boolean(this.tempStorage.countryCode);
            },
            getResultData () {
                return {
                    countryCode: this.tempStorage.countryCode,
                    difficulty: this.modal.$window.find('[name="difficulty"]').val()
                };
            }
        }
    },

    /**
     * Отобразить диалог.
     *
     * @param {Object} parameters
     */
    openDialog(parameters) {
        functions.checkParametersIntegrity(parameters, {
            dialogId: 'string|number',
            promise: 'function|undefined'
        });
        this.clearTempStorage();
        this.setCurrentDialog(parameters.dialogId);
        this.currentDialogPromise = (typeof parameters.promise === 'function') ? parameters.promise : function () {};
        this.showDialogWindow();
        this.setFormData();
        this.listenDialogButtons();
    },

    /**
     * Очистить временное хранилище.
     */
    clearTempStorage () {
        this.tempStorage = {};
    },

    /**
     * Установить текущий диалог.
     *
     * @param {string} dialogId
     */
    setCurrentDialog (dialogId) {
        this.currentDialogData = this.dialogData[dialogId];
        if (this.currentDialogData === undefined) {
            throw 'Диалог ' + dialogId + ' не существует.';
        }
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

        if (typeof this.currentDialogData.getResultData !== 'function') {
            this.currentDialogData.getResultData = function () {
                return {};
            }
        }
    },

    /**
     * Отобразить окно.
     */
    showDialogWindow () {
        let $html = this.getDialogHtml();
        this.modal = new Modal({
            $html: $html,
            modal: true,
            closeIcon: false,
            windowClass: 'modal-dialog'
        });
    },

    /**
     * Получить вёрстку диалога.
     *
     * @return {Array}
     */
    getDialogHtml () {
        let $html = [];

        if (typeof this.currentDialogData === 'object' && this.currentDialogData !== null) {
            let $header = $('<div/>');
            $header.addClass('modal-window-header');
            $header.append(this.currentDialogData.$header);
            $html.push($header);

            let $content = $('<div/>');
            $content.addClass('modal-window-content');
            $content.append(this.currentDialogData.$content);
            $html.push($content);

            let $footer = $('<div/>');
            $footer.addClass('modal-window-footer');
            $footer.append(this.currentDialogData.$footer);
            $html.push($footer);

            return $html;
        } else {
            throw 'Ошибка в параметре dialogData. Не задана вёрстка диалога.';
        }
    },

    /**
     * Установить данные формы.
     */
    setFormData () {
        for (let elementName in this.currentDialogData.form) {
            if (this.currentDialogData.form.hasOwnProperty(elementName)) {
                let $formElement = this.modal.$window.find('[name="' + elementName + '"]');
                if ($formElement.length) {
                    let properties = this.currentDialogData.form[elementName];
                    let elementType = properties.type;
                    switch (elementType) {
                        case 'select':
                            this.setFormSelect($formElement, properties);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    },

    /**
     * Установить свойства элемента формы "select".
     *
     * @param {Object} $select
     * @param {Object} properties
     */
    setFormSelect ($select, properties) {
        let selectOptions = $select.prop('options');
        let options = properties.options;
        if (typeof properties.options === 'function') {
            options = properties.options.bind(this)();
        }
        if (properties.addEmptyOption) {
            selectOptions[0] = new Option(properties.addEmptyOption, '');
        }
        if (typeof options === 'object' && options !== null && Object.keys(options).length) {
            for (let index in options) {
                if (options.hasOwnProperty(index)) {
                    selectOptions[selectOptions.length] = new Option(options[index], index.toString());
                }
            }
        }
        if (typeof properties.default !== 'undefined') {
            $select.val(properties.default);
        }
    },

    /**
     * Установить отслеживание нажатий по кнопкам диалога.
     */
    listenDialogButtons () {
        let buttons = $.extend(true, {
            proceed: this.onProceedDefault.bind(this)
        }, this.currentDialogData.buttons);

        for (let buttonName in buttons) {
            if (buttons.hasOwnProperty(buttonName)) {
                let promise = buttons[buttonName];
                this.modal.$window.find('[name="' + buttonName + '"]').on('click', promise.bind(this));
            }
        }
    },

    /**
     * Выполнить действие по умолчанию при нажатии на кнопку продолжения.
     */
    onProceedDefault () {
        if (this.currentDialogData.check.bind(this)()) {
            this.modal.close({});
            let promiseData = this.currentDialogData.getResultData.bind(this)();
            this.currentDialogPromise(promiseData);
        }
    },

    /**
     * Проверить выпадающий список текущего диалога.
     *
     * @param {string} selectName
     * @param {string} message
     * @return {string}
     */
    validateWindowSelect (selectName, message) {
        let selectValue = this.modal.$window.find('[name="' + selectName + '"]').val() || '';
        if (!selectValue && message) {
            functions.alert(message);
        }
        return selectValue;
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        delete this.tempStorage;
        this.modal.destroy();
        delete this.modal;
        delete this.currentDialogData;
        delete this.currentDialogPromise;
    }

};
