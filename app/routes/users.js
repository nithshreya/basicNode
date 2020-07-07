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

module.exports = (app) => {
  app.get("/users", authenticateRole(["user", "admin"]), getUserList); // user //admin
  app.post("/users", authenticateRole(["admin"]), validateAddUser, addUser); //admin
  app.delete("/users/:id", authenticateRole(["admin"]), deleteUser); //admin
  app.get("/users/:id", authenticateRole(["user", "admin"]), getUser); //user admin
  app.post("/users/login", login);
  app.patch("/users/:id",authenticateEdit(["admin"]), changedUser, editUser);
};
