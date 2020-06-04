/*global $, document, ready, alert, console*/

$(document).ready(function () {
    // Set the background mode user has select
    if($('body').hasClass('light-mode')) {
        $('.selected-light').addClass('selected');
    }
    $('.switch-icon').removeClass('selected');
    $('body, .post , .notifications ul, .small, .the-follow-inner, .send-message, .file').removeClass('dark-mode light-mode');
    $('body, .post , .notifications ul, .small, .the-follow-inner, .send-message, .file').addClass(localStorage.getItem('switchMode'));
    $(localStorage.getItem('choice')).addClass('selected');

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

    //Toggle Dark mode
    $('.switch-mode span').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        localStorage.setItem('choice', $(this).data('choice'));
        localStorage.setItem('switchMode', $(this).data('color'));
        $('body, .post , .notifications ul, .small, .the-follow-inner, .send-message, .file').removeClass('dark-mode light-mode');
        $('body, .post, .notifications ul, .small, .the-follow-inner, .send-message, .file').addClass($(this).data('color'));
       
    })

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
