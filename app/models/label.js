const mongoose = require("mongoose");
const noteModel = require("../models/notes.js").User;
const { logger } = require("../../logger/logger");

const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  noteId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteRegister'
  }],

  labelName: {
    type: String,
    unique: true,
    required: true
  },

}, {
  timestamps: true
})

const label = mongoose.model('label', labelSchema);

class LabelModel {
  addlabelById = async (id) => {
    const isAddLabel = await noteModel.findById({ _id: id.noteId });
    if (!isAddLabel) {
      logger.error("noteId note found in DataBase");
      return false
    } else {
      const addLabel = await label.findOneAndUpdate({ labelName: id.labelName }, { $addToSet: { noteId: id.noteId } });
      if (addLabel) {
        logger.info("noteId added in given labelName")
        return addLabel;
      } else {
        const labels = new label({
          userId: id.userId,
          noteId: id.noteId,
          labelName: id.labelName
        });
        const labelSave = await labels.save();
        if (labelSave) {
          logger.info("new label created")
          return labelSave;
        }
        logger.error("error in creating note");
        return false;
      }
    }
  };

  getLabel = (userId) => {
    return new Promise((resolve, reject) => {
      label.find({ userId: userId.id })
        .then((data) => {
          logger.info(data);
          resolve(data)
        }).catch((error) => {
          logger.error(error);
          reject(error)
        })
    })
  };

  getlabelById = (credential) => {
    return new Promise((resolve, reject) => {
      label.find({ userId: credential.userId, _id: credential.labelId })
        .then(data => {
          logger.info(data);
          resolve(data)
        }).catch(error => {
          logger.error(error);
          reject(error)
        })
    })
  };

  updatelabelById = (updatelabel) => {
    return new Promise((resolve, reject) => {
      label.findByIdAndUpdate(updatelabel.id, { labelName: updatelabel.labelName }, { new: true })
        .then(data => {
          logger.info(data);
          resolve(data)
        }).catch(error => {
          logger.error(error);
          reject(error)
        })
    })
  };

  deleteLabelById = (id, callback) => {
    LabelRegister.findOneAndDelete({ $and: [{ _id: id.id }, { userId: id.userId }] }, (error, data) => {
      if (data) {
        logger.info(data);
        return callback(null, data);
      }
      logger.error(error);
      return callback(error, null);
    });
  };
}

module.exports = new LabelModel();