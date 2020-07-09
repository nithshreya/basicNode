const express = require("express");
const fileRouter = express.Router()

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const { uploadFile } = require("../logic/files.js");

module.exports = (homeRouter) => {
  homeRouter.use("/files", fileRouter);
  fileRouter.post("/",upload.single('uploaded-file'), uploadFile);
};