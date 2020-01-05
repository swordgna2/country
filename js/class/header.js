/**
 * Заголовок.
 *
 * @class Header
 * @param {Object} parameters
 * @constructor
 */
let Header = function (parameters) {
    functions.checkParametersIntegrity(parameters, {
        $header: 'object',
        country: 'object'
    });

    this.$header = parameters.$header;
    this.country = parameters.country;
    if (!(this.country instanceof Country)) {
        throw 'Неправильный формат параметра country, ожидается объект класса Country.';
    }
};

/**
 * Методы класса Header.
 */
Header.prototype = {

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
            this.$countryName.addClass('country-name');
        }

        let countryName = this.country.getName();
        this.$countryName.html('<i class="fa fa-globe"></i>&nbsp;' + countryName);
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

        let year = this.country.year;
        this.$year.html('<i class="fa fa-calendar"></i>&nbsp;Год ' + year + '-й');
    },

    /**
     * Уничтожить привязки.
     */
    destroy () {
        this.$countryName.remove();
        delete this.$countryName;

        this.$year.remove();
        delete this.$year;
    }

};