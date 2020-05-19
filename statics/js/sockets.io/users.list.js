const theusers = document.getElementById('theusers')
// *** Start get Users to search result *** //
socket.emit('usersToHome')
socket.on('usersList', users => {
    if(users.length !== 0) {
        let theuser = `<div>`
        for(let user of users) {
            theuser +=
            `<a href="/profile/${user._id}">
                <li style="display: flex;">
                    <img src="/userPic/${user.picture}" alt="user">
                    <p>${user.firstname} ${user.lastname}</p>`
                    if(user._id == id) {
                        theuser +=`<span style='font-size:10px;color:#777'> | " you " </span>`
                    }
                    theuser +=`<i class="fas fa-arrow-right"></i>
                </li>
            </a>`
        }
        theuser +=  `</div>`
    theusers.innerHTML = theuser
}
})