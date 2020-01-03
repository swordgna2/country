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
};

Main.prototype = {

    /**
     * Отобразить статистику.
     */
    showStatistics: function () {
        alert('Todo: отобразить статистику.');
    },

    /**
     * Отобразить помощь.
     */
    showHelp: function () {
        alert('Todo: отобразить помощь.');
    },

    /**
     * Уничтожить зависимости.
     */
    destroy: function () {
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
    new Main();
});
