/**
 * Страна.
 *
 * @class Country
 * @constructor
 */
let Country = function () {
    this.neighbors = [];
};

/**
 * Методы класса Country.
 */
Country.prototype = {

    /**
     * Автоматически создать все страны.
     */
    autoSetCountries: function () {
        for (let i = 0; i < this.names.length; i++) {
            let newCountry = new Country();
            newCountry.countryCode = i;
            newCountry.setCountryDefaults();
            this.countries[i] = newCountry;
        }
        for (let i = 0; i < this.countries.length; i++) {
            this.countries[i].addRandomNeighbor();
        }
        for (let i = 0; i < this.countries.length; i++) {
            if (this.countries[i].neighbors.length < 2) {
                this.countries[i].addRandomNeighbor();
            }
        }
    },

    /**
     * Наименования стран.
     */
    names: [
        "Австралия",
        "Австрия",
        "Азербайджан",
        "Албания",
        "Алжир",
        "Ангола",
        "Андорра",
        "Антигуа и Барбуда",
        "Аргентина",
        "Армения",
        "Афганистан",
        "Багамские Острова",
        "Бангладеш",
        "Барбадос",
        "Бахрейн",
        "Белоруссия",
        "Белиз",
        "Бельгия",
        "Бенин",
        "Болгария",
        "Боливия",
        "Босния и Герцеговина",
        "Ботсвана",
        "Бразилия",
        "Бруней",
        "Буркина-Фасо",
        "Бурунди",
        "Бутан",
        "Вануату",
        "Великобритания",
        "Венгрия",
        "Венесуэла",
        "Восточный Тимор",
        "Вьетнам",
        "Габон",
        "Гаити",
        "Гайана",
        "Гамбия",
        "Гана",
        "Гватемала",
        "Гвинея",
        "Гвинея-Бисау",
        "Германия",
        "Гондурас",
        "Гренада",
        "Греция",
        "Грузия",
        "Дания",
        "Джибути",
        "Доминика",
        "Доминиканская Республика",
        "Египет",
        "Замбия",
        "Зимбабве",
        "Израиль",
        "Индия",
        "Индонезия",
        "Иордания",
        "Ирак",
        "Иран",
        "Ирландия",
        "Исландия",
        "Испания",
        "Италия",
        "Йемен",
        "Кабо-Верде",
        "Казахстан",
        "Камбоджа",
        "Камерун",
        "Канада",
        "Катар",
        "Кения",
        "Кипр",
        "Киргизия",
        "Кирибати",
        "Китай",
        "Колумбия",
        "Коморы",
        "Республика Конго",
        "Демократическая Республика Конго",
        "КНДР",
        "Республика Корея",
        "Коста-Рика",
        "Кот-д’Ивуар",
        "Куба",
        "Кувейт",
        "Лаос",
        "Латвия",
        "Лесото",
        "Либерия",
        "Ливан",
        "Ливия",
        "Литва",
        "Лихтенштейн",
        "Люксембург",
        "Маврикий",
        "Мавритания",
        "Мадагаскар",
        "Малави",
        "Малайзия",
        "Мали",
        "Мальдивы",
        "Мальта",
        "Марокко",
        "Маршалловы Острова",
        "Мексика",
        "Мозамбик",
        "Молдавия",
        "Монако",
        "Монголия",
        "Мьянма",
        "Намибия",
        "Науру",
        "Непал",
        "Нигер",
        "Нигерия",
        "Нидерланды",
        "Никарагуа",
        "Новая Зеландия",
        "Норвегия",
        "ОАЭ",
        "Оман",
        "Пакистан",
        "Палау",
        "Панама",
        "Папуа",
        "Парагвай",
        "Перу",
        "Польша",
        "Португалия",
        "Россия",
        "Руанда",
        "Румыния",
        "Сальвадор",
        "Самоа",
        "Сан-Марино",
        "Сан-Томе и Принсипи",
        "Саудовская Аравия",
        "Северная Македония",
        "Сейшельские Острова",
        "Сенегал",
        "Сент-Винсент и Гренадины",
        "Сент-Китс и Невис",
        "Сент-Люсия",
        "Сербия",
        "Сингапур",
        "Сирия",
        "Словакия",
        "Словения",
        "США",
        "Соломоновы Острова",
        "Сомали",
        "Судан",
        "Суринам",
        "Сьерра-Леоне",
        "Таджикистан",
        "Таиланд",
        "Танзания",
        "Того",
        "Тонга",
        "Тринидад и Тобаго",
        "Тувалу",
        "Тунис",
        "Туркмения",
        "Турция",
        "Уганда",
        "Узбекистан",
        "Украина",
        "Уругвай",
        "Федеративные Штаты Микронезии",
        "Фиджи",
        "Филиппины",
        "Финляндия",
        "Франция",
        "Хорватия",
        "Центральноафриканская Республика",
        "Чад",
        "Черногория",
        "Чехия",
        "Чили",
        "Швейцария",
        "Швеция",
        "Шри-Ланка",
        "Эквадор",
        "Экваториальная Гвинея",
        "Эритрея",
        "Эсватини",
        "Эстония",
        "Эфиопия",
        "ЮАР",
        "Южный Судан",
        "Ямайка",
        "Япония"
    ],

    /**
     * Страны.
     */
    countries: [],

    /**
     * Установить умолчания для страны.
     */
    setCountryDefaults () {
        this.geo = {
            plain: functions.getIntegerRandom(5000, 10000),
            woods: functions.getIntegerRandom(5000, 10000),
            mountains: functions.getIntegerRandom(5000, 10000),
            sea: functions.getBooleanRandom()
        };

        this.people = {
            peasants: functions.getIntegerRandom(100, 200),
            workers: functions.getIntegerRandom(50, 100),
            warriors: functions.getIntegerRandom(25, 50),
            priests: functions.getIntegerRandom(10, 20)
        };

        this.stocks = {
            money: functions.getIntegerRandom(1000, 2000),
            gold: functions.getIntegerRandom(10, 20),
            corn: this.geo.plain * functions.getIntegerRandom(5, 10),
            wood: this.geo.woods * functions.getIntegerRandom(5, 10),
            minerals: /*полезные ископаемые*/ this.geo.mountains * functions.getIntegerRandom(5, 10)
        };

        this.pendingEvents = {
            seafaring: (this.geo.sea && Math.random() > 0.75) ? functions.getIntegerRandom(1, 3) : 0,
            wedding: 0,
            childBirth: 0
        };

        this.mood = {
            peasants: 0.5,
            workers: 0.5,
            warriors: 0.5,
            priests: 0.5
        };
    },

    /**
     * Добавить стране соседа.
     */
    addRandomNeighbor () {
        let neighborCode = functions.getIntegerRandom(0, this.countries.length - 1);
        this.neighbors.push(neighborCode);
        this.countries[neighborCode].neighbors.push(this.countryCode);
    },

    /**
     * Получить наименование страны.
     *
     * @returns {string}
     */
    getName () {
        if (typeof this.countryCode !== 'undefined') {
            return this.names[this.countryCode];
        } else {
            return 'Страна без названия';
        }
    },

    /**
     * Получить форматированный список соседей.
     *
     * @return {Array}
     */
    getNeighborsListFormatted () {
        let list = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            let neighbor = this.countries[this.neighbors[i]];
            let mood = functions.average(neighbor.mood);
            mood = functions.convertKToPercent(mood, 0);
            mood = functions.colorPercentValue(mood);
            list.push(neighbor.getName() + '&nbsp;&mdash;&nbsp;' + mood + '%');
        }
        return list;
    },

    /**
     * Уничтожить зависимости.
     */
    destroy () {
        delete this.mood;
        delete this.pendingEvents;
        delete this.stocks;
        delete this.people;
        delete this.geo;
        delete this.countryCode;
        delete this.neighbors;
        this.countries = [];
    }

};

Country.prototype.autoSetCountries();