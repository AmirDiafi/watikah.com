// *** Start the jquery animation effect *** //
$(document).ready(function() {

    // *** Start Show/Hide edit post *** //
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

    // *** Start Comments and desc *** //
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
let id = document.getElementById('me').value
socket.on('connect', () => {
    socket.emit('joinNotificationRoom', id)
    socket.emit('getPostById', document.getElementById('postId').value)
})

socket.on('getPost', post => {

    //*** from All ***//
    const myfirstname = document.getElementById('myfirstname').value
    const mylastname = document.getElementById('mylastname').value
    const mypicture = document.getElementById('mypicture').value
    const me = document.getElementById('me').value

    // ****** Start execute the fucntion comment and notifications ****** //
    document.getElementById("comment-post-content").oninput = function() {
        if(document.getElementById("comment-post-content").value !== '') {
            if(document.getElementById(post._id)) {
                let CmntBtn = document.getElementById(post._id)
                CmntBtn.removeAttribute('disabled')
                CmntBtn.style.backgroundColor = "#28a745"
                CmntBtn.style.color = "#062230"
                CmntBtn.style.marginLeft = "-20px"
                CmntBtn.style.borderRadius = "50px"
                CmntBtn.style.cursor = 'pointer'
                CmntBtn.innerHTML = `<i class="fa fa-paper-plane" id='msg-icon'></i>`
            } 
        }else {
            if(document.getElementById(post._id)) {
                let CmntBtn = document.getElementById(post._id)
                CmntBtn.setAttribute('disabled', 'disabled')
                CmntBtn.style.backgroundColor = "#062230"
                CmntBtn.style.color = "#28a745"
                CmntBtn.style.marginLeft = "-2px"
                CmntBtn.style.borderRadius = '0 50px 50px 0'
                CmntBtn.style.cursor = 'not-allowed'
                CmntBtn.innerHTML = `<i class="fas fa-comment-alt" id='msg-icon'></i>`
            }
        }
    }

    // *** First by clicking at button ***
    document.getElementById(post._id).onclick = (e) => {
        e.preventDefault()
        if(document.getElementById("comment-post-content").value !== '') {
        socket.emit('newComment', {
            owenerPostId: document.getElementById('owenerPostId').value,
            comment: document.getElementById("comment-post-content").value,
            postId: document.getElementById('postId').value,
            myfirstname,
            mylastname,
            mypicture,
            me 
        })
        
        var commentHTMLLive
        commentHTMLLive =
        `<p class='comment-at-the-post the-comment'>
            <a href='/profile/${me}'>
                    <span class='img'>
                    <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">` 
                    if(post.picture !== 'default') {
                        commentHTMLLive +=
                        `<img src="/userprofile/${mypicture}" alt='' class="picchanged profile-pic">` 
                    }
                    commentHTMLLive +=
                    `</span>
                <span class='fullname'> ${myfirstname} ${mylastname}</span>
            </a>
            <br>
            <span style="text-align: start;" dir="auto">${document.getElementById("comment-post-content").value}</span>
        </p>`

        document.getElementById(`comments`).innerHTML += commentHTMLLive
        

        }
    }

    // Second by press at the enter key 'keyCode == 13'
    document.getElementById("comment-post-content").addEventListener('keypress', function(e) {
        if(e.keyCode == 13) {
            e.preventDefault()
            if(document.getElementById("comment-post-content").value !== '') {
                socket.emit('newComment', {
                    owenerPostId: document.getElementById('owenerPostId').value,
                    comment: document.getElementById("comment-post-content").value,
                    postId: document.getElementById('postId').value,
                    myfirstname,
                    mylastname,
                    mypicture,
                    me 
                })
                
                var commentHTMLLive
                commentHTMLLive =
                `<p class='comment-at-the-post the-comment'>
                    <a href='/profile/${me}'>
                            <span class='img'>
                            <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">` 
                            if(post.picture !== 'default') {
                                commentHTMLLive +=
                                `<img src="/userprofile/${mypicture}" alt='' class="picchanged profile-pic">` 
                            }
                            commentHTMLLive +=
                            `</span>
                        <span class='fullname'> ${myfirstname} ${mylastname}</span>
                    </a>
                    <br>
                    <span style="text-align: start;" dir="auto">${document.getElementById("comment-post-content").value}</span>
                </p>`

                document.getElementById(`comments`).innerHTML += commentHTMLLive
            
            }
        }
    })

    //*** Remove the comment ***//
    for(let comment of post.comments) {
        if(comment.me == me){
        document.getElementById(post._id+'-'+comment._id).onclick = (e) => {
            e.preventDefault()
            document.getElementById(`comment-${comment._id}`).remove()
            document.getElementById(`post-trash-${comment._id}`).remove()
            socket.emit('removeComment', {
                owenerPostId: post.owenerPostId,
                commentId: comment._id,
                postId: post._id,
                me: me
            })
        }
    }}
    
    // ****** Start count of downloads ****** //
    if(post.file !== 'undefined'){
        document.getElementById('file-icon-download').onclick = (e) => {
            socket.emit('newDownload', {
                owenerPostId:document.getElementById('owenerPostId').value,
                postId: document.getElementById('postId').value,
                me
            })
        }
    }

})