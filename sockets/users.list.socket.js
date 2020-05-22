const {getUsersToHome, getUserProfileById} = require('../models/auth.model')
module.exports = (io) => {
    io.on('connection' , socket => {
        socket.on('usersToHome', () => {
            getUsersToHome().then(users => {
                socket.emit('usersList', users)
            }).catch(err=>{
                socket.emit('getUsersFailed', err)
            })
        })
        socket.on('userToHome', (id) => {
            getUserProfileById(id).then(user => {
                socket.emit('userHome', user)
            }).catch(err=>{
                socket.emit('getUserFailed', err)
            })
        })
    })
}