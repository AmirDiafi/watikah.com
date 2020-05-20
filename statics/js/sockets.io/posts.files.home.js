//*** from All ***//
const myfirstname = document.getElementById('myfirstname').value
const mylastname = document.getElementById('mylastname').value
const mypicture = document.getElementById('mypicture').value
const userId = document.getElementById('user').value
const me = document.getElementById('me').value

const socket = io()
let id = document.getElementById('me').value
socket.on('connect', () => {
    socket.emit('joinNotificationRoom', id)
    socket.emit('getPosts&FilesHome')
    socket.emit('usersToHome')
})

const theposts = document.getElementById('allposts')

// *** Start  Posts Section *** //
socket.on('postsHome', posts => {
    if(posts.length !== 0) {
        let thepost = `<div>
    `
    for(let post of posts) {
        thepost += `<div class='post status'>`
            if(userId == post.owenerPostId) {
                thepost += `<i class='fas fa-ellipsis-v edit'></i>`
            }
            thepost += 
            `<ul class='edit list-unstyled'>
                <form>
                    <input type="hidden" name="postId" value='${post._id}'>
                    <input type="hidden" name="owenerPostId" value='${userId}'>
                    <input type="hidden" name="redirect" value='/${post.owenerPostId}'>
                    <li>
                        <button type="submit" formaction="/profile/${post.owenerPostId}/remove-post" formmethod="POST">
                            <i class="fa fa-trash"></i> | حذف
                        </button>
                    </li>
                </form>
            </ul>
            <a href="/profile/${post.owenerPostId}" class='anchor-pic'>
                <img src="/userPic/${post.picture}" alt="profile" class="profile-pic">
                <span style="text-align: start;" dir="auto" class="username"> ${post.firstname} ${post.lastname}</span>
                <span class='timestamp' style="text-align: start;" dir="auto"> ${post.postDate}</span>
            </a>
            <h4 style="text-align: start;" dir="auto">${post.title}</h4>
            <p class='model' style="text-align:start">Feliere:<b> ${post.category} </b></p>
            <p class='model' style="text-align:start">Module:<b> ${post.model}</b></p>
            <hr>`
            if(post.image !== 'undefined'){
                thepost +=
                `<img src="/${post.image}" class='post-pic' alt="postPic">`
            }
            if(post.file !== 'undefined'){
                thepost +=
                `<div class="file-content">
                    <a href="" id='file-icon-download-${post._id}' class="file-design" download="${post.file}">
                        <img src="" alt="file" class="file">
                        <i class="fas fa-arrow-down"></i>
                    </a>
                    <h3 style="text-align: start;" dir="auto"> ${post.title}</h3>
                </div>`
            }
            thepost +=
            `<div class="trim">
                <p class='desc' style="text-align: start;" dir="auto">${post.description}</p>
                <div class=comments id='comments-${post._id}'>
                <form class="add-comment-form" method='POST'>
                    <input type=hidden id='postId-${post._id}' value='${post._id}'>
                    <input type=hidden id='owenerPostId-${post.owenerPostId}' value='${post.owenerPostId}'>
                    <input dir='auto' type=text id='comment-post-content-${post._id}' placeholder='add comment' >
                    <button id='${post._id}' type="submit" class="btn btn-primary">
                        <i class='fas fa-paper-plane'></i>
                    </button>
                </form>`
                    for(let comment of post.comments) {
                        thepost +=
                        `<p style="text-align: start;" dir="auto" class='comment-at-the-post the-comment' id='comment-${comment._id}'>
                            <a href='/profile/${comment.me}' >
                                <img src="/userPic/${comment.mypicture}" alt="profile" style="border-radius: 100%;width:30px;height:30px">
                                <span style="text-align: start;" dir="auto" class='fullname'> ${comment.myfirstname} ${comment.mylastname}</span>
                            </a>
                            <br>
                            <span style="text-align: start;" dir="auto">${comment.comment}</span>
                        </p>`
                        if(comment.me == userId){
                            thepost += `
                            <form class='remove-comment-form trash-the-post' id='post-trash-${comment._id}'>
                                <i class='fas fa-ellipsis-v remove-cmnt-edit-icon'></i>
                                <button class='trash-btn' id='${post._id}-${comment._id}'>
                                    <i class="fa fa-trash-alt"></i>
                                </button>
                            </form>
                            `
                        }
                    }
                thepost += 
            `</div>
                <i class="fas fa-caret-down desc"></i>
                <i class="fas fa-comment-alt comment"> ${post.comments.length}</i>`
                if(post.image === 'undefined'){
                    thepost +=
                    `<i class="fas fa-arrow-down" > ${post.downloaders.length}</i>`
                }
        thepost +=  `
            </div>
        </div>`
    }
    thepost +=  `</div>`
    theposts.innerHTML = thepost
    
    // *** Start The Comment Socket.io *** //
    for(let post of posts) {
        document.getElementById(post._id).onclick = (e) => {
            e.preventDefault()
            socket.emit('newComment', {
                owenerPostId:document.getElementById('owenerPostId-'+post.owenerPostId).value,
                comment:document.getElementById("comment-post-content-"+post._id).value,
                postId: document.getElementById('postId-'+post._id).value,
                myfirstname,
                mylastname,
                mypicture,
                me
            })
            if(me !== post.owenerPostId){
                socket.emit('sendNotification', {
                    msg: ' علق على منشور  لك',
                    userId: post.owenerPostId,
                    dateOfEvent: new Date(),
                    postId: post._id,
                    myfirstname,
                    mylastname,
                    mypicture,
                    me
                })
            }
            socket.on('commented', data => {
            document.getElementById(`comments-${data.postId}`).innerHTML +=
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
        
        if(post.file !== 'undefined'){
            document.getElementById('file-icon-download-'+post._id).onclick = (e) => {
                socket.emit('newDownload', {
                    owenerPostId:document.getElementById('owenerPostId-'+post.owenerPostId).value,
                    postId: document.getElementById('postId-'+post._id).value,
                    me
                })
            }
        }
        
        for(let comment of post.comments) {
            if(comment.me == userId){
            document.getElementById(post._id+'-'+comment._id).onclick = (e) => {
                e.preventDefault()
                socket.emit('removeComment', {
                    owenerPostId: post.owenerPostId,
                    commentId: comment._id,
                    postId: post._id,
                    me: me
                })

                socket.on('commentRemoved', data => {
                    document.getElementById(`comment-${data.commentId}`).remove()
                    document.getElementById(`post-trash-${data.commentId}`).remove()
                })
            }
        }}

        // *** Custom the file icon *** //
        if(post.file !== 'undefined'){
            if($(`#file-icon-download-${post._id}`).attr('download').endsWith('.pdf')) {
                $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/pdf.png')
            } else if ($(`#file-icon-download-${post._id}`).attr('download').endsWith('.docx')) {
                $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/wrd.png')
            } else if ($(`#file-icon-download-${post._id}`).attr('download').endsWith('.pub')) {
                $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/Publisher.png')
            } else if ($(`#file-icon-download-${post._id}`).attr('download').endsWith('.xlsx')) {
                $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/excel.png')
            } else if ($(`#file-icon-download-${post._id}`).attr('download').endsWith('.pptx')) {
                $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/powerpoint.png')
            } else {
                $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/file.png')
            }
        }
    }
}
// *** Start the jquery animation effect *** //
     $(document).ready(function() {
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
        $('#theusers, .popup-inner').niceScroll({
            zindex:999,
            cursorcolor: '#004085',
            cursorborder: "none",
            cursorborderradius: 0,
            cursorwidth: 7,
        })

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
})