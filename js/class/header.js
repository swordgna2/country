/**
 * Заголовок.
 *
 * @class Header
 * @constructor
 */
let Header = function () {
};

/**
 * Методы класса Header.
 */
Header.prototype = {

    /**
     * Установить начальные параметры.
     *
     * @param {Object} parameters
     */
    setInitialParameters: function (parameters) {
        functions.checkParametersIntegrity(parameters, {
            $header: 'object'
        });

        this.$header = parameters.$header;
    },

    /**
     * Обновить заголовок.
     */
    refreshHeader () {
        this.refreshCountryName();
        this.refreshYear();
    },

    /**
     * Обновить название страны.
     */
    refreshCountryName () {
        if (typeof this.$countryName === 'undefined') {
            this.$countryName = $('<span/>');
            this.$countryName.appendTo(this.$header);
            this.$countryName.addClass('country-name link');
            this.$countryName.on('click', this.showNeighbors.bind(this));
        }

        let countryName = this.myCountry.getName();
        this.$countryName.html('<i class="fa fa-globe"></i>&nbsp;' + countryName);
    },

    /**
     * Отобразить соседей.
     */
    showNeighbors () {
        this.dialog.openDialog({
            dialogId: 'show-neighbors',
            modal: false,
            closeIcon: true
        });
    },

    /**
     * Обновить год.
     */
    refreshYear () {
        if (typeof this.$year === 'undefined') {
            this.$year = $('<span/>');
            this.$year.appendTo(this.$header);
            this.$year.addClass('year');
        }

        let year = this.year.number;
        let yearHtml = '';
        if (year >= 1) {
            yearHtml = '<i class="fa fa-calendar"></i>&nbsp;Год ' + year + '-й';
        }
        this.$year.html(yearHtml);
    },

    /**
     * Уничтожить привязки.
     */
    destroy () {
        this.$countryName.remove();
        delete this.$countryName;

        this.$year.remove();
        delete this.$year;

        delete this.$header;
    }

};