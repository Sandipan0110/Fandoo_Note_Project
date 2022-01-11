const mongoose = require("mongoose");
const encryption = require("../utilitie/helper.js");
const Otp = require("./otp.js");
const { logger } = require("../../logger/logger");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  googlelogin: { type: Boolean },
  verified: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: false
  });

const User = mongoose.model("UserInformation", userSchema);

class UserModel {
  registerUser = (userDetails, callback) => {
    const newUser = new User();
    newUser.firstName = userDetails.firstName;
    newUser.lastName = userDetails.lastName;
    newUser.email = userDetails.email;
    newUser.password = userDetails.password;

    const password = encryption.hashedPassword(userDetails.password);
    newUser.password = password;

    newUser.save((error, data) => {
      if (error) {
        logger.error(error);
        callback(error, null);
      } else {
        logger.info("success fully registered");
        callback(null, data);
      }
    });
  };

  verifyUser = (data, callback) => {
    User.findOneAndUpdate({ email: data.email }, { verified: true }, (error, data) => {
      if (error) {
        logger.error("data not found in database");
        return callback(error, null);
      } else {
        logger.info("data found in database");
        return callback(null, data);
      }
    }
    );
  };

  loginUser = (loginData, callBack) => {
    // To find a user email in the database
    User.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error("Find error while loggin user");
        return callBack(error, null);
      } else if (data.verified == false) {
        logger.error("Invalid User");
        return callBack("Invalid Credential / invalid user", null);
      } else {
        if (data.verified == true) {
          logger.info("data found in database");
          return callBack(null, data);
        } else {
          return callBack(error, null);
        }
      }
    });
  }

  forgotPassword = (data, callback) => {
    User.findOne({ email: data.email }, (err, data) => {
      if (err) {
        logger.error(err);
        return callback(err, null);
      } else if (!data) {
        logger.error("Invalid Credential");
        return callback("Invalid Credential", null);
      } else {
        logger.info(data);
        return callback(null, data);
      }
    });
  };

  resetpassword = async (Data) => {
    const codepresent = await Otp.findOne({ email: Data.email, code: Data.code });
    if (codepresent) {
      const hash = encryption.hashedPassword(Data.password);
      const success = await User.findOneAndUpdate({ email: Data.email }, { $set: { password: hash } });
      if (success) {
        return success;
      }
      return false;
    }
    return false;
  }
}
module.exports = new UserModel();