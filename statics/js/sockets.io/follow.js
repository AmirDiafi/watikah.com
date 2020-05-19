const fllwrBtnCont = document.getElementById('fllwr-btn-cont')
const unfollowBtn = document.getElementById('unfollow')
const followBtn = document.getElementById('followed')

if(followBtn) {
    followBtn.onclick = function (e) {
        console.log('done')
        e.preventDefault()
        socket.emit('newFollower', {
            myfirstname, mylastname, mypicture, userId, me,
            userfirstname, userlastname, userpicture
        })
        socket.emit('sendNotification', {
            msg:' معجب بمنشوراتك',
            dateOfEvent: new Date(),
            postId: 'undefined',
            myfirstname,
            mylastname,
            mypicture,
            userId,
            me
        })
    }
    socket.on('followed', () => {
        fllwrBtnCont.innerHTML = 
        `
        <button class="btn btn-primary" id="unfollow" >
            <i class="fa fa-check"></i>
        </button>
        `
    })

}

if(unfollowBtn) {
    unfollowBtn.onclick = (e) => {
        e.preventDefault()

        socket.emit('removeFollower', {
            userId, me
        })
    }
    socket.on('unfollowed', () => {
        fllwrBtnCont.innerHTML = 
        `
        <button class="btn btn-primary" id="followed" >
            <i class="fa fa-check"></i>
        </button>
        `
    })
}

