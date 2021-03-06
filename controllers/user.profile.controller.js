const authModel = require('../models/auth.model')

exports.getUserProfile = (req, res, next) => {
    let myfirstname = req.session.myfirstname
    let mylastname = req.session.mylastname
    let mypicture = req.session.mypicture
    let userId = req.session.userId
    let id = req.params.id
    authModel.getUserProfileById(id)
    .then( (user) => {
        let notifications = user.notifications.sort((a,b) => (a.dateOfEvent < b.dateOfEvent)?1:-1)
        let messages = user.messages.sort((a,b) => (a.dateOfMessage < b.dateOfMessage)?1:-1)
        res.render('profile', {
            notifications,      //For sorting By Date
            myfirstname,        //For Navbar Links
            mylastname,         //For Navbar Links
            mypicture,          //For Navbar Links
            messages,           //For Sorting By Date
            userId,             //For Navbar Links
            user,               //For Navbar Links
            id,
            isFollower: user.followers.find(follower => follower.me == userId) //Check follow icons
        })
    })
    .catch(err => console.log(err))
}

exports.uploadProfilePic = (req, res, next) => {
    let id = req.params.id
    req.session.mypicture = req.file.filename
    authModel.newPictureProfile(
        id,
        {
            picture: req.file.filename,
            me:req.session.userId
        }
    ).then(()=>{
        res.redirect('/profile/' + id)
    }).catch(err => {
        console.log(err)
        res.redirect('/profile/' + id)
    })
}

exports.uploadProfileBack = (req, res, next) => {
    let id = req.session.userId
    authModel.newBackgroundProfile(
        id,
        {
            background: req.file.filename
        }
    ).then(()=>{
        res.redirect('/profile/' + id)
    }).catch(err => {
        console.log(err)
        res.redirect('/profile/' + id)
    })
}

exports.postFiles = (req, res, next) => {

    let file = req.file.filename
    let image

    if(file.endsWith('.pdf') || file.endsWith('.docx') || file.endsWith('.pub') || file.endsWith('.xlsx') || file.endsWith('.pptx') || file.endsWith('.txt') ) {
        file = req.file.filename
        image = 'undefined'
    } else {
        image = req.file.filename
        file = 'undefined'
    }

    authModel.postUserPosts({
        postDate: new Date().toLocaleString(),
        description: req.body.description,
        owenerPostId: req.session.userId,
        firstname: req.body.myfirstname,
        lastname: req.body.mylastname,
        picture: req.body.mypicture,
        category: req.body.category,
        kindof: req.body.kindof,
        sortByDate: Date.now(),
        title: req.body.title,
        model: req.body.model,
        image: image,
        file: file
    }).then(()=>{
        res.redirect(req.body.redirect)
    }).catch(err => {
        console.log(err)
    })
}

exports.removePost = (req, res, next) => {
    authModel.removePost({
        postId: req.body.postId,
        owenerPostId: req.body.owenerPostId
    })
    .then(()=>{
        res.redirect(req.body.redirect)
    }).catch(err => {
        console.log(err)
    })
}