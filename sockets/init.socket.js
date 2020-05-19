// *** trigger the socket io function *** //
module.exports = (socket) => {
    socket.on('joinNotificationRoom', id => {
        socket.join(id)
    })
}