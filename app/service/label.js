const labelModel = require("../models/label.js");
const { logger } = require("../../logger/logger");

class LabelService {
    addLabel = (label, callback) => {
        labelModel.addlabelById(label, (error, data) => {
            if (error) {
                logger.error(error);
                return callback(error, null);
            }
            logger.error(error);
            return callback(null, data);
        });
    };

    getLabel = (id, callback) => {
        labelModel.getLabel(id, (error, data) => {
            if (data) {
                logger.info(data);
                callback(null, data);
            } else {
                logger.error(error);
                callback(error, null);
            }
        });
    };

    getLabelById = (id, callback) => {
        labelModel.getLabelById(id, (error, data) => {
            if (data) {
                logger.info(data);
                callback(null, data);
            } else {
                logger.error(error);
                callback(error, null);
            }
        });
    };


    updateLabelById = (updateNote, callback) => {
        labelModel.updateLabelById(updateNote, (error, data) => {
            if (error) {
                logger.error(error);
                return callback(error, null);
            } else {
                logger.info(data);
                return callback(null, data);
            }
        });
    }

}

module.exports = new LabelService();