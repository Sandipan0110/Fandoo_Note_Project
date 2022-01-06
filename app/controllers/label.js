const validation = require("../utilities/validation.js");
const labelService = require("../service/label.js");
const { logger } = require("../../logger/logger");

class LabelController {
  addLabel = async (req, res) => {
    try {
      const id = {
        labelName: req.body.labelName,
        userId: req.user.dataForToken.id,
        noteId: req.params.id
      };
      const labelValidation = validation.validateLabel.validate(id);
      if (labelValidation.error) {
        logger.error(labelValidation.error);
        console.log(labelValidation.error);
        return res.status(400).send({
          success: false,
          message: "wrong input validation",
          data: labelValidation
        });
      }
      const add = await labelService.addLabel(id);
      if (!add) {
        logger.error("error in add Labels");
        return res.status(400).send({
          success: false,
          message: "Oops Error in Add Label....."
        });
      } else {
        logger.info("successfully add a Label");
        return res.status(201).send({
          success: true,
          message: "Congratulation !!!! Successfully Add Label...........",
          data: add
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Internal server error"
      });
    }
  };

  getlabel = (req, res) => {
    try {
      if (req.user) {
        const userId = { id: req.user.dataForToken.id }
        const validateResult = validation.validateUserid.validate(userId);
        if (validateResult.error) {
          const response = { sucess: false, message: 'Wrong Input Validation', data: validateResult }
          return res.status(400).send(response)
        }
        labelService.getLabel(userId)
          .then((data) => {
            const response = { sucess: true, message: 'label is fetched', data: data }
            return res.status(200).send(response)
          }).catch((error) => {
            const response = { sucess: false, message: 'Some error occured' }
            return res.status(200).send(response)
          })
      }
      else {
        const response = { sucess: false, message: 'Invalid Token' }
        return res.status(400).send(response)
      }
    }
    catch (error) {
      console.log(error);
      const response = { sucess: false, message: "Internal  Server error" }
      return res.status(500).json(response)
    }
  };

  getlabelById = (req, res) => {
    try {
      const credentials = {
        userId: req.user.dataForToken.id,
        labelId: req.params.id
      };
      const validationResult = validation.labelvalidator.validate(credentials)
      if (validationResult.error) {
        const response = { sucess: false, message: "Wrong Credential  Validation" }
        res.status(422).json(response)
      }
      labelService.getlabelById(credentials)
        .then(data => {
          const response = { sucess: true, message: "Succesfuly label is fetch", data: data }
          return res.status(201).json(response);
        }).catch(error => {
          console.log(error);
          const response = { sucess: false, message: "Succesfuly label is not fetch", error: error.message }
          return res.status(400).json(response)
        })
    }
    catch (error) {
      const response = { sucess: false, message: "Internal  Server error" }
      return res.status(500).json(response)
    }
  };

  updatelabelById = (req, res) => {
    try {
      const updtlabel = {
        userId: req.user.dataForToken.id,
        id: req.params.id,
        labelName: req.body.labelName
      };
      const validatiionResult = validation.updatelabelbyid.validate(updtlabel)
      if (validatiionResult.error) {
        const response = { sucess: false, message: "Validation Failed", error: validatiionResult.error }
        return res.status(422).json(response)
      }
      labelService.updatelabelById(updtlabel)
        .then(data => {
          const response = { sucess: true, message: "Succesfully Updated label", data: data }
          return res.status(200).json(response)
        }).catch(error => {
          const response = { sucess: false, message: "some error occured ", error: error }
          return res.status(400).json(response)
        })
    } catch (error) {
      const response = { sucess: false, message: "Internal  Server error" }
      return res.status(500).json(response)
    }
  };

  deleteLabelById = (req, res) => {
    try {
      const id = { userId: req.user.tokenData.id, id: req.params.id };
      const deleteLabelValidation = validation.validateDeleteLabel.validate(id);
      if (deleteLabelValidation.error) {
        logger.error(deleteLabelValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: deleteLabelValidation
        });
      }
      labelService.deleteLabelById(id, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            message: "Note not found",
            success: false
          });
        }
        logger.info("Successfully Deleted Label..");
        return res.status(201).send({
          message: "Successfully Deleted Label..",
          success: true,
          data: data
        });
      });
    } catch (error) {
      console.log(error);
      logger.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  }
}

module.exports = new LabelController();