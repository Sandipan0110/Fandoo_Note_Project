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
      return res.status(201).send({
        message: "Note inserted Successfully",
        success: true
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