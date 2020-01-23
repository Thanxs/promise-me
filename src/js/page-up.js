$(window).scroll(() => {
    if ($(this).scrollTop() > 600) {
        $('#page-up').fadeIn();
    } else {
        $('#page-up').fadeOut();
    }
});


$('#page-up').click(() => {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});
