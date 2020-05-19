const authModel = require('../models/auth.model')

exports.getPostById = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let userId = req.session.userId
    let postId = req.params.postId
    let id = req.params.id
    authModel.getPostById(postId)
    .then( post => {
        res.render('post', {
            myfirstname:myfirstname,    // For Navbar Links.
            mylastname:mylastname,      // For Navbar Links.
            mypicture :mypicture,       // For Navbar Links.
            userId: userId,             // For Navbar Links.
            postId: postId,
            post: post,
            id:id,
        })

    })
    .catch(err => console.log(err))
}


