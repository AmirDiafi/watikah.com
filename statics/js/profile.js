$(document).ready(function() {

    // Show The Popup By The Button Of Popup
    $('.pop-btn').on('click', function () {
        $('.'+ $(this).data('popup')).fadeIn(500);
    })

    // Fade Out The Popup By Click at It
    $('.popup').on('click', function () {
        $('.popup').fadeOut(500);
    })

    // Make Stop To The Popup Event That FadeOut It!
    $('.popup-inner').on('click', function (e) {
        e.stopPropagation()
    });
    // FadeOut  The Popup With Close Button
    $('.close-popup').on('click', function () {
        $(this).parentsUntil('.popup').parent().fadeOut(500);
    })

    $('.popup .popup-inner form input[type="file"]').wrap("<div class='custom-file'></div>");

    $('.popup .popup-inner.image form input[type="file"]').before('<span>إضافة صورة</span>');

    $('.popup .popup-inner.file form input[type="file"]').before('<span>إضافة ملف</span>');

    $('.popup .popup-inner.back form input[type="file"]').before('<span>إضافة صورة</span>');

    $('.popup .popup-inner.image form input[type="file"]').after('<i class="fa fa-image skin-color"></i>');

    $('.popup .popup-inner.file form input[type="file"]').after('<i class="fa fa-file-alt skin-color"></i>');

    $('.popup .popup-inner.back form input[type="file"]').after('<i class="fa fa-image skin-color"></i>');

    $("i.fa-upload").css({
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 1
    })
    $('.popup .popup-inner form input[type="file"]').change(function () {
        $(this).prev('span').text('ملفك جاهز')
    })

    // Start Messages
    $('.messages.notifications .notificationsList li.message div.see')
    .on('click', function () {
        $(this).find('i').toggleClass('openMsg')
        $(this).parent('li.message').siblings().find('i').removeClass('openMsg')
        $(this).parent('li.message').siblings().next('p.msg-cntnt').slideUp(500)
        $(this).parent('li.message').next('p.msg-cntnt').slideToggle(500)
    })

    //  some custom when on the scrool to the navbar
    $(window).on('scroll', function () {
        if ($(window).scrollTop() <=  200) {
            $('.logo-anchor').css({marginTop: 60})
        } else {
            $('.logo-anchor').css({marginTop: 30})
        }
    })

})