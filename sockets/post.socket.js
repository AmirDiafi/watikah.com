const {getPostById} = require('../models/auth.model')
module.exports = (io) => {
    io.on('connection' , socket => {
        socket.on('getPostById', (postId) => {
            getPostById(postId).then(post => {
                socket.emit('getPost', post)
            }).catch(err=>{
                socket.emit('getPostFailed')
            })
        })
    })
}