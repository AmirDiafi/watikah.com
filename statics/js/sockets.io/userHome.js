//*** the Consts ***//
const theNotifications = document.getElementById('theNotification')

// *** Start  Posts Section *** //
socket.on('userHome', user => {
    if(user) {
        if(id == userId) {
            // *** Sorting the messages & notifications *** //
            user.notifications.sort((a,b) => (a.sortByDate < b.sortByDate)?1:-1)
            user.messages.sort((a,b) => (a.sortByDate < b.sortByDate)?1:-1)
            
            let theNotification =
            // *** Start Notification List *** // 
                `<div class="notifications popup popup-notifications" data-popup="popup-notifications">
                    <ul id='notificationsList' class="list-unstyled notificationsList popup-inner">`
                    if(user.notifications.length == 0){
                        theNotification += 
                        `<div class="no-notifications">
                            <p>لا يوجد أي تنبيهات بعد &#128237</p>
                            <img src="/home-images/notification.png" alt="">
                        </div>`
                    }
                    for(let notification of user.notifications){
                        theNotification += 
                        `<li>`
                            if(notification.postId !== 'undefined'){
                                theNotification += 
                                    `<div class="notifics">
                                        <a href="/profile/${notification.me}">
                                            <span class="img">
                                                <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">`  
                                            if(notification.mypicture !== 'default') {
                                                theNotification += 
                                                `<img src="/userprofile/${notification.mypicture}" alt='' class="picchanged profile-pic">`  
                                            }
                                            theNotification += 
                                            `</span> 
                                            
                                            <span style="text-align: start;" dir="auto" class="fullname"> 
                                                ${notification.myfirstname} ${notification.mylastname} 
                                            </span> 
                                        </a> 
                                    <a href='/post/${notification.postId}'>
                                        <span> | ${notification.event} | <span dir="ltr"> ${notification.dateOfEvent}</span></span>
                                    </a>
                                </div>`
                            } else if(notification.postId == 'undefined'){
                                theNotification += 
                                `<div class="notifics">
                                    <a href="/profile/${notification.me}">
                                        <span class="img">
                                            <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">`  
                                        if(notification.mypicture !== 'default') {
                                            theNotification += 
                                            `<img src="/userprofile/${notification.mypicture}" alt='' class="picchanged profile-pic">` 
                                        }
                                        theNotification += 
                                        `</span>
                                        <span style="text-align: start;" dir="auto" class="fullname"> 
                                            ${notification.myfirstname} ${notification.mylastname} 
                                        </span> 
                                        <span> | ${notification.event} |<span dir="ltr"> ${notification.dateOfEvent}</span></span>
                                    </a>
                                </div>`
                            }
                            theNotification += 
                        `</li>`
                    }
                    theNotification +=  
                    `</ul>
                </div>
                <div class="messages notifications popup popup-messages" data-popup="popup-messages">
                    <ul class='popup-inner list-unstyled notificationsList'>`
                    if(user.messages.length == 0){
                        theNotification += 
                        `<div class="no-notifications">
                            <p>لا يوجد أي رسائل بعد &#128237</p>
                            <img src="/home-images/message.png" alt="">
                        </div>`
                    }
                    for(let message of user.messages) {
                        theNotification += 
                            `<li class="message">
                                <a href="/profile/${message.me}">
                                    <span class="img">
                                        <img src="/defaultuser/defaultUser.jpeg" alt='' class="default profile-pic">  `
                                    if(message.mypicture !== 'default') {
                                        theNotification += 
                                        `<img src="/userprofile/${message.mypicture}" alt='' class="picchanged profile-pic"> `
                                    }
                                    theNotification += 
                                    `</span>
                                    <span style="text-align: start;" dir="auto" class="fullname"> 
                                        ${message.myfirstname} ${message.mylastname} | 
                                    </span>
                                </a>
                                <p>أرسل لك رسالة</p>
                                <div class="see">
                                    <i class="fa fa-eye fa-fw"></i>
                                </div>
                            </li>
                            <p class='msg-cntnt' style="text-align: start;" dir="auto">
                                ${message.message}
                                <span>
                                    ${message.dateOfMessage}
                                </span>
                            </p>`
                    }
                    theNotification +=  
                    `</ul>
                </div>`
            theNotifications.innerHTML = theNotification
        }
}
$(document).ready(function () {
    // *** Start switch the mode *** //
    $('body, .post , .notifications ul, .the-follow-inner, .send-message, .file').removeClass('dark-mode light-mode');
    $('body, .post , .notifications ul, .the-follow-inner, .send-message, .file').addClass(localStorage.getItem('switchMode'));
    
    // *** Show The Popup By The Button Of Popup *** //
    $('.pop-btn').on('click', function () {
        $('.'+ $(this).data('popup')).fadeIn(500);
    })

    // *** Fade Out The Popup By Click at It *** //
    $('.popup').on('click', function () {
        $('.popup').fadeOut(500);
    })

    // *** Make Stop To The Popup Event That FadeOut It! *** //
    $('.popup-inner').on('click', function (e) {
        e.stopPropagation();
    })

    // *** Start Messages *** //
   $('.messages.notifications .notificationsList li.message div.see')
   .on('click', function () {
       $(this).find('i').toggleClass('openMsg')
       $(this).parent('li.message').siblings().find('i').removeClass('openMsg')
       $(this).parent('li.message').siblings().next('p.msg-cntnt').slideUp(500)
       $(this).parent('li.message').next('p.msg-cntnt').slideToggle(500)
   })
})

})