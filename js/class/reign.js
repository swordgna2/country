/**
 * Игровой год.
 *
 * @class Reign
 * @constructor
 */
let Reign = function () {
    this.number = 0;
};

/**
 * Методы класса Reign.
 */
Reign.prototype = {

    /**
     * Начать новый год.
     */
    startNewYear () {
        this.number++;
        this.log.add('Начат ' + this.number + '-й год правления.');
        this.header.refreshHeader();
        this.statistics.refreshStatistics();
        this.workersDistribution();
    },

    /**
     * Распределение работников.
     */
    workersDistribution () {
        this.dialog.openDialog({
            dialogId: 'workers-distribution',
            promise: this.harvesting.bind(this)
        });
    },

    /**
     * Сбор урожая.
     */
    harvesting () {

    }

};
