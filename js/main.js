/**
 * Главный.
 *
 * @class Main
 * @constructor
 */
let Main = function () {
    this.createComponents();

    this.myCountry = new Country();

    this.year = this.applyChildComponent(new Year(), {});

    this.layer = this.applyChildComponent(new Layer(), {});
    this.layer.createLayer();

    this.header = this.applyChildComponent(new Header(), {
        $header: this.layer.$header
    });

    this.log = this.applyChildComponent(new Log(), {
        $dialog: this.layer.$dialog
    });

    this.statistics = this.applyChildComponent(new Statistics(), {
        $statistics: this.layer.$statistics
    });

    this.footer = this.applyChildComponent(new Footer(), {
        $footer: this.layer.$footer
    });

    this.dialog = this.applyChildComponent(new Dialog(), {});

    this.help = this.applyChildComponent(new Help(), {});

    this.createCrossReferences();

    this.header.refreshHeader();
    this.footer.refreshFooter();
    this.dialog.openDialog({
        $container: this.layer.$wrapper,
        dialogId: 'select-my-country',
        promise: this.startWithSettings.bind(this)
    });
};

/**
 * Методы класса Main.
 */
Main.prototype = {

    /**
     * Создать компоненты.
     */
    createComponents () {
        for (let i = 0; i < this.componentNames.length; i++) {
            let componentName = this.componentNames[i];
            this[componentName] = {};
        }
    },

    /**
     * Зарегистрированные компоненты.
     * Будут доступны перекрёстно в каждом из компонентов.
     */
    componentNames: [ 'myCountry', 'layer', 'header', 'log', 'statistics', 'footer', 'dialog', 'help', 'year' ],

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
     * Создать перекрёстные ссылки между компонентами.
     */
    createCrossReferences () {
        for (let original = 0; original < this.componentNames.length; original++) {
            let originalComponentName = this.componentNames[original];
            let originalComponent = this[originalComponentName];
            for (let each = 0; each < this.componentNames.length; each++) {
                let eachComponentName = this.componentNames[each];
                originalComponent[eachComponentName] = this[eachComponentName];
            }
        }
    },

    /**
     * Отобразить статистику.
     */
    showStatistics () {
        new Modal({
            uniqueId: 'show-statistics',
            $html: 'Todo: отобразить статистику.'
        });
    },

    /**
     * Отобразить помощь.
     */
    showHelp () {
        new Modal({
            uniqueId: 'show-help',
            $html: 'Todo: отобразить помощь.'
        });
    },

    /**
     * Начать игру с настройками.
     *
     * @param {Object} settings
     */
    startWithSettings (settings) {
        this.difficulty = settings.difficulty;
        this.myCountry = Country.prototype.countries[settings.countryCode];
        this.year.startNewYear();
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        delete this.difficulty;

        this.removeCrossReferences();
        this.deleteChildComponents();
    },

    /**
     * Удалить перекрёстные ссылки между компонентами.
     */
    removeCrossReferences () {
        for (let original = 0; original < this.componentNames.length; original++) {
            let originalComponentName = this.componentNames[original];
            let originalComponent = this[originalComponentName];
            for (let each = 0; each < this.componentNames.length; each++) {
                let eachComponentName = this.componentNames[each];
                delete originalComponent[eachComponentName];
            }
        }
    },

    /**
     * Уничтожить, а затем удалить дочерние компоненты.
     */
    deleteChildComponents: function () {
        for (let i = this.componentNames.length - 1; i >= 0; i--) {
            let componentName = this.componentNames[i];
            this[componentName].destroy();
            delete this[componentName];
        }
    }

};
