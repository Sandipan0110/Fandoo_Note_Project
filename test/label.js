const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
chai.use(chaiHttp);
chai.should();
const labelData = require("./label.json");

describe("Add Label", () => {
  it("Checking Server is Responding or Not", (done) => {
    chai
      .request(server)
      .post('/addlabel/:id')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it("when call AddLabel api, should return appropriate response from controller", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakeNamefff" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call AddLabel api, should return appropriate response from controller", (done) => {
    const token = labelData.notes.inValidToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
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
  it("when call AddLabel api with valid input, should return appropriate response from controller", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakeNamgge" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call AddLabel api with false params, should return appropriate response from controller", (done) => {
    const token = labelData.notes.inValidToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakfeName" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call AddLabel api with false label, should return appropriate response from controller", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fake" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call AddLabel api, should return appropriate response from Service", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakkkeName" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call AddLabel api, should return appropriate response from Model", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakeNammme" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when note id present then add to DB, should return appropriate response from Model", (done) => {
    const token = labelData.notes.validToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakeNallme" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when note id absent then status code 400, should return appropriate response from Model", (done) => {
    const token = labelData.notes.inValidToken;
    chai
      .request(server)
      .post("/addLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "fakeNallme" })
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

describe("Get Label", () => {
  it.only("Checking Server is Responding or Not", (done) => {
    chai
      .request(server)
      .post('/getLabel/')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it.only("when call getLabel with inValid token , should return appropriate response from controller", (done) => {
    const token = labelData.notes.inValidToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
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