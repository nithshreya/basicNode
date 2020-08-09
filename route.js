const express = require("express");
var homeRouter = express.Router();

require("./app/routes/users")(homeRouter);
require("./app/routes/files")(homeRouter);

module.exports = (app) => {
  app.use("/api/v1", homeRouter);
  app.get('/test',(req,res)=>{console.log('------------------------');res.status(200).json({success:true})})
};
