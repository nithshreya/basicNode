const { getUserList, addUser, deleteUser, getUser, login } = require('../logic/users')
const { validateAddUser } = require('../validators/users.js')
let authenticate = require('../middlewares/authentication')

module.exports = app => {
    app.get('/users', authenticate(['user', 'admin']), getUserList); // user //admin
    app.post('/users', authenticate(['admin']), validateAddUser, addUser); //admin
    app.delete('/users/:id', authenticate(['admin']), deleteUser); //admin
    app.get('/users/:id', authenticate(['user', 'admin']), getUser); //user admin
    app.post('/users/login', login);
}


//role 
