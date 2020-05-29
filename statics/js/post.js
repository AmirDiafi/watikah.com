// *** Start the jquery animation effect *** //
$(document).ready(function() {

    // Start Show/Hide edit post
    $('.status > i.edit ').on('click', function() {
        $(this).parent('.status').find('ul.edit').slideToggle(500);
    })
    $('.container').on('click', function() {
        $('ul.edit').fadeOut(500)
        $('.trash-btn').fadeOut(500)
    })

    $('.status ul.edit, .status > i.edit, .remove-cmnt-edit-icon')
    .on('click', function(e) {
        e.stopPropagation()
    })

    // Start Comments and desc
    $('.status .trim i.desc').on('click', function () {
        $(this).toggleClass('fa-caret-down fa-caret-up');
        $(this).parent('.trim').find('p.desc').slideToggle();
    })
    $('.status .trim i.comment').on('click', function () {
        $(this).toggleClass('commetnit');
        $(this).parent('.trim').find('div.comments').slideToggle();
    })

    // *** Custom the file icon *** //
    if($('#isFile').val !== 'undefined'){
        if($(`#file-icon-download`).attr('href').endsWith('.pdf')) {
            $(`#file-icon-download`).find('img').attr('src', '/home-images/pdf.png')
        } else if ($(`#file-icon-download`).attr('href').endsWith('.docx')) {
            $(`#file-icon-download`).find('img').attr('src', '/home-images/wrd.png')
        } else if ($(`#file-icon-download`).attr('href').endsWith('.pub')) {
            $(`#file-icon-download`).find('img').attr('src', '/home-images/Publisher.png')
        } else if ($(`#file-icon-download`).attr('href').endsWith('.xlsx')) {
            $(`#file-icon-download`).find('img').attr('src', '/home-images/excel.png')
        } else if ($(`#file-icon-download`).attr('href').endsWith('.pptx')) {
            $(`#file-icon-download`).find('img').attr('src', '/home-images/powerpoint.png')
        } else {
            $(`#file-icon-download`).find('img').attr('src', '/home-images/file.png')
        }
    }
    
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
    
})

// *** Start The Comment Socket.io *** //
const socket = io()

//*** from All ***//
const myfirstname = document.getElementById('myfirstname').value
const mylastname = document.getElementById('mylastname').value
const mypicture = document.getElementById('mypicture').value
const userId = document.getElementById('user').value
const me = document.getElementById('me').value

socket.on('commented', () => {
    console.log('commented added successfully')
})

document.getElementById('commentBtn').onclick = (e) => {
    e.preventDefault()
    socket.emit('newComment', {
        owenerPostId: document.getElementById('owenerPostId').value,
        comment: document.getElementById("comment-post-content").value,
        postId: document.getElementById('postId').value,
        myfirstname,
        mylastname,
        mypicture,
        me
    })
    // if(me !== post.owenerPostId){
        socket.emit('sendNotification', {
            userId: document.getElementById('owenerPostId').value,
            postId: document.getElementById('postId').value,
            msg:' comment on your post',
            myfirstname,
            mylastname,
            mypicture,
            me
        })
    // }
    
    socket.on('commented', data => {
        document.getElementById(`comments`).innerHTML +=
            `<p class='comment-at-the-post the-comment id='comment-${data.commentId}'>
                <a href='/post/${data.me}' >
                    <img src="/userPic/${data.mypicture}" alt="profile" style='border-radius: 100%;width:30px;height:30px'>
                    <span class='fullname'> ${data.myfirstname} ${data.mylastname}</span>
                </a>
                <br>
                <span style="text-align: start;" dir="auto">${data.comment}</span>
            </p>`
    })
}