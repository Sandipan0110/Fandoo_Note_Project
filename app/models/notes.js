const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  labelName: {
    type: String,
    require: true
  },
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true

});

const NoteRegister = mongoose.model('NoteRegister', noteSchema);
class Model {
  /**
   * @description function written to create notes into database
   * @param {*} a valid info is expected
   * @returns saved data or if error returns error
   */
  createNote = (info, callback) => {
    const note = new NoteRegister({
      userId: info.userId,
      title: info.title,
      description: info.description
    });
    note.save((error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        logger.info(data);
        return callback(null, data);
      }
    });
  };

  /**
  * @description function written to get all notes from database
  * @returns retrieved notes or if error returns error
  */
  getNotes = (id) => {
    return new Promise((resolve, reject) => {
      NoteRegister.find({ userId: id.id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  /**
* @description function written to get notes by Id into database
* @param {*} valid notesId is expected
* @returns notes of particular Id or if any error return error
*/
  getNoteById = async (id) => {
    try {
      return await NoteRegister.find({
        _id: id.noteId, userId: id.userId,
      });
    } catch (err) {
      logger.error(err);
      return err;
    }
  };

  /**
* @description function written to update notes by Id into database
* @returns notes of particular Id or if any error return error
*/
  updateNoteById = (updatedNote, callback) => {
    try {
      NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        } else {
          logger.info(data);
          return callback(null, data);
        }
      });
    } catch (err) {
      logger.error(err);
      return callback(err, null);
    }
  };

  /**
* @description function written to update isDeleted to true
* @param {*} notesId
* @param {*} userId
* @returns data else if error returns error
*/
  deleteNoteById = async (id) => {
    try {
      return await NoteRegister.findOneAndDelete({ _id: id.noteId }, { userId: id.userId });
    } catch (err) {
      logger.error(err);
      return err;
    }
  };
}

module.exports = { UserModel: new Model(), User: NoteRegister };