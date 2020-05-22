
// if(document.getElementById('notificationsList')) {

document.getElementById('notifications-icon')
.style.color = localStorage.getItem('notify-icon')

document.getElementById('message-notify-'+userId)
.style.color = localStorage.getItem('notify-message-icon')

    socket.on('newNotification', data => {
        let notific =
        `<li>`
            if(data.postId !== 'undefined'){
                notific += 
                `<div class="notifics">
                    <a href="/profile/${data.me}">
                        <img src='/userPic/${data.mypicture}'>
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
                        <img src='/userPic/${data.mypicture}'>
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
    
    document.getElementById('notifications-icon').onclick = function () {
        this.style.color = '#28a745'
        localStorage.removeItem('notify-icon')
    }
    
// }

