const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const MongoClient = require('mongodb').MongoClient;

module.exports = new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
        if (err)
            reject(err)
        console.log("successfully connected to mongodb");
        const db = client.db(dbName);
        // console.log({db})
        resolve(db)
    });
})