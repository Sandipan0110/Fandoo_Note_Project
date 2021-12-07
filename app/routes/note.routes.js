
const controller = require('../controllers/note.controller.js');
// const helper= require('../utilities/helper');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
   // api for login
  app.post('/login', controller.login);
  // api for forget pasword
  app.post('/forgotPassword', controller.forgotPassword);
  //api for reset-password
  app.put('/resetPassword', controller.resetPassword);

  // app.post('/createnotes', helper.validateToken, noteController.createNote);
}