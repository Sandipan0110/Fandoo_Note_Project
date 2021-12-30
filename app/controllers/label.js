const validation = require("../utilities/validation");
const labelService = require("../service/label.js");
const { logger } = require("../../logger/logger");

class LabelController {
  addLabel = (req, res) => {
    try {
      const label = {
        labelName: req.body.labelName,
        userId: req.user.dataForToken.id,
        noteId: req.params.id
      };
      const labelValidation = validation.validAddLabel.validate(label);
      if (labelValidation.error) {
        logger.error(labelValidation.error);
        return res.status(400).send({
          success: false,
          message: "wrong input validation",
          data: labelValidation
        });
      }
      labelService.addLabel(label, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            message: "Note Id Not found / invalid note id..",
            success: false
          });
        } else {
          logger.info("Successfully Add Label.");
          return res.status(201).send({
            message: "Successfully Add label..",
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({
        success: false,
        message: "Internal server error"
      });
    }
  };

  getLabel = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id };
      const getLabelValidation = validation.getLabelValidation.validate(id);
      if (getLabelValidation.error) {
        logger.error(getLabelValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: getLabelValidation
        });
      }
      labelService.getLabel(id, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            message: "failed to get all notes",
            success: false
          });
        } else {
          logger.info("Get All label");
          return res.status(201).json({
            message: "Get All label successfully",
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  };

  getLabelById = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id, labelId: req.params.id };
      const getLabelValidation = validation.getLabelByIdValidation.validate(id);
      if (getLabelValidation.error) {
        console.log(getLabelValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: getLabelValidation
        });
      }
      labelService.getLabelById(id, (error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Oops....failed to get a notes",
            success: false
          });
        } else {
          return res.status(201).json({
            message: "Hurray....!!!.Get  label successfully.....",
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  }
}

module.exports = new LabelController();