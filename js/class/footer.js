/**
 * Низ.
 *
 * @class Footer
 * @constructor
 */
let Footer = function () {
};

/**
 * Методы класса Footer.
 */
Footer.prototype = {

    /**
     * Установить начальные параметры.
     *
     * @param {Object} parameters
     */
    setInitialParameters: function (parameters) {
        functions.checkParametersIntegrity(parameters, {
            $footer: 'object'
        });

        this.$footer = parameters.$footer;
    },

    /**
     * Обновить низ.
     */
    refreshFooter () {
        if (typeof this.$footerMenu === 'undefined') {
            this.$footerMenu = $('<ul/>');
            this.$footerMenu.appendTo(this.$footer);
            this.$footerMenu.addClass('footer-menu');

            this.$footerMenu.append($('<li/>').addClass('statistics').text('Статистика'));
            this.$footerMenu.append($('<li/>').addClass('help').text('Помощь'));

            this.listenFooterMenuForElementClicks({
                'statistics': this.parent.showStatistics.bind(this.parent),
                'help': this.parent.showHelp.bind(this.parent)
            });
        }
    },

    /**
     * Установить отслеживание нажатий по элементам меню.
     *
     * @param {Object} events
     */
    listenFooterMenuForElementClicks (events) {
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
    destroy () {
        this.$footerMenu.remove();
        delete this.$footerMenu;

        delete this.$footer;
    }

};