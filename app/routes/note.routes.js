const controller = require('../controllers/note.controller.js');
const noteController = require('../controllers/notes');
const helper= require('../utilities/helper');

module.exports = (app) => {
  // API for Registration
  app.post('/register', controller.register);
   // API for Login
  app.post('/login', controller.login);
  // API for Forget Password
  app.post('/forgotPassword', controller.forgotPassword);
  // API for Reset Password
  app.put('/resetPassword', controller.resetPassword);

  
  // API for CRUD
  // API for Creat Notes
  app.post('/createnotes', helper.validateToken, noteController.createNote);
  // API for Get Notes
  app.get('/getnotes', helper.validateToken, noteController.getNote);
  // API for Get Notes by ID 
  app.get('/getnotes/:id', helper.validateToken, noteController.getNoteById);
  // API for Update Notes
  app.put('/updatenotes/:id', helper.validateToken, noteController.updateNoteById);
  // API for Delete Notes
  app.delete('/deletenotes/:id', helper.validateToken, noteController.deleteNoteById);
}