$(function () {
    window.game = new Main();
    debug();
    console.log(window.game);
});

function debug () {
    $('.modal-dialog button[name="random"]').trigger('click');
    $('.modal-dialog button[name="proceed"]').trigger('click');
    $('.main-header .country-name').trigger('click');
}