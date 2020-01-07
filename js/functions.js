let functions = {

    /**
     * Получить целое случайное число.
     *
     * @param {Number} minimum
     * @param {Number} maximum
     * @return {Number}
     */
    getIntegerRandom (minimum, maximum) {
        let integerRandom = minimum - 0.5 + (maximum - minimum + 1) * Math.random();
        return Math.round(integerRandom);
    },

    /**
     * Получить случайное булево значение.
     *
     * @return {Boolean}
     */
    getBooleanRandom () {
        return Math.random() > 0.5;
    },

    /**
     * Проверить совместимость параметров.
     *
     * @param {Object} parameters
     * @param {Object} checks
     * @private
     */
    checkParametersIntegrity (parameters, checks) {
        if (typeof parameters !== 'object' || parameters === null) {
            throw 'Ошибка проверки целостности! Ожидается объект с параметрами.';
        }
        if (typeof checks !== 'object' || checks === null) {
            throw 'Ошибка проверки целостности! Ожидается объект с проверками.';
        }

        let callerName = parameters.callerName;
        if (!callerName) {
            callerName = this.getCallerName();
        }

        for (let parameterKey in checks) {
            if (checks.hasOwnProperty(parameterKey)) {
                let type = checks[parameterKey];
                if (typeof type === 'object') {
                    let subParameters = $.extend(true, {}, parameters[parameterKey]);
                    subParameters.callerName = callerName;
                    this.checkParametersIntegrity(subParameters, type);
                } else {
                    let typeList = type.split('|');
                    if (typeList.indexOf(typeof parameters[parameterKey]) === -1) {
                        throw 'Функция ' + callerName + ' не передала ' + this.integrityTypeNames[typeList[0]] + ' ' + parameterKey + '.';
                    }
                }
            }
        }
    },

    /**
     * Получить наименование функции, вызвавшей функцию, вызвавшую данную функцию.
     *
     * @return {string}
     */
    getCallerName () {
        let stack = (new Error()).stack.replace(/^Error\s+/, ''); // Sanitize Chrome
        return stack.split("\n")[2] // [0] is this, [1] is caller, [2] is caller of caller
            .replace(/^\s+at Object./, '') // Sanitize Chrome
            .replace(/ \(.+\)$/, '') // Sanitize Chrome
            .replace(/\@.+/, '') // Sanitize Firefox
            .replace(/at /, '')
            .trim();
    },

    /**
     * Расшифровка типов.
     */
    integrityTypeNames: {
        boolean: 'булево значение',
        string: 'строка',
        object: 'объект',
        function: 'функция'
    },

    /**
     * Всплывающее окно с предупреждением.
     *
     * @param {string} message
     */
    alert (message) {
        new Modal({
            uniqueId: 'alert',
            $html: message,
            windowClass: 'modal-alert',
            appearanceEffect: 'fadeIn'
        });
    },

    /**
     * Всплывающее окно с информацией.
     *
     * @param {Object} parameters
     */
    inform (parameters) {
        this.checkParametersIntegrity(parameters, {
            message: 'string|object'
        });
        new Modal({
            uniqueId: 'inform',
            $container: parameters.$container,
            $html: parameters.message,
            windowClass: 'modal-inform',
            appearanceEffect: 'fadeIn'
        })
    },

    /**
     * Преобразовать коэффициент (0...1) в формат процента.
     *
     * @param {Number} k
     * @param {Number} precision
     * @returns {string}
     */
    convertKToPercent: function (k, precision) {
        k = isNaN(k) ? 0 : k;
        precision = isNaN(precision) ? 0 : precision.toFixed(0);
        return (k * 100).toFixed(precision);
    },

    /**
     * Добавить иконку в зависимости от значения процента.
     *
     * @param {Number|string} value
     * @returns {string}
     */
    colorPercentValue: function (value) {
        if (value <= 33.333) {
            return value + '&nbsp;<i class="fa fa-exclamation-triangle bad-condition"></i>';
        } else if (value < 66.667) {
            return value.toString();
        } else {
            return value + '&nbsp;<i class="fa fa-check-square-o good-condition"></i>';
        }
    },

    /**
     * Вычислить среднее арифметическое.
     *
     * @param {Object|Array} numbers
     * @return {Number}
     */
    average: function (numbers) {
        numbers = Object.values(numbers);
        if (numbers.length) {
            return numbers.reduce((a, b) => (a + b)) / numbers.length;
        } else {
            return 0;
        }
    }

};
