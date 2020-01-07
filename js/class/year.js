/**
 * Игровой год.
 *
 * @class Year
 * @constructor
 */
let Year = function () {
    this.number = 0;
};

/**
 * Методы класса Year.
 */
Year.prototype = {

    /**
     * Начать новый год.
     */
    startNewYear () {
        this.number++;
        this.log.add('Начат ' + this.number + '-й год правления.');
        this.header.refreshHeader();
        this.statistics.refreshStatistics();
    }

};
