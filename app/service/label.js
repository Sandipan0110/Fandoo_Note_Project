const labelModel = require("../model/label.js");
const { logger } = require("../../logger/logger");
const redis = require("../redis/redis.js");

class LabelService {
    addLabel = async (label) => {
      const add = await labelModel.addLabel(label);
      if (add) {
        return add;
      }
      return false;
    };

  getLabel = async (id) => {
    const get = await labelModel.getLabel(id);
    if (!get) {
      return false;
    }
    return get;
  };

  getLabelById = async (id) => {
    let getId = await redis.getData(id);
    if (!getId) {
      getId = await labelModel.getLabelById(id);
    }
    redis.setData("getRedisById", 60, JSON.stringify(getId));
    logger.info("get data by id");
    return getId;
  };

  updateLabelById = (updateNote, callback) => {
    labelModel.updateLabelById(updateNote, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        logger.info(data);
        redis.clearCache("getLabelById");
        return callback(null, data);
      }
    }
    );
  }

  deleteLabelById = (id, resolve, reject) => {
    labelModel.deleteLabelById(id).then((data) => resolve(data)).catch((err) => reject(err));
  };
}
module.exports = new LabelService();