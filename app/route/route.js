const userController = require("../controller/user.js");
const helper = require("../utilitie/helper.js");
const noteController = require("../controller/note.js");
const labelController = require("../controller/label.js");

module.exports = (app) => {
  // API for Registration
  app.post("/register", userController.registerUser);
  // API for Login
  app.post("/login", userController.loginUser);
  // API for Forgot Password
  app.post("/forgotPassword", userController.forgotPassword);
  // API for Reset Password
  app.put("/resetPassword", userController.resetPassword);


  // API for Create a Note
  app.post("/note", helper.validateToken, noteController.createnote);
  // API for Get Notes
  app.get("/notes", helper.validateToken, noteController.getNote);
  // API for Get Note By Id
  app.get("/note/:id", helper.validateToken, noteController.getNoteById);
  // API for Update Note By Id
  app.put("/note/:id", helper.validateToken, noteController.updateNoteById);
  // API for Delete Note By Id
  app.delete("/note/:id", helper.validateToken, noteController.deleteNote);
  
  
  // API for Add Label
  app.post("/note/label/:id", helper.validateToken, labelController.addLabel);
  // API for Get All Labels
  app.get("/labels", helper.validateToken, labelController.getLabel);
  // API for Get Label By Id
  app.get("/label/:id", helper.validateToken, labelController.getLabelById);
  // API for Update Label By Id
  app.put("/label/:id", helper.validateToken, labelController.updateLabelById);
  // API for Delete Label By Id
  app.delete("/label/:id", helper.validateToken, labelController.deleteLabelById);


  // Verify User
  app.get("/verify/:token", userController.verifyUser);
};