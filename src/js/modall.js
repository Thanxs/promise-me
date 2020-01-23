$(".sign__tab").click(function(e) {
    e.preventDefault();
    $(".sign__tab").removeClass('active_border');
    $(this).addClass('active_border');
    $(".sign__tab-content-reg").addClass('display_none')
})

$(".sign__tab a").click(function(e) {
    e.preventDefault();
    $(".sign__tab a").removeClass('active_font');
    $(this).addClass('active_font');
})

$(".btn").click(function(e) {
    e.preventDefault();
    $(".modal-box").addClass('active')
})

$("#popup_reg_tab").click(function() {
    $(".sign__tab-content").addClass('passive')
    $(".sign__tab-content-reg").removeClass('passive')
})

$("#popup_login_tab").click(function() {
    $(".sign__tab-content-reg").addClass('passive')
    $(".sign__tab-content").removeClass('passive')
})

$(".overlay").click(function() {
    $('.modal-box').removeClass('active')
})