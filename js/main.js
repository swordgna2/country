/**
 * Главный.
 *
 * @class Main
 * @constructor
 */
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

    this.dialog = new Dialog();
    this.dialog.setParentControl(this);
    this.dialog.openDialog({
        dialogId: 'select-my-country',
        promise: this.startWithSettings.bind(this)
    });
};

/**
 * Методы класса Main.
 */
Main.prototype = {

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
     * Начать игру с настройками.
     *
     * @param {Object} settings
     */
    startWithSettings (settings) {
        this.myCountry.setCountryCode(settings.countryCode);
        this.myCountry.setCountryDefaults();
        this.myCountry.createNeighbors();
        this.startNewYear();
    },

    startNewYear () {
        console.log('Начат год', this.myCountry.year);
        this.header.refreshHeader();
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        this.dialog.destroy();
        delete this.dialog;

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
    // application.destroy();
});
