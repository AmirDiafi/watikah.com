// *** trigger the socket io function *** //
const {newDownload} = require('../models/auth.model')

module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('newDownload', data => {
            newDownload(data).then(()=>{
                socket.emit('downloaded', data.userId)
                io.to(data.userId).emit('downloadDone', data)
            }).catch(err=>{
                socket.emit('downloadFailed')
            })
        })
    })
}