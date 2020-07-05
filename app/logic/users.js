

const jwt = require('jsonwebtoken');
dbPromise = require('../service/database')

const ObjectID = require('mongodb').ObjectID

const getUserList = (req, res) => {
    dbPromise.then(db => {
        const collection = db.collection('users')
        collection.find({}, { projection: { password: 0, username: 0 } })
            .toArray()
            .then(users => {
                console.log({ users })
                res.send({ users });
            })
    })
}

const addUser = (req, res) => {
    console.log('vhjhbjbjjhg')
    const { name, age, sex, pin, role, username, password } = req.body
    const newEntry = { name, age, sex, pin, role, username, password }
    dbPromise.then(db => {
        const collection = db.collection('users')
        collection.insertOne(newEntry).then(result => {
            console.log({ result })
            res.status(201).send('')
        }).catch(e =>
            console.error({ e })
        )
    })
}

const deleteUser = (req, res) => {
    dbPromise.then(db => {
        const collection = db.collection('users')
        collection.remove({ _id: ObjectID(req.params.id) }).then(user => {
            res.status(204).send('')
        }).catch(e => res.send(e))
    })
}

const getUser = (req, res) => {
    dbPromise.then(db => {
        const collection = db.collection('users')
        collection.findOne({ _id: ObjectID(req.params.id)}).then(user => {
            res.send(user)
        }).catch(e => res.send(e))
    })
}

const editUser = (req,res) => {
    dbPromise.then(db => {
        const collection = db.collection('users')
        console.log(req.body)
        if(req.body.username){
            console.log("Username cant be changed")
            delete req.body.username
        }
        if(req.body.password){
            console.log("Password cant be changed")
            delete req.body.password
        }
        collection.updateOne({_id: ObjectID(req.params.id)}, { $set: req.body }).then(user => {
            console.log(req.body)
            // res.send(user)
            getUser(req,res)
        }).catch(e => res.send(e))
    })
}

const login = (req, res) => {
    dbPromise.then(db => {
        const collection = db.collection('users')
        const login_username = req.body.username
        const login_password = req.body.password
        collection.findOne({
            username: login_username,
            password: login_password
        }, {
            projection: {
                password: 0,
                username: 0
            }
        }).then(user => {
            console.log(user)
            if (!user) {
                res.status(400).send({ error: 'Please enter the correct user and password' })
            }
            jwt.sign(user , process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.log(err)
                    res.status(400).send({
                        error: err
                    })
                }
                res.send({ token });
            })
        })
    })
}



module.exports = {
    getUserList, addUser, deleteUser, getUser, login, editUser
}