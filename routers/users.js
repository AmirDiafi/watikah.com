const users = require('../controllers/users.controller')
const router = require('express').Router()
const authProtect = require('./protect.routers/protect')
const bodyParser = require('body-parser')

router.get('/users', authProtect.isAuth, bodyParser.urlencoded({extended:true}),
users.allUsers)

module.exports = router