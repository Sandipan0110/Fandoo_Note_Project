const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
const labelDB = require('./label.json');
const { expect } = require('chai');
chai.should();

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
    const token = labelDB.label.validToken;
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
    const token = labelDB.label.inValidToken;
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
    const token = labelDB.label.validToken;
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
    const token = labelDB.label.inValidToken;
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
    const token = labelDB.label.validToken;
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
    const token = labelDB.label.validToken;
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
    const token = labelDB.label.validToken;
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
    const token = labelDB.label.validToken;
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
    const token = labelDB.label.inValidToken;
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
  it("Checking Server is Responding or Not", (done) => {
    chai
      .request(server)
      .get('/getLabel/')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it("when call getLabel with inValid token , should return appropriate response from controller", (done) => {
    const token = labelDB.label.inValidToken;
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
  it("when call getLabel with valid token , should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check validation , should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call getLabel with valid token , should return appropriate response from service", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call getLabel with valid token , should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check with valid token , should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check with invalid token , should return appropriate response from model", (done) => {
    const token = labelDB.label.inValidToken;
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

describe("Get Label by Id", () => {
  it("Checking Server is Responding or Not", (done) => {
    chai
      .request(server)
      .get('/getLabel/:id')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it("when call getLabelById with valid token , should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call getLabelById with invalid token , should return appropriate response from controller", (done) => {
    const token = labelDB.label.inValidToken;
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
  it("check validation of true , should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel/61cdfc76dd45eecb8e24e60d")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check validation of false params , should return appropriate response from controller", (done) => {
    const token = labelDB.label.inValidToken;
    chai
      .request(server)
      .get("/getLabel/61cc4e23cdf0")
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
  it("when call getLabelById with valid token , should return appropriate response from service", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel/61cdfc76dd45eecb8e24e60d")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call getLabelById with valid token , should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel/61cdfc76dd45eecb8e24e60d")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check with valid params , should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/getLabel/61cdfc76dd45eecb8e24e60d")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check with false params , should return appropriate response from model", (done) => {
    const token = labelDB.label.inValidToken;
    chai
      .request(server)
      .get("/getLabel/61cc4ae7c22dd21239e23cdf0")
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

describe('update label_by id api ', () => {
  it('Added Controller layer and Checking Response of Updatelabelby_id', (done) => {
    chai
      .request(server)
      .put('/updatelabel/:id')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it('it should give true when,token is valid ', (done) => {
    const token = labelDB.label.validToken
    chai
      .request(server)
      .put('/updatelabel/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should give true when,token is invalid ', (done) => {
    const token = labelDB.label.inValidToken
    chai
      .request(server)
      .put('/updatelabel/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("check validation with valid input, should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/updateLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "ABCD" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check validation with wrong input should return appropriate response from controller", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/updateLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "hvhj" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
  it("check validation with false labelName, should return appropriate response from controller", (done) => {
    const token = labelDB.label.inValidToken;
    chai
      .request(server)
      .put("/updateLabel/61cc239e23cdf0")
      .set({ authorization: token })
      .send({ labelName: "jfjefj" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(400);
        return done();
      });
  });
  it("when call updateLabel api, should return appropriate response from service", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/updateLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "Sandip" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("when call updateLabel api, should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/updateLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "bsbdbc" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check updation with true id, should return appropriate response from model", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .put("/updateLabel/61ba38b1d48f7fe935bbbfb6")
      .set({ authorization: token })
      .send({ labelName: "ABCDEFGH" })
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(201);
        return done();
      });
  });
  it("check updation with false id, should return appropriate response from model", (done) => {
    const token = labelDB.label.invalidToken;
    chai
      .request(server)
      .put("/updateLabel/61cc4aec224dd21239e23cdf")
      .set({ authorization: token })
      .send({ labelName: "ABCDE" })
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
