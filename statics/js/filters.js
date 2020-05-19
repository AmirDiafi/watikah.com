/*global $, document, alert, console, log*/
$(document).ready(function() {
    
    //filter just for select category that choosen
    let category = $('.param-category').text()
    $('.status.container .status-filter .status').filter(function () {
        $(this).toggle($(this).find('.category-val').text().search(category) >= 0);
    });

    // Start Search for users
    $(".search-bar form input[type='search']").on('blur', function() {
        $('ul.users-result').slideUp(500)
        $('.search-bar form input[type="search"]').removeClass('search-active')
        $('.search-bar form button').removeClass('search-icon-active')
    })
    $(".search-bar form input[type='search']").on('keyup', function () {
        let user = $(this).val().toLowerCase();
        $('ul.users-result').slideDown(500)
        $('ul.users-result li').filter(function () {
            $(this).toggle($(this).find('p').text().toLowerCase().search(user) >=0);
        })
        $('.search-bar form input[type="search"]').addClass('search-active')
        $('.search-bar form button').addClass('search-icon-active')
    })

    // Satrt Go Down Button
    $('.go-down').click(function () {
        $('html, body').animate({
            scrollTop: ($('.allposts').offset().top - 120)
        }, 700)
    })

    // Make The Navbar Transparent Whene It Gose To First Section

    $(window).on('scroll', function () {
        if ($(window).scrollTop() <=  200) {
            $('.the-navbar').css({backgroundColor: "#004085ab"})
        } else {
            $('.the-navbar').css({backgroundColor: "#004085"})
        }
    })
})