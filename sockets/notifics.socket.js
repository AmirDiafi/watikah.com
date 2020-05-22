// *** trigger the socket io function *** //
const {newNotification} = require('../models/auth.model')
module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('sendNotification', data => {
            newNotification(data).then(() => {
                io.to(data.userId).emit('newNotification', data)
            }).catch(err=>{
                socket.emit('notificationFailed', err)
            })
        })
    })
}