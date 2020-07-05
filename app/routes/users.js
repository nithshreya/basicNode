const { getUserList, addUser, deleteUser, getUser, login, editUser} = require('../logic/users')
const { validateAddUser } = require('../validators/users.js')
let authenticate = require('../middlewares/authentication')

module.exports = app => {
    app.get('/users', authenticate(['user', 'admin']), getUserList); // user //admin
    app.post('/users', authenticate(['admin']), validateAddUser, addUser); //admin
    app.delete('/users/:id', authenticate(['admin']), deleteUser); //admin
    app.get('/users/:id', authenticate(['user', 'admin']), getUser); //user admin
    app.post('/users/login', login);
    // app.patch('/users/:id', authenticate(['admin']), editUserData);
    app.patch('/users/:id', authenticate(['admin']), editUser);
}

//role 



// let customPromise= new Promise((resolve,reject)=>{
//     // resolve(123)
//     reject(123)
// })

// async function test(){
//     try{
//         let answer = await customPromise // answer is 123
//     }catch(e){
//         // e is 123
//     }
// }

// function test(){
//     // customPromise.then(answer=>{
//     //     //answer is 123
//     // })

//     customPromise.catch(error=>{
//         //error is 123
//     })
// }

