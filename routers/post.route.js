const postController = require('../controllers/post.controller')
const router = require('express').Router()
const authProtect = require('./protect.routers/protect')
const bodyParser = require('body-parser')

router.get('/post/:postId', authProtect.isAuth, bodyParser.urlencoded({extended:true}),
postController.getPostById)

module.exports = router