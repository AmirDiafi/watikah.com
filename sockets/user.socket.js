const {getUserProfileById} = require('../models/auth.model')
module.exports = (io) => {
    io.on('connection' , socket => {
        socket.on('userToHome', (id) => {
            getUserProfileById(id).then(user => {
                socket.emit('userHome', user)
            }).catch(err=>{
                socket.emit('getUserFailed', err)
            })
        })
    })
}