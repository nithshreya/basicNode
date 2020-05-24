const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const dbPromise = require('./app/service/database')

let id = 0;
app.use(express.json());
app.use((req, res, next) => {
    console.log("first middleware")
    next();
})

app.use(require('./app/middlewares/tokenVerification'))

require('./app/routes/users')(app)

app.listen(3000, () => console.log('Listening to port 3000'));






// app.post('/user', (req, res) => {
//     const { name, age, sex, pin, role, username, password } = req.body;
//     const newEntry = {
//         name, age, sex, pin, role, username, password
//     };
//     dbPromise.then(db => {
//         // console.log(db)
//         const collection = db.collection('users')
//         collection.insertOne(newEntry)
//             .then(result =>
//                 console.log({ result }
//                 ))
//             .catch(e =>
//                 console.error({ e }
//                 ))
//         res.send(newEntry);
//     })
// })

// app.get('/user', )

// app.get('/user/:id', (req, res) => {
//     console.log(req.params)
//     // const entry = Entries.find(c => c.id === parseInt(req.body.id));
//     // if (!course) return res.status(404).send('course of that id not found');
//     // res.send(entry);
//     dbPromise.then(db => {
//         const collection = db.collection('users')
//         collection.findOne({ _id: ObjectID(req.params.id) }).then(user => {
//             res.send(user)
//         })

//     })
// })

// app.delete('/user/:id', (req, res) => {
//     // const entry = Entries.find(c => c.id === parseInt(req.body.id));
//     // if (!course) return res.status(404).send('course of that id not found');
//     // const index = Entries.indexOf(entry);
//     // Entries.splice(index, 1);
//     // res.send(entry);
//     dbPromise.then(db => {
//         const collection = db.collection('users')
//         collection.findOne({ _id: req.params.id }).then(user => {
//             collection.remove({ user })
//             res.send(user)
//         })
//     })
// })
