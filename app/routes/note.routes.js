const controller = require('../controllers/user.js');
const noteController = require('../controllers/notes');
const helper= require('../utilities/helper');
const label = require('../controllers/label');

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

  
  //API for Creat Label
  app.post('/createlabel', helper.validateToken, label.createLabel);
  //API for Get Label
  app.get('/getlabels', helper.validateToken, label.getLabel);
  //API for Get Label by ID
  app.get('/getlabel/:id', helper.validateToken, label.labelGetById);
  //API for Update Label by ID
  app.put('/updatelabel/:id', helper.validateToken, label.updateLabel);
  //API for Delete Label by ID
  app.delete('/deletelabel/:id', helper.validateToken, label.deleteLabelById);
  
  //API for Add Label by ID
  app.post('/addlabel/:id', helper.validateToken, noteController.addLabelById);
  //API for Delete Label
  app.delete('/deleteLabelFromNote/:id', helper.validateToken, noteController.deleteLabel);

}