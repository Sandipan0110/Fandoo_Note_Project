const usercontroller = require('../controllers/user.js');
const noteController = require('../controllers/notes.js');
const helper = require('../utilities/helper');
const labelController = require('../controllers/label.js');

module.exports = (app) => {

  // API for Registration
  app.post('/register', usercontroller.register);
  // API for Login
  app.post('/login', usercontroller.login);
  // API for Forget Password
  app.post('/forgotPassword', usercontroller.forgotPassword);
  // API for Reset Password
  app.put('/resetPassword', usercontroller.resetPassword);



  // API for Creat Notes
  app.post('/note', helper.TokenValidation, noteController.createNote);
  // API for Get Notes
  app.get('/notes', helper.TokenValidation, noteController.getNotes);
  // API for Get Notes by ID 
  app.get('/note/:id', helper.TokenValidation, noteController.getNoteById);
  // API for Update Notes
  app.put('/notes/:id', helper.TokenValidation, noteController.updateNoteById);
  // API for Delete Notes
  app.delete('/notess/:id', helper.TokenValidation, noteController.deleteNoteById);



  // API for Add Label By Id 
  app.post('/note/:id/label/:id', helper.TokenValidation, labelController.addLabel);
  // API for get Label  
  app.get('/labels', helper.TokenValidation, labelController.getlabels);
  // API for get Label BY Id 
  app.get('/label/:id', helper.TokenValidation, labelController.getlabelById);
  // API for Update Label by Id 
  app.put('/labels/:id', helper.TokenValidation, labelController.updatelabelById);
  // API for Delete Label By Id
  app.delete("/labelss/:id", helper.TokenValidation, labelController.deleteLabelById);

}
