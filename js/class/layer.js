/**
 * Слой.
 *
 * @class Layer
 * @constructor
 */
let Layer = function () {
};

/**
 * Методы класса Layer.
 */
Layer.prototype = {

    /**
     * Создать вёрстку.
     */
    createLayer () {
        this.createWrapper();
        this.createHeader();
        this.createContainer();
        this.createFooter();
    },

    /**
     * Создать главный контейнер.
     */
    createWrapper () {
        this.$wrapper = $('<div/>');
        this.$wrapper.appendTo($('body'));
        this.$wrapper.addClass('main-wrapper');
    },

    /**
     * Создать заголовок.
     */
    createHeader () {
        this.$header = $('<div/>');
        this.$header.appendTo(this.$wrapper);
        this.$header.addClass('main-header');
    },

    /**
     * Создать главный контейнер.
     */
    createContainer () {
        this.$container = $('<div/>');
        this.$container.appendTo(this.$wrapper);
        this.$container.addClass('main-container');
        this.createDialogContainer();
        this.createStatisticsContainer();
    },

    /**
     * Создать контейнер диалога.
     */
    createDialogContainer () {
        this.$dialog = $('<div/>');
        this.$dialog.appendTo(this.$container);
        this.$dialog.addClass('dialog-container');
    },

    /**
     * Создать контейнер статистики.
     */
    createStatisticsContainer () {
        this.$statistics = $('<div/>');
        this.$statistics.appendTo(this.$container);
        this.$statistics.addClass('statistics-container');
        this.$statistics.text('Статистика');
    },

    /**
     * Создать низ.
     */
    createFooter () {
        this.$footer = $('<div/>');
        this.$footer.appendTo(this.$wrapper);
        this.$footer.addClass('main-footer');
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        delete this.$footer;
        delete this.$statistics;
        delete this.$dialog;
        delete this.$container;
        delete this.$header;

        this.$wrapper.remove();
        delete this.$wrapper;
    }

};
