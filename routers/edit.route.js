const router = require('express').Router()
const editController = require('../controllers/edit.controller')
const authProtect = require('./protect.routers/protect')
const multer = require('multer')
const bodyParser = require('body-parser')

router.get('/edit', authProtect.isAuth,
(req, res, next) => res.redirect('/edit' + req.session.userId))

router.get('/edit/:id', authProtect.isAuth,
editController.getUserProfile)

router.post('/edit/:id/edit-done', authProtect.isAuth,
multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images/userPic')
        },
        filename: (req, file, cb) => {
            cb(null, 'picture-' + Date.now() + req.params.id + '-' + file.originalname)
        }
    })
}).single('picture'),
bodyParser.urlencoded({extended:true}),
editController.editUserProfile)


module.exports = router