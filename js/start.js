$(function () {
    // let game = new Main();
    // game.destroy();
    new Main();
    // debug();
});

function debug () {
    $('.modal-dialog button[name="random"]').trigger('click');
    $('.modal-dialog button[name="proceed"]').trigger('click');
}