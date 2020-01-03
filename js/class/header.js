/**
 * Заголовок.
 *
 * @class Header
 * @param {Object} parameters
 * @constructor
 */
let Header = function (parameters) {
    if (typeof parameters !== 'object' || parameters === null) {
        throw 'Неправильный формат параметров.';
    }

    this.$header = parameters.$header;
    if (typeof this.$header !== 'object' || this.$header === null) {
        throw 'Неправильный формат параметра $header';
    }

    this.country = parameters.country;
    if (typeof this.country !== 'object' || this.country === null || !(this.country instanceof Country)) {
        throw 'Неправильный формат параметра country';
    }
};

/**
 * Методы класса Header.
 */
Header.prototype = {

    /**
     * Обновить заголовок.
     */
    refreshHeader: function () {
        this.refreshCountryName();
        this.refreshYear();
    },

    /**
     * Обновить название страны.
     */
    refreshCountryName: function () {
        if (typeof this.$countryName === 'undefined') {
            this.$countryName = $('<span/>');
            this.$countryName.appendTo(this.$header);
            this.$countryName.addClass('country-name');
        }

        let countryName = this.country.getName();
        this.$countryName.text(countryName);
    },

    /**
     * Обновить год.
     */
    refreshYear: function () {
        if (typeof this.$year === 'undefined') {
            this.$year = $('<span/>');
            this.$year.appendTo(this.$header);
            this.$year.addClass('year');
        }

        let year = this.country.year;
        this.$year.text('Год ' + year + '-й');
    },

    /**
     * Уничтожить привязки.
     */
    destroy: function () {
        this.$countryName.remove();
        delete this.$countryName;

        this.$year.remove();
        delete this.$year;
    }

};