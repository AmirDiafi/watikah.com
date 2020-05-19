const router = require('express').Router()
const authProtect = require('./protect.routers/protect')

router.get('/condition', authProtect.isNotAuth, (req, res, next) => {
    res.render('condition')
})

module.exports = router