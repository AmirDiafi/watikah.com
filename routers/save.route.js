const router = require('express').Router()
const savedController = require('../controllers/saved.controller')
const authProtect = require('./protect.routers/protect')

router.get('/', authProtect.isAuth,
(req, res, next) => res.redirect('/' + req.session.userId))

router.get('/:id/mysaved', authProtect.isAuth,
savedController.getSavePosts)

module.exports = router