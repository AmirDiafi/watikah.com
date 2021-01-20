// ------ setup express & path modules ------ //
const express = require('express')
const path = require('path')

// ------ trigger the express function insilde the app ------ //
const app = express()

// ------ Call the socket.io ------ //
// ^^^ First call the http server Module ^^^ //
const server = require('http').createServer(app)
// ^^^ Secondry call the Socket.IO Module ^^^ //
const socketIO = require('socket.io')
const io = socketIO(server)

// ^^^ Third listen to the Emitt form client ^^^ //
io.on('connection', socket => {
    require('./sockets/init.socket')(socket)
})
require('./sockets/posts.home.socket')(io)
require('./sockets/post.socket')(io)
require('./sockets/user.socket')(io)
require('./sockets/notifics.socket')(io)
require('./sockets/download.socket')(io)
require('./sockets/comment.socket')(io)
require('./sockets/follow.socket')(io)

// ------ Start Call the Routers ------ //
const userProfileRouter = require('./routers/user.profile.route')
const conditionRouter = require('./routers/condition.route')
const policyRouter = require('./routers/policy.route')
const homeRouter = require('./routers/home.route')
const authRouter = require('./routers/auth.route')
const postRouter = require('./routers/post.route')
const editRouter = require('./routers/edit.route')
const saveRouter = require('./routers/save.route')
const usersRouter = require('./routers/users')
// ------ Call the flash for expresss Valedator ------ //
const flash = require('connect-flash')

// ------ Call the session module ------ //
const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session)
const STORE = new sessionStore({
    // uri: 'mongodb+srv://DiafiAmir:18265432171004@cluster0-3wwqa.mongodb.net/watikaDB?retryWrites=true&w=majority',
    uri: 'mongodb://localhost:27017/clientDB',
    collection: 'session'
})

// ------ Start setup and use the session ------ //
app.use(session({
    secret: '9876tgJLkhljLJLo0866uLJKP54hgmkhfio',
    saveUninitialized: false,
    resave: false,
    store: STORE,
    cookie: {
        maxAge: 5*12*365*24*60*60*1000 // Save the session for five year
    }
}))

// ------ Template Engine ------ //
app.set('view engine', 'ejs')
app.set('views', 'views')

// ------ setup the Static Paths ------ //
app.use(express.static(path.join(__dirname , 'statics')))
app.use(express.static(path.join(__dirname , 'images')))
app.use(express.static(path.join(__dirname , 'files')))

// ------ Trigger the flash for all EndPoint (Routers) ------//
app.use(flash())

// ------ Start the Routers middlware ------ //
app.use('/', conditionRouter)
app.use('/', policyRouter)
app.use('/', authRouter)
app.use('/', usersRouter)
app.use('/', saveRouter)
app.use('/', postRouter)
app.use('/', homeRouter)
app.use('/', editRouter)
app.use('/profile', userProfileRouter)
app.use((req, res, next)=>{
    res.render('not-found')
})

// ----- Listen to the server port ------ //
const port = process.env.PORT || 8000;
server.listen(port, () => { console.log('server listen at port 8000') })
