// *** trigger the socket io function *** //
const {newFollower, removeFollower, message, newPostSave, unsavepost} = require('../models/auth.model')

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
        socket.on('newMessage', data => {
            message(data).then(()=>{
                socket.emit('messageSentDone', data.userId)
                io.to(data.userId).emit('sentMessageNotification', data)
            }).catch(err=>{
                socket.emit('messageFailed')
            })
        })
        socket.on('newPostSave', data => {
            newPostSave(data).then(()=>{
                socket.emit('newPostSaveDone', data)
            }).catch(err=>{
                socket.emit('msavePostailed')
            })
        })
        socket.on('unsavePost', data => {
            unsavepost(data).then(()=>{
                console.log('insave', done)
                socket.emit('unsaveDone', data.userId)
                io.to(data.userId).emit('unsaveDone', data)
            }).catch(err=>{
                socket.emit('unsaveFailed')
            })
        })
    })
}