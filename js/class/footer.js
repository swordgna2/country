/**
 * Низ.
 *
 * @class Footer
 * @param {Object} parameters
 * @constructor
 */
let Footer = function (parameters) {
    if (typeof parameters !== 'object' || parameters === null) {
        throw 'Неправильный формат параметров.';
    }

    this.$footer = parameters.$footer;
    if (typeof this.$footer !== 'object' || this.$footer === null) {
        throw 'Неправильный формат параметра $footer';
    }

    this.country = parameters.country;
    if (typeof this.country !== 'object' || this.country === null || !(this.country instanceof Country)) {
        throw 'Неправильный формат параметра country';
    }
};

/**
 * Методы класса Footer.
 */
Footer.prototype = {

    /**
     * Обновить низ.
     */
    refreshFooter: function () {
        if (typeof this.$footerMenu === 'undefined') {
            this.$footerMenu = $('<ul/>');
            this.$footerMenu.appendTo(this.$footer);
            this.$footerMenu.addClass('footer-menu');

            this.$footerMenu.append($('<li/>').addClass('statistics').text('Статистика'));
            this.$footerMenu.append($('<li/>').addClass('help').text('Помощь'));
        }
    },

    /**
     * Установить отслеживание нажатий по элементам меню.
     *
     * @param {Object} events
     */
    listenFooterMenuForElementClicks: function (events) {
        if (typeof events === 'object' && events !== null) {
            for (let element in events) {
                if (events.hasOwnProperty(element) && typeof events[element] === 'function') {
                    let eventListener = events[element];
                    this.$footerMenu.find('.' + element).on('click', eventListener);
                }
            }
        }
    },

    /**
     * Уничтожить привязки.
     */
    destroy: function () {
        this.$footerMenu.remove();
        delete this.$footerMenu;
    }

};