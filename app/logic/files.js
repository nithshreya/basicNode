dbPromise = require('../service/database')
const ObjectID = require('mongodb').ObjectID
// var Binary = require('mongodb').Binary;

const uploadFile = (req, res) => {
    console.log(req.file)
    res.send(req.file.path)
    // console.log(res.statusText)
}

module.exports = {uploadFile}