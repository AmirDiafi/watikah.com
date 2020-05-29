const authModel = require('../models/auth.model')

exports.allUsers = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let userId = req.session.userId
    let id = req.params.id
    authModel.getUsers()
    .then( users => {
        res.render('users', {
            myfirstname,        //For Navbar Links
            mylastname,         //For Navbar Links
            mypicture,          //For Navbar Links
            userId,             //For Navbar Links
            users,
            id
        })
    })
    .catch(err => console.log(err))
}

