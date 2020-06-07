$('.savepost').on('click', function () {
    $(this).css({
        opacity : 0,
        display : "none"
    })
    $(this).next('i').css({
        opacity: 1,
        display: "block"
    })
    let postId = $(this).parent().find('input').val()
    socket.emit('newPostSave', {
        dateOfSave: new Date().toLocaleDateString(),
        me: document.getElementById('me').value,
        postId
    })
})

$('.unsavepost').on('click', function () {
    $(this).css({
        opacity : 0,
        display : "none"
    })
    $(this).prev('i').css({
        opacity: 1,
        display: "block"
    })
    let postId = $(this).parent().find('input').val()
    socket.emit('unsavePost', {
        me: document.getElementById('me').value,
        postId: postId
    })
})