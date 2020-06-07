const {addComment, removeComment} = require('../models/auth.model')

module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('newComment', data => {
            addComment(data).then( () => {
                socket.emit('commented', data)
                io.to(data.userId).emit('commented', data)
            }).catch(err=>{
                console.log(err)
            })  
        })
        socket.on('removeComment', data => {
            removeComment(data).then( () => {
                socket.emit('commentRemoved', data)
                io.to(data.userId).emit('commentRemoved', data)
            }).catch(err=>{
                console.log(err)
            })
        })
    })
}
