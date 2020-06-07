const {getPostsProfile, getAllPosts} = require('../models/auth.model')
module.exports = (io) => {
    io.on('connection' , socket => {
        socket.on('getPosts&FilesHome', () => {
            getAllPosts().then(posts => {
                socket.emit('postsHome', posts)
            }).catch(err=>{
                socket.emit('getPostsFailed')
            })
        })
        socket.on('getPosts&FilesProfile', userId => {
            getPostsProfile(userId.userId).then(posts => {
                socket.emit('postsProfile', posts)
            }).catch(err=>{
                socket.emit('getPostsFailed')
            })
        })
    })
}