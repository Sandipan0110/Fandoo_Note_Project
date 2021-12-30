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
              callback(null, data);
            } else {
              callback(error, null);
            }
          });
    };
}

module.exports = new LabelService();