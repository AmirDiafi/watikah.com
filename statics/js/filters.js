/*global $, document, alert, console, log*/
$(document).ready(function() {
    
    // *** filter just for select module that choosen *** //
    let module = $('.param-category').text()
    $('.status.container .status-filter .status').filter(function () {
        $(this).toggle($(this).find('.category-val').text().search(module) >= 0);
    });

    // *** Satrt Go Down Button *** //
    $('.go-down').click(function () {
        $('html, body').animate({
            scrollTop: ($('.allposts').offset().top - 120)
        }, 700)
    })

    // *** Make The Navbar Transparent Whene It Gose To First Section *** //

    $(window).on('scroll', function () {
        if ($(window).scrollTop() <=  200) {
            $('.the-navbar').css({backgroundColor: "#004085ab"})
        } else {
            $('.the-navbar').css({backgroundColor: "#004085"})
        }
    })

    // *** Start the jquery animation effect *** //
    $('.status .trim i.desc').on('click', function () {
        $(this).toggleClass('fa-caret-down fa-caret-up');
        $(this).parent('.trim').find('p.desc').slideToggle();
    })
    $('.status .trim i.comment').on('click', function () {
        $(this).toggleClass('commetnit');
        $(this).parent('.trim').find('div.comments').slideToggle();
    })

    // *** Start Show/Hide edit post *** //
    $('i.edit').on('click', function() {
        $(this).parent('.status').find('ul.edit').slideToggle(500);
    })
    $('.container').on('click', function() {
        $('ul.edit').fadeOut(500)
        $('.trash-btn').fadeOut(500)
    })
    $('.status ul.edit, .status i.edit, .remove-cmnt-edit-icon').on('click', function(e) {
        e.stopPropagation()
    })

    //  *** Start Search for users *** //
    $(".search-post form input[type='search']").on('keyup', function () {
        let user = $(this).val().toLowerCase();
        $('.post.status').filter(function () {
            $(this).toggle($(this).find('p.model').text().toLowerCase().search(user) >=0);
        })
    })
    // *** Start show/hide remove comment button *** //
    $('.remove-cmnt-edit-icon').on('click', function() {
        $(this).next('.trash-btn').slideToggle()
    })
    //*** nitialization Nicescroll *** //
    // $('#theusers, .popup-inner').niceScroll({
    //     zindex:999,
    //     cursorcolor: '#004085',
    //     cursorborder: "none",
    //     cursorborderradius: 0,
    //     cursorwidth: 7,
    // })

    // *** Trim the name of file *** //
    function TrimText(selector, maxLength) {
        $(selector).each(function () {
            if ($(this).text().length > maxLength) {
                var TrimmedText = $(this).text().slice(0, maxLength);
                $(this).text(TrimmedText + "...")
            }
        });
    };

    TrimText(".file-content h3", 25);

    // *** Call the plugin *** //
    $('.slider').slick({
        accessisibility: true,
        adaptiveHieght: false,
        autoplay: false,
        centerMode: true,
        centerPadding: 20px,
        cssEase: 'ease',
        dots: false,
        draggable:true,
        easing: 'linear',
        focusOnSelect: true,
        focusOnChange: true,
        infinite: true,
        initialSlide: 0,
        mobileFirst: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slideToShow: 3,
                infinite: true
            }
        }],
        rows: 1,
        slideToShow: 3,
        swipe :true,
    })
})