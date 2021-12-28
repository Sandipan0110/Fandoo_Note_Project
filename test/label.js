const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const labelData = require("./label.json");
chai.use(chaiHttp);
chai.should();

describe("Add Label", () => {
  it.only("Should return appropriate response from controller when token valid", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel")
      .set({ authorization: token })
      .send({})
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it.only("Should return appropriate response from controller when token is invalid", (done) => {
    const token = labelData.notes.inValidToken;
    chai
      .request(server)
      .post("/addLabel")
      .set({ authorization: token })
      .send({})
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
});