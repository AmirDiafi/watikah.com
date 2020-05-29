const router = require('express').Router()
const userProfileController = require('../controllers/user.profile.controller')
const authProtect = require('./protect.routers/protect')
const multer = require('multer')
const bodyParser = require('body-parser')

router.get('/', authProtect.isAuth,
(req, res, next) => res.redirect('/' + req.session.userId))

router.get('/:id', authProtect.isAuth,
userProfileController.getUserProfile)

router.post('/:id/profile-edit', authProtect.isAuth, multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'images/userPic')
            },
            filename: (req, file, cb) => {
                cb(null, 'picture-' + Date.now() + req.params.id + '-' + file.originalname)
            }
        })
    }).single('picture'),
userProfileController.uploadProfilePic)

router.post('/:id/background-edit', authProtect.isAuth, multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'images/userBack')
            },
            filename: (req, file, cb) => {
                cb(null, 'background-' + Date.now() + req.params.id + '-' + file.originalname)
            }
        })
    }).single('background'),
userProfileController.uploadProfileBack)

router.post('/:id/post-file',
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'files')
            },
            filename: (req, file, cb) => {
                cb(null, "file-" + Date.now() + '-' + file.originalname)
            }
        })
}).single('file'),
bodyParser.urlencoded({extended:true}),
userProfileController.postFiles)

router.post('/:id/remove-post', bodyParser.urlencoded({extended:true}),
userProfileController.removePost)

router.post('/send-message', bodyParser.urlencoded({extended:true}),
userProfileController.sendMessage)

module.exports = router