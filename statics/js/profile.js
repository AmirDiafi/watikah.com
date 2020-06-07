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

    $('.popup .popup-inner form input[type="file"].cropping').change(function () {

        var resize = $('.croppie').croppie({
            enableExif: true,
            enableOrientation: true,    
            viewport: { // Default { width: 100, height: 100, type: 'square' } 
                width: 150,
                height: 150,
                type: 'circle' //square
            },
            boundary: {
                width: '70%',
                height: 200
            }
        });

        var reader = new FileReader();
            reader.onload = function (e) {
            resize.croppie('bind',{
                url: e.target.result
            }).then(function(){
                // console.log('jQuery bind complete');
            });
            }
            reader.readAsDataURL(this.files[0]);


        $('.btn-upload-image').on('click', function (ev) {
        resize.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (img) {
            $.ajax({
            url: $(this).val,
            type: "POST",
            data: {"image":img},
            success: function (data) {
                html = '<img src="' + img + '" />';
                $(".preview-crop-image").html(html);
            }
            });
        });
        });


    })

    // Start Messages
    $('.messages.notifications .notificationsList li.message div.see')
    .on('click', function () {
        $(this).find('i').toggleClass('openMsg')
        $(this).parent('li.message').siblings().find('i').removeClass('openMsg')
        $(this).parent('li.message').siblings().next('p.msg-cntnt').slideUp(500)
        $(this).parent('li.message').next('p.msg-cntnt').slideToggle(500)
    })

    if(document.getElementById('message-button')) {

        var $text = document.getElementById('err-send-msg'),
        $textarea = document.getElementById('message-content'),
        $textLength = $textarea.getAttribute('maxlength');
        $theMsgBtn = document.getElementById('message-button');

        $textarea.onfocus = function() {
            this.style.width = "70%"
        }
        $textarea.onblur = function() {
            this.style.width = "30%"
        }
        $textarea.oninput = function() {

            // *** Custom the count of the number of the message length ***//
            $text.innerHTML = $textLength - this.value.length;
            if ($text.innerHTML == 0) {
                $text.classList.add('err')
            }
            else {$text.classList.remove('err')}

            if($textarea.value !== '') {
                if($theMsgBtn) {
                    $theMsgBtn.removeAttribute('disabled')
                    $theMsgBtn.style.cursor = 'pointer'
                    $theMsgBtn.style.backgroundColor = "#28a745"
                    $theMsgBtn.style.color = "#062230"
                    $theMsgBtn.style.borderRadius = "50px"
                    $theMsgBtn.style.marginLeft = "-20px"
                    $theMsgBtn.innerHTML = `<i class="fa fa-paper-plane" id='msg-icon'></i>`
                }
            }else {
                if($theMsgBtn) {
                    $theMsgBtn.setAttribute('disabled', 'disabled')
                    $theMsgBtn.style.cursor = 'not-allowed'
                    $theMsgBtn.style.marginLeft = '-2px'
                    $theMsgBtn.style.backgroundColor = "#062230"
                    $theMsgBtn.style.color = "#28a745"
                    $theMsgBtn.style.borderRadius = '0 50px 50px 0'
                    $theMsgBtn.innerHTML = `<i class="fa fa-envelope" id='msg-icon'></i>`
                }
            }
        }       
    }

})

//  some custom when on the scrool to the navbar
$(window).on('scroll', function () {
    if ($(window).scrollTop() <=  70) {
        $('.logo-anchor').css({marginTop: 60})
    } else {
        $('.logo-anchor').css({marginTop: 10})
    }

})