const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const nodeMailer = require("nodemailer");

class Helper {
  hashedPassword = (password) => {
    return bcrypt.hashSync(password, salt);
  }

  token = (data) => {
    const tokenData = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ tokenData }, process.env.JWT_SECRET, { expiresIn: "24H" });
  }

  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }

  validateToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    const tokenArray = tokenHeader.split(" ");
    const tokenInfo = tokenArray[1];
    try {
      if (tokenInfo) {
        jwt.verify(tokenInfo, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: "Oops.....Invalid Token"
            });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Oops....Authorisation failed! Invalid user"
        });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: "Something went wrong!" });
    }
  }

  jwtTokenVerifyMail = (payload, secretkey, callback) => {
    jwt.sign({ email: payload.email }, secretkey, { expiresIn: "24H" },
      (err, token) => {
        if (err) {
          return callback("token not generated", null);
        } else {
          return callback(null, token);
        }
      }
    );
  };

  sendWelcomeMail = (data) => {
    try {
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD // generated ethereal password
        }
      });

      // send mail with defined transport object
        transporter.sendMail({
        from: "\"Fundoo Notes\" <no-reply@fundoonotes.com>", // sender address
        to: data.email, // list of receivers
        subject: "Welcome - Fundoo notes account", // Subject line
        text: `Hello ${data.firstName}.`, // plain text body
        html: `<b>Hello ${data.firstName} <br> <h2> Welcome to Fundoo notes.</h2> <br>Your account Has been created successfully<br></b>` // html body
      });
    } catch { }
  };
}
module.exports = new Helper();