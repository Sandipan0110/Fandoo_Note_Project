const labelModel = require("../models/label.js");
const { logger } = require("../../logger/logger");

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
            let result = labelmodel.getLabel(userId)
            result.then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    getlabelById = (credential) => {
        return new Promise((resolve, reject) => {
            labelmodel.getlabelById(credential)
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    }

    updatelabelById = (updatelabel) => {
        return new Promise((resolve, reject) => {
            labelModel.updatelabelById(updatelabel)
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}

module.exports = new LabelService();