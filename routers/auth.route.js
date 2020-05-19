const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const bodyParser = require('body-parser')
const check = require('express-validator').check
const authProtect = require('./protect.routers/protect')

router.get('/signup', authProtect.isNotAuth, authController.getSignup)
router.post('/signup',
    bodyParser.urlencoded({extended:true}),
    check('firstname').not().isEmpty().isLength({min:3}).trim().escape()
    .withMessage('Firstname is required'),
    check('lastname').not().isEmpty().isLength({min:3}).trim().escape()
    .withMessage('Lastname is required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail()
    .withMessage('invalid Email').normalizeEmail(),
    check('password').not().isEmpty().withMessage('Password is required').isLength(6)
    .withMessage('password must be more than 6'),
    check('confirmPassword').custom( (passwordVal, {req}) =>{
        if(passwordVal === req.body.password) return true
        else throw 'Your password are not the same!. Please conform your password'
    }),
    authController.postSignup)

// *** Start Login *** //
router.get('/login', authProtect.isNotAuth, authController.getLogin)
router.post('/login',
    bodyParser.urlencoded({extended:true}),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('invalid Email'),
    authController.postLogin)

// *** Logout *** //
router.post('/logout', authProtect.isAuth, authController.logout)

//*** Start Forgot Password ***//
router.get('/forgot', authController.forgot)
router.post('/forgot',
    bodyParser.urlencoded({extended:true}),
    check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('invalid Email'),
    authController.postForgot)
    
router.get('/reset/:token', authController.getTokenForgot)
router.post('/reset/:token',
    bodyParser.urlencoded({extended:true}),
    check('password').not().isEmpty().withMessage('Password is required')
    .isLength(6).withMessage('password must be more than 6'),
    check('confirmPassword').custom( (passwordVal, {req}) =>{
        if(passwordVal === req.body.password) return true
        else throw 'Your password are not the same!. Please conform your password'
    }),
    authController.postTokenForgot)

module.exports = router