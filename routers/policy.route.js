const authProtect = require('./protect.routers/protect')
const router = require('express').Router()

router.get('/policy', authProtect.isAuth, (req, res, next) => {
    res.render('policy', {
        myfirstname: req.session.myfirstname,
        mylastname: req.session.mylastname,
        mypicture: req.session.mypicture,
        userId: req.session.userId,
        id: req.params.id
    })
})

module.exports = router