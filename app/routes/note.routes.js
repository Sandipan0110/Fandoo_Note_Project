const controller = require('../controllers/user.js');
const noteController = require('../controllers/notes.js');
const helper = require('../utilities/helper');
const labelController = require('../controllers/label.js');

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

   // API for Add Label By Id 
   app.post('/addlabel/:id', helper.validateToken, labelController.addLabel);
   // API for get Label  
   app.get('/getlabel', helper.validateToken, labelController.getlabel);
   // API for get Label BY Id 
   app.get('/getlabel/:id', helper.validateToken, labelController.getlabelById);
   // API for Update Label by Id 
   app.put('/updatelabel/:id', helper.validateToken, labelController.updatelabelById);
}