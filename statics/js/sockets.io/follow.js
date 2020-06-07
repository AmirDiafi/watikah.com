const fllwrBtnCont = document.getElementById('fllwr-btn-cont')
const unfollowBtn = document.getElementById('unfollow')
const followBtn = document.getElementById('followed')
const messageBtn = document.getElementById('message-button')

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
            dateOfEvent: new Date().toLocaleDateString(),
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

    messageBtn.onclick = function (e) {
        e.preventDefault()
        if (document.getElementById('message-content')) {
          
            if (document.getElementById('message-content').value !== '') {
                // *** Send the messages to the database ***//
                socket.emit('newMessage', {
                    message: document.getElementById('message-content').value,
                    dateOfMessage: new Date().toLocaleString(),
                    sortByDate: new Date(),
                    myfirstname,
                    mylastname,
                    mypicture,
                    userId,
                    me
                })

                // *** Change the button status to done *** //
                document.getElementById('message-content').remove()
                this.style.width = '100%'
                this.style.marginLeft = 0
                this.textContent = ''
                this.innerHTML = `<i class="fa fa-check fa-fw"></i> تم الإرسال بنجاح`
                this.removeAttribute('id')
            }
     
        }
    }

    // *** Ecplicit Prevention of the text enter *** //
    document.getElementById('message-content').addEventListener('keypress', function(e) {
        if(e.keyCode == 13) {
            e.preventDefault()
            if (document.getElementById('message-content')) {
              
                if (document.getElementById('message-content').value !== '') {
                    // *** Send the messages to the database ***//
                    socket.emit('newMessage', {
                        message: document.getElementById('message-content').value,
                        dateOfMessage: new Date().toLocaleString(),
                        sortByDate: new Date(),
                        myfirstname,
                        mylastname,
                        mypicture,
                        userId,
                        me
                    })
    
                    // *** Change the button status to done *** //
                    document.getElementById('message-content').remove()
                    messageBtn.style.width = '100%'
                    messageBtn.style.marginLeft = 0
                    messageBtn.textContent = ''
                    messageBtn.innerHTML = `<i class="fa fa-check fa-fw"></i> تم الإرسال بنجاح`
                    messageBtn.removeAttribute('id')
                }
         
            }
        }
    })

