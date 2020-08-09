const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
dotenv.config();
const app = express();
app.use(cors())
const dbPromise = require("./app/service/database");

let id = 0;
app.use(express.json());
app.use((req, res, next) => {

  console.log("recieved request ::", req.headers);
  try {
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(require("./app/middlewares/tokenVerification"));

require("./route")(app);

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
