
// if(document.getElementById('notificationsList') && document.getElementById('messagesList')) {

    document.getElementById('notifications-icon')
    .style.color = localStorage.getItem('notify-icon')

    document.getElementById('messages-icon')
    .style.color = localStorage.getItem('notify-message-icon')

    socket.on('newNotification', data => {
        
        if(document.getElementById('no-notifications')) {
            document.getElementById('no-notifications').remove()
        }

        let notific =
        `<li>`
            if(data.postId !== 'undefined'){
                notific += 
                `<div class="notifics">
                    <a href="/profile/${data.me}">
                        <span class="img">
                            <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">`  
                                if(data.mypicture !== 'default') {
                                    notific += 
                                    `<img src="/userprofile/${data.mypicture}" alt='' class="picchanged profile-pic">`  
                                }
                            notific += 
                        `</span> 
                        <span style="text-align: start;" dir="auto" class="fullname">
                            ${data.myfirstname} ${data.mylastname} 
                        </span>
                    </a>
                    <a href='/post/${data.postId}'>
                        <span> | ${data.msg}</span>
                    </a>
                </div>`
            } else {
                notific += `<div class="notifics">
                    <a href="/profile/${data.me}">
                        <span class="img">
                            <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">`  
                                if(data.mypicture !== 'default') {
                                    notific += 
                                    `<img src="/userprofile/${data.mypicture}" alt='' class="picchanged profile-pic">`  
                                }
                                notific += 
                        `</span> 
                        <span style="text-align: start;" dir="auto" class="fullname">
                            ${data.myfirstname} ${data.mylastname} 
                        </span>
                        <span> | ${data.msg}</span>
                    </a>
                </div>`
            }
        notific +=
        `</li>`
        document.getElementById('notificationsList').innerHTML += notific
        document.getElementById('notifications-icon').style.color = 'red'
        localStorage.setItem('notify-icon', 'red')
    })

    socket.on('sentMessageNotification', data => {

        if(document.getElementById('no-messages')) {
            document.getElementById('no-messages').remove()
        }

        let messageContent =
        `<li class="message">
            <a href="/profile/${data.me}">
                <span class="img">
                    <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">  `
                if(data.mypicture !== 'default') {
                    messageContent += 
                    `<img src="/userprofile/${data.mypicture}" alt='' class="picchanged profile-pic"> `
                }
                messageContent += 
                `</span>
                <span style="text-align: start;" dir="auto" class="fullname"> 
                    ${data.myfirstname} ${data.mylastname} | 
                </span>
            </a>
            <p>أرسل لك رسالة</p>
            <div class="see">
                <i class="fa fa-eye fa-fw"></i>
            </div>
        </li>
        <p class='msg-cntnt'>
            ${data.message}
            <span>
                ${data.dateOfMessage}
            </span>
        </p>`
        
        document.getElementById('messagesList').innerHTML += messageContent
        document.getElementById('messages-icon').style.color = 'red'
        localStorage.setItem('notify-message-icon', 'red')

        // *** Start Messages because of the socket, recieved live messages *** //
        $('.messages.notifications .notificationsList li.message div.see')
        .on('click', function () {
            $(this).find('i').toggleClass('openMsg')
            $(this).parent('li.message').siblings().find('i').removeClass('openMsg')
            $(this).parent('li.message').siblings().next('p.msg-cntnt').slideUp(500)
            $(this).parent('li.message').next('p.msg-cntnt').slideToggle(500)
        })

    })

    document.getElementById('notifications-icon').onclick = function () {
        this.style.color = '#28a745'
        localStorage.removeItem('notify-icon')
    }
    document.getElementById('messages-icon').onclick = function () {
        this.style.color = '#28a745'
        localStorage.removeItem('notify-message-icon')
    }
    
// }



































































































// socket.on('commented', (data) => {
//     let commentHTMLLive =
//         `<p class='comment-at-the-post the-comment'>
//             <a href='/profile/${data.me}'>
//                     <span class='img'>
//                     <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">` 
//             if(data.picture !== 'default') {
//                 commentHTMLLive +=
//                 `<img src="/userprofile/${data.mypicture}" alt='' class="picchanged profile-pic">` 
//             }
//             commentHTMLLive +=
//             `</span>
//                 <span class='fullname'> ${data.myfirstname} ${data.mylastname}</span>
//             </a>
//             <br>
//             <span style="text-align: start;" dir="auto">${data.comment}</span>
//         </p>`

//         document.getElementById(`comments-${data.postId}`).innerHTML += commentHTMLLive
// })

