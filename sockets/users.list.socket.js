const {getUsersToHome} = require('../models/auth.model')
module.exports = (io) => {
    io.on('connection' , socket => {
        socket.on('usersToHome', () => {
            getUsersToHome().then(users => {
                socket.emit('usersList', users)
            }).catch(err=>{
                socket.emit('getUsersFailed')
            })
        })
    })
}