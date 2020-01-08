/**
 * Модальное окно.
 *
 * @class Modal
 * @constructor
 * @param {Object} parameters
 */
let Modal = function (parameters) {
    this.setParameters(parameters);
    this.open();
};

/**
 * Методы класса Modal.
 */
Modal.prototype = {

    /**
     * Установить параметры.
     *
     * @param {Object} parameters:
     *        {Object} parameters.$container - контейнер для окна;
     *        {Object} parameters.$html - вёрстка окна;
     *        {string} parameters.windowClass - класс окна, по умолчанию "modal-window-default";
     *        {Boolean} parameters.closeIcon - признак отображения иконки закрытия окна, по умолчанию "true";
     *        {Boolean} parameters.modal - признак модального окна (нельзя закрыть по нажатию по фоновой области/кнопкой Escape);
     *        {function} parameters.onClose - функция обратного вызова после закрытия окна.
     */
    setParameters (parameters) {
        if (typeof parameters === 'object' && parameters !== null) {
            this.uniqueId = parameters.uniqueId || '';
            this.$container = parameters.$container || $('body');
            this.$html = parameters.$html;
            this.windowClass = parameters.windowClass;
            this.closeIcon = parameters.closeIcon !== false;
            this.modal = Boolean(parameters.modal);
            this.onClose = typeof parameters.onClose === 'function' ? parameters.onClose : function () {};
            this.appearanceEffect = parameters.appearanceEffect || '';
        }
    },

    /**
     * Показать окно.
     */
    open () {
        if (this.$html) {
            this.close({
                instantly: true,
                promise: function () {}
            });
            this.checkForModalWithThisId();
            this.createLayers();
            this.$window.append(this.$html);
            this.listenClose();
            this.animateWindow();
        }
    },

    /**
     * Проверить существование окна с данным уникальным идентификатором.
     */
    checkForModalWithThisId: function () {
        if (this.uniqueId) {
            $('.modal-background').trigger('close-anyway.' + this.uniqueId);
        }
    },

    /**
     * Создать слои.
     */
    createLayers () {
        this.$background = $('<div/>');
        this.$background.appendTo(this.$container);
        this.$background.addClass('modal-background');

        this.$window = $('<div/>');
        this.$window.appendTo(this.$background);
        this.$window.addClass('modal-window-default');
        this.$window.addClass(this.windowClass);
        this.$window.on('click', function (event) {
            event.stopPropagation();
        });

        if (this.closeIcon) {
            this.$close = $('<i class="modal-window-close fa fa-times"/>');
            this.$close.appendTo(this.$window);
        }
    },

    /**
     * Установить действие закрытия окна.
     */
    listenClose () {
        $(this.$close).on('click', this.close.bind(this));
        if (!this.modal) {
            this.$background.on('click', this.close.bind(this));
            $(document).on('keyup', function (event) {
                if (event.keyCode === 27) {
                    this.close({});
                }
            }.bind(this));
        }

        if (this.uniqueId) {
            this.$background.on('close-anyway.' + this.uniqueId, function () {
                console.log(this.uniqueId);
                this.close({
                    instantly: true,
                    promise: function () {}
                });
            }.bind(this));
        }
    },

    /**
     * Закрыть окно.
     *
     * @param {Object} options
     *        {Boolean} options.instantly - немедленно
     *        {function} options.promise - функция обратного вызова после завершения операции
     */
    close (options) {
        options = (typeof options === 'object' && options !== null) ? options : {};
        let promise = options.promise || this.onClose;
        promise = (typeof promise === 'function') ? promise : function () {};
        let $background = $(this.$background);
        let $window = $(this.$window);

        $(document).off('keyup');

        if (options.instantly) {
            $background.remove();
            promise();
        } else {
            $window.fadeOut('fast');
            $background.fadeOut('slow', function () {
                $background.remove();
                promise();
            }.bind(this));
        }
    },

    /**
     * Анимировать окно.
     */
    animateWindow: function () {
        if (this.appearanceEffect === 'fadeIn') {
            $(this.$window).hide().fadeIn('fast');
        }
    },

    /**
     * Уничтожить привязки.
     */
    destroy () {
        this.close({
            instantly: true
        });
        delete this.$html;
        delete this.appearanceEffect;
        delete this.onClose;
        delete this.modal;
        delete this.closeIcon;
        delete this.windowClass;
        delete this.$close;
        delete this.$window;
        delete this.$background;
        delete this.$container;
    }

};