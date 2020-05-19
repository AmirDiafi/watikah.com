const homeController = require('../controllers/home.controller')
const router = require('express').Router()
const authProtect = require('./protect.routers/protect')
const bodyParser = require('body-parser')

router.get('/', authProtect.isAuth,
(req, res, next) => res.redirect('/' + req.session.userId))

router.get('/:id', authProtect.isAuth, bodyParser.urlencoded({extended:true}),
homeController.userToHome)

module.exports = router