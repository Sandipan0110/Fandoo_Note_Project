const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
        return callback(null, data);
      }
    });
  }

    getNote = (id) => {
      return new Promise((resolve, reject) => {
        NoteRegister.find({ userId: id.id })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    };

    getNoteById = async (id) => {
      try {
        return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    };

    
    updateNoteById = (updatedNote, callback) => {
      try {
        NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      } catch (err) {
        return callback(err, null);
      }
    };

    deleteNoteById = async (id) => {
      try {
        return await NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    };

   /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelId is expected
     * @returns
     */

    addLabelById = async (id) => {
      try {
        const data = await NoteRegister.findByIdAndUpdate(id.noteId, { $push: { labelId: id.labelId } }, { new: true });
        console.log(data);
      } catch (error) {
          return error;
        }
    }
}

module.exports = new Model();