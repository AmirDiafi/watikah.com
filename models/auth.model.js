const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    background: String,
    picture: String,
    resetPasswordExpires: Date,
    resetPasswordToken: String,
    dateOfCreate: String,
    firstname: String,
    lastname: String,
    password: String,
    username: String,
    email: String,
    bio: String,
    followings: {
        type: [{
            userId: String,
            userpicture: String,
            userfirstname: String,
            userlastname: String,
        default:[]
        }]
    },
    followers: {
        type: [{
            myfirstname: String,
            mylastname: String,
            mypicture: String,
            me: String,
        default:[]
        }]
    },
    notifications: {
        type: [{
            myfirstname: String,
            dateOfEvent: String,
            sortByDate: String,
            mylastname: String,
            mypicture: String,
            postId: String,
            event:String,
            me: String,
        default:[]
        }]
    },
    messages: {
        type: [{
            dateOfMessage: String,
            myfirstname: String,
            sortByDate: String,
            mylastname: String,
            mypicture: String,
            message: String,
            me: String,
        default:[]
        }]
    }
})
const postSchema = mongoose.Schema({
    owenerPostId: String,
    description: String,
    sortByDate: String,
    firstname: String,
    lastname: String,
    postDate: String,
    category: String,
    picture: String,
    kindof: String,
    image: String,
    title: String,
    model: String,
    file: String,
    comments: {
        type: [{
            myfirstname: String,
            mylastname: String,
            mypicture: String,
            comment: String,
            me: String,
        default: []
        }]
    },
    downloaders: {
        type: [{
            downloaderId: String,
            postId: String,
        default: []
        }]
    }
})

// ------ URL DB and Schema Declaration ------ //
const DB_URL = 'mongodb+srv://DiafiAmir:18265432171004@cluster0-3wwqa.mongodb.net/watikaDB?retryWrites=true&w=majority'
// const DB_URL = 'mongodb://localhost:27017/clientDB'
const User = mongoose.model('user', userSchema)
const Post = mongoose.model('post', postSchema)
const bcrypt = require('bcryptjs')
const saltRounds = 10

// ------ Set the new updates on mongoose to use ------ //
mongoose.set('useNewUrlParser', true )
mongoose.set( 'useFindAndModify', false )
mongoose.set( 'useCreateIndex', true )
mongoose.set( 'useUnifiedTopology', true )

