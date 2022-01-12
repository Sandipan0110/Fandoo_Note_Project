const userModel = require("../model/user.js");
const utilities = require("../utilitie/helper.js");
const nodemailer = require("../utilitie/nodemailer.js");
const { logger } = require("../../logger/logger");
const rabbitMQ = require("../utilitie/rabbitMq.js");
const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        // Send Welcome Mail to User on his Mail
        utilities.sendWelcomeMail(user);
        const secretkey = process.env.JWT_SECRET;
        utilities.jwtTokenVerifyMail(data, secretkey, (err, token) => {
          if (token) {
            rabbitMQ.sender(data, data.email);
            nodemailer.verifyMail(token, data);
            return callback(null, token);
          } else {
            return callback(err, null);
          }
        });
        return callback(null, data);
      }
    });
  };

  loginUser = (InfoLogin, callback) => {
    userModel.loginUser(InfoLogin, (error, data) => {
      if (data) {
        const passwordResult = utilities.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.error("Error occured......");
          // eslint-disable-next-line node/no-callback-literal
          return callback("Error occured......", null);
        } else {
          logger.info(data);
          const token = utilities.token(data);
          return callback(null, token);
        }
      } else {
        logger.error(error);
        return callback(error, null);
      }
    });
  }

  forgotPassword = (email, callback) => {
    userModel.forgotPassword(email, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        logger.info(data);
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  };

  resetpassword = async (user) => {
    const success = await userModel.resetpassword(user);
    if (!success) {
      return false;
    }
    return success;
  }

  verifyUser = (data, callback) => {
    const decode = jsonWebToken.verify(data.token, process.env.JWT_SECRET);
    if (decode) {
      rabbitMQ.receiver(decode.email).then((val) => {
        userModel.verifyUser(JSON.parse(val), (error, data) => {
          if (data) {
            return callback(null, data);
          } else {
            return callback(error, null);
          }
        });
      })
        .catch((error) => {
          logger.error(error);
        });
    }
  };
}
module.exports = new UserService();