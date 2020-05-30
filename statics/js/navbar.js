// ------ Start Show/hide the list ------ //

$('.nav-item.list > .list-button').on('click', function() {
    $(this).next('ul').slideToggle(500)
})

$('.nav-item.list > ul, .navbar').on('click', function(e) {
    e.stopPropagation()
})

// ------ Start Transform Icons ------ //

$('.list-button').click(function () {
    $('.list-button .bar:first-of-type').toggleClass('one');
    $('.list-button .bar:last-of-type').toggleClass('three');
    $('.list-button .bar:nth-of-type(2)').toggleClass('tow');
})


// Start Loading Screen
$(window).on('load', function () {
    $('.load-screen .cont').fadeOut(1000, function () {
        $(this).parent('.load-screen').fadeOut(1000, function () {
            $('body').css('overflow','auto');
            $(this).remove();
        })
    });
    $('html, body').animate({
        scrollTop: 0
    }, 1000)
})
