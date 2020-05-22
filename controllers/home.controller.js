const authModel = require('../models/auth.model')

exports.userToHome = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let userId = req.session.userId
    let id = req.params.id
    authModel.getAllPosts()
    .then( posts => {
        res.render('home', {
            myfirstname,        //For Navbar Links
            mylastname,         //For Navbar Links
            mypicture,          //For Navbar Links
            userId,             //For Navbar Links
            posts,
            id
        })
    })
    .catch(err => console.log(err))
}

