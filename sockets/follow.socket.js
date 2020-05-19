// *** trigger the socket io function *** //
const {newFollower, removeFollower} = require('../models/auth.model')

module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('newFollower', data => {
            newFollower(data).then(()=>{
                socket.emit('followed', data.userId)
                io.to(data.userId).emit('followedDone', data)
            }).catch(err=>{
                socket.emit('followedFailed', err)
            })
        })
        socket.on('removeFollower', data => {
            removeFollower(data).then(()=>{
                socket.emit('unfollowed', data.userId)
                io.to(data.userId).emit('unfollowedDone', data)
            }).catch(err=>{
                socket.emit('unfollowedFailed')
            })
        })
    })
}