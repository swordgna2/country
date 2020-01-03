let Main = function () {
    this.init();
};

Main.prototype = {

    init: function () {
        this.createLayer();
        this.createCountry();
    },

    /**
     * Создать вёрстку.
     */
    createLayer: function () {
        this.createWrapper();
        this.createHeader();
        this.createContainer();
        this.createFooter();
    },

    /**
     * Создать главный контейнер.
     */
    createWrapper: function () {
        this.$wrapper = $('<div/>');
        this.$wrapper.appendTo($('body'));
        this.$wrapper.addClass('main-wrapper');
    },

    /**
     * Создать заголовок.
     */
    createHeader: function () {
        this.$header = $('<div/>');
        this.$header.appendTo(this.$wrapper);
        this.$header.addClass('main-header');
    },

    /**
     * Создать главный контейнер.
     */
    createContainer: function () {
        this.$container = $('<div/>');
        this.$container.appendTo(this.$wrapper);
        this.$container.addClass('main-container');
        this.createDialogContainer();
        this.createStatisticsContainer();
    },

    /**
     * Создать контейнер диалога.
     */
    createDialogContainer: function () {
        this.$dialog = $('<div/>');
        this.$dialog.appendTo(this.$container);
        this.$dialog.addClass('dialog-container');
    },

    /**
     * Создать контейнер статистики.
     */
    createStatisticsContainer: function () {
        this.$statistics = $('<div/>');
        this.$statistics.appendTo(this.$container);
        this.$statistics.addClass('statistics-container');
    },

    /**
     * Создать низ.
     */
    createFooter: function () {
        this.$footer = $('<div/>');
        this.$footer.appendTo(this.$wrapper);
        this.$footer.addClass('main-footer');
    },

    /**
     * Создать страну.
     */
    createCountry: function () {
        this.myCountry = new Country();
    },

    destroy: function () {
        this.$wrapper.remove();
        delete this.$wrapper;
    }

};

$(function () {
    new Main();
});
