const noteService = require('../service/notes');
const { logger } = require('../../logger/logger');
const validation = require('../utilities/validation.js');
const redis = require('../Connection/redis.js');

class noteController {
  /**
    * @description function written to create notes into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @returns response
    */
  createNote = (req, res) => {
    try {
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };

      const createNoteValidation = validation.notesCreationValidation.validate(note);
      if (createNoteValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: createNoteValidation
        });
      }
      noteService.createNote(note, (error, data) => {
        if (error) {
          logger.error('failed to post note');
          return res.status(400).json({
            message: 'failed to post note',
            success: false
          });
        } else {
          logger.info('Successfully inserted note');
          return res.status(201).send({
            message: 'Successfully inserted note',
            success: true,
            data: data
          });
        }
      });
    } catch {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Error occured',
        success: false
      });
    }
  };

  /**
    * @description function written to get all the notes from the database
    * @param {*} req
    * @param {*} res
    * @returns response
    */
  getNotes = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id };
      const getNoteValidation = validation.getNotesValidation.validate(id);
      if (getNoteValidation.error) {
        logger.error(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      noteService.getNote(id, resolve, reject);
      function resolve(data) {
        logger.info('Get All Notes successfully');
        return res.status(201).json({
          message: 'Get All Notes successfully',
          success: true,
          data: data
        });
      }
      function reject() {
        logger.error('Failed to get all notes');
        return res.status(400).json({
          message: 'failed to get all notes',
          success: false
        });
      }
    } catch (error) {
      console.log(error);
      logger.error('Internal Error');
      return res.status(500).json({
        message: 'Internal Error'
      });
    }
  };

  /**
    * @description function written to get  the notes by Id from the database
    * @param {*} req
    * @param {*} res
    * @returns response
    */
  getNoteById = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const getNoteValidation = validation.getNoteValidation.validate(id);
      if (getNoteValidation.error) {
        logger.error(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      let findnotebyId = await noteService.getNoteById(id)
      if (!findnotebyId) {
        logger.error(error);
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      } else {
        logger.info('Get Note _id successfully');
        return res.status(200).json({
          message: 'Note retrieved succesfully',
          success: true,
          data: findnotebyId
        });
      }
    }
    catch (err) {
      logger.error(err);
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  };

  /**
    * @description function written to update notes using ID from the database
    * @param {*} req
    * @param {*} res
    * @returns response
    */
  updateNoteById = (req, res) => {
    try {
      const noteId = req.params.id;
      const updateNote = {
        id: req.params.id,
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      const updateNoteValidation = validation.notesUpdateValidation.validate(updateNote);
      if (updateNoteValidation.error) {
        logger.error(updateNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: updateNoteValidation
        });
      };
      noteService.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error('failed to update note');
          return res.status(400).json({
            message: 'failed to update note',
            success: false
          });
        } else {
          redis.clearCache("getNoteById");
          logger.info('Successfully inserted note');
          return res.status(201).send({
            message: 'Successfully update note',
            success: true,
            data: data
          });
        }
      });
    } catch {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Error occured',
        success: false
      });
    }
  };

  /**
    * @description function written to delete note by ID
    * @param {*} req
    * @param {*} res
    * @returns response
    */
  deleteNoteById = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const deleteNoteValidation = validation.validateNote.validate(id);
      if (deleteNoteValidation.error) {
        logger.error(deleteNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: deleteNoteValidation
        });
      }
      const data = await noteService.deleteNoteById(id);
      if (data.message) {
        logger.error("Note Not Found !!!")
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'Note Deleted succesfully',
        success: true,
        data: data
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({
        message: 'Note not updated',
        success: false,
        data: err
      });
    }
  };

}

module.exports = new noteController();