/**
 * Журнал.
 *
 * @class Log
 * @constructor
 */
let Log = function () {
};

/**
 * Методы класса Log.
 */
Log.prototype = {

    /**
     * Установить начальные параметры.
     *
     * @param {Object} parameters
     */
    setInitialParameters (parameters) {
        functions.checkParametersIntegrity(parameters, {
            $dialog: 'object'
        });

        this.$dialog = parameters.$dialog;
    },

    /**
     * Добавить сообщение в журнал.
     *
     * @param {string} message
     */
    add (message) {
        this.$dialog.append('<p class="log-string">' + message + '</p>');
    }

};