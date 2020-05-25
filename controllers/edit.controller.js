const authModel = require('../models/auth.model')

exports.getUserProfile = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let userId = req.session.userId
    authModel.getUserProfileById(userId)
    .then( user => {
        res.render('edit', {
            myfirstname: myfirstname,
            mylastname: mylastname,
            mypicture : mypicture,
            userId: userId,
            user: user,
            id: userId,
        })
    })
    .catch(err => console.log(err))
}

exports.editUserProfile = (req, res, next) => {
    req.session.myfirstname = req.body.firstname
    req.session.mylastname = req.body.lastname
    let id = req.params.id
    authModel.editUserProfile(
        id,
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            // email:req.body.email, // it's off.
            bio: req.body.bio
        }
    ).then(()=>{
        res.redirect('/profile/' + id)
    }).catch(err => {
        console.log(err)
        res.redirect('/profile/' + id)
    })
}