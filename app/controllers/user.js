const userService = require('../service/user.js');
const validation = require('../utilities/validation.js');
const { logger } = require('../../logger/logger');
require('dotenv').config();

class userController {

  /**
    * @description Create and save user and sending response to service
    * @method register to save the user
    * @param req,res for service
    */
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      const registerValidation = validation.authRegister.validate(user)
      if (registerValidation.error) {
        logger.error(registerValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: registerValidation
        });
      }
      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(409).json({
            success: false,
            message: 'User already exist'
          });
        } else {
          logger.info('User registered');
          return res.status(200).json({
            success: true,
            message: 'User Registered',
            data: data
          });
        }
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error While Registering',
        data: null
      });
    }
  }

  /**
    * @description retrieving login info from user by email and password
    * @method login
    * @param req,res for service
    */
  login = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password
      };
      const loginValidation = validation.authLogin.validate(userLoginInfo);
      if (loginValidation.error) {
        logger.error(loginValidation.error);
        res.status(400).send({
          success: false,
          message: loginValidation.error.message
        });
      }
      userService.userLogin(userLoginInfo, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            success: false,
            message: 'Unable to login. Please enter correct info',
            error
          });
        }
        logger.info("User Successfully Logged in...");
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          data: data
        });
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error while Login', error,
        data: null
      });
    }
  };

  /**
    * description controller function for forgot password
    * @param {*} req
    * @param {*} res
    * @returns
    */
  forgotPassword = (req, res) => {
    try {
      const userCredential = {
        email: req.body.email
      };

      const validationforgotPassword =
        validation.authenticateLogin.validate(userCredential);
      if (validationforgotPassword.error) {
        logger.error(validationforgotPassword.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: validationforgotPassword
        });
      }
      userService.forgotPassword(userCredential, (error, result) => {
        if (error) {
          logger.error(error);
          return res.status(400).send({
            success: false,
            message: 'failed to send email'
          });
        } else {
          logger.info("Email Sent Successfully...");
          return res.status(200).send({
            success: true,
            message: 'Email sent successfully'
          });
        }
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        result: null
      });
    }
  };

  /**
    * description controller function for reset password
    * @param {*} req
    * @param {*} res
    * @returns
    */
  resetPassword = (req, res) => {
    try {
      const resetPasswordData = {
        email: req.body.email,
        password: req.body.password,
        code: req.body.code
      };
      const validationResult = validation.validateReset.validate(resetPasswordData);
      if (validationResult.error) {
        logger.error(validationResult.error);
        const response = { success: false, message: validationResult.error.message };
        return res.status(400).send(response);
      }

      userService.resetPassword(resetPasswordData, (error, data) => {
        if (error) {
          logger.error(error.message);
          const response = { success: false, message: error.message };
          return res.status(400).send(response);
        }

        else if (!data) {
          logger.error('Authorization failed');
          const response = { success: false, message: 'Authorization failed' };
          return res.status(401).send(response);
        }
        else {
          const response = { success: true, message: 'Password has been changed !', data: resetPasswordData };
          logger.info('Password has benn changed !');
          res.status(200).send(response);
        }
      });
    }
    catch (error) {
      logger.error('Some error occurred !');
      const response = { success: false, message: 'Some error occurred !' };
      res.status(500).send(response);
    }
  }

  confirmRegister = (req, res) => {
    const data = {
      token: req.params.token
    }
    service.confirmRegister(data, (error, data) => {
      if (error) {
        return res.status(404).json({
          success: false,
          message: "error"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Email Successfully Verified"
        });
      }
    });
  }
};

module.exports = new userController();