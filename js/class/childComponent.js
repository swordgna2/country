/**
 * Дочерний компонет для наследования классов от класса Main.
 *
 * @class ChildComponent
 * @constructor
 */
let ChildComponent = function (parameters) {

    functions.checkParametersIntegrity(parameters, {
        parent: 'object'
    });
    this.parent = parameters.parent;
    if (!(this.parent instanceof Main)) {
        throw 'Неправильный формат параметра parent, ожидается объект класса Main.';
    }
    if (typeof this.setInitialParameters === 'function') {
        this.setInitialParameters(parameters);
    }

};
