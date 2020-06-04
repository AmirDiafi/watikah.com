const fllwrBtnCont = document.getElementById('fllwr-btn-cont')
const unfollowBtn = document.getElementById('unfollow')
const followBtn = document.getElementById('followed')

    followBtn.onclick = function (e) {
        e.preventDefault()
        $(this).animate({
            opacity: 0
        }, 500)
        this.style.display = 'none'
        $(unfollowBtn).animate({
            opacity: 1
        }, 500)
        unfollowBtn.style.display = 'block'
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

    unfollowBtn.onclick = function (e) {
        e.preventDefault()
        $(this).animate({
            opacity: 0,
        }, 500)
        this.style.display = 'none'
        $(followBtn).animate({
            opacity: 1
        }, 500)
        followBtn.style.display = 'block'
        socket.emit('removeFollower', {
            userId, me
        })
    }


























// if(followBtn) {
    // followBtn.onclick = function (e) {
        // $('followed').on('click' , function() {
        //     e.preventDefault()
        //     fllwrBtnCont.innerHTML = 
        //     `
        //     <button class="btn fav" id="unfollow" >
        //         <i class="fas fa-star"></i>
        //     </button>
        //     `
        //     socket.emit('newFollower', {
        //         myfirstname, mylastname, mypicture, userId, me,
        //         userfirstname, userlastname, userpicture
        //     })
        //     socket.emit('sendNotification', {
        //         msg:' معجب بصفحتك',
        //         dateOfEvent: new Date().toLocaleString(),
        //         sortByDate: new Date(),
        //         postId: 'undefined',
        //         myfirstname,
        //         mylastname,
        //         mypicture,
        //         userId,
        //         me
        //     })
        // })
    // }

// } 

// if(unfollowBtn) {
//     unfollowBtn.onclick = (e) => {
    
    // $('unfollow').on('click' , function() {
    //     e.preventDefault()
    //     fllwrBtnCont.innerHTML = 
    //     `
    //     <button class="btn fav" id="followed" >
    //         <i class="far fa-star"></i>
    //     </button>
    //     `
    //     socket.emit('removeFollower', {
    //         userId, me
    //     })
    // })
//     }
// }

