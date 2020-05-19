// Start Check The Value Of The Placeholder

$('.form form input').on('focusout', function () {
    if ($(this).val() != '') {
        $(this).parent('.input').addClass('has-val');
    } else {
        $(this).parent('.input').removeClass('has-val');
    }
})