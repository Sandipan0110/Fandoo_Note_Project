const labelModel = require("../models/label.js");
const { logger } = require("../../logger/logger");
const redis = require('../Connection/redis.js')

class LabelService {

    addLabel = async (id) => {
        const add = await labelModel.addlabelById(id);
        if (add) {
            return add;
        }
        return false;
    };

    getLabel = (userId) => {
        return new Promise((resolve, reject) => {
            let result = labelModel.getLabel(userId)
            result.then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    };

    getlabelById = (credential) => {
        return new Promise((resolve, reject) => {
            labelModel.getlabelById(credential)
                .then(data => {
                    redis.setData("getById", 60, JSON.stringify(data));
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    };

    updatelabelById = (updatelabel) => {
        return new Promise((resolve, reject) => {
            labelModel.updatelabelById(updatelabel)
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    };

    deleteLabelById = (id, callback) => {
        labelModel.deleteLabelById(id, (error, data) => {
            if (error) {
                logger.error(error);
                return callback(error, null);
            }
            logger.info(data);
            return callback(null, data);
        });
    }
}

module.exports = new LabelService();