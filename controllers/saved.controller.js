const authModel = require('../models/auth.model')

exports.getSavePosts = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let userId = req.session.userId
    let postId = req.params.postId
    let id = req.params.id
    authModel.getAllPosts(userId)
    .then( posts => {
        res.render('saved', {
            myfirstname:myfirstname,    // For Navbar Links.
            mylastname:mylastname,      // For Navbar Links.
            mypicture :mypicture,       // For Navbar Links.
            userId: userId,             // For Navbar Links.
            postId: postId,
            posts: posts,
            id:id
        })

    })
    .catch(err => console.log(err))
}


