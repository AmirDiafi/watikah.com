const fllwrBtnCont = document.getElementById('fllwr-btn-cont')
const unfollowBtn = document.getElementById('unfollow')
const followBtn = document.getElementById('followed')

if(followBtn) {
    followBtn.onclick = function (e) {
        e.preventDefault()
        fllwrBtnCont.innerHTML = 
        `
        <button class="btn btn-primary" id="unfollow" >
            <i class="fa fa-check"></i>
        </button>
        `
        socket.emit('newFollower', {
            myfirstname, mylastname, mypicture, userId, me,
            userfirstname, userlastname, userpicture
        })
        socket.emit('sendNotification', {
            msg:' معجب بصفحتك',
            dateOfEvent: new Date().toLocaleString(),
            sortByDate: new Date(),
            postId: 'undefined',
            myfirstname,
            mylastname,
            mypicture,
            userId,
            me
        })
    }

}

if(unfollowBtn) {
    unfollowBtn.onclick = (e) => {
        e.preventDefault()
        fllwrBtnCont.innerHTML = 
        `
        <button class="btn btn-primary" id="followed" >
            <i class="fa fa-check"></i>
        </button>
        `
        socket.emit('removeFollower', {
            userId, me
        })
    }
}

