const authModel = require('../models/auth.model')

exports.userToHome = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let category = req.body.category
    let userId = req.session.userId
    let id = req.params.id
    authModel.getUserProfileById(userId)
    .then( user => {
        let notifications = user.notifications
        let messages = user.messages
        notifications.sort((a,b) => (a.dateOfComment < b.dateOfComment)?1:-1)
        messages.sort((a,b) => (a.dateOfMessage < b.dateOfMessage)?1:-1)
        res.render('home', {
            notifications,      //For sorting them
            myfirstname,        //For Navbar Links
            mylastname,         //For Navbar Links
            mypicture,          //For Navbar Links
            category,           //For post Search
            messages,           //For Sorting By Date
            userId,             //For Navbar Links
            user,
            id
        })
    })
    .catch(err => console.log(err))
}

