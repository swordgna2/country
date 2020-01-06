/**
 * Главный.
 *
 * @class Main
 * @constructor
 */
let Main = function () {
    this.myCountry = this.applyChildComponent(new Country(), {});

    this.layer = this.applyChildComponent(new Layer(), {});
    this.layer.createLayer();

    this.header = this.applyChildComponent(new Header(), {
        $header: this.layer.$header
    });
    this.header.refreshHeader();

    this.statistics = this.applyChildComponent(new Statistics(), {
        $statistics: this.layer.$statistics
    });

    this.footer = this.applyChildComponent(new Footer(), {
        $footer: this.layer.$footer
    });
    this.footer.refreshFooter();

    this.dialog = this.applyChildComponent(new Dialog(), {});
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
     * Применить свойства дочернему компоненту.
     *
     * @param {Object} childComponent
     * @param {Object} parameters
     * @returns {Object}
     */
    applyChildComponent (childComponent, parameters) {
        parameters = $.extend(true, { parent: this }, parameters);
        ChildComponent.apply(childComponent, [ parameters ]);
        return childComponent;
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
     * Начать игру с настройками.
     *
     * @param {Object} settings
     */
    startWithSettings (settings) {
        this.year = 0;
        this.difficulty = settings.difficulty;
        this.myCountry.setCountryCode(settings.countryCode);
        this.myCountry.setCountryDefaults();
        this.myCountry.createNeighbors();
        this.startNewYear();
    },

    /**
     * Начать новый год.
     */
    startNewYear () {
        this.year++;
        console.log('Начат год', this.year);
        this.header.refreshHeader();
        this.statistics.refreshStatistics();
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        delete this.difficulty;
        delete this.year;

        this.deleteChildComponents([ 'dialog', 'footer', 'statistics', 'header', 'layer', 'myCountry' ]);
    },

    /**
     * Уничтожить, а затем удалить дочерние компоненты.
     *
     * @param {Array} componentNames
     */
    deleteChildComponents: function (componentNames) {
        for (let i = 0; i < componentNames; i++) {
            let componentName = componentNames[i];
            this[componentName].destroy();
            delete this[componentName];
        }
    }

};
