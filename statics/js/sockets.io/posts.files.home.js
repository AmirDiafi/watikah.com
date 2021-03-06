//*** the Consts ***//
const theNotification = document.getElementById('the Notification')
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
    socket.emit('userToHome', id)
})

// *** Start  Posts Section *** //
socket.on('postsHome', posts => {
    if(posts.length !== 0) {

    // *** Start The Comment Socket.io *** //
        for(let post of posts) {

            // ****** Start custom the files icon ***//
            if(post.file !== 'undefined'){
                if($(`#file-icon-download-${post._id}`).attr('href').endsWith('.pdf')) {
                    $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/pdf.png')
                } else if ($(`#file-icon-download-${post._id}`).attr('href').endsWith('.docx')) {
                    $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/wrd.png')
                } else if ($(`#file-icon-download-${post._id}`).attr('href').endsWith('.pub')) {
                    $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/Publisher.png')
                } else if ($(`#file-icon-download-${post._id}`).attr('href').endsWith('.xlsx')) {
                    $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/excel.png')
                } else if ($(`#file-icon-download-${post._id}`).attr('href').endsWith('.pptx')) {
                    $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/powerpoint.png')
                } else {
                    $(`#file-icon-download-${post._id}`).find('img').attr('src', '/home-images/file.png')
                }
            }

            // ******Start execute the fucntion comment and notifications ****** //

            function myCommentButton() {
                if(document.getElementById("comment-post-content-"+post._id).value !== '') {
                    if(document.getElementById(post._id)) {
                        let CmntBtn = document.getElementById(post._id)
                        CmntBtn.removeAttribute('disabled')
                        CmntBtn.style.backgroundColor = "#28a745"
                        CmntBtn.style.color = "#062230"
                        CmntBtn.style.marginLeft = "-5px"
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
                        CmntBtn.style.cursor = 'not-allowed'
                        CmntBtn.innerHTML = `<i class="fas fa-comment-alt" id='msg-icon'></i>`
                    }
                }
            }
            myCommentButton()

            // *** Custom the comment icons *** //
            document.getElementById("comment-post-content-"+post._id).oninput = () => {
                myCommentButton()
            }

            // *** First by clicking at button *** //
            document.getElementById(post._id).onclick = (e) => {
                e.preventDefault()
                if(document.getElementById("comment-post-content-"+post._id).value !== '') {
                    socket.emit('newComment', {
                        owenerPostId: document.getElementById('owenerPostId-'+post.owenerPostId).value,
                        comment: document.getElementById("comment-post-content-"+post._id).value,
                        postId: document.getElementById('postId-'+post._id).value,
                        myfirstname,
                        mylastname,
                        mypicture,
                        me 
                    })
                    
                    let commentHTMLLive =
                    `<p class='comment-at-the-post the-comment'>
                        <a href='/profile/${me}'>
                                <span class='img'>
                                <img src="/home-images/defaultUser.jpeg" alt='' class="default profile-pic">` 
                        if(post.picture !== 'default') {
                            commentHTMLLive +=
                            `<img src="/userprofile/${mypicture}" alt='' class="picchanged profile-pic">` 
                        }
                        commentHTMLLive +=
                        `</span>
                            <span class='fullname'> ${myfirstname} ${mylastname}</span>
                        </a>
                        <br>
                        <span style="text-align: start;" dir="auto">${document.getElementById("comment-post-content-"+post._id).value}</span>
                    </p>`

                    document.getElementById(`comments-${post._id}`).innerHTML += commentHTMLLive
                    document.getElementById("comment-post-content-"+post._id).value = ''
                    
                    if(me !== post.owenerPostId){
                        socket.emit('sendNotification', {
                            msg: ' علق على منشور لك',
                            dateOfEvent: new Date().toLocaleDateString(),
                            userId: post.owenerPostId,
                            sortByDate: new Date(),
                            postId: post._id,
                            myfirstname,
                            mylastname,
                            mypicture,
                            me
                        })
                    }
                }
                myCommentButton()
            }

            // Second by press at the enter key 'keyCode == 13'
            document.getElementById("comment-post-content-"+post._id).addEventListener('keypress', (e) => {
                if(e.keyCode == 13) {
                    e.preventDefault()
                    if(document.getElementById("comment-post-content-"+post._id).value !== '') {
                        socket.emit('newComment', {
                            owenerPostId: document.getElementById('owenerPostId-'+post.owenerPostId).value,
                            comment: document.getElementById("comment-post-content-"+post._id).value,
                            postId: document.getElementById('postId-'+post._id).value,
                            myfirstname,
                            mylastname,
                            mypicture,
                            me 
                        })
                        
                        let commentHTMLLive
                        commentHTMLLive =
                        `<p class='comment-at-the-post the-comment'>
                            <a href='/profile/${me}'>
                                    <span class='img'>
                                    <img src="/home-images/defaultUser.jpeg" alt='' class="default profile-pic">` 
                                    if(post.picture !== 'default') {
                                        commentHTMLLive +=
                                        `<img src="/userprofile/${mypicture}" alt='' class="picchanged profile-pic">` 
                                    }
                                    commentHTMLLive +=
                                    `</span>
                                <span class='fullname'> ${myfirstname} ${mylastname}</span>
                            </a>
                            <br>
                            <span style="text-align: start;" dir="auto">${document.getElementById("comment-post-content-"+post._id).value}</span>
                        </p>`
            
                        document.getElementById(`comments-${post._id}`).innerHTML += commentHTMLLive
                        document.getElementById("comment-post-content-"+post._id).value = ''
                        
                        if(me !== post.owenerPostId){
                            socket.emit('sendNotification', {
                                msg: ' علق على منشور لك',
                                dateOfEvent: new Date().toLocaleDateString(),
                                userId: post.owenerPostId,
                                sortByDate: new Date(),
                                postId: post._id,
                                myfirstname,
                                mylastname,
                                mypicture,
                                me
                            })
                        }
                    
                    }
                    myCommentButton()
                }
            })

            // *** Remove the comment *** //
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
                document.getElementById('file-icon-download-'+post._id).onclick = (e) => {
                    socket.emit('newDownload', {
                        owenerPostId:document.getElementById('owenerPostId-'+post.owenerPostId).value,
                        postId: document.getElementById('postId-'+post._id).value,
                        me
                    })
                }
            }
        
        }
    } 
})