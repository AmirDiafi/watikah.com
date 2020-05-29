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
    socket.emit('usersToHome')
})

// *** Start  Posts Section *** //
socket.on('postsHome', posts => {
    if(posts.length !== 0) {
    // *** Start The Comment Socket.io *** //
    for(let post of posts) {
        // *** Custom the file icon *** //
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

        document.getElementById(post._id).onclick = (e) => {
            e.preventDefault()
            if(document.getElementById("comment-post-content-"+post._id).value !== '') {
                socket.emit('newComment', {
                    owenerPostId:document.getElementById('owenerPostId-'+post.owenerPostId).value,
                    comment:document.getElementById("comment-post-content-"+post._id).value,
                    postId: document.getElementById('postId-'+post._id).value,
                    myfirstname,
                    mylastname,
                    mypicture,
                    me
                })
            
            document.getElementById(`comments-${document.getElementById('postId-'+post._id).value}`).innerHTML +=
            `<p class='comment-at-the-post the-comment'>
                <a href='/profile/${me}' >
                    <img src="/userPic/${mypicture}" alt="profile" style='border-radius: 100%;width:30px;height:30px'>
                    <span class='fullname'> ${myfirstname} ${mylastname}</span>
                </a>
                <br>
                <span style="text-align: start;" dir="auto">${document.getElementById("comment-post-content-"+post._id).value}</span>
            </p>`
            
            if(me !== post.owenerPostId){
                socket.emit('sendNotification', {
                    msg: ' علق على منشور  لك',
                    dateOfEvent: new Date().toLocaleString(),
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
    }
        
        // *** Start count of downloads *** //
        if(post.file !== 'undefined'){
            document.getElementById('file-icon-download-'+post._id).onclick = (e) => {
                socket.emit('newDownload', {
                    owenerPostId:document.getElementById('owenerPostId-'+post.owenerPostId).value,
                    postId: document.getElementById('postId-'+post._id).value,
                    me
                })
            }
        }
        
        // *** Satrt remove comment *** //
        for(let comment of post.comments) {
            if(comment.me == userId){
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
    }
}
})