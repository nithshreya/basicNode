const express = require("express");
var userRouter = express.Router()

const {
  getUserList,
  addUser,
  deleteUser,
  getUser,
  login,
  editUser,
} = require("../logic/users");
const { validateAddUser, changedUser } = require("../validators/users.js");
const {authenticateRole,authenticateEdit} = require("../middlewares/authentication");


module.exports = (homeRouter) => {
  homeRouter.use('/users', userRouter);
  userRouter.get("/", authenticateRole(["user", "admin"]), getUserList); // user //admin
  userRouter.post("/", authenticateRole(["admin"]), validateAddUser, addUser); //admin
  userRouter.delete("/:id", authenticateRole(["admin"]), deleteUser); //admin
  userRouter.get("/:id", authenticateRole(["user", "admin"]), getUser); //user admin
  userRouter.post("/login", login);
  userRouter.patch("/:id",authenticateEdit(["admin"]), changedUser, editUser);
};
