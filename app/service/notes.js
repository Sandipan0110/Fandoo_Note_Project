const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes.js');
const redis = require('../redis/redis.js')

class Service {
  /**
     * @description this function is written to send data models
     * @param {*} A valid note is expected
     * @returns error if it has error else data
     */
  createNote = (note, callback) => {
    noteModel.createNote(note, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
  * @description this function is written to trigger or call the models function
  * @returns error if it has error else data
  */
  getNote = (id, resolve, reject) => {
    noteModel
      .getNotes(id)
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  /**
  * @description this function is written to trigger or call the models function
  * @returns error if it has error else data
  */
  getNoteById = async (id) => {
    const getId = await noteModel.getNoteById(id);
    if (!getId) {
      return false;
    }
    redis.setData("getNoteById", 90, JSON.stringify(getId));
    return getId;
  };

  /**
  * @description this function is written to trigger or call the models function
  * @returns error if it has error else data
  */
  updateNoteById = (updateNote, callback) => {
    noteModel.updateNoteById(updateNote, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        redis.clearCache(data.id);
        return callback(null, data);
      }
    }
    );
  };

  /**
   * @description deleting notes by id
   * @param {*} notesId
   * @returns
   */
  deleteNoteById = async (id) => {
    try {
      return await noteModel.deleteNoteById(id);
    } catch (err) {
      return err;
    }
  };
}

module.exports = new Service();