exports.createUser = ( firstname, lastname, password, email, dateOfCreate ) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
            User.findOne( {email:email} ).then(result => {
                if(result) {
                    mongoose.disconnect()
                    reject('هذا البريد الإلكتروني يملك حساب بالفعل.')
                }
                else {
                    return bcrypt.hash(password, saltRounds)
                }
            }).then( (hashedPassword) => {
                // mongoose.disconnect()
                let user = new User({
                    background: 'defaultBackground.jpg',
                    username: firstname+lastname,
                    picture: 'defaultUser.jpeg',
                    password: hashedPassword,
                    firstname: firstname,
                    lastname: lastname,
                    dateOfCreate: dateOfCreate,
                    email: email
                })
                return user.save()
            }).then( () => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.login = (email, password) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
            User.findOne({email:email}).then(user => {
                if(!user) {
                    mongoose.disconnect()
                    reject('لا يوجد أي حساب بهذا البريد الإلكتروني.')
                } else {
                    mongoose.disconnect()
                    bcrypt.compare(password, user.password).then(same => {
                        if(!same) {
                            reject('كلمة مرور خاطئة')
                        } else {
                            resolve(user)
                        }
                    })
                }
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.postForgot = (email, token, done) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
            User.findOne({email:email}).then( user => {
                if(!user) {
                    mongoose.disconnect()
                    reject('There is no account with this email adress.')
                    
                } else {
                    user.resetPasswordToken = token,
                    user.resetPasswordExpires = Date.now() + 3600000, //1 hour
                    user.save(function(err) {
                        done(err, token, user)
                    })
                }
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.getTokenForgot = (token) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
                User.findOne({resetPasswordToken:token, resetPasswordExpires: {$gt: Date.now()}})
            .then(user => {
                mongoose.disconnect()
                resolve(user)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.postTokenForgot = (token, password, done) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
            User.findOne({resetPasswordToken:token, resetPasswordExpires: {$gt: Date.now()}})
            .then(user => {
                if(!user) {
                    mongoose.disconnect()
                    reject('Password reset token is not valid or has expired.')
                } else {
                    return bcrypt.hash(password, saltRounds)
                }
            }).then( (hashedNewPassword) => {
                user.resetPasswordExpires = undefined,
                user.resetPasswordToken = undefined,
                user.password = hashedNewPassword,
                user.save(function(err) {
                    done(err, user)
                })
            })
            .then( () => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.getUserProfileById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then( () => {
            return User.findById(id)
        })
        .then((user) => {
            resolve(user)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getPostsProfile = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then( () => {
            return Post.find({owenerPostId: userId}, {},
                {sort:{sortByDate:-1}
            })
        })
        .then((post) => {
            resolve(post)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getAllPosts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then( () => {
            return Post.find({}, {},
                {sort:{sortByDate:-1}
            })
        })
        .then((post) => {
            resolve(post)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getPostById = (postId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then( () => {
            return Post.findOne({_id:postId})
        })
        .then((post) => {
            resolve(post)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editUserProfile  = (id, newData) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return User.updateOne({_id:id}, {
                firstname: newData.firstname,
                lastname: newData.lastname,
                // email: newData.email, // it's off.
                bio: newData.bio
            })
        })
        .then(() => {
            return Post.updateMany({owenerPostId:id}, {
                firstname: newData.firstname,
                lastname: newData.lastname,
            })
        })
        .then(()=>{
            return Post.updateMany(
                {},
                {$set:{"comments.$[cmnt].myfirstname":newData.firstname,
                "comments.$[cmnt].mylastname":newData.lastname}},
                {
                    multi:true,
                    arrayFilters:[{"cmnt.me":id}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"followers.$[flwr].myfirstname":newData.firstname,
                "followers.$[flwr].mylastname":newData.lastname}},
                {
                    multi:true,
                    arrayFilters:[{"flwr.me":id}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"followings.$[flwing].userfirstname":newData.firstname,
                "followings.$[flwing].userlastname":newData.lastname}},
                {
                    multi:true,
                    arrayFilters:[{"flwing.userId":id}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"notifications.$[notific].myfirstname":newData.firstname,
                "notifications.$[notific].mylastname":newData.lastname}},
                {
                    multi:true,
                    arrayFilters:[{"notific.me":id}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"messages.$[msg].myfirstname":newData.firstname,
                "messages.$[msg].mylastname":newData.lastname}},
                {
                    multi:true,
                    arrayFilters:[{"msg.me":id}]
                }
            )
        })
        .then( () => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.newPictureProfile = (id, newData) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return User.updateOne({_id:id}, newData)
        })
        .then(() => {
            return Post.updateMany({owenerPostId:id}, {picture:newData.picture})
        })
        .then(()=>{
            return Post.updateMany(
                {},
                {$set:{"comments.$[cmnt].mypicture":newData.picture}},
                {
                    multi:true,
                    arrayFilters:[{"cmnt.me":newData.me}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"followers.$[flwr].mypicture":newData.picture}},
                {
                    multi:true,
                    arrayFilters:[{"flwr.me":newData.me}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"followings.$[flwing].userpicture":newData.picture}},
                {
                    multi:true,
                    arrayFilters:[{"flwing.userId":newData.me}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"notifications.$[ntific].mypicture":newData.picture}},
                {
                    multi:true,
                    arrayFilters:[{"ntific.me":newData.me}]
                }
            )
        })
        .then(()=>{
            return User.updateMany(
                {},
                {$set:{"messages.$[msg].mypicture":newData.picture}},
                {
                    multi:true,
                    arrayFilters:[{"msg.me":newData.me}]
                }
            )
        })
        .then((newpicture) => {
            mongoose.disconnect()
            resolve(newpicture)
        })
        .catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.newBackgroundProfile = (id, newbackground) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return User.updateOne({_id:id}, newbackground)
        })
        .then((newbackground) => {
            mongoose.disconnect()
            resolve(newbackground)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.postUserPosts = (postData) => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(DB_URL).then( () => {
            let post = new Post(
                {
                    owenerPostId: postData.owenerPostId,
                    description: postData.description,
                    sortByDate: postData.sortByDate,
                    firstname: postData.firstname,
                    category: postData.category,
                    postDate: postData.postDate,
                    lastname: postData.lastname,
                    picture: postData.picture,
                    kindof: postData.kindof,
                    image: postData.image,
                    title: postData.title,
                    model: postData.model,
                    file: postData.file,
                }
            )
            return post.save()
        }).then( () => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.removePost = async (postData) => {
    try {
        await mongoose.connect(DB_URL)
        await Post.findByIdAndRemove(postData.postId)
        await User.updateOne(
            {_id:postData.owenerPostId},
             { $pull: { notifications: {
                postId: postData.postId
             }}}
        )
        mongoose.disconnect()
    }  catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then( () => {
            return User.find({}, {},
                {sort: {dateOfCreate: -1}})
        })
        .then((users) => {
            resolve(users)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.addComment = async data => {
    try {
        await mongoose.connect(DB_URL)
        await Post.updateOne({_id:data.postId},
            {$push:{
                comments: {
                    myfirstname: data.myfirstname,
                    mylastname: data.mylastname,
                    mypicture: data.mypicture,
                    comment: data.comment,
                    me: data.me
                }
            }
        })
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.removeComment = async (CommentData) => {
    try {
        await mongoose.connect(DB_URL)
        await Post.updateOne(
            {_id:CommentData.postId},
            { $pull: { comments: {_id: CommentData.commentId }}}
        )
        await User.updateOne(
            {_id:CommentData.owenerPostId},
            { $pull: { notifications: {
                me: CommentData.me,
                postId: CommentData.postId
            }}}
        )
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.newFollower = async (data) => {
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne(
            {_id:data.userId},
             { $push: { followers: {
                 me: data.me,
                 mypicture: data.mypicture,
                 myfirstname: data.myfirstname,
                 mylastname: data.mylastname,
             }}}
        )
        await User.updateOne(
            {_id:data.me},
             { $push: { followings: {
                userId: data.userId,
                userpicture: data.userpicture,
                userfirstname: data.userfirstname,
                userlastname: data.userlastname,
             }}}
        )
    }  catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.removeFollower = async (data) => {
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne(
            {_id:data.userId},
             { $pull: { followers: {
                 me: data.me,
             }}}
        )
        await User.updateOne(
            {_id:data.me},
             { $pull: { followings: {
                userId: data.userId
             }}}
        )
        await User.updateOne(
            {},
             { $pull: { notifications: {
                postId: data.userId
             }}}
        )
    }  catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.message = async (data) => {
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne(
            {_id:data.userId},
             { $push: { messages: {
                dateOfMessage: data.dateOfMessage,
                myfirstname: data.myfirstname,
                sortByDate: data.sortByDate,
                mylastname: data.mylastname,
                mypicture: data.mypicture,
                message: data.message,
                me: data.me
             }}}
        )
        mongoose.disconnect()
    }  catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.newNotification = async data => {
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne(
            {_id:data.userId},
             { $push: { notifications: {
                dateOfEvent: data.dateOfEvent,
                myfirstname: data.myfirstname,
                sortByDate: data.sortByDate,
                mylastname: data.mylastname,
                mypicture: data.mypicture,
                postId: data.postId,
                event: data.msg,
                me: data.me
             }}}
        )
        mongoose.disconnect()
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.newDownload = async (data) => {
    try {
        await mongoose.connect(DB_URL)
        await Post.updateOne(
            {_id:data.postId},
             { $push: { downloaders: {
                 postId: data.postId,
                 downloaders: data.me
             }}}
        )
        mongoose.disconnect()
    }  catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}
