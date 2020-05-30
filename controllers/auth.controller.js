const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult
const crypto = require('crypto')
const async = require('async')
const nodemailer = require('nodemailer')

exports.getSignup = (req, res) => {
    let authErr = req.flash('authErr')[0]
    let validationErr = req.flash('validationErr')
    res.render('signup', {
        authErr: authErr,
        validationErr: validationErr
    })
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModel
        .createUser(
            req.body.firstname,
            req.body.lastname,
            req.body.password,
            req.body.email,
            Date.now()
        ).then( () => {
            res.redirect('/login')
        }).catch( err => {
            req.flash('authErr', err)
            res.redirect('/signup')
            console.log(err)
        })
    } else {
        req.flash('validationErr', validationResult(req).array())
        res.redirect('/signup')
    }
}

exports.getLogin = (req, res) => {
    let authErr = req.flash('authErr')[0]
    let successMsg = req.flash('successMsg2')[0]
    let validationErr = req.flash('validationErr')
    res.render('login', {
        authErr: authErr,
        successMsg:successMsg,
        validationErr: validationErr
    })
}

exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModel
        .login(
            req.body.email,
            req.body.password
        ).then( (user) => {
            req.session.userId = user._id,
            req.session.mypicture = user.picture,
            req.session.myfirstname = user.firstname,
            req.session.mylastname = user.lastname,
            res.redirect('/')
        }).catch(err => {
            req.flash('authErr', err)
            res.redirect('/login')
        })
    } else {
        req.flash('validationErr', validationResult(req).array())
        res.redirect('/login')
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy( () => {
        res.redirect('/login')
    })
}

exports.forgot = (req, res) => {
    let authErr = req.flash('authErr')[0]
    let successMsg = req.flash('successMsg')[0]
    let expiredToken = req.flash('expiredToken')[0]
    let validationErr = req.flash('validationErr')
    res.render('forgot', {
        authErr: authErr,
        successMsg: successMsg,
        expiredToken: expiredToken,
        validationErr: validationErr
    })
}

exports.postForgot = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex')
                    done(err, token)
                })
            },
            function(token, done) {
                authModel
                .postForgot(
                    req.body.email,
                    token,
                    done
                ).then( () => {
                    res.redirect('/forgot')
                }).catch(err => {
                    req.flash('authErr', err)
                    res.redirect('/forgot')
                })
            },
            function mails(token, user, done) {
                let smptTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'amirnewman2@gmail.com',
                        pass: 'amirdiafi666666' //process.env.GMAILPW // here put your password of this account
                    }
                })
                let mailOptions = {
                    to: user.email,
                    from: 'amirnewman2m@gmail.com',
                    subject: 'Reset your watika accont password',
                    text: 'You are recieving this because you (or someone else) have requested the reset of the password \n\n.'+
                    'Please click on the following link, or paste this into your browser to complete processing of reset your password \n\n.'+
                    'http://' + req.headers.host + '/reset/' + token + '\n\n.'+
                    'If you did NOT request this please ignore this email and your password will remain unchange'
                }
                try{
                    smptTransport.sendMail(mailOptions, function(err) {
                        req.flash('successMsg', 'success, an e-mail has been sent to '+ user.email + ' with further instructions.')
                        done(err, 'done')
                    })
                } catch (err) {
                    console.log(err)
                    mails(token, user, done)
                 }
            }
        ],
        function(err) {
            if(err) return next(err)
            res.redirect('/forgot')
        })
    } else {
        req.flash('validationErr', validationResult(req).array())
        res.redirect('/forgot')
    }
}

exports.getTokenForgot = (req, res) => {
    let validationErr = req.flash('validationErr')
    authModel.getTokenForgot(req.params.token).then((user) => {
        if(!user) {
            req.flash('expiredToken', 'Password reset token is not valid or has expired.')
            return res.redirect('/forgot')
        } else {
            res.render('reset', {
                validationErr: validationErr,
                token: req.params.token,
                user:user
            })
        }
    })
}

exports.postTokenForgot = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        async.waterfall([
            function(done) {
                authModel
                .postTokenForgot(
                    req.params.token,
                    req.body.password,
                    done
                ).then( () => {
                    res.redirect('/login')
                }).catch(err => {
                    req.flash('authErr', err)
                    res.redirect('/reset/' + req.params.token)
                })
            },
            function newMails(user, done) {
                let smptTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'amirnewman2@gmail.com',
                        pass: 'amirdiafi666666' //process.env.GMAILPW // here put your password of this account
                    }
                })
                let mailOptions = {
                    to: user.email,
                    from: 'amirneqman2@gmail.com',
                    subject: 'Your password has been changed successful',
                    text: 'Hello' + user.firstname + '\n\n.'+
                    'This is a confirmation that the password for your account ' + user.email + ' has just changed successful'
                }
                try{
                    smptTransport.sendMail(mailOptions, function(err) {
                        req.flash('successMsg2', 'Success, your password has been changed.')
                        done(err, 'done')
                    })
                } catch (err) {
                    console.log(err)
                    newMails(user, done)
                 }
            }
        ],
        function(err) {
            res.redirect('/login')
        })
    } else {
        req.flash('validationErr', validationResult(req).array())
        res.redirect('/reset/' + req.params.token)
    }
}