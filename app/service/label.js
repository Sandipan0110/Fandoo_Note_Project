const labelModel = require("../models/label.js");

class LabelService {
    addLabel = (label, callback) => {
        labelModel.addLabel(label, (error, data) => {
            if (error) {
              return callback(error, null);
            }
            return callback(null, data);
          });
    };
}

module.exports = new LabelService();