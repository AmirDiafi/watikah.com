const socket = io()
let id = document.getElementById('me').value
socket.on('connect', () => {
    socket.emit('joinNotificationRoom', id)
})

//*** from All ***//
const userfirstname = document.getElementById('userfirstname').value
const userlastname = document.getElementById('userlastname').value
const userpicture = document.getElementById('userpicture').value
const myfirstname = document.getElementById('myfirstname').value
const mylastname = document.getElementById('mylastname').value
const mypicture = document.getElementById('mypicture').value
const userId = document.getElementById('user').value
const me = document.getElementById('me').value

// socket.on('followedDone', () => {
    
// })

// socket.on('messageSentDone', (data) => {
//     console.log('sent success')
// })

// socket.on('unfollowedDone', () => {
    
// })

// socket.on('commented', (data) => {
// })